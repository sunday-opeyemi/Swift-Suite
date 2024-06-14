from django.shortcuts import render
from ftplib import FTP
import time, os, re
import ftplib
import ssl
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
from django.http import JsonResponse
from django.forms.models import model_to_dict
import ast
from rest_framework.decorators import api_view, permission_classes

class VendorActivity:
    def __init__(self):
        self.data = pd.DataFrame()
        self.insert_data = []

    def main(self, suppliers, userid, get_filters = False):
        for supplier in suppliers:
            value = self.process_supplier(supplier, userid, get_filters)
            
        return value

    def process_supplier(self, supplier, userid, get_filters):
        """Process each supplier."""
        supplier_name, *_ = supplier
        print(f"Processing {supplier_name}...")
        local_dir = os.path.join("local_dir", supplier_name)
        os.makedirs(local_dir, exist_ok=True)
        try:
            value = self.download_csv_from_ftp(userid, supplier, get_filters, local_dir)
            print(f"{supplier_name} data processed successfully.")
            return value
        except Exception as e:
            print(f"Error processing {supplier_name}: {str(e)}")


    def download_csv_from_ftp(self, userid, supplier, get_filters, local_dir=".", port=21):
        """Download CSV file from FTP server."""
        
        supplier_name, ftp_host, ftp_user, ftp_password, ftp_path, file_name, index, port = supplier
        file_path = os.path.join(local_dir, file_name)
        

        
        if supplier_name == "RSR GROUP":
            ctx = ssl.create_default_context()
            ftps = ftplib.FTP_TLS(context=ctx)
            ftps.connect(ftp_host, port)
            ftps.login(ftp_user, ftp_password)
            ftps.prot_p()
            ftps.cwd(ftp_path)
            # print(ftp.nlst())
            with open(os.path.join(local_dir, file_name), "wb") as local_file:
                ftps.retrbinary(f"RETR {file_name}", local_file.write)
            print(f"{file_name} downloaded from FTPS for {ftp_user}.")
            ftps.quit()
        else:
            ftp = FTP()
            ftp.connect(ftp_host, port)
            ftp.login(user=ftp_user, passwd=ftp_password)
            ftp.set_pasv(True)
            ftp.cwd(ftp_path)
            with open(os.path.join(local_dir, file_name), "wb") as local_file:
                ftp.retrbinary(f"RETR {file_name}", local_file.write)
        
            print(f"{file_name} downloaded from FTP for {ftp_user}.")

        value = self.process_csv(userid,supplier_name, local_dir, file_name, index, get_filters)
        return value

    def process_csv(self, userid, supplier_name, local_dir, file_name, index, get_filters):
        with open(os.path.join(local_dir, file_name), "r", encoding='latin1') as file:
            csv_data = csv.DictReader(file)
            print(csv_data, supplier_name)

            supplier_name = supplier_name.upper()

            if supplier_name == "FRAGRANCEX":
                if get_filters:
                    filter_values = self.filters_fragranceX(userid, csv_data)
                    return filter_values
                else:
                    success = self.process_fragranceX(userid, csv_data)
                    return success
            elif supplier_name == "LIPSEY":
                if get_filters:
                    filter_values = self.filters_lipsey(userid, csv_data)
                    return filter_values
                else:
                    success = self.process_lipsey(userid, csv_data)
                    return success
            elif supplier_name == "SSI":
                if get_filters:
                    filter_values = self.filters_ssi(userid, csv_data)
                    return filter_values
                else:
                    success = self.process_ssi(userid, csv_data)
                    return success
            elif supplier_name == "CWR":
                if get_filters:
                    filter_values = self.filters_cwr(userid, csv_data, index)
                    return filter_values
                else:
                    success = self.process_cwr(userid, csv_data, index)
                    return success
            elif supplier_name == "RSR":
                if get_filters:
                    filter_values = self.filters_rsr(userid, csv_data)
                    return filter_values
                else:
                    success =self.process_rsr(userid, csv_data)
                    return success
            elif supplier_name == "ZANDERS":
                if get_filters:
                    filter_values = self.filters_zanders(userid, csv_data, index)
                    return filter_values
                else:
                    success = self.process_zanders(userid, csv_data, index)
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
         
        manufacturer_dictList = []
        productType_dictList = []
        x = 1
        for value in productType:
            _dict = {"id":x, "label":value, "checked":False}
            productType_dictList.append(_dict)
            x+=1

        y = 1
        for value in manufacturer:
            _dict = {"id":y, "label":value, "checked":False}
            manufacturer_dictList.append(_dict)
            y+=1

        filter_values = {'productType':productType_dictList, 'manufacturer':manufacturer_dictList}

        return filter_values

    def filters_ssi(self, userid, csv_data):
        items = []
        for row in csv_data:
            header = str(row).split(":", 1)[0]
            header = header.replace("{'", "").split("|")
            item = re.sub("[\"\'}\' ']", "", str(row))
            item = item.split(":", 1)[1]
            item = item.replace("]}", "").split("|")
            item[-1] = item[-1].replace("]", "")
            items.append(item)
            
        header[-1] = header[-1].replace("'", "")
        
        data = pd.DataFrame(items, columns=header)
        category = self.data['Category'].unique()

        category_dictList = []
        x = 1
        for value in category:
            _dict = {"id":x, "label":value, "checked":False}
            category_dictList.append(_dict)
            x+=1
        filter_values = {'category':category_dictList}
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
        category_dictList = []
        x = 1
        for value in category:
            _dict = {"id":x, "label":value, "checked":False}
            category_dictList.append(_dict)
            x+=1
        filter_values = {'category':category_dictList}
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
        
        if index == 3:
            data2 = pd.DataFrame({"Itemnumber":itemNumber, "description":description})
            data = data.merge(data2, left_on="itemnumber", right_on="Itemnumber")
        elif index == 2:
            data2 = pd.DataFrame(items)
            data = data.merge(data2, left_on="itemnumber", right_on="ItemNumber")
        else:
            data = pd.DataFrame(items)

        manufacturer = self.data['manufacturer'].unique()
        manufacturer_dictList = []
        x = 1
        for value in manufacturer:
            _dict = {"id":x, "label":value, "checked":False}
            manufacturer_dictList.append(_dict)
            x+=1
        filter_values = {'manufacturer':manufacturer_dictList}  
        return filter_values


    def process_fragranceX(self, userid):
            try:
                for row in self.data.iterrows():
                    row = row[1]
                    self.insert_data.append(Fragrancex(user_id=userid, name=row["NAME"], item=row["ITEM"], description=row["DESCRIPTION"], brand=row["BRAND"], title=row["TITLE"], gender=row["GENDER"], size=row["Size"], metric_size=row["Metric_Size"], retail=row["RETAIL"], price=row["PRICE"], eur_price=row["EUR_PRICE"],gbp_price=row["GBP_PRICE"], cad_price=row["CAD_PRICE"], aud_price=row["AUD_PRICE"], image=row["IMAGE"], url=row["URL"], qty=row["QTY"], upc=row["UPC"]))

                Fragrancex.objects.bulk_create(self.insert_data, batch_size=500, update_conflicts=True, update_fields=["size", "price", "qty"])
                print('FrangranceX upload successfully')
                return True
            except Exception as e:
                return e
    
    def process_lipsey(self, userid):
        try:        
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

    def process_ssi(self, userid):
        try:
            for row in self.data.iterrows():
                items = row[1].values
                self.insert_data.append(Ssi(user_id=1, sku=items[0], description=items[1], datecreated=items[2], dimensionh=items[3], dimensionl=items[4], dimensionw=items[5], manufacturer=items[6], imageurl=items[7], thumbnailurl=items[8], upccode=items[9], weight=items[10], weightunits=items[11], category=items[12], subcategory=items[13], status=items[14], map=items[15], msrp=items[16], mpn=items[17], minimumorderquantity=items[18], detaileddescription=items[19], shippingweight=items[20], shippinglength=items[21], shippingwidth=items[22], shippingheight=items[23], attribute1=items[24], attribute2=items[25], attribute3=items[26], attribute4=items[27], attribute5=items[28], attribute6=items[29], attribute7=items[30], prop65warning=items[31], prop65reason=items[32], countryoforigin=items[33], groundshippingrequired=items[34]))
            
            Ssi.objects.bulk_create(self.insert_data, batch_size=500, update_conflicts=True, update_fields=["description", "status", "weight"])
            print('SSI upload successfully')
            return True
        except Exception as e:
            return e
        
    def process_cwr(self, userid, _filters):
        try: 
            if _filters['truck_freight']:
                self.data = self.data[self.data['Truck Freight'] == True]

            if _filters['oversized']:
                self.data = self.data[self.data['Oversized'] == True]
            if _filters['third_party_marketplaces']:
                self.data = self.data[self.data['3rd Party Marketplaces'] == True]
            if _filters['returnable']:
                self.data = self.data[self.data['Returnable'] == True]
        
            self.data = self.data[self.data['Category Name'].isin(_filters['product_category'])] 

            for row in self.data.iterrows():
                items = row[1].values   
                items = list(items)
                self.insert_data.append(Cwr(user_id=1, cwr_part_number=items[0], manufacturer_part_number=items[1], upc_code=items[2], quantity_available_to_ship_combined=items[3], quantity_available_to_ship_nj=items[4], quantity_available_to_ship_fl=items[5], next_shipment_date_combined=items[6], next_shipment_date_nj=items[7], next_shipment_date_fl=items[8], your_cost=items[9], list_price=items[10], m_a_p_price=items[11], m_r_p_price=items[12], uppercase_title=items[13], title=items[14], full_description=items[15], category_id=items[16], category_name=items[17], manufacturer_name=items[18], shipping_weight=items[19], box_height=items[20], box_length=items[21], box_width=items[22], list_of_accessories_by_sku=items[23], list_of_accessories_by_mfg=items[24], quick_specs=items[29], hazardous_materials=items[30], truck_freight=items[31], exportable=items[32], first_class_mail=items[33], oversized=items[34], remanufactured=items[35], closeout=items[36], harmonization_code=items[37], country_of_origin=items[38], sale=items[39], original_price_if_on_sale_closeout=items[40], sale_start_date=items[41], sale_end_date=items[42], rebate=items[43], rebate_description=items[44], rebate_start_date=items[45], rebate_end_date=items[46], google_merchant_category=items[47], quick_guide_literature_pdf_url=items[48], owners_manual_pdf_url=items[49], brochure_literature_pdf_url=items[50], installation_guide_pdf_url=items[51], video_urls=items[52], prop_65=items[53], prop_65_description=items[54], free_shipping=items[55], free_shipping_end_date=items[56], returnable=items[57], image_additional_1000x1000_urls=items[58], case_qty_nj=items[59], case_qty_fl=items[60], number_3rd_party_marketplaces=items[61], fcc_id=items[62], sku=items[63], mfgn=items[64], qty=items[65], qtynj=items[66], qtyfl=items[67], price=items[68], map=items[69], mrp=items[70]))
                    
            print(len(self.insert_data))
            Cwr.objects.bulk_create(self.insert_data, batch_size=500, update_conflicts=True, update_fields=["qty", "qtynj", "qtyfl", "price", "map", "mrp"])
            self.insert_data.append(Cwr(user_id=userid, cwr_part_number=items[0], manufacturer_part_number=items[1], upc_code=items[2], quantity_available_to_ship_combined=items[3], quantity_available_to_ship_nj=items[4], quantity_available_to_ship_fl=items[5], next_shipment_date_combined=items[6], next_shipment_date_nj=items[7], next_shipment_date_fl=items[8], your_cost=items[9], list_price=items[10], m_a_p_price=items[11], m_r_p_price=items[12], uppercase_title=items[13], title=items[14], full_description=items[15], category_id=items[16], category_name=items[17], manufacturer_name=items[18], shipping_weight=items[19], box_height=items[20], box_length=items[21], box_width=items[22], list_of_accessories_by_sku=items[23], list_of_accessories_by_mfg=items[24], quick_specs=items[29], hazardous_materials=items[30], truck_freight=items[31], exportable=items[32], first_class_mail=items[33], oversized=items[34], remanufactured=items[35], closeout=items[36], harmonization_code=items[37], country_of_origin=items[38], sale=items[39], original_price_if_on_sale_closeout=items[40], sale_start_date=items[41], sale_end_date=items[42], rebate=items[43], rebate_description=items[44], rebate_start_date=items[45], rebate_end_date=items[46], google_merchant_category=items[47], quick_guide_literature_pdf_url=items[48], owners_manual_pdf_url=items[49], brochure_literature_pdf_url=items[50], installation_guide_pdf_url=items[51], video_urls=items[52], prop_65=items[53], prop_65_description=items[54], free_shipping=items[55], free_shipping_end_date=items[56], returnable=items[57], image_additional_1000x1000_urls=items[58], case_qty_nj=items[59], case_qty_fl=items[60], number_3rd_party_marketplaces=items[61], fcc_id=items[62], sku=items[63], mfgn=items[64], qty=items[65], qtynj=items[66], qtyfl=items[67], price=items[68], map=items[69], mrp=items[70]))
            
            print(len(self.insert_data))
            Cwr.objects.bulk_create(self.insert_data, batch_size=500, update_conflicts=True, update_fields=["qty", "qtynj", "qtyfl", "price", "map", "mrp"])
            print('\nProduct Upload successful....')
            return True
        except Exception as e:
            return e

    def process_rsr(self, userid,  _filters):
        pass
  
        
    def process_zanders(self, userid,  _filters): 
        try:
            for row in self.data.iterrows():
                items = row[1]     
                self.insert_data.append(Zanders(user_id=1, available=items['available'], category=items['category'], desc1=items['desc1'], desc2=items['desc2'], itemnumber=items['itemnumber'], manufacturer=items['manufacturer'], mfgpnumber=items['mfgpnumber'], msrp=items['msrp'], price1=items['price1'], price2=items['price2'], price3=items['price3'], qty1=items['qty1'], qty2=items['qty2'], qty3=items['qty3'], upc=items['upc'], weight=items['weight'], serialized=items['serialized'], mapprice=items['mapprice'], imagelink=items['ImageLink'], description=items["description"]))                                                      

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


