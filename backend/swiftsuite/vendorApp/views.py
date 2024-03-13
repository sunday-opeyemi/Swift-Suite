from django.shortcuts import render
from ftplib import FTP
import time, os
import csv
from .models import Fragrancex, Lipsey
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import VendoEnronment
from .serializers import VendoEnronmentSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Fragrancex, Lipsey, Ssi, Cwr, Zanders

# Create your views here.
# supplier_name
index = 0
def download_csv_from_ftp(userid,ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir="."):
    """Download CSV file from FTP server."""
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
            insert_data = []
            if supplier_name == "Fragrancex":
                for row in csv_data:
                    insert_data.append(Fragrancex(user_id=userid, name=row["NAME"], item=row["ITEM"], description=row["DESCRIPTION"], brand=row["BRAND"], title=row["TITLE"], gender=row["GENDER"], size=row["Size"], metric_size=row["Metric_Size"], retail=row["RETAIL"], price=row["PRICE"], eur_price=row["EUR_PRICE"],gbp_price=row["GBP_PRICE"], cad_price=row["CAD_PRICE"], aud_price=row["AUD_PRICE"], image=row["IMAGE"], url=row["URL"], qty=row["QTY"], upc=row["UPC"]))
                Fragrancex.objects.bulk_create(insert_data)
                
            elif supplier_name == "Lipsey":
                for row in csv_data:
                    insert_data.append(Lipsey(user_id=userid,itemnumber=row["ItemNo"], description1=row["Description1"], description2=row["Description2"], 
                        upc=row["Upc"], manufacturermodelno=row["ManufacturerModelNo"], msrp=row["Msrp"], 
                        model=row["Model"], calibergauge=row["CaliberGauge"], manufacturer=row["Manufacturer"], 
                        type=row["Semi-Auto Pistol"], action=row["Action"],barrelLength=row["BarrelLength"], 
                        capacity=row["Capacity"], finish=row["Finish"], overallLength=row["OverallLength"], 
                        receiver=row["Receiver"], safety=row["Safety"], sights=row["Sights"], stockframegrips=row["stockFrameGrips"], magazine=row["Magazine"], weight=row["Weight"], imageName=row["ImageName"], chamber=row["Chamber"], drilledandtapped=row["ChamberAndTapped"], rateoftwist=row["RateOfTwist"], itemtype=row["ItemType"], additionalfeature1=row["AdditionalFeature1"], additionalfeature2=row["AdditionalFeature2"], additionalfeature3=row["AdditionalFeature3"], shippingweight=row["ShippingWeight"], boundbookmanufacturer=row["BoundBookManufacturer"], boundbookmodel=row["BoundBookModel"], boundbooktype=row["BoundBookType"], nfathreadpattern=row["NfaThreadPattern"], nfaattachmentmethod=row["NfaAttachmentMethod"], nfabaffletype=row["NfaBaffleType"], silencercanbedisassembled=row["SilencerCanBeDisassembled"], silencerconstructionmaterial=row["SilencerConstructionMaterial"], nfadbreduction=row["NfaDbReduction"], silenceroutsidediameter=row["SilencerOutsideDiameter"], nfaform3caliber=row["NfaForm3Caliber"], opticmagnification=row["OpticMagnification"], maintubeSize=row["MaintubeSize"], adjustableobjective=row["AdjustableObjective"], objectivesize=row["ObjectiveSize"], opticadjustments=row["OpticAdjustments"], illuminatedreticle=row["IlluminatedReticle"], reticle=row["Reticle"], exclusive=row["Exclusive"], quantity=row["Quantity"], allocated=row["Allocated"], onsale=row["OnSale"], price=row["Price"], currentprice=row["CurrentPrice"], retailmap=row["RetailMap"], fflrequired=row["FflRequired"], sotrequired=row["SotRequired"], exclusivetype=row["ExclusiveType"], scopecoverincluded=row["ScopeCoverIncluded"], special=row["Special"], sightstype=row["SightsType"], case=row["Case"], choke=row["Choke"], dbreduction=row["DbReduction"], family=row["Family"], finishtype=row["FinishType"], frame=row["Frame"], griptype=row["GiftType"], handgunslidematerial=row["HandgunSlideMaterial"], countryoforigin=row["CountryOfOrigin"], itemlength=row["ItemLength"], itemwidth=row["ItemWidth"], itemheight=row["ItemHeight"], packagelength=row["PackageLength"], packagewidth=row["PackageWidth"], packageheight=row["PackageHeight"], itemgroup=row["ItemGroup"], ))
                Lipsey.objects.bulk_create(insert_data)
                
            elif supplier_name == "SSI":
                for row in csv_data:
                    items = str(row).split(":", 1)[1]
                    items = items.replace("]}", "").split("|")
                    insert_data.append(Ssi(user_id=userid, sku=items[0], description=items[1], datecreated=items[2], dimensionh=items[3], dimensionl=items[4], dimensionw=items[5], manufacturer=items[6], imageurl=items[7], thumbnailurl=items[8], upccode=items[9], weight=items[10], weightunits=items[11], category=items[12], subcategory=items[13], status=items[14], map=items[15], msrp=items[16], mpn=items[17], minimumorderquantity=items[18], detaileddescription=items[19], shippingweight=items[20], shippinglength=items[21], shippingwidth=items[22], shippingheight=items[23], attribute1=items[24], attribute2=items[25], attribute3=items[26], attribute4=items[27], attribute5=items[28], feature_6=items[29], attribute7=items[30], prop65warning=items[31], prop65reason=items[32], countryoforigin=items[33], groundshippingrequired=items[34]))
                Ssi.objects.bulk_create(insert_data)       
            elif supplier_name == "CWR":
                items = []
                other_items = []
                for row in csv_data:
                    if index == 1:
                        items.append(list(row.values()))
                    elif index == 2:
                        other_items.append(list(row.values()))
                for data, ind in enumerate(items):
                    insert_data.append(Cwr(user_id=userid, cwr_part_number=data[0], manufacturer_part_number=data[1], upc_code=data[2], quantity_available_to_ship_combined=data[3], quantity_available_to_ship_nj=data[4], quantity_available_to_ship_fl=data[5], next_shipment_date_combined=data[6], next_shipment_date_nj=data[7], next_shipment_date_fl=data[8], your_cost=data[9], list_price=data[10], m_a_p_price=data[11], m_r_p_price=data[12], uppercase_title=data[13], title=data[14], full_description=data[15], category_id=data[16], category_name=data[17], manufacturer_name=data[18], shipping_weight=data[19], box_height=data[20], box_length=data[21], box_width=data[22], list_of_accessories_by_sku=data[23], list_of_accessories_by_mfg=data[24], quick_specs=data[25], image_300x300_url=data[26], image_1000x1000_url=data[27], non_stock=data[28], drop_ships_direct_from_vendor=data[29], hazardous_materials=data[30], truck_freight=data[31], exportable=data[32], first_class_mail=data[33], oversized=data[34], remanufactured=data[35], closeout=data[36], harmonization_code=data[37], country_of_origin=data[38], sale=data[39], original_price_if_on_sale_closeout=data[40], sale_start_date=data[41], sale_end_date=data[42], rebate=data[43], rebate_description=data[44], rebate_start_date=data[45], rebate_end_date=data[46], google_merchant_category=data[47], quick_guide_literature_pdf_url=data[48], owners_manual_pdf_url=data[49], brochure_literature_pdf_url=data[50], installation_guide_pdf_url=data[51], video_urls=data[52], prop_65=data[53], prop_65_description=data[54], free_shipping=data[55], free_shipping_end_date=data[56], returnable=data[57], image_additional_1000x1000_urls=data[58], case_qty_nj=data[59], case_qty_fl=data[60], number_3rd_party_marketplaces=data[61], fcc_id=data[62], sku=other_items[ind][0], mfgn=other_items[ind][1], qty=other_items[ind][2], qtynj=other_items[ind][3], qtyfl=other_items[ind][4], price=other_items[ind][5], map=other_items[ind][6], mrp=other_items[ind][7]))
                Cwr.objects.bulk_create(insert_data)
            elif supplier_name == "RSR":
                for row in csv_data:
                    pass
            elif supplier_name == "Zanders":
                items = []
                items2 = []
                items3 = []
                for row in csv_data:
                    if index == 1:
                        items.append(list(row.values()))
                    elif index == 2:
                        items2.append(list(row.values()))
                    elif index == 3:
                        items3.append(list(row.values()))
                for ind, data in enumerate(items):
                    insert_data.append(Cwr(user_id=request.user.id, available=data['available'], category=data['category'], desc1=data['desc1'], desc2=data['desc2'], itemnumber=data['itemnumber'], manufacturer=data['manufacturer'], mfgpnumber=data['mfgpnumber'], msrp=data['msrp'], price1=data['price1'], price2=data['price2'], price3=data['price3'], qty1=data['qty1'], qty2=data['qty2'], qty3=data['qty3'], upc=data['upc'], weight=data['weight'], serialized=data['serialized'], mapprice=data['mapprice'], ImageLink=items2[ind]['ImageLink'], ItemNumberDescription=items3[ind]['ItemNumberDescription']))
                Zanders.objects.bulk_create(insert_data)
    except Exception as e:
        print(f"Download {file_name} Error: {str(e)}")

