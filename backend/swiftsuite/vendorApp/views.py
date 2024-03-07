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

# Create your views here.

def download_csv_from_ftp(userid, ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir=".",):
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
                    insert_data.append(Lipsey(user_id=userid, itemnumber=row["itemnumber"], name=row["NAME"], description=row["DESCRIPTION"], 
                        brand=row["BRAND"], title=row["TITLE"], gender=row["GENDER"], 
                        size=row["Size"], metric_size=row["Metric_Size"], retail=row["RETAIL"], 
                        price=row["PRICE"], eur_price=row["EUR_PRICE"],gbp_price=row["GBP_PRICE"], 
                        cad_price=row["CAD_PRICE"], aud_price=row["AUD_PRICE"], image=row["IMAGE"], 
                        url=row["URL"], qty=row["QTY"], upc=row["UPC"]))
                Fragrancex.objects.bulk_create(insert_data)
            elif supplier_name == "SSI":
                for row in csv_data:
                    pass
            elif supplier_name == "CWR":
                for row in csv_data:
                    pass
            elif supplier_name == "RSR":
                for row in csv_data:
                    pass
            elif supplier_name == "Zanders":
                for row in csv_data:
                    pass
    except Exception as e:
        print(f"Download {file_name} Error: {str(e)}")

def process_supplier(supplier):
    """Process each supplier."""
    global supplier_name
    supplier_name, ftp_host, ftp_user, ftp_password, ftp_path, file_name = supplier
    local_dir = os.path.join("local_dir", supplier_name)
    supplier_name=supplier_name
    os.makedirs(local_dir, exist_ok=True)
    # download_csv_from_ftp(ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir)

# supplier = ("FragranceX", "ftp2.fragrancex.com", "frgx_temilolaoduola@gmail.com", "ftos3tpi", "/", "outgoingfeed_upc.csv"),

def main(supplier):
    while True:
        process_supplier(supplier)
        time.sleep(3600)

class VendoEnronmentListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        vendo_enronments = VendoEnronment.objects.all().filter(user_id = request.user.id)
        serializer = VendoEnronmentSerializer(vendo_enronments, many=True)
        return Response(serializer.data)

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
        vendo_enronment = get_object_or_404(VendoEnronment, pk=pk)
        serializer = VendoEnronmentSerializer(vendo_enronment)
        return Response(serializer.data)

    def put(self, request, pk):
        vendo_enronment = get_object_or_404(VendoEnronment, pk=pk)
        serializer = VendoEnronmentSerializer(vendo_enronment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        vendo_enronment = get_object_or_404(VendoEnronment, pk=pk)
        vendo_enronment.delete()
        return Response({'message': 'VendoEnronment deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)