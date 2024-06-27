from django.db import models
from accounts.models import User

# Create your models here.

class VendoEnronment(models.Model):
    vendor_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    vendor_name = models.CharField(max_length=30, unique=False, null=False)
    address_street1 = models.CharField(max_length=150, null=False, unique=False)
    address_street2 = models.CharField(max_length=150, null=True, unique=False)
    city = models.CharField(max_length=50, null=False, unique=False)
    state = models.CharField(max_length=50, null=False, unique=False)
    postal_code = models.CharField(max_length=50, null=False, unique=False)
    country = models.CharField(max_length=50, null=False, unique=False)
    ftp_username = models.CharField(max_length=50, null=True, unique=False)
    ftp_password = models.CharField(max_length=50, null=True, unique=False)
    ftp_url = models.CharField(max_length=255)
    file_urls = models.TextField()
    host = models.CharField(max_length=255)

    # Price options
    percentage_markup = models.TextField(blank=True, null=True)
    fixed_markup = models.TextField(blank=True, null=True)
    shipping_cost = models.IntegerField(blank=True, null=True)
    shipping_cost_average = models.BooleanField(default=False)
    stock_minimum = models.IntegerField(blank=True, null=True)
    stock_maximum = models.IntegerField(blank=True, null=True)
    update_inventory = models.BooleanField(default=False)
    send_orders = models.BooleanField(default=False)
    update_tracking = models.BooleanField(default=False)

    # Product Filters
    product_filter = models.TextField(blank=True, null=True)
    product_category = models.TextField(blank=True, null=True)
    brand = models.TextField(blank=True, null=True)
    manufacturer = models.TextField(blank=True, null=True)

    # Zander Field
    serialized = models.BooleanField(default=False)

    # CWR Fields
    truck_freight = models.BooleanField(default=False) 
    oversized = models.BooleanField(default=False)
    third_party_marketplaces = models.BooleanField(default=False)
    returnable = models.BooleanField(default=False)



