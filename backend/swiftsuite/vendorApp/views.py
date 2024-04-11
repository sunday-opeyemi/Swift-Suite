from django.shortcuts import render
from ftplib import FTP
import time, os
import csv
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
def download_csv_from_ftp(ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir="."):
    """Download CSV file from FTP server."""
    global insert_data_reload
    try:
        with FTP(ftp_host) as ftp:
            ftp.login(user=ftp_user, passwd=ftp_password)
            ftp.set_pasv(True)
            ftp.cwd(ftp_path)
            with open(os.path.join(local_dir, file_name), "wb") as local_file:
                ftp.retrbinary(f"RETR {file_name}", local_file.write)

        print(f"{file_name} downloaded from FTP for {ftp_user}.")
        with open(os.path.join(local_dir, file_name), "r", encoding='utf-8') as file:
            csv_data = csv.DictReader(file)
            print(csv_data, supplier_name)
            insert_data = []
            if supplier_name == "FragranceX":
                for row in csv_data:
                    insert_data.append(Fragrancex(name=row["NAME"], item=row["ITEM"], description=row["DESCRIPTION"], brand=row["BRAND"], title=row["TITLE"], gender=row["GENDER"], size=row["Size"], metric_size=row["Metric_Size"], retail=row["RETAIL"], price=row["PRICE"], eur_price=row["EUR_PRICE"],gbp_price=row["GBP_PRICE"], cad_price=row["CAD_PRICE"], aud_price=row["AUD_PRICE"], image=row["IMAGE"], url=row["URL"], qty=row["QTY"], upc=row["UPC"]))

                Fragrancex.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["size", "price", "qty"])
                print('FrangranceX upload successfully')
                
            elif supplier_name == "Lipsey":
                for row in csv_data:
                    insert_data.append(Lipsey(itemnumber=row["ItemNo"], description1=row["Description1"], description2=row["Description2"], 
                        upc=row["Upc"], manufacturermodelno=row["ManufacturerModelNo"], msrp=row["Msrp"], 
                        model=row["Model"], calibergauge=row["CaliberGauge"], manufacturer=row["Manufacturer"], 
                        type=row["Type"], action=row["Action"], barrellength=row["BarrelLength"], 
                        capacity=row["Capacity"], finish=row["Finish"], overalllength =row["OverallLength"], 
                        receiver=row["Receiver"], safety=row["Safety"], sights=row["Sights"], stockframegrips=row["StockFrameGrips"], magazine=row["Magazine"], weight=row["Weight"], imagename=row["ImageName"], chamber=row["Chamber"], drilledandtapped=row["DrilledAndTapped"], rateoftwist=row["RateOfTwist"], itemtype=row["ItemType"], additionalfeature1=row["AdditionalFeature1"], additionalfeature2=row["AdditionalFeature2"], additionalfeature3=row["AdditionalFeature3"], shippingweight=row["ShippingWeight"], boundbookmanufacturer=row["BoundBookManufacturer"], boundbookmodel=row["BoundBookModel"], boundbooktype=row["BoundBookType"], nfathreadpattern=row["NfaThreadPattern"], nfaattachmentmethod=row["NfaAttachmentMethod"], nfabaffletype=row["NfaBaffleType"], silencercanbedisassembled=row["SilencerCanBeDisassembled"], silencerconstructionmaterial=row["SilencerConstructionMaterial"], nfadbreduction=row["NfaDbReduction"], silenceroutsidediameter=row["SilencerOutsideDiameter"], nfaform3caliber=row["NfaForm3Caliber"], opticmagnification=row["OpticMagnification"], maintubesize=row["MaintubeSize"], adjustableobjective=row["AdjustableObjective"], objectivesize=row["ObjectiveSize"], opticadjustments=row["OpticAdjustments"], illuminatedreticle=row["IlluminatedReticle"], reticle=row["Reticle"], exclusive=row["Exclusive"], quantity=row["Quantity"], allocated=row["Allocated"], onsale=row["OnSale"], price=row["Price"], currentprice=row["CurrentPrice"], retailmap=row["RetailMap"], fflrequired=row["FflRequired"], sotrequired=row["SotRequired"], exclusivetype=row["ExclusiveType"], scopecoverincluded=row["ScopeCoverIncluded"], special=row["Special"], sightstype=row["SightsType"], case=row["Case"], choke=row["Choke"], dbreduction=row["DbReduction"], family=row["Family"], finishtype=row["FinishType"], frame=row["Frame"], griptype=row["GripType"], handgunslidematerial=row["HandgunSlideMaterial"], countryoforigin=row["CountryOfOrigin"], itemlength=row["ItemLength"], itemwidth=row["ItemWidth"], itemheight=row["ItemHeight"], packagelength=row["PackageLength"], packagewidth=row["PackageWidth"], packageheight=row["PackageHeight"], itemgroup=row["ItemGroup"], ))
                
                Lipsey.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["onsale", "price", "currentprice"])
                print('Lipsey upload successfully')
                
            elif supplier_name == "SSI":
                for row in csv_data:
                    items = str(row).split(":", 1)[1]
                    items = items.replace("]}", "").split("|")
                    insert_data.append(Ssi(sku=items[0], description=items[1], datecreated=items[2], dimensionh=items[3], dimensionl=items[4], dimensionw=items[5], manufacturer=items[6], imageurl=items[7], thumbnailurl=items[8], upccode=items[9], weight=items[10], weightunits=items[11], category=items[12], subcategory=items[13], status=items[14], map=items[15], msrp=items[16], mpn=items[17], minimumorderquantity=items[18], detaileddescription=items[19], shippingweight=items[20], shippinglength=items[21], shippingwidth=items[22], shippingheight=items[23], attribute1=items[24], attribute2=items[25], attribute3=items[26], attribute4=items[27], attribute5=items[28], attribute6=items[29], attribute7=items[30], prop65warning=items[31], prop65reason=items[32], countryoforigin=items[33], groundshippingrequired=items[34]))

                Ssi.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["description", "status", "weight"])
                print('SSI upload successfully')
                    
            elif supplier_name == "CWR":
                items = []
                for row in csv_data:
                    if index == 1:
                        # items.append(list(row.values()))
                        row = list(row.values())
                        insert_data.append(Cwr(cwr_part_number=row[0], manufacturer_part_number=row[1], upc_code=row[2], quantity_available_to_ship_combined=row[3], quantity_available_to_ship_nj=row[4], quantity_available_to_ship_fl=row[5], next_shipment_date_combined=row[6], next_shipment_date_nj=row[7], next_shipment_date_fl=row[8], your_cost=row[9], list_price=row[10], m_a_p_price=row[11], m_r_p_price=row[12], uppercase_title=row[13], title=row[14], full_description=row[15], category_id=row[16], category_name=row[17], manufacturer_name=row[18], shipping_weight=row[19], box_height=row[20], box_length=row[21], box_width=row[22], list_of_accessories_by_sku=row[23], list_of_accessories_by_mfg=row[24], quick_specs=row[25], image_300x300_url=row[26], image_1000x1000_url=row[27], non_stock=row[28], drop_ships_direct_from_vendor=row[29], hazardous_materials=row[30], truck_freight=row[31], exportable=row[32], first_class_mail=row[33], oversized=row[34], remanufactured=row[35], closeout=row[36], harmonization_code=row[37], country_of_origin=row[38], sale=row[39], original_price_if_on_sale_closeout=row[40], sale_start_date=row[41], sale_end_date=row[42], rebate=row[43], rebate_description=row[44], rebate_start_date=row[45], rebate_end_date=row[46], google_merchant_category=row[47], quick_guide_literature_pdf_url=row[48], owners_manual_pdf_url=row[49], brochure_literature_pdf_url=row[50], installation_guide_pdf_url=row[51], video_urls=row[52], prop_65=row[53], prop_65_description=row[54], free_shipping=row[55], free_shipping_end_date=row[56], returnable=row[57], image_additional_1000x1000_urls=row[58], case_qty_nj=row[59], case_qty_fl=row[60], number_3rd_party_marketplaces=row[61], fcc_id=row[62]))
                    elif index == 2:
                        # items.append(list(row.values()))
                        row = list(row.values())
                        insert_data.append(Cwr(cwr_part_number=row[0], sku=row[0], mfgn=row[1], qty=row[2], qtynj=row[3], qtyfl=row[4], price=row[5], map=row[6], mrp=row[7]))
                
                if index == 1:
                    print(len(insert_data))
                    Cwr.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["non_stock", "exportable", "prop_65_description"])
                    print('\nProduct Upload successful....')
                elif index == 2:
                    print(len(insert_data))
                    Cwr.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["sku", "mfgn", "qty", "qtynj", "qtyfl", "price", "map", "mrp"])
                    
                    print('\nOther items Upload successful....')
                        
            elif supplier_name == "RSR Group":
                for row in csv_data:
                    pass
            elif supplier_name == "Zanders": 
                insert_data = []   
                for row in csv_data:    
                    if index == 1:
                        insert_data.append(Zanders(available=row['available'], category=row['category'], desc1=row['desc1'], desc2=row['desc2'], itemnumber=row['itemnumber'], manufacturer=row['manufacturer'], mfgpnumber=row['mfgpnumber'], msrp=row['msrp'], price1=row['price1'], price2=row['price2'], price3=row['price3'], qty1=row['qty1'], qty2=row['qty2'], qty3=row['qty3'], upc=row['upc'], weight=row['weight'], serialized=row['serialized'], mapprice=row['mapprice']))       
                    elif index == 2:
                        insert_data.append(Zanders(itemnumber=row["ItemNumber"], imagelink=row['ImageLink']))                    
                    elif index == 3:
                        itemNumber =str(row).split("~")[1].split(":")[1]
                        description = str(row).split("~")[2].replace("}", "")
                        insert_data.append(Zanders(itemnumber=itemNumber, description=description))
                if index == 1: 
                    print(len(insert_data))                  
                    Zanders.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["price1", "price2", "price3"])
                    print('\nProduct upload successful....')
                            
                elif index == 2:  
                    print(len(insert_data))  
                    Zanders.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["imagelink"])
                    print('\nImage update successful....')
                        
                elif index == 3:
                    print(len(insert_data))                  
                    Zanders.objects.bulk_create(insert_data, batch_size=500, update_conflicts=True, update_fields=["description"])
                    print('\nDescription update successful....')          
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
    os.makedirs(local_dir, exist_ok=True)
    download_csv_from_ftp(ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir)

