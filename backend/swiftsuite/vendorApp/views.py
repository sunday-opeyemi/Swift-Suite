from django.shortcuts import render
from ftplib import FTP
import time, os
import csv
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import VendoEnronment
from .serializers import VendoEnronmentSerializer, VendorEnrolmentTestSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Fragrancex, Lipsey, Ssi, Cwr, Zanders
from rest_framework.generics import GenericAPIView
from rest_framework.serializers import ModelSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from asgiref.sync import sync_to_async
import asyncio
from django.contrib.auth.decorators import login_required, user_passes_test
from django.views.decorators.http import require_http_methods

# Create your views here.
supplier_name = ''
index = 0
supplier_file = ''
data = ''
def download_csv_from_ftp(ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir="."):
    """Download CSV file from FTP server."""
    global data
    try:
        if not os.path.exists(os.path.join(local_dir, file_name)):
            with FTP(ftp_host) as ftp:
                ftp.login(user=ftp_user, passwd=ftp_password)
                ftp.set_pasv(True)
                ftp.cwd(ftp_path)
                with open(os.path.join(local_dir, file_name), "wb") as local_file:
                    ftp.retrbinary(f"RETR {file_name}", local_file.write)

        print(f"{file_name} downloaded from FTP for {ftp_user}.")
        with open(os.path.join(local_dir, file_name), "r", encoding='latin1') as file:
            csv_data = csv.DictReader(file)
            print(csv_data, supplier_name)
            
            insert_data = []
            if supplier_name == "FragranceX":
                items = []
                for row in csv_data:
                    items.append(row)
                    
                data = pd.DataFrame(items)
                data = data[data['ItemType'] == 'Firearm']
                data = data[data['Quantity'] > '22']
                for row in data.iterrows():
                    row = row[1]
                    insert_data.append(Fragrancex(user_id=request.user.id, name=row["NAME"], item=row["ITEM"], description=row["DESCRIPTION"], brand=row["BRAND"], title=row["TITLE"], gender=row["GENDER"], size=row["Size"], metric_size=row["Metric_Size"], retail=row["RETAIL"], price=row["PRICE"], eur_price=row["EUR_PRICE"],gbp_price=row["GBP_PRICE"], cad_price=row["CAD_PRICE"], aud_price=row["AUD_PRICE"], image=row["IMAGE"], url=row["URL"], qty=row["QTY"], upc=row["UPC"]))

                Fragrancex.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["size", "price", "qty"])
                print('FrangranceX upload successfully')
                
            elif supplier_name == "Lipsey":
                items = []
                for row in csv_data:
                    items.append(row)
                    
                data = pd.DataFrame(items)
                data = data[data['ItemType']=='Firearm']
                data = data[data['Quantity']>'22']
                for row in data.iterrows():
                    row = row[1]
                    insert_data.append(Lipsey(user_id=request.user.id, itemnumber=row["ItemNo"], description1=row["Description1"], description2=row["Description2"], 
                        upc=row["Upc"], manufacturermodelno=row["ManufacturerModelNo"], msrp=row["Msrp"], 
                        model=row["Model"], calibergauge=row["CaliberGauge"], manufacturer=row["Manufacturer"], 
                        type=row["Type"], action=row["Action"], barrellength=row["BarrelLength"], 
                        capacity=row["Capacity"], finish=row["Finish"], overalllength =row["OverallLength"], 
                        receiver=row["Receiver"], safety=row["Safety"], sights=row["Sights"], stockframegrips=row["StockFrameGrips"], magazine=row["Magazine"], weight=row["Weight"], imagename=row["ImageName"], chamber=row["Chamber"], drilledandtapped=row["DrilledAndTapped"], rateoftwist=row["RateOfTwist"], itemtype=row["ItemType"], additionalfeature1=row["AdditionalFeature1"], additionalfeature2=row["AdditionalFeature2"], additionalfeature3=row["AdditionalFeature3"], shippingweight=row["ShippingWeight"], boundbookmanufacturer=row["BoundBookManufacturer"], boundbookmodel=row["BoundBookModel"], boundbooktype=row["BoundBookType"], nfathreadpattern=row["NfaThreadPattern"], nfaattachmentmethod=row["NfaAttachmentMethod"], nfabaffletype=row["NfaBaffleType"], silencercanbedisassembled=row["SilencerCanBeDisassembled"], silencerconstructionmaterial=row["SilencerConstructionMaterial"], nfadbreduction=row["NfaDbReduction"], silenceroutsidediameter=row["SilencerOutsideDiameter"], nfaform3caliber=row["NfaForm3Caliber"], opticmagnification=row["OpticMagnification"], maintubesize=row["MaintubeSize"], adjustableobjective=row["AdjustableObjective"], objectivesize=row["ObjectiveSize"], opticadjustments=row["OpticAdjustments"], illuminatedreticle=row["IlluminatedReticle"], reticle=row["Reticle"], exclusive=row["Exclusive"], quantity=row["Quantity"], allocated=row["Allocated"], onsale=row["OnSale"], price=row["Price"], currentprice=row["CurrentPrice"], retailmap=row["RetailMap"], fflrequired=row["FflRequired"], sotrequired=row["SotRequired"], exclusivetype=row["ExclusiveType"], scopecoverincluded=row["ScopeCoverIncluded"], special=row["Special"], sightstype=row["SightsType"], case=row["Case"], choke=row["Choke"], dbreduction=row["DbReduction"], family=row["Family"], finishtype=row["FinishType"], frame=row["Frame"], griptype=row["GripType"], handgunslidematerial=row["HandgunSlideMaterial"], countryoforigin=row["CountryOfOrigin"], itemlength=row["ItemLength"], itemwidth=row["ItemWidth"], itemheight=row["ItemHeight"], packagelength=row["PackageLength"], packagewidth=row["PackageWidth"], packageheight=row["PackageHeight"], itemgroup=row["ItemGroup"], ))
                
                Lipsey.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["onsale", "price", "currentprice"])
                print('Lipsey upload successfully')
                
            elif supplier_name == "SSI":
                items = []
                for row in csv_data:
                    header = str(row).split(":", 1)[0]
                    header = header.replace("{'", "").split("|")
                    item = str(row).split(":", 1)[1]
                    item = item.replace("]}", "").split("|")
                    items.append(item)
                    
                header[-1] = header[-1].replace("'", "")
                
                data = pd.DataFrame(items, columns=header)
                data = data[data['ItemType']=='Firearm']
                data = data[data['Quantity']>'22']
                
                for row in data.iterrows():
                    items = row[1].values
                    insert_data.append(Ssi(user_id=request.user.id, sku=items[0], description=items[1], datecreated=items[2], dimensionh=items[3], dimensionl=items[4], dimensionw=items[5], manufacturer=items[6], imageurl=items[7], thumbnailurl=items[8], upccode=items[9], weight=items[10], weightunits=items[11], category=items[12], subcategory=items[13], status=items[14], map=items[15], msrp=items[16], mpn=items[17], minimumorderquantity=items[18], detaileddescription=items[19], shippingweight=items[20], shippinglength=items[21], shippingwidth=items[22], shippingheight=items[23], attribute1=items[24], attribute2=items[25], attribute3=items[26], attribute4=items[27], attribute5=items[28], attribute6=items[29], attribute7=items[30], prop65warning=items[31], prop65reason=items[32], countryoforigin=items[33], groundshippingrequired=items[34]))

                Ssi.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["description", "status", "weight"])
                print('SSI upload successfully')
                    
            elif supplier_name == "CWR":
                items = []
                for row in csv_data:
                    items.append(row)
                    
                if index == 1:
                    data = pd.DataFrame(items)
                elif index == 2:
                    data2 = pd.DataFrame(items)
                    data = data.merge(data2, left_on="CWR Part Number", right_on="sku")    
                
                data = data[data['ItemType']=='Firearm']
                data = data[data['Quantity']>'22']    
                for row in data.iterrows():
                    items = row[1].values   
                    row = list(row.values())
                    insert_data.append(Cwr(user_id=request.user.id, cwr_part_number=items[0], manufacturer_part_number=items[1], upc_code=items[2], quantity_available_to_ship_combined=items[3], quantity_available_to_ship_nj=items[4], quantity_available_to_ship_fl=items[5], next_shipment_date_combined=items[6], next_shipment_date_nj=items[7], next_shipment_date_fl=items[8], your_cost=items[9], list_price=items[10], m_a_p_price=items[11], m_r_p_price=items[12], uppercase_title=items[13], title=items[14], full_description=items[15], category_id=items[16], category_name=items[17], manufacturer_name=items[18], shipping_weight=items[19], box_height=items[20], box_length=items[21], box_width=items[22], list_of_accessories_by_sku=items[23], list_of_accessories_by_mfg=items[24], quick_specs=items[29], hazardous_materials=items[30], truck_freight=items[31], exportable=items[32], first_class_mail=items[33], oversized=items[34], remanufactured=items[35], closeout=items[36], harmonization_code=items[37], country_of_origin=items[38], sale=items[39], original_price_if_on_sale_closeout=items[40], sale_start_date=items[41], sale_end_date=items[42], rebate=items[43], rebate_description=items[44], rebate_start_date=items[45], rebate_end_date=items[46], google_merchant_category=items[47], quick_guide_literature_pdf_url=items[48], owners_manual_pdf_url=items[49], brochure_literature_pdf_url=items[50], installation_guide_pdf_url=items[51], video_urls=items[52], prop_65=items[53], prop_65_description=items[54], free_shipping=items[55], free_shipping_end_date=items[56], returnable=items[57], image_additional_1000x1000_urls=items[58], case_qty_nj=items[59], case_qty_fl=items[60], number_3rd_party_marketplaces=items[61], fcc_id=items[62], sku=items[63], mfgn=items[64], qty=items[65], qtynj=items[66], qtyfl=items[67], price=items[68], map=items[69], mrp=items[70]))
                
                print(len(insert_data))
                Cwr.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["qty", "qtynj", "qtyfl", "price", "map", "mrp"])
                print('\nProduct Upload successful....')
                        
            elif supplier_name == "RSR Group":
                for row in csv_data:
                    pass
            elif supplier_name == "Zanders":  
                items = []
                itemNumber = []
                description = []
                for row in csv_data:
                    if index == 3:
                        itemNumber.append(str(row).split("~")[1].split(":")[1].replace("'", "").strip())
                        description.append(str(row).split("~")[2].replace("}", ""))
                    else:
                        items.append(row) 
                    
                data = data[data['ItemType']=='Firearm']
                data = data[data['Quantity']>'22']    
                for row in data.iterrows():
                    items = row[1]      
                    insert_data.append(Zanders(user_id=request.user.id, available=row['available'], category=row['category'], desc1=row['desc1'], desc2=row['desc2'], itemnumber=row['itemnumber'], manufacturer=row['manufacturer'], mfgpnumber=row['mfgpnumber'], msrp=row['msrp'], price1=row['price1'], price2=row['price2'], price3=row['price3'], qty1=row['qty1'], qty2=row['qty2'], qty3=row['qty3'], upc=row['upc'], weight=row['weight'], serialized=row['serialized'], mapprice=row['mapprice'], imagelink=row['ImageLink'], description=["description"]))       
                    
 
                print(len(insert_data))                  
                Zanders.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["price1", "price2", "price3"])
                print('\nProduct upload successful....')
                                      
    except Exception as e:
        print(f"Download {file_name} Error: {str(e)}")
        return e       