def process_supplier(supplier):
    """Process each supplier."""
    global supplier_name
    supplier_name, ftp_host, ftp_user, ftp_password, ftp_path, file_name = supplier
    local_dir = os.path.join("local_dir", supplier_name)
    supplier_name=supplier_name
    os.makedirs(local_dir, exist_ok=True)
    download_csv_from_ftp(ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir)

suppliers = [
    # [("FragranceX", "ftp2.fragrancex.com", "frgx_temilolaoduola@gmail.com", "ftos3tpi", "/", "outgoingfeed_upc.csv", 1)],
    # [("Lipsey", "ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "catalog.csv", 1),]
    # [("SSI", "www.rapidretail.net", "ssi_dot774rr", "Rapid_774!", "/Products", "RR_Products.csv", 1),]
    # [("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsrinventory-keydlr-new.txt"),
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "product_sell_descriptions.txt"),]
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "IM-QTY-CSV.csv"),
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsr-product-message.txt"),
    # [("Zanders", "ftp2.gzanders.com", "DotfakGroup", "password_here", "/Inventory", "itemimagelinks.csv", 1),
    # ("Zanders", "ftp2.gzanders.com", "DotfakGroup", "password_here", "/Inventory", "zandersinv.csv", 2),
    # ("Zanders", "ftp2.gzanders.com", "DotfakGroup", "password_here", "/Inventory", "detaildesctext.csv", 3),]
    # [("CWR", "edi.cwrdistribution.com", "421460", "password_here", "/out", "catalog.csv", 1),
    # ("CWR", "edi.cwrdistribution.com", "421460", "password_here", "/out", "inventory.csv", 2)]
]