suppliers = [
    # ("FragranceX", "ftp2.fragrancex.com", "frgx_temilolaoduola@gmail.com", "ftos3tpi", "/", "outgoingfeed_upc.csv", 1),
    # ("Lipsey", "ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "catalog.csv", 1),
    # ("SSI", "www.rapidretail.net", "ssi_dot774rr", "Rapid_774!", "/Products", "RR_Products.csv", 1),
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsrinventory-keydlr-new.txt", 1),
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "product_sell_descriptions.txt", 2),
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "IM-QTY-CSV.csv", 3),
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsr-product-message.txt", 4),
    # ("Zanders", "ftp2.gzanders.com", "DotfakGroup", "Katy801", "/Inventory", "zandersinv.csv", 1),
    # ("Zanders", "ftp2.gzanders.com", "DotfakGroup", "Katy801", "/Inventory", "itemimagelinks.csv", 2),
    # ("Zanders", "ftp2.gzanders.com", "DotfakGroup", "Katy801", "/Inventory", "detaildesctext.csv", 3),
    # ("CWR", "edi.cwrdistribution.com", "421460", "QUwB6I1m", "/out", "catalog.csv", 1),
    # ("CWR", "edi.cwrdistribution.com", "421460", "QUwB6I1m", "/out", "inventory.csv", 2)
]

update_file = [
    # ("Lipsey", "ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "pricingquantity.csv", 2)],
    # ("SSI", "www.rapidretail.net", "ssi_dot774rr", "Rapid_774!", "/Pricing-Availability", "RR_Pricing_Availability.csv", 2)],
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsr-ship-restrictions.txt"),
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsrdeletedinv.txt"),
    # (ftp_name, ftp_host, ftp_user, ftp_password, "/Inventory", "liveinv.csv"),
    # (ftp_name, ftp_host, ftp_user, ftp_password, "/Inventory", "iteminfo2.csv"),
]


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