def process_supplier(supplier):
    """Process each supplier."""
    global supplier_name, index
    print(supplier)
    
    supplier_name, ftp_host, ftp_user, ftp_password, ftp_path, file_name, index = supplier
    local_dir = os.path.join("local_dir", supplier_name)
    supplier_name=supplier_name
    supplier_file = file_name
    os.makedirs(local_dir, exist_ok=True)
    download_csv_from_ftp(ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir)


def main(suppliers):
    for sub_supplier in suppliers:
        process_supplier(sub_supplier)

VENDORS = {
    "fragrancex":[
        ('Fragrancex', "ftp2.fragrancex.com", "frgx_temilolaoduola@gmail.com", "ftos3tpi", "/", "outgoingfeed_upc.csv", 1),
    ],

    "zanders":[
        ("Zanders", "http://ftp2.gzanders.com/", "DotfakGroup", "Katy801", "/Inventory", "itemimagelinks.csv", 1),
        ("Zanders", "http://ftp2.gzanders.com/", "DotfakGroup", "Katy801", "/Inventory", "zandersinv.csv", 2),
        ("Zanders", "http://ftp2.gzanders.com/", "DotfakGroup", "Katy801", "/Inventory", "detaildesctext.csv", 3),
    ],

    "lipsey":[
        ("Lipsey","ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "catalog.csv", 1),
    ],

    "ssi":[
        ("SSI","www.rapidretail.net", "ssi_dot774rr", "Rapid_774!", "/Products", "RR_Products.csv", 1),
    ],

    "cwr":[
        ("CWR", "edi.cwrdistribution.com", "421460", "QUwB6I1m", "/out", "catalog.csv", 1),
        ("CWR", "edi.cwrdistribution.com", "421460", "QUwB6I1m",  "/out", "inventory.csv", 2)
    ],

    "rsr":[
        ("RSR", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsrinventory-keydlr-new.txt", 1),
        ("RSR", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "product_sell_descriptions.txt", 2),
        ("RSR", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "IM-QTY-CSV.csv", 3),
        ("RSR", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsr-product-message.txt", 4),
    ]

}


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@user_passes_test(lambda u: u.is_staff)
def admin_pull(request, vendor):
    vendor = vendor.lower()
    if vendor in [x for x in  VENDORS.keys()]:
        try:
            suppliers = VENDORS[vendor]
            val = main(suppliers)
            return JsonResponse({'Status': 'Done'}, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Error occurred: {e}")
            return JsonResponse({'Error': e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return JsonResponse({'Error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VendorEnrolmentTestView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = VendorEnrolmentTestSerializer(data=request.data)
        serializer.is_valid()
        vendor = serializer.data
        ftp_host = vendor['host']
        ftp_user = vendor['ftp_username']
        ftp_password = vendor['ftp_password']

        try:
            with FTP(ftp_host) as ftp:
                login = ftp.login(user=ftp_user, passwd=ftp_password)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

class VendoEnronmentView(APIView):
    permission_classes = [IsAuthenticated]

    VENDOR_FLAGS = {
    'fragrancex': 'has_fragrancex',
    'zanders': 'has_zanders',
    'rsr': 'has_rsr',
    'cwr': 'has_cwr',
    'lipsey': 'has_lipsey',
    'ssi': 'has_ssi',
    }

    def get(self, request):
        vendo_enronments = VendoEnronment.objects.filter(user_id = request.user.id)
        serializer = VendoEnronmentSerializer(vendo_enronments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = VendoEnronmentSerializer(data=request.data, context = {'request':request})
        if serializer.is_valid():
            validated_data = serializer.validated_data
            vendor_name = validated_data.get('vendor_name', '').lower()
            # Update flags based on vendor name
            for vendor, flag in self.VENDOR_FLAGS.items():
                if vendor_name == vendor:
                    validated_data[flag] = True
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CatalogueBaseView(APIView):
    permission_classes = [IsAuthenticated]
    model = None  # Subclasses must override this
    vendor_name = ''

    def get_queryset(self, user_id):
        return self.model.objects.all().values()

    def get(self, request, pk):
        try:
            user = VendoEnronment.objects.get(user_id=pk, vendor_name = self.vendor_name)
            if getattr(user, f'has_{self.model._meta.object_name.lower()}'):
                queryset = self.get_queryset(pk)
                return JsonResponse(list(queryset), safe=False)
            else:
                return JsonResponse({"message": f"User does not have {self.model._meta.object_name} access"}, status=status.HTTP_403_FORBIDDEN)
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