update_file = [
    # ("Lipsey", "ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "pricingquantity.csv", 2)],
    # ("SSI", "www.rapidretail.net", "ssi_dot774rr", "Rapid_774!", "/Pricing-Availability", "RR_Pricing_Availability.csv", 2)],
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsr-ship-restrictions.txt"),
    # ("RSR Group", "ftp.rsrgroup.com", "49554", "aFsBCwSF", "/keydealer", "rsrdeletedinv.txt"),
    # ("Zanders", "ftp2.gzanders.com", "DotfakGroup", "password_here", "/Inventory", "liveinv.csv"),
    # ("Zanders", "ftp2.gzanders.com", "DotfakGroup", "password_here", "/Inventory", "iteminfo2.csv"),
]


def main():
    while True:
        for sub_supplier in suppliers:
            process_supplier(sub_supplier)
        time.sleep(3600)

class VendoEnronmentListView(APIView):
    
    permission_classes = [IsAuthenticated]
    def get(self, request):
        print(request.user.id)
        vendo_enronments = VendoEnronment.objects.filter(user_id = request.user)
        if vendo_enronments:
            print(vendo_enronments)
        else:
            print('\nNot available\n')
        serializer = VendoEnronmentSerializer(vendo_enronments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = VendoEnronmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VendoEnronmentDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        vendo_enronment = get_object_or_404(VendoEnronment, user_id=pk)
        serializer = VendoEnronmentSerializer(vendo_enronment)
        return Response(serializer.data)

    def put(self, request, pk):
        vendo_enronment = get_object_or_404(VendoEnronment, user_id=pk)
        serializer = VendoEnronmentSerializer(vendo_enronment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        vendo_enronment = get_object_or_404(VendoEnronment, user_id=pk)
        vendo_enronment.delete()
        return Response({'message': 'VendoEnronment deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)