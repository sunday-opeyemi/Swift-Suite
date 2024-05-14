from django.shortcuts import render
from ftplib import FTP
import time, os, re
import csv
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import VendoEnronment
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from .models import Fragrancex, Lipsey, Ssi, Cwr, Zanders
from rest_framework.generics import GenericAPIView
from rest_framework.serializers import ModelSerializer
from django.http import JsonResponse
import pandas as pd

class VendorActivity:
    def __init__(self):
        self.data = ''
        self.insert_data = []

    def main(self, suppliers, userid, general_selection:dict = {}, _filters:dict = {}, get_filters = False):
        for supplier in suppliers:
            value = self.process_supplier(supplier, userid,general_selection, _filters, get_filters)
            return value

    def process_supplier(self, supplier, userid, general_selection, _filters, get_filters):
        """Process each supplier."""
        supplier_name, *_ = supplier
        print(f"Processing {supplier_name}...")
        local_dir = os.path.join("local_dir", supplier_name)
        os.makedirs(local_dir, exist_ok=True)
        try:
            value = self.download_csv_from_ftp(userid, supplier, general_selection, _filters, get_filters, local_dir)
            print(f"{supplier_name} data processed successfully.")
            return value
        except Exception as e:
            print(f"Error processing {supplier_name}: {str(e)}")


    def download_csv_from_ftp(self, userid, supplier, general_selection, _filters, get_filters, local_dir=".", port=21):
        """Download CSV file from FTP server."""
        
        supplier_name, ftp_host, ftp_user, ftp_password, ftp_path, file_name, index, port = supplier
        file_path = os.path.join(local_dir, file_name)
        
        ftp = FTP()
        ftp.connect(ftp_host, port)
        ftp.login(user=ftp_user, passwd=ftp_password)
        ftp.set_pasv(True)
        ftp.cwd(ftp_path)
        with open(os.path.join(local_dir, file_name), "wb") as local_file:
            ftp.retrbinary(f"RETR {file_name}", local_file.write)


        value = self.process_csv(userid,supplier_name, local_dir, file_name, index, general_selection, _filters, get_filters)
        return value

    def process_csv(self, userid, supplier_name, local_dir, file_name, index, general_selection, _filters, get_filters):
        with open(os.path.join(local_dir, file_name), "r", encoding='latin1') as file:
            csv_data = csv.DictReader(file)
            print(csv_data, supplier_name)

            if supplier_name == "FragranceX":
                if get_filters:
                    filter_values = self.filters_fragranceX(userid, csv_data)
                    return filter_values
                else:
                    success = self.process_fragranceX(userid, csv_data, general_selection, _filters)
                    return success
            elif supplier_name == "Lipsey":
                if get_filters:
                    filter_values = self.filters_lipsey(userid, csv_data)
                    return filter_values
                else:
                    success = self.process_lipsey(userid, csv_data, general_selection, _filters)
                    return success
            elif supplier_name == "SSI":
                if get_filters:
                    filter_values = self.filters_ssi(userid, csv_data)
                    return filter_values
                else:
                    success = self.process_ssi(userid, csv_data, general_selection, _filters)
                    return success
            elif supplier_name == "CWR":
                if get_filters:
                    filter_values = self.filters_cwr(userid, csv_data, index)
                    return filter_values
                else:
                    success = self.process_cwr(userid, csv_data, index, general_selection, _filters)
                    return success
            elif supplier_name == "RSR":
                if get_filters:
                    filter_values = self.filters_rsr(userid, csv_data)
                    return filter_values
                else:
                    success =self.process_rsr(userid, csv_data, general_selection, _filters)
                    return success
            elif supplier_name == "Zanders":
                if get_filters:
                    filter_values = self.filters_zanders(userid, csv_data, index)
                    return filter_values
                else:
                    success = self.process_zanders(userid, csv_data, index, general_selection, _filters)
                    return success
        

    def filters_fragranceX(self, userid, csv_data):
        items = []
        for row in csv_data:
            items.append(row)
            
        self.data = pd.DataFrame(items)
    
    def filters_lipsey(self, userid, csv_data):
        items = []
        for row in csv_data:
            items.append(row)
            
        self.data = pd.DataFrame(items)
        productType =self.data['ItemType'].unique()
        manufacturer = self.data['Manufacturer'].unique()
        filter_values = {'productType':productType, 'manufacturer':manufacturer}

        return filter_values

    def filters_ssi(self, userid, csv_data):
        items = []
        for row in csv_data:
            header = str(row).split(":", 1)[0]
            header = header.replace("{'", "").split("|")
            item = str(row).split(":", 1)[1]
            item = item.replace("]}", "").split("|")
            items.append(item)
            
        header[-1] = header[-1].replace("'", "")
        
        self.data = pd.DataFrame(items, columns=header)
        category = self.data['Category'].unique()
        filter_values = {'category':category}
        return filter_values
    
    def filters_cwr(self, userid, csv_data, index):
        items = []
        for row in csv_data:
            items.append(row)
            
        if index == 1:
            self.data = pd.DataFrame(items)
        elif index == 2:
            data2 = pd.DataFrame(items)
            self.data = self.data.merge(data2, left_on="CWR Part Number", right_on="sku")  
        
        category = self.data['Category Name'].unique()
        filter_values = {'category':category}
        return filter_values

    def filters_rsr(self, userid, csv_data):
        pass

    def filters_zanders(self, userid, csv_data, index): 
        items = []
        itemNumber = []
        description = []
        for row in csv_data:
            if index == 3:
                itemNumber.append(str(row).split("~")[1].split(":")[1].replace("'", "").strip())
                description.append(str(row).split("~")[2].replace("}", ""))
            else:
                items.append(row) 

        self.data = pd.DataFrame(items)
        manufacturer = self.data['manufacturer'].unique()
        filter_values = {'manufacturer':manufacturer}  
        return filter_values


    def process_fragranceX(self, userid, csv_data, general_selection, _filters):
            try:
                items = []
                for row in csv_data:
                    items.append(row)
                    
                self.data = pd.DataFrame(items)
                self.data = self.data[self.data['brand'].isin(_filters['brand'])]
                
                for row in self.data.iterrows():
                    row = row[1]
                    self.insert_data.append(Fragrancex(user_id=userid, name=row["NAME"], item=row["ITEM"], description=row["DESCRIPTION"], brand=row["BRAND"], title=row["TITLE"], gender=row["GENDER"], size=row["Size"], metric_size=row["Metric_Size"], retail=row["RETAIL"], price=row["PRICE"], eur_price=row["EUR_PRICE"],gbp_price=row["GBP_PRICE"], cad_price=row["CAD_PRICE"], aud_price=row["AUD_PRICE"], image=row["IMAGE"], url=row["URL"], qty=row["QTY"], upc=row["UPC"]))

                Fragrancex.objects.bulk_create(self.insert_data, batch_size=500, update_conflicts=True, update_fields=["size", "price", "qty"])
                print('FrangranceX upload successfully')
                return True
            except Exception as e:
                return e
    
    def process_lipsey(self, userid, csv_data, general_selection, _filters):
        try:        
            items = []
            for row in csv_data:
                items.append(row)
                
            self.data = pd.DataFrame(items)
            self.data = self.data[self.data['ItemType'].isin(_filters['product_filter'])]
            self.data = self.data[self.data['Manufacturer'].isin(_filters['manufacturer'])]
  

            for row in self.data.iterrows():
                row = row[1]
                self.insert_data.append(Lipsey(user_id=userid, itemnumber=row["ItemNo"], description1=row["Description1"], description2=row["Description2"], 
                    upc=row["Upc"], manufacturermodelno=row["ManufacturerModelNo"], msrp=row["Msrp"], 
                    model=row["Model"], calibergauge=row["CaliberGauge"], manufacturer=row["Manufacturer"], 
                    type=row["Type"], action=row["Action"], barrellength=row["BarrelLength"], 
                    capacity=row["Capacity"], finish=row["Finish"], overalllength =row["OverallLength"], 
                    receiver=row["Receiver"], safety=row["Safety"], sights=row["Sights"], stockframegrips=row["StockFrameGrips"], magazine=row["Magazine"], weight=row["Weight"], imagename=row["ImageName"], chamber=row["Chamber"], drilledandtapped=row["DrilledAndTapped"], rateoftwist=row["RateOfTwist"], itemtype=row["ItemType"], additionalfeature1=row["AdditionalFeature1"], additionalfeature2=row["AdditionalFeature2"], additionalfeature3=row["AdditionalFeature3"], shippingweight=row["ShippingWeight"], boundbookmanufacturer=row["BoundBookManufacturer"], boundbookmodel=row["BoundBookModel"], boundbooktype=row["BoundBookType"], nfathreadpattern=row["NfaThreadPattern"], nfaattachmentmethod=row["NfaAttachmentMethod"], nfabaffletype=row["NfaBaffleType"], silencercanbedisassembled=row["SilencerCanBeDisassembled"], silencerconstructionmaterial=row["SilencerConstructionMaterial"], nfadbreduction=row["NfaDbReduction"], silenceroutsidediameter=row["SilencerOutsideDiameter"], nfaform3caliber=row["NfaForm3Caliber"], opticmagnification=row["OpticMagnification"], maintubesize=row["MaintubeSize"], adjustableobjective=row["AdjustableObjective"], objectivesize=row["ObjectiveSize"], opticadjustments=row["OpticAdjustments"], illuminatedreticle=row["IlluminatedReticle"], reticle=row["Reticle"], exclusive=row["Exclusive"], quantity=row["Quantity"], allocated=row["Allocated"], onsale=row["OnSale"], price=row["Price"], currentprice=row["CurrentPrice"], retailmap=row["RetailMap"], fflrequired=row["FflRequired"], sotrequired=row["SotRequired"], exclusivetype=row["ExclusiveType"], scopecoverincluded=row["ScopeCoverIncluded"], special=row["Special"], sightstype=row["SightsType"], case=row["Case"], choke=row["Choke"], dbreduction=row["DbReduction"], family=row["Family"], finishtype=row["FinishType"], frame=row["Frame"], griptype=row["GripType"], handgunslidematerial=row["HandgunSlideMaterial"], countryoforigin=row["CountryOfOrigin"], itemlength=row["ItemLength"], itemwidth=row["ItemWidth"], itemheight=row["ItemHeight"], packagelength=row["PackageLength"], packagewidth=row["PackageWidth"], packageheight=row["PackageHeight"], itemgroup=row["ItemGroup"], ))
            
            Lipsey.objects.bulk_create(self.insert_data, batch_size=500, update_conflicts=True, update_fields=["onsale", "price", "currentprice"])
            print('Lipsey upload successfully')
            return True
        except Exception as e:
            return e

    def process_ssi(self, userid, csv_data, general_selection, _filters):
        try:
            items = []
            for row in csv_data:
                header = str(row).split(":", 1)[0]
                header = header.replace("{'", "").split("|")
                item = str(row).split(":", 1)[1]
                item = item.replace("]}", "").split("|")
                items.append(item)
                
            header[-1] = header[-1].replace("'", "")
            
            self.data = pd.DataFrame(items, columns=header)
            self.data = self.data[self.data['Category'].isin(_filters['product_category'])]

            for row in self.data.iterrows():
                items = row[1].values
                self.insert_data.append(Ssi(user_id=userid, sku=items[0], description=items[1], datecreated=items[2], dimensionh=items[3], dimensionl=items[4], dimensionw=items[5], manufacturer=items[6], imageurl=items[7], thumbnailurl=items[8], upccode=items[9], weight=items[10], weightunits=items[11], category=items[12], subcategory=items[13], status=items[14], map=items[15], msrp=items[16], mpn=items[17], minimumorderquantity=items[18], detaileddescription=items[19], shippingweight=items[20], shippinglength=items[21], shippingwidth=items[22], shippingheight=items[23], attribute1=items[24], attribute2=items[25], attribute3=items[26], attribute4=items[27], attribute5=items[28], attribute6=items[29], attribute7=items[30], prop65warning=items[31], prop65reason=items[32], countryoforigin=items[33], groundshippingrequired=items[34]))

            Ssi.objects.bulk_create(self.insert_data, batch_size=500, update_conflicts=True, update_fields=["description", "status", "weight"])
            print('SSI upload successfully')
            return True
        except Exception as e:
            return e
        
    def process_cwr(self, userid, csv_data, index, general_selection, _filters):
        # try: 

        items = []
        for row in csv_data:
            items.append(row)
            
        if index == 1:
            self.data = pd.DataFrame(items)
        elif index == 2:
            self.data2 = pd.DataFrame(items)
            self.data = self.data.merge(self.data2, left_on="CWR Part Number", right_on="sku") 
            if _filters['truck_freight']:
                self.data = self.data[self.data['truck_freight'] == True]
            if _filters['oversized']:
                self.data = self.data[self.data['oversized'] == True]
            if _filters['third_party_marketplaces']:
                self.data = self.data[self.data['third_party_marketplaces'] == True]
            if _filters['returnable']:
                self.data = self.data[self.data['returnable'] == True]
       
            self.data = self.data[self.data['Category Name'].isin(_filters['product_category'])] 
 
            for row in self.data.iterrows():
                items = row[1].values   
                items = list(items)
                self.insert_data.append(Cwr(user_id=userid, cwr_part_number=items[0], manufacturer_part_number=items[1], upc_code=items[2], quantity_available_to_ship_combined=items[3], quantity_available_to_ship_nj=items[4], quantity_available_to_ship_fl=items[5], next_shipment_date_combined=items[6], next_shipment_date_nj=items[7], next_shipment_date_fl=items[8], your_cost=items[9], list_price=items[10], m_a_p_price=items[11], m_r_p_price=items[12], uppercase_title=items[13], title=items[14], full_description=items[15], category_id=items[16], category_name=items[17], manufacturer_name=items[18], shipping_weight=items[19], box_height=items[20], box_length=items[21], box_width=items[22], list_of_accessories_by_sku=items[23], list_of_accessories_by_mfg=items[24], quick_specs=items[29], hazardous_materials=items[30], truck_freight=items[31], exportable=items[32], first_class_mail=items[33], oversized=items[34], remanufactured=items[35], closeout=items[36], harmonization_code=items[37], country_of_origin=items[38], sale=items[39], original_price_if_on_sale_closeout=items[40], sale_start_date=items[41], sale_end_date=items[42], rebate=items[43], rebate_description=items[44], rebate_start_date=items[45], rebate_end_date=items[46], google_merchant_category=items[47], quick_guide_literature_pdf_url=items[48], owners_manual_pdf_url=items[49], brochure_literature_pdf_url=items[50], installation_guide_pdf_url=items[51], video_urls=items[52], prop_65=items[53], prop_65_description=items[54], free_shipping=items[55], free_shipping_end_date=items[56], returnable=items[57], image_additional_1000x1000_urls=items[58], case_qty_nj=items[59], case_qty_fl=items[60], number_3rd_party_marketplaces=items[61], fcc_id=items[62], sku=items[63], mfgn=items[64], qty=items[65], qtynj=items[66], qtyfl=items[67], price=items[68], map=items[69], mrp=items[70]))
            
            print(len(self.insert_data))
            Cwr.objects.bulk_create(self.insert_data, batch_size=500, update_conflicts=True, update_fields=["qty", "qtynj", "qtyfl", "price", "map", "mrp"])

            print('\nProduct Upload successful....')
            return True
        # except Exception as e:
        #     return e

    def process_rsr(self, userid, csv_data, general_selection, _filters):
        try:
            for row in csv_data:
                pass
        except Exception as e:
            return e
        
    def process_zanders(self, userid, csv_data, index, general_selection, _filters): 
        try:
            items = []
            itemNumber = []
            description = []
            for row in csv_data:
                if index == 3:
                    itemNumber.append(str(row).split("~")[1].split(":")[1].replace("'", "").strip())
                    description.append(str(row).split("~")[2].replace("}", ""))
                else:
                    items.append(row) 

            self.data = pd.DataFrame(items)
            if _filters['serialized']:
                self.data = self.data[self.data['serialized']=='YES']
  
            for row in self.data.iterrows():
                items = row[1]      
                self.insert_data.append(Zanders(user_id=userid, available=row['available'], category=row['category'], desc1=row['desc1'], desc2=row['desc2'], itemnumber=row['itemnumber'], manufacturer=row['manufacturer'], mfgpnumber=row['mfgpnumber'], msrp=row['msrp'], price1=row['price1'], price2=row['price2'], price3=row['price3'], qty1=row['qty1'], qty2=row['qty2'], qty3=row['qty3'], upc=row['upc'], weight=row['weight'], serialized=row['serialized'], mapprice=row['mapprice'], imagelink=row['ImageLink'], description=["description"]))       
                

            print(len(self.insert_data))                  
            Zanders.objects.bulk_create(self.insert_data, batch_size=500, update_conflicts=True, update_fields=["price1", "price2", "price3"])
            print('\nProduct upload successful....')
            return True
        except Exception as e:
            return e


                                      