class Cwr(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cwr_part_number = models.TextField(unique=True,  blank=True, null=True)
    manufacturer_part_number = models.TextField(blank=True, null=True)
    upc_code = models.TextField(blank=True, null=True)
    quantity_available_to_ship_combined = models.TextField(blank=True, null=True)
    quantity_available_to_ship_nj = models.TextField(blank=True, null=True)
    quantity_available_to_ship_fl = models.TextField(blank=True, null=True)
    next_shipment_date_combined = models.TextField(blank=True, null=True)
    next_shipment_date_nj = models.TextField(blank=True, null=True)
    next_shipment_date_fl = models.TextField(blank=True, null=True)
    your_cost = models.TextField(blank=True, null=True)
    list_price = models.TextField(blank=True, null=True)
    m_a_p_price = models.TextField(blank=True, null=True)
    m_r_p_price = models.TextField(blank=True, null=True)
    uppercase_title = models.TextField(db_column='Uppercase Title', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    title = models.TextField(db_column='Title', blank=True, null=True)  # Field name made lowercase.
    full_description = models.TextField(db_column='Full Description', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    category_id = models.TextField(blank=True, null=True)
    category_name = models.TextField(db_column='Category Name', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    manufacturer_name = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    shipping_weight = models.TextField(blank=True, null=True)
    box_height = models.TextField(blank=True, null=True)
    box_length = models.TextField(blank=True, null=True)
    box_width = models.TextField(blank=True, null=True)
    list_of_accessories_by_sku = models.TextField(db_column='List of Accessories by SKU', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    list_of_accessories_by_mfg = models.TextField(db_column='List of Accessories by MFG#', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it ended with '_'.
    quick_specs = models.TextField(db_column='Quick Specs', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    image_300x300_url = models.TextField(db_column='Image (300x300) Url', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    image_1000x1000_url = models.TextField(db_column='Image (1000x1000) Url', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    non_stock = models.TextField(blank=True, null=True)
    drop_ships_direct_from_vendor = models.TextField(blank=True, null=True)
    hazardous_materials = models.TextField(blank=True, null=True)
    truck_freight = models.BooleanField(blank=True, null=True)
    exportable = models.TextField(blank=True, null=True)
    first_class_mail = models.TextField(blank=True, null=True)
    oversized = models.BooleanField(blank=True, null=True)
    remanufactured = models.TextField(blank=True, null=True)
    closeout = models.TextField(blank=True, null=True)
    harmonization_code = models.TextField( blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    country_of_origin = models.TextField( blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sale = models.TextField(blank=True, null=True)
    original_price_if_on_sale_closeout = models.TextField(blank=True, null=True)
    sale_start_date = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sale_end_date = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    rebate = models.TextField(db_column='Rebate', blank=True, null=True)  # Field name made lowercase.
    rebate_description = models.TextField(db_column='Rebate Description', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    rebate_start_date = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    rebate_end_date = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    google_merchant_category = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    quick_guide_literature_pdf_url = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    owners_manual_pdf_url = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    brochure_literature_pdf_url = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    installation_guide_pdf_url = models.TextField(blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    video_urls = models.TextField(db_column='Video Urls', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    prop_65 = models.TextField(blank=True, null=True)
    prop_65_description = models.TextField(db_column='Prop 65 Description', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    free_shipping = models.TextField(blank=True, null=True)
    free_shipping_end_date = models.TextField(db_column='Free Shipping End Date', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    returnable = models.BooleanField(blank=True, null=True)
    image_additional_1000x1000_urls = models.TextField(db_column='Image Additional (1000x1000) Urls', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    case_qty_nj = models.TextField(blank=True, null=True)
    case_qty_fl = models.TextField(blank=True, null=True)
    number_3rd_party_marketplaces = models.BooleanField(db_column='3rd Party Marketplaces', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. Field renamed because it wasn't a valid Python identifier.
    fcc_id = models.TextField(db_column='FCC ID', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    sku = models.TextField(blank=True, null=True)
    mfgn = models.TextField(blank=True, null=True)
    qty = models.TextField(blank=True, null=True)
    qtynj = models.TextField(blank=True, null=True)
    qtyfl = models.TextField(blank=True, null=True)
    price = models.TextField(blank=True, null=True)
    map = models.TextField(blank=True, null=True)
    mrp = models.TextField(blank=True, null=True)

class Fragrancex(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.CharField(db_column='ITEM', max_length=255, blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='NAME', max_length=255, blank=True, null=True)  # Field name made lowercase.
    description = models.TextField(db_column='DESCRIPTION', blank=True, null=True)  # Field name made lowercase.
    brand = models.CharField(db_column='BRAND', max_length=255, blank=True, null=True)  # Field name made lowercase.
    title = models.CharField(db_column='TITLE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    gender = models.CharField(db_column='GENDER', max_length=255, blank=True, null=True)  # Field name made lowercase.
    size = models.CharField(db_column='SIZE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    metric_size = models.CharField(db_column='METRIC_SIZE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    retail = models.CharField(db_column='RETAIL', max_length=255, blank=True, null=True)  # Field name made lowercase.
    price = models.CharField(db_column='PRICE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    eur_price = models.CharField(db_column='EUR_PRICE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    gbp_price = models.CharField(db_column='GBP_PRICE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    cad_price = models.CharField(db_column='CAD_PRICE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    aud_price = models.CharField(db_column='AUD_PRICE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    image = models.CharField(db_column='IMAGE', max_length=255, blank=True, null=True)  # Field name made lowercase.
    url = models.CharField(db_column='URL', max_length=255, blank=True, null=True)  # Field name made lowercase.
    qty = models.CharField(db_column='QTY', max_length=255, blank=True, null=True)  # Field name made lowercase.
    upc = models.CharField(db_column='UPC', max_length=255, blank=True, null=True)  # Field name made lowercase.

class Generalproducttable(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sku = models.CharField(db_column='SKU', max_length=255, blank=True, null=True)  # Field name made lowercase.
    quantity = models.IntegerField(db_column='Quantity', blank=True, null=True)  # Field name made lowercase.
    upc = models.CharField(db_column='UPC', max_length=255, blank=True, null=True)  # Field name made lowercase.
    title = models.CharField(db_column='Title', max_length=255, blank=True, null=True)  # Field name made lowercase.
    detailed_description = models.TextField(db_column='Detailed_Description', blank=True, null=True)  # Field name made lowercase.
    image = models.CharField(db_column='Image', max_length=255, blank=True, null=True)  # Field name made lowercase.
    category = models.CharField(db_column='Category', max_length=255, blank=True, null=True)  # Field name made lowercase.
    category_id = models.IntegerField(db_column='Category_ID', blank=True, null=True)  # Field name made lowercase.
    msrp = models.DecimalField(db_column='MSRP', max_digits=10, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    mpn = models.CharField(db_column='MPN', max_length=255, blank=True, null=True)  # Field name made lowercase.
    map = models.DecimalField(db_column='MAP', max_digits=10, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    dimensionh = models.DecimalField(db_column='DimensionH', max_digits=10, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    dimensionl = models.DecimalField(db_column='DimensionL', max_digits=10, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    dimensionw = models.DecimalField(db_column='DimensionW', max_digits=10, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    shipping_weight = models.DecimalField(db_column='Shipping_Weight', max_digits=10, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    shipping_length = models.DecimalField(db_column='Shipping_Length', max_digits=10, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    shipping_width = models.DecimalField(db_column='Shipping_Width', max_digits=10, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    shipping_height = models.TextField(db_column='Shipping_Height', blank=True, null=True)  # Field name made lowercase.
    attribute_1 = models.CharField(db_column='Attribute_1', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute_2 = models.CharField(db_column='Attribute_2', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute_3 = models.CharField(db_column='Attribute_3', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute_4 = models.CharField(db_column='Attribute_4', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute_5 = models.CharField(db_column='Attribute_5', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute_6 = models.CharField(db_column='Attribute_6', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute_7 = models.CharField(db_column='Attribute_7', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute_8 = models.CharField(db_column='Attribute_8', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute_9 = models.CharField(db_column='Attribute_9', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute_10 = models.CharField(db_column='Attribute_10', max_length=255, blank=True, null=True)  # Field name made lowercase.
    feature_1 = models.TextField(db_column='Feature_1', blank=True, null=True)  # Field name made lowercase.
    feature_2 = models.TextField(db_column='Feature_2', blank=True, null=True)  # Field name made lowercase.
    feature_3 = models.TextField(db_column='Feature_3', blank=True, null=True)  # Field name made lowercase.
    feature_4 = models.TextField(db_column='Feature_4', blank=True, null=True)  # Field name made lowercase.
    feature_5 = models.TextField(db_column='Feature_5', blank=True, null=True)  # Field name made lowercase.
    feature_6 = models.TextField(db_column='Feature_6', blank=True, null=True)  # Field name made lowercase.
    feature_7 = models.TextField(db_column='Feature_7', blank=True, null=True)  # Field name made lowercase.
    feature_8 = models.TextField(db_column='Feature_8', blank=True, null=True)  # Field name made lowercase.
    feature_9 = models.TextField(db_column='Feature_9', blank=True, null=True)  # Field name made lowercase.
    feature_10 = models.TextField(db_column='Feature_10', blank=True, null=True)  # Field name made lowercase.
    model = models.CharField(db_column='Model', max_length=255, blank=True, null=True)  # Field name made lowercase.
    price = models.DecimalField(db_column='Price', max_digits=10, decimal_places=6, blank=True, null=True)  # Field name made lowercase.
    brand = models.CharField(db_column='Brand', max_length=255, blank=True, null=True)  # Field name made lowercase.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    prop_65 = models.IntegerField(db_column='Prop_65', blank=True, null=True)  # Field name made lowercase.
    prop_65_description = models.TextField(db_column='Prop_65_Description', blank=True, null=True)  # Field name made lowercase.
    manufacturer_id = models.IntegerField(db_column='Manufacturer_Id', blank=True, null=True)  # Field name made lowercase.
    date_created = models.DateField(db_column='Date_Created', blank=True, null=True)  # Field name made lowercase.
    thumbnail = models.CharField(db_column='Thumbnail', max_length=255, blank=True, null=True)  # Field name made lowercase.

class Lipsey(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    itemnumber = models.TextField(db_column='ItemNumber', blank=True, null=True)  # Field name made lowercase.
    description1 = models.TextField(db_column='Description1', blank=True, null=True)  # Field name made lowercase.
    description2 = models.TextField(db_column='Description2', blank=True, null=True)  # Field name made lowercase.
    upc = models.TextField(db_column='Upc', blank=True, null=True)  # Field name made lowercase.
    manufacturermodelno = models.TextField(db_column='ManufacturerModelNo', blank=True, null=True)  # Field name made lowercase.
    msrp = models.TextField(db_column='Msrp', blank=True, null=True)  # Field name made lowercase.
    model = models.TextField(db_column='Model', blank=True, null=True)  # Field name made lowercase.
    calibergauge = models.TextField(db_column='CaliberGauge', blank=True, null=True)  # Field name made lowercase.
    manufacturer = models.TextField(db_column='Manufacturer', blank=True, null=True)  # Field name made lowercase.
    type = models.TextField(db_column='Type', blank=True, null=True)  # Field name made lowercase.
    action = models.TextField(db_column='Action', blank=True, null=True)  # Field name made lowercase.
    barrellength = models.TextField(db_column='BarrelLength', blank=True, null=True)  # Field name made lowercase.
    capacity = models.TextField(db_column='Capacity', blank=True, null=True)  # Field name made lowercase.
    finish = models.TextField(db_column='Finish', blank=True, null=True)  # Field name made lowercase.
    overalllength = models.TextField(db_column='OverallLength', blank=True, null=True)  # Field name made lowercase.
    receiver = models.TextField(db_column='Receiver', blank=True, null=True)  # Field name made lowercase.
    safety = models.TextField(db_column='Safety', blank=True, null=True)  # Field name made lowercase.
    sights = models.TextField(db_column='Sights', blank=True, null=True)  # Field name made lowercase.
    stockframegrips = models.TextField(db_column='StockFrameGrips', blank=True, null=True)  # Field name made lowercase.
    magazine = models.TextField(db_column='Magazine', blank=True, null=True)  # Field name made lowercase.
    weight = models.TextField(db_column='Weight', blank=True, null=True)  # Field name made lowercase.
    imagename = models.TextField(db_column='ImageName', blank=True, null=True)  # Field name made lowercase.
    chamber = models.TextField(db_column='Chamber', blank=True, null=True)  # Field name made lowercase.
    drilledandtapped = models.TextField(db_column='DrilledAndTapped', blank=True, null=True)  # Field name made lowercase.
    rateoftwist = models.TextField(db_column='RateOfTwist', blank=True, null=True)  # Field name made lowercase.
    itemtype = models.TextField(db_column='ItemType', blank=True, null=True)  # Field name made lowercase.
    additionalfeature1 = models.TextField(db_column='AdditionalFeature1', blank=True, null=True)  # Field name made lowercase.
    additionalfeature2 = models.TextField(db_column='AdditionalFeature2', blank=True, null=True)  # Field name made lowercase.
    additionalfeature3 = models.TextField(db_column='AdditionalFeature3', blank=True, null=True)  # Field name made lowercase.
    shippingweight = models.TextField(db_column='ShippingWeight', blank=True, null=True)  # Field name made lowercase.
    boundbookmanufacturer = models.TextField(db_column='BoundBookManufacturer', blank=True, null=True)  # Field name made lowercase.
    boundbookmodel = models.TextField(db_column='BoundBookModel', blank=True, null=True)  # Field name made lowercase.
    boundbooktype = models.TextField(db_column='BoundBookType', blank=True, null=True)  # Field name made lowercase.
    nfathreadpattern = models.TextField(db_column='NfaThreadPattern', blank=True, null=True)  # Field name made lowercase.
    nfaattachmentmethod = models.TextField(db_column='NfaAttachmentMethod', blank=True, null=True)  # Field name made lowercase.
    nfabaffletype = models.TextField(db_column='NfaBaffleType', blank=True, null=True)  # Field name made lowercase.
    silencercanbedisassembled = models.TextField(db_column='SilencerCanBeDisassembled', blank=True, null=True)  # Field name made lowercase.
    silencerconstructionmaterial = models.TextField(db_column='SilencerConstructionMaterial', blank=True, null=True)  # Field name made lowercase.
    nfadbreduction = models.TextField(db_column='NfaDbReduction', blank=True, null=True)  # Field name made lowercase.
    silenceroutsidediameter = models.TextField(db_column='SilencerOutsideDiameter', blank=True, null=True)  # Field name made lowercase.
    nfaform3caliber = models.TextField(db_column='NfaForm3Caliber', blank=True, null=True)  # Field name made lowercase.
    opticmagnification = models.TextField(db_column='OpticMagnification', blank=True, null=True)  # Field name made lowercase.
    maintubesize = models.TextField(db_column='MaintubeSize', blank=True, null=True)  # Field name made lowercase.
    adjustableobjective = models.TextField(db_column='AdjustableObjective', blank=True, null=True)  # Field name made lowercase.
    objectivesize = models.TextField(db_column='ObjectiveSize', blank=True, null=True)  # Field name made lowercase.
    opticadjustments = models.TextField(db_column='OpticAdjustments', blank=True, null=True)  # Field name made lowercase.
    illuminatedreticle = models.TextField(db_column='IlluminatedReticle', blank=True, null=True)  # Field name made lowercase.
    reticle = models.TextField(db_column='Reticle', blank=True, null=True)  # Field name made lowercase.
    exclusive = models.TextField(db_column='Exclusive', blank=True, null=True)  # Field name made lowercase.
    quantity = models.TextField(db_column='Quantity', blank=True, null=True)  # Field name made lowercase.
    allocated = models.TextField(db_column='Allocated', blank=True, null=True)  # Field name made lowercase.
    onsale = models.TextField(db_column='OnSale', blank=True, null=True)  # Field name made lowercase.
    price = models.TextField(db_column='Price', blank=True, null=True)  # Field name made lowercase.
    currentprice = models.TextField(db_column='CurrentPrice', blank=True, null=True)  # Field name made lowercase.
    retailmap = models.TextField(db_column='RetailMap', blank=True, null=True)  # Field name made lowercase.
    fflrequired = models.TextField(db_column='FflRequired', blank=True, null=True)  # Field name made lowercase.
    sotrequired = models.TextField(db_column='SotRequired', blank=True, null=True)  # Field name made lowercase.
    exclusivetype = models.TextField(db_column='ExclusiveType', blank=True, null=True)  # Field name made lowercase.
    scopecoverincluded = models.TextField(db_column='ScopeCoverIncluded', blank=True, null=True)  # Field name made lowercase.
    special = models.TextField(db_column='Special', blank=True, null=True)  # Field name made lowercase.
    sightstype = models.TextField(db_column='SightsType', blank=True, null=True)  # Field name made lowercase.
    case = models.TextField(db_column='Case', blank=True, null=True)  # Field name made lowercase.
    choke = models.TextField(db_column='Choke', blank=True, null=True)  # Field name made lowercase.
    dbreduction = models.TextField(db_column='DbReduction', blank=True, null=True)  # Field name made lowercase.
    family = models.TextField(db_column='Family', blank=True, null=True)  # Field name made lowercase.
    finishtype = models.TextField(db_column='FinishType', blank=True, null=True)  # Field name made lowercase.
    frame = models.TextField(db_column='Frame', blank=True, null=True)  # Field name made lowercase.
    griptype = models.TextField(db_column='GripType', blank=True, null=True)  # Field name made lowercase.
    handgunslidematerial = models.TextField(db_column='HandgunSlideMaterial', blank=True, null=True)  # Field name made lowercase.
    countryoforigin = models.TextField(db_column='CountryOfOrigin', blank=True, null=True)  # Field name made lowercase.
    itemlength = models.TextField(db_column='ItemLength', blank=True, null=True)  # Field name made lowercase.
    itemwidth = models.TextField(db_column='ItemWidth', blank=True, null=True)  # Field name made lowercase.
    itemheight = models.TextField(db_column='ItemHeight', blank=True, null=True)  # Field name made lowercase.
    packagelength = models.TextField(db_column='PackageLength', blank=True, null=True)  # Field name made lowercase.
    packagewidth = models.TextField(db_column='PackageWidth', blank=True, null=True)  # Field name made lowercase.
    packageheight = models.TextField(db_column='PackageHeight', blank=True, null=True)  # Field name made lowercase.
    itemgroup = models.TextField(db_column='ItemGroup', blank=True, null=True)  # Field name made lowercase.

class Rsr(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rsr_stock_number = models.TextField(db_column='RSR_Stock_Number', blank=True, null=True)  # Field name made lowercase.
    upc = models.TextField(db_column='UPC', blank=True, null=True)  # Field name made lowercase.
    dept_number = models.TextField(db_column='Dept_Number', blank=True, null=True)  # Field name made lowercase.
    retail_price = models.TextField(db_column='Retail_Price', blank=True, null=True)  # Field name made lowercase.
    rsr_regular_price = models.TextField(db_column='RSR_Regular_Price', blank=True, null=True)  # Field name made lowercase.
    product_weight_oz = models.TextField(db_column='Product_Weight_oz', blank=True, null=True)  # Field name made lowercase.
    inventory_quantity = models.IntegerField(db_column='Inventory_Quantity', blank=True, null=True)  # Field name made lowercase.
    model = models.TextField(db_column='Model', blank=True, null=True)  # Field name made lowercase.
    full_manufacturer_name = models.TextField(db_column='Full_Manufacturer_Name', blank=True, null=True)  # Field name made lowercase.
    image_name = models.TextField(db_column='Image_Name', blank=True, null=True)  # Field name made lowercase.
    ground_shipments_only = models.TextField(db_column='Ground_Shipments_Only', blank=True, null=True)  # Field name made lowercase.
    adult_sig_required = models.TextField(db_column='Adult_Sig_Required', blank=True, null=True)  # Field name made lowercase.
    blocked_from_dropship = models.TextField(db_column='Blocked_from_Dropship', blank=True, null=True)  # Field name made lowercase.
    retail_map = models.TextField(db_column='Retail_MAP', blank=True, null=True)  # Field name made lowercase.
    shipping_length_inches = models.TextField(db_column='Shipping_Length_inches', blank=True, null=True)  # Field name made lowercase.
    shipping_width_inches = models.TextField(db_column='Shipping_Width_inches', blank=True, null=True)  # Field name made lowercase.
    shipping_height_inches = models.TextField(db_column='Shipping_Height_inches', blank=True, null=True)  # Field name made lowercase.
    reserved_for_future_use = models.TextField(db_column='Reserved_for_Future_Use', blank=True, null=True)  # Field name made lowercase.
    quantity = models.IntegerField(db_column='Quantity', blank=True, null=True)  # Field name made lowercase.
    manufacturer_id = models.TextField(db_column='Manufacturer_id', blank=True, null=True)  # Field name made lowercase.
    accessories = models.TextField(db_column='Accessories', blank=True, null=True)  # Field name made lowercase.
    action = models.TextField(db_column='Action', blank=True, null=True)  # Field name made lowercase.
    type_of_barrel = models.TextField(db_column='Type_of_Barrel', blank=True, null=True)  # Field name made lowercase.
    barrel_length = models.TextField(db_column='Barrel_Length', blank=True, null=True)  # Field name made lowercase.
    chamber = models.TextField(db_column='Chamber', blank=True, null=True)  # Field name made lowercase.
    chokes = models.TextField(db_column='Chokes', blank=True, null=True)  # Field name made lowercase.
    condition = models.TextField(db_column='Condition', blank=True, null=True)  # Field name made lowercase.
    capacity = models.TextField(db_column='Capacity', blank=True, null=True)  # Field name made lowercase.
    dram = models.TextField(db_column='Dram', blank=True, null=True)  # Field name made lowercase.
    edge = models.TextField(db_column='Edge', blank=True, null=True)  # Field name made lowercase.
    firing_casing = models.TextField(db_column='Firing_casing', blank=True, null=True)  # Field name made lowercase.
    finish = models.TextField(db_column='Finish', blank=True, null=True)  # Field name made lowercase.
    fit = models.TextField(db_column='Fit', blank=True, null=True)  # Field name made lowercase.
    feet_per_second = models.TextField(db_column='Feet_per_second', blank=True, null=True)  # Field name made lowercase.
    frame = models.TextField(db_column='Frame', blank=True, null=True)  # Field name made lowercase.
    caliber = models.TextField(db_column='Caliber', blank=True, null=True)  # Field name made lowercase.
    grain_weight = models.TextField(db_column='Grain_Weight', blank=True, null=True)  # Field name made lowercase.
    grips = models.TextField(db_column='Grips', blank=True, null=True)  # Field name made lowercase.
    hand = models.TextField(db_column='Hand', blank=True, null=True)  # Field name made lowercase.
    manufacturer = models.TextField(db_column='Manufacturer', blank=True, null=True)  # Field name made lowercase.
    manufacturer_part_number = models.TextField(db_column='Manufacturer_part_number', blank=True, null=True)  # Field name made lowercase.
    manufacturer_weight = models.TextField(db_column='Manufacturer_weight', blank=True, null=True)  # Field name made lowercase.
    moa = models.TextField(db_column='MOA', blank=True, null=True)  # Field name made lowercase.
    nsn_national_stock_number = models.TextField(db_column='NSN_National_Stock_Number', blank=True, null=True)  # Field name made lowercase.
    objective = models.TextField(db_column='Objective', blank=True, null=True)  # Field name made lowercase.
    ounce_of_shot = models.TextField(db_column='Ounce_of_shot', blank=True, null=True)  # Field name made lowercase.
    packaging = models.TextField(db_column='Packaging', blank=True, null=True)  # Field name made lowercase.
    power = models.TextField(db_column='Power', blank=True, null=True)  # Field name made lowercase.
    reticle = models.TextField(db_column='Reticle', blank=True, null=True)  # Field name made lowercase.
    safety = models.TextField(db_column='Safety', blank=True, null=True)  # Field name made lowercase.
    sights = models.TextField(db_column='Sights', blank=True, null=True)  # Field name made lowercase.
    size = models.TextField(db_column='Size', blank=True, null=True)  # Field name made lowercase.
    type = models.TextField(db_column='Type', blank=True, null=True)  # Field name made lowercase.
    units_per_box = models.TextField(db_column='Units_per_box', blank=True, null=True)  # Field name made lowercase.
    units_per_case = models.TextField(db_column='Units_per_case',  blank=True, null=True)  # Field name made lowercase.
    wt_characteristics = models.TextField(db_column='Wt_Characteristics', blank=True, null=True)  # Field name made lowercase.
    sub_category = models.TextField(db_column='Sub_Category',  blank=True, null=True)  # Field name made lowercase.
    diameter = models.TextField(db_column='Diameter',  blank=True, null=True)  # Field name made lowercase.
    color = models.TextField(db_column='Color', blank=True, null=True)  # Field name made lowercase.
    material = models.TextField(db_column='Material', blank=True, null=True)  # Field name made lowercase.
    stock = models.TextField(db_column='Stock', blank=True, null=True)  # Field name made lowercase.
    lens_color = models.TextField(db_column='Lens_Color', blank=True, null=True)  # Field name made lowercase.
    handle_color = models.TextField(db_column='Handle_Color', blank=True, null=True)  # Field name made lowercase.
    category_name = models.TextField(db_column='Category_Name', blank=True, null=True)  # Field name made lowercase.
    message_type = models.TextField(db_column='Message_Type', blank=True, null=True)  # Field name made lowercase.
    message_text = models.TextField(db_column='Message_Text', blank=True, null=True)  # Field name made lowercase.
    municipality = models.TextField(db_column='Municipality', blank=True, null=True)  # Field name made lowercase.
    state = models.TextField(db_column='State', blank=True, null=True)  # Field name made lowercase.
    territory_restriction_type = models.TextField(db_column='Territory_Restriction_Type', blank=True, null=True)  # Field name made lowercase.
    restriction_detail = models.TextField(db_column='Restriction_Detail', blank=True, null=True)  # Field name made lowercase.
    description_deleted = models.TextField(db_column='Description_Deleted', blank=True, null=True)  # Field name made lowercase.
    sell_copy_description = models.TextField(db_column='Sell_Copy_Description', blank=True, null=True)  # Field name made lowercase.
    feature_1 = models.TextField(db_column='Feature_1', blank=True, null=True)  # Field name made lowercase.
    feature_2 = models.TextField(db_column='Feature_2', blank=True, null=True)  # Field name made lowercase.
    feature_3 = models.TextField(db_column='Feature_3', blank=True, null=True)  # Field name made lowercase.
    feature_4 = models.TextField(db_column='Feature_4', blank=True, null=True)  # Field name made lowercase.
    feature_5 = models.TextField(db_column='Feature_5', blank=True, null=True)  # Field name made lowercase.
    feature_6 = models.TextField(db_column='Feature_6', blank=True, null=True)  # Field name made lowercase.
    feature_7 = models.TextField(db_column='Feature_7', blank=True, null=True)  # Field name made lowercase.
    feature_8 = models.TextField(db_column='Feature_8', blank=True, null=True)  # Field name made lowercase.

class Ssi(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sku = models.CharField(db_column='SKU', max_length=255, blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=255, blank=True, null=True)  # Field name made lowercase.
    datecreated = models.CharField(db_column='DateCreated', max_length=255, blank=True, null=True)  # Field name made lowercase.
    dimensionh = models.CharField(db_column='DimensionH', max_length=255, blank=True, null=True)  # Field name made lowercase.
    dimensionl = models.CharField(db_column='DimensionL', max_length=255, blank=True, null=True)  # Field name made lowercase.
    dimensionw = models.CharField(db_column='DimensionW', max_length=255, blank=True, null=True)  # Field name made lowercase.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    imageurl = models.CharField(db_column='ImageURL', max_length=255, blank=True, null=True)  # Field name made lowercase.
    thumbnailurl = models.CharField(db_column='ThumbnailURL', max_length=255, blank=True, null=True)  # Field name made lowercase.
    upccode = models.CharField(db_column='UPCCode', max_length=255, blank=True, null=True)  # Field name made lowercase.
    weight = models.CharField(db_column='Weight', max_length=255, blank=True, null=True)  # Field name made lowercase.
    weightunits = models.CharField(db_column='WeightUnits', max_length=255, blank=True, null=True)  # Field name made lowercase.
    category = models.CharField(db_column='Category', max_length=255, blank=True, null=True)  # Field name made lowercase.
    subcategory = models.CharField(db_column='Subcategory', max_length=255, blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=255, blank=True, null=True)  # Field name made lowercase.
    map = models.CharField(db_column='MAP', max_length=255, blank=True, null=True)  # Field name made lowercase.
    msrp = models.CharField(db_column='MSRP', max_length=255, blank=True, null=True)  # Field name made lowercase.
    mpn = models.CharField(db_column='MPN', max_length=255, blank=True, null=True)  # Field name made lowercase.
    minimumorderquantity = models.CharField(db_column='MinimumOrderQuantity', max_length=255, blank=True, null=True)  # Field name made lowercase.
    detaileddescription = models.TextField(db_column='DetailedDescription', blank=True, null=True)  # Field name made lowercase.
    shippingweight = models.CharField(db_column='ShippingWeight', max_length=255, blank=True, null=True)  # Field name made lowercase.
    shippinglength = models.CharField(db_column='ShippingLength', max_length=255, blank=True, null=True)  # Field name made lowercase.
    shippingwidth = models.CharField(db_column='ShippingWidth', max_length=255, blank=True, null=True)  # Field name made lowercase.
    shippingheight = models.CharField(db_column='ShippingHeight', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute1 = models.TextField(blank=True, null=True)
    attribute2 = models.TextField(blank=True, null=True)
    attribute3 = models.TextField(blank=True, null=True)
    attribute4 = models.TextField(blank=True, null=True)
    attribute5 = models.TextField(blank=True, null=True)
    attribute6 = models.TextField(blank=True, null=True)
    attribute7 = models.TextField(blank=True, null=True)
    prop65warning = models.CharField(max_length=255, blank=True, null=True)
    prop65reason = models.TextField(blank=True, null=True)
    countryoforigin = models.TextField(blank=True, null=True)
    groundshippingrequired = models.TextField(blank=True, null=True)
    price = models.CharField(db_column='Price', max_length=255, blank=True, null=True)  # Field name made lowercase.
    avgshipcost = models.TextField(blank=True, null=True)
    qty = models.CharField(db_column='Qty', max_length=255, blank=True, null=True)  # Field name made lowercase.

class Zanders(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    available = models.CharField(max_length=10, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    desc1 = models.TextField(blank=True, null=True)
    desc2 = models.TextField(blank=True, null=True)
    itemnumber = models.CharField(unique=True, max_length=255, blank=True, null=True)
    manufacturer = models.CharField(max_length=255, blank=True, null=True)
    mfgpnumber = models.CharField(max_length=255, blank=True, null=True)
    msrp = models.CharField(max_length=10, blank=True, null=True)
    price1 = models.CharField(max_length=10, blank=True, null=True)
    price2 = models.CharField(max_length=10, blank=True, null=True)
    price3 = models.CharField(max_length=10, blank=True, null=True)
    qty1 = models.CharField(max_length=10, blank=True, null=True)
    qty2 = models.CharField(max_length=10, blank=True, null=True)
    qty3 = models.CharField(max_length=10, blank=True, null=True)
    upc = models.CharField(max_length=255, blank=True, null=True)
    weight = models.CharField(max_length=10, blank=True, null=True)
    serialized = models.CharField(max_length=10, blank=True, null=True)
    mapprice = models.CharField(max_length=10, blank=True, null=True)
    imagelink = models.CharField(max_length=255, blank=True, null=True)
    description = models.CharField(max_length=255, blank=True, null=True)