MODELS_MAPPING = {
        'fragrancex': Fragrancex,
        'cwr': Cwr,
        'lipsey': Lipsey,
        'ssi': Ssi,
        'zanders': Zanders,
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

pull = VendorActivity()
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
        print(suppliers)
                       
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
                
                if ftp_name.upper() == 'FRAGRANCEX':
                    success = pull.process_fragranceX(userid)

                elif ftp_name.upper() == 'CWR':
                    success = pull.process_cwr(userid)

                elif ftp_name.upper() == 'LIPSEY':                    
                    success = pull.process_lipsey(userid)

                elif ftp_name.upper() == 'SSI':
                    success = pull.process_ssi(userid)

                elif ftp_name.upper() == 'ZANDERS':
                    success = pull.process_zanders(userid)

                if success == True:
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                else:
                    return Response({"error": str(success)},status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({"error": str(e)},status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_vendor_enrolment(request, vendor_name):
    enrolment_list = get_object_or_404(VendoEnronment, user_id=request.user.id, vendor_name=vendor_name)
    serializer = VendoEnronmentSerializer(enrolment_list, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CatalogueBaseView(APIView):
    permission_classes = [IsAuthenticated]
    model = None  # Subclasses must override this
    vendor_name = ''

    def get_queryset(self, userid):
        vendor_data = VendoEnronment.objects.get(user_id=userid, vendor_name = self.vendor_name)
        vendor_data = model_to_dict(vendor_data)
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

        if self.vendor_name == 'Lipsey':
            
            extra_data = {
                'product_filter': vendor_data['product_filter'], 
                'manufacturer': vendor_data['manufacturer']
            }

            # print(extra_data)
            # print(ast.literal_eval(extra_data['product_filter']))

            queryset = self.model.objects.filter(
                user_id=userid,
                itemtype__in=ast.literal_eval(extra_data['product_filter']),
                manufacturer__in=ast.literal_eval(extra_data["manufacturer"])
            ).values()

            return queryset
        elif self.vendor_name == 'CWR':

            extra_data = {
                'truck_freight': vendor_data['truck_freight'],
                'oversized': vendor_data['oversized'],
                'third_party_marketplaces': vendor_data['third_party_marketplaces'],
                'returnable': vendor_data['returnable'],
                'product_category': vendor_data['product_category']
            }

            queryset = self.model.objects.filter(
                user_id=userid,
                category_name__in=ast.literal_eval(extra_data["product_category"]),
                returnable = extra_data["returnable"],
                number_3rd_party_marketplaces = extra_data["third_party_marketplaces"],
                oversized = extra_data["oversized"],
                truck_freight = extra_data["truck_freight"]

            ).values()

            return queryset

        elif self.vendor_name == 'SSI':
            extra_data = {
                'product_category': vendor_data['product_category'],
            }

            queryset = self.model.objects.filter(
                user_id=userid,
                category__in=ast.literal_eval(extra_data['product_category']),
            ).values()
        
        elif self.vendor_name == 'Zanders':
            queryset = self.model.objects.filter(
                user_id=userid,
                serialized= vendor_data['serialized'],
            ).values()


    def get(self, request, pk):
        try:
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
    def get(self, request, pk):
        vendors = VendoEnronment.objects.filter(user_id=pk).values_list('vendor_name', flat=True)
        vendors = [vendor.lower() for vendor in vendors]
        print(vendors)

        if not vendors:
            return JsonResponse({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        all_products = []

        for model_name, model_class in MODELS_MAPPING.items():
            if model_name in vendors:
                products = model_class.objects.all().values()
                all_products.extend(list(products))

        return JsonResponse(all_products, safe=False)


class AddProductView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, userid, product_id, vendor_name):
        vendor_name = vendor_name.lower()

        if vendor_name not in MODELS_MAPPING:
            return JsonResponse({'error': 'Invalid vendor name'}, status=400)

        VENDOR = MODELS_MAPPING[vendor_name]

        product = get_object_or_404(VENDOR, id=product_id, user_id=userid)
        product_data = model_to_dict(product)
        
        general_product_data = self.map_vendor_data_to_general(vendor_name, product_data, userid)

        return JsonResponse(general_product_data, safe=False, status=status.HTTP_200_OK)

    def put(self, request, userid, product_id, vendor_name):
        vendor_name = vendor_name.lower()

        if vendor_name not in self.MODELS_MAPPING:
            return JsonResponse({'error': 'Invalid vendor name'}, status=400)

        product = get_object_or_404(MODELS_MAPPING[vendor_name], id=product_id, user_id=userid)
        product_data = model_to_dict(product)

        general_product_data = self.map_vendor_data_to_general(vendor_name, product_data, userid)

        # Retrieve the User instance
        user = get_object_or_404(User, id=userid)
        general_product_data['user'] = user

        general_product, created = Generalproducttable.objects.get_or_create(
            user=user,
            sku=general_product_data['sku'],
            defaults=general_product_data
        )

        if not created:
            # Update the existing record with new data
            for key, value in general_product_data.items():
                setattr(general_product, key, value)
            general_product.save()

        # Update the Generalproducttable instance with the data from the request
        serializer = GeneralProductSerializer(general_product, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def map_vendor_data_to_general(self, vendor_name, product_data, userid):
        if vendor_name == 'lipsey':
            return {
                'user': userid,
                'sku': product_data.get('itemnumber'),
                'quantity': product_data.get('quantity'),
                'upc': product_data.get('upc'),
                'title': product_data.get('description1'),
                'detailed_description': product_data.get('description2'),
                'image': product_data.get('imagename'),
                'category': product_data.get('type'),
                'msrp': product_data.get('msrp'),
                'mpn': product_data.get('manufacturermodelno'),
                'price': product_data.get('currentprice'),
                'model': product_data.get('model'),
                'brand': product_data.get('manufacturer'),
                'shipping_weight': product_data.get('shippingweight'),
                'shipping_length': product_data.get('packagelength'),
                'shipping_width': product_data.get('packagewidth'),
                'shipping_height': product_data.get('packageheight'),
            }
        elif vendor_name == 'cwr':
            return {
                'user': userid,
                'sku': product_data.get('cwr_part_number'),
                'quantity': product_data.get('quantity_available_to_ship_combined'),
                'upc': product_data.get('upc_code'),
                'title': product_data.get('title'),
                'detailed_description': product_data.get('full_description'),
                'image': product_data.get('image_300x300_url'),
                'category': product_data.get('category_name'),
                'msrp': product_data.get('list_price'),
                'mpn': product_data.get('manufacturer_part_number'),
                'price': product_data.get('your_cost'),
                'model': None,  
                'brand': product_data.get('manufacturer_name'),
                'shipping_weight': product_data.get('shipping_weight'),
                'shipping_length': product_data.get('box_length'),
                'shipping_width': product_data.get('box_width'),
                'shipping_height': product_data.get('box_height'),
            }

        elif vendor_name == 'fragrancex':
            return {
                'user': userid,
                'sku': product_data.get('item'),
                'title': product_data.get('title'),
                'detailed_description': product_data.get('description'),
                'image': product_data.get('image'),
                'category': None, 
                'msrp': product_data.get('retail'),
                'price': product_data.get('price'),
                'upc': product_data.get('upc'),
                'brand': product_data.get('brand'),
                'quantity': product_data.get('qty'),
                'model': None,  
                'shipping_weight': None, 
                'shipping_length': None, 
                'shipping_width': None, 
                'shipping_height': None, 
            }

        elif vendor_name == 'ssi':
            return {
                'user': userid,
                'sku': product_data.get('sku'),
                'title': product_data.get('description'),
                'detailed_description': product_data.get('detaileddescription'),
                'image': product_data.get('imageurl'),
                'category': product_data.get('category'),
                'msrp': product_data.get('msrp'),
                'map': product_data.get('map'),
                'price': product_data.get('price'),
                'upc': product_data.get('upccode'),
                'brand': product_data.get('manufacturer'),
                'quantity': product_data.get('qty'),
                'model': product_data.get('mpn'),
                'dimensionh': product_data.get('dimensionh'),
                'dimensionl': product_data.get('dimensionl'),
                'dimensionw': product_data.get('dimensionw'),
                'shipping_weight': product_data.get('shippingweight'),
                'shipping_length': product_data.get('shippinglength'),
                'shipping_width': product_data.get('shippingwidth'),
                'shipping_height': product_data.get('shippingheight'),
            }
        elif vendor_name == 'zanders':
            return {
                'user': userid,
                'sku': product_data.get('itemnumber'),
                'quantity': product_data.get('qty1'),
                'upc': product_data.get('upc'),
                'title': product_data.get('desc1'),
                'detailed_description': product_data.get('desc2'),
                'image': product_data.get('imagelink'),
                'category': product_data.get('category'),
                'msrp': product_data.get('msrp'),
                'mpn': product_data.get('mfgpnumber'),
                'map': product_data.get('mapprice'),
                'price': product_data.get('price1'),
                'brand': product_data.get('manufacturer'),
                'shipping_weight': product_data.get('weight'),
            }
        else:
            return {}


class ViewAllProducts(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, userid):
        all_products = Generalproducttable.objects.filter(user_id = userid)
        serializer = GeneralProductSerializer(all_products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