VENDORS = {
    "fragrancex":[
        ('Fragrancex', "ftp2.fragrancex.com", "frgx_temilolaoduola@gmail.com", "ftos3tpi", "/", "outgoingfeed_upc.csv", 1, 2222),
    ],

    "zanders":[
        ("Zanders", "http://ftp2.gzanders.com/", "DotfakGroup", "Katy801", "/Inventory", "itemimagelinks.csv", 1, 21),
        ("Zanders", "http://ftp2.gzanders.com/", "DotfakGroup", "Katy801", "/Inventory", "zandersinv.csv", 2, 21),
        ("Zanders", "http://ftp2.gzanders.com/", "DotfakGroup", "Katy801", "/Inventory", "detaildesctext.csv", 3, 21),
    ],

    "lipsey":[
        ("Lipsey","ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "catalog.csv", 1, 21),
    ],

    "ssi":[
        ("SSI","www.rapidretail.net", "ssi_dot774rr", "Rapid_774!", "/Products", "RR_Products.csv", 1, 21),
    ],

    "cwr":[
        ("CWR", "edi.cwrdistribution.com", "421460", "QUwB6I1m", "/out", "catalog.csv", 1, 21),
        ("CWR", "edi.cwrdistribution.com", "421460", "QUwB6I1m",  "/out", "inventory.csv", 2, 21)
    ],

    "rsr":[
        ("RSR", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsrinventory-keydlr-new.txt", 1, 21),
        ("RSR", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "product_sell_descriptions.txt", 2, 21),
        ("RSR", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "IM-QTY-CSV.csv", 3, 21),
        ("RSR", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsr-product-message.txt", 4, 21),
    ]

}


def get_suppliers_for_vendor(ftp_name, ftp_host, ftp_user, ftp_password):
    if ftp_name == 'FragranceX':
        return [(ftp_name, ftp_host, ftp_user, ftp_password, "/", "outgoingfeed_upc.csv", 1,2222)]
    elif ftp_name == 'Zanders':
        return [
            (ftp_name, ftp_host, ftp_user, ftp_password, "/Inventory", "itemimagelinks.csv", 1, 21),
            (ftp_name, ftp_host, ftp_user, ftp_password, "/Inventory", "zandersinv.csv", 2, 21),
            (ftp_name, ftp_host, ftp_user, ftp_password, "/Inventory", "detaildesctext.csv", 3, 21),
        ]
    elif ftp_name == 'RSR':
        return [
            (ftp_name, ftp_host, ftp_user, ftp_password, "/keydealer", "rsrinventory-keydlr-new.txt", 1, 21),
            (ftp_name, ftp_host, ftp_user, ftp_password, "/keydealer", "product_sell_descriptions.txt", 2, 21),
            (ftp_name, ftp_host, ftp_user, ftp_password, "/keydealer", "IM-QTY-CSV.csv", 3, 21),
            (ftp_name, ftp_host, ftp_user, ftp_password, "/keydealer", "rsr-product-message.txt", 4, 21),
        ]
    elif ftp_name == 'CWR':
        return [
            (ftp_name, ftp_host, ftp_user, ftp_password, "/out", "catalog.csv", 1, 21),
            (ftp_name, ftp_host, ftp_user, ftp_password, "/out", "inventory.csv", 2, 21)
        ]
    elif ftp_name == 'Lipsey':
        return [(ftp_name, ftp_host, ftp_user, ftp_password, "/", "catalog.csv", 1, 21)]
    elif ftp_name == 'SSI':
        return [(ftp_name, ftp_host, ftp_user, ftp_password, "/Products", "RR_Products.csv", 1, 21)]

class VendorEnrolmentTestView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = VendorEnrolmentTestSerializer(data=request.data)
        serializer.is_valid()
        vendor = serializer.data
        userid = request.user.id
        ftp_name = vendor['vendor_name']
        ftp_host = vendor['host']
        ftp_user = vendor['ftp_username']
        ftp_password = vendor['ftp_password']

        suppliers = get_suppliers_for_vendor(ftp_name, ftp_host, ftp_user, ftp_password)

        pull = VendorActivity()                
        filter_values = pull.main(suppliers, userid, get_filters=True)

        if filter_values:
            return Response(filter_values, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
class VendoEnronmentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vendo_enronments = VendoEnronment.objects.filter(user_id=request.user.id)
        serializer = VendoEnronmentSerializer(vendo_enronments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = VendoEnronmentSerializer(data=request.data, context={'request': request})
        try:
            if serializer.is_valid():
                vendor_data = serializer.validated_data

                userid = request.user.id
                ftp_name = vendor_data['vendor_name']
                ftp_host = vendor_data['host']
                ftp_user = vendor_data['ftp_username']
                ftp_password = vendor_data['ftp_password']
                
                general_selection = {
                    'percentage_markup':vendor_data['percentage_markup'],
                    'fixed_markup':vendor_data['fixed_markup'],
                    'shipping_cost':vendor_data['shipping_cost'],
                    'stock_minimum':vendor_data['stock_minimum'],
                    'stock_maximum':vendor_data['stock_maximum'],
                    'update_inventory':vendor_data['update_inventory'],
                    'send_orders':vendor_data['send_orders'],
                    'update_tracking':vendor_data['update_tracking']
                }

                if ftp_name == 'FragranceX':
                    extra_data = {'brand': vendor_data['brand']}

                elif ftp_name == 'CWR':
                    extra_data = {
                        'truck_freight': vendor_data['truck_freight'],
                        'oversized': vendor_data['oversized'],
                        'third_party_marketplaces': vendor_data['third_party_marketplaces'],
                        'returnable': vendor_data['returnable'],
                        'product_category': vendor_data['product_category']
                    }

                elif ftp_name == 'Lipsey':
                    extra_data = {
                        'product_filter': vendor_data['product_filter'], 
                        'manufacturer': vendor_data['manufacturer']
                    }

                elif ftp_name == 'SSI':
                    extra_data = {
                        'product_category': vendor_data['product_category'], 
                        'shipping_cost_average': vendor_data['shipping_cost_average']
                    }
                
                elif ftp_name == 'Zanders':
                    extra_data = {
                        'serialized': vendor_data['serialized'],
                    }
                print(extra_data)

                suppliers = get_suppliers_for_vendor(ftp_name, ftp_host, ftp_user, ftp_password)

                pull = VendorActivity()                
                success = pull.main(suppliers, userid, general_selection, extra_data)
                if success == True:
                    # if 'product_filter' in extra_data:
                    #     extra_data['product_filter'] = str(extra_data['product_filter'])
                    # if 'product_category' in extra_data:
                    #     extra_data['product_category'] = str(extra_data['product_category'])
                    # if 'brand' in extra_data:
                    #     extra_data['brand'] = str(extra_data['brand'])
                    # if 'manufacturer' in extra_data:
                    #     extra_data['manufacturer'] = str(extra_data['manufacturer'])

                    print(extra_data)

                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": str(success)},status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({"error": str(e)},status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


class CatalogueBaseView(APIView):
    permission_classes = [IsAuthenticated]
    model = None  # Subclasses must override this
    vendor_name = ''

    def get_queryset(self, user_id):
        return self.model.objects.filter(user_id = user_id).values()

    def get(self, request, pk):
        try:
            user = VendoEnronment.objects.get(user_id=pk, vendor_name = self.vendor_name)
            queryset = self.get_queryset(pk)
            return JsonResponse(list(queryset), safe=False)
        
        except VendoEnronment.DoesNotExist:
            return JsonResponse({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)       
class CatalogueFragrancexView(CatalogueBaseView):
    model = Fragrancex
    vendor_name = 'FragranceX'
class CatalogueZandersView(CatalogueBaseView):
    model = Zanders
    vendor_name = 'Zanders'
class CatalogueLipseyView(CatalogueBaseView):
    model = Lipsey
    vendor_name = 'Lipsey'
class CatalogueSsiView(CatalogueBaseView):
    model = Ssi
    vendor_name = 'SSI'
class CatalogueCwrView(CatalogueBaseView):
    model = Cwr
    vendor_name = 'CWR'
class AllCatalogueView(APIView):
    permission_classes = [IsAuthenticated]

    MODELS_MAPPING = {
        'fragrancex': Fragrancex,
        'cwr': Cwr,
        'lipsey': Lipsey,
        'ssi': Ssi,
        'zanders': Zanders,
    }

    def get(self, request, pk):
        user = VendoEnronment.objects.filter(user_id=pk).first()
        if not user:
            return JsonResponse({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        all_products = []

        for model_name, model_class in self.MODELS_MAPPING.items():
            if getattr(user, f'has_{model_name}', False):
                products = model_class.objects.all().values()
                all_products.extend(list(products))

        return JsonResponse(all_products, safe=False)