from django.shortcuts import render
from ftplib import FTP
import time, os
import csv
from .models import Fragrancex

# Create your views here.

def download_csv_from_ftp(ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir="."):
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
            for row in csv_data:
                insert_data.append(Fragrancex(item=row["ITEM"], name=row["NAME"], description=row["DESCRIPTION"], 
                    brand=row["BRAND"], title=row["TITLE"], gender=row["GENDER"], 
                    size=row["Size"], metric_size=row["Metric_Size"], retail=row["RETAIL"], 
                    price=row["PRICE"], eur_price=row["EUR_PRICE"],gbp_price=row["GBP_PRICE"], 
                    cad_price=row["CAD_PRICE"], aud_price=row["AUD_PRICE"], image=row["IMAGE"], 
                    url=row["URL"], qty=row["QTY"], upc=row["UPC"]))
            Fragrancex.objects.bulk_create(insert_data)
                
    except Exception as e:
        print(f"Download {file_name} Error: {str(e)}")

def process_supplier(supplier):
    """Process each supplier."""
    supplier_name, ftp_host, ftp_user, ftp_password, ftp_path, file_name = supplier
    local_dir = os.path.join("local_dir", supplier_name)
    os.makedirs(local_dir, exist_ok=True)
    download_csv_from_ftp(ftp_host, ftp_user, ftp_password, ftp_path, file_name, local_dir)

suppliers = [
    ("FragranceX", "ftp2.fragrancex.com", "frgx_temilolaoduola@gmail.com", "ftos3tpi", "/", "outgoingfeed_upc.csv"),
    # ("Lipsey", "ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "catalog.csv"),
    # ("Lipsey", "ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "accessoriespricingquantity.csv"),
    # ("Lipsey", "ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "pricingquantity.csv"),
    # ("Lipsey", "ftp.lipseysdistribution.net", "cat800459", "8b4c531467417ad97e5274d5ecfbc0eb", "/", "accessoriescatalog.csv"),
    # ("SSI", "www.rapidretail.net", "ssi_dot774rr", "Rapid_774!", "/Products", "RR_Products.csv"),
    # ("SSI", "www.rapidretail.net", "ssi_dot774rr", "Rapid_774!", "/Pricing-Availability", "RR_Pricing_Availability.csv"),
]

def main():
    while True:
        for supplier in suppliers:
            process_supplier(supplier)
        time.sleep(3600)
