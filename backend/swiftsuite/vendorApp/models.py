from django.db import models

# Create your models here.

class VendoEnronment(models.Model):
    vendor_id = models.AutoField(primary_key=True)
    vendor_name = models.CharField(max_length=30, unique=True, null=False)
    address_street1 = models.CharField(max_length=150, null=False, unique=False)
    address_street2 = models.CharField(max_length=150, null=True, unique=False)
    city = models.CharField(max_length=50, null=False, unique=False)
    state = models.CharField(max_length=50, null=False, unique=False)
    postal_code = models.CharField(max_length=50, null=False, unique=False)
    country = models.CharField(max_length=50, null=False, unique=False)
    ftp_username = models.CharField(max_length=50, null=True, unique=True)
    ftp_password = models.CharField(max_length=50, null=True, unique=False)
    ftp_url = models.CharField(max_length=255)
    file_urls = models.TextField()
    host = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)


class Fragrancex(models.Model):
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


class Lipsey(models.Model):
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

class ProductData(models.Model):
    rsr_stock_number = models.CharField(db_column='RSR_Stock_Number', max_length=255, blank=True, null=True)  # Field name made lowercase.
    upc = models.CharField(db_column='UPC', max_length=255, blank=True, null=True)  # Field name made lowercase.
    dept_number = models.CharField(db_column='Dept_Number', max_length=255, blank=True, null=True)  # Field name made lowercase.
    retail_price = models.DecimalField(db_column='Retail_Price', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    rsr_regular_price = models.DecimalField(db_column='RSR_Regular_Price', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    product_weight_oz = models.DecimalField(db_column='Product_Weight_oz', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    inventory_quantity = models.IntegerField(db_column='Inventory_Quantity', blank=True, null=True)  # Field name made lowercase.
    model = models.CharField(db_column='Model', max_length=255, blank=True, null=True)  # Field name made lowercase.
    full_manufacturer_name = models.CharField(db_column='Full_Manufacturer_Name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    image_name = models.CharField(db_column='Image_Name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ground_shipments_only = models.CharField(db_column='Ground_Shipments_Only', max_length=255, blank=True, null=True)  # Field name made lowercase.
    adult_sig_required = models.CharField(db_column='Adult_Sig_Required', max_length=255, blank=True, null=True)  # Field name made lowercase.
    blocked_from_dropship = models.CharField(db_column='Blocked_from_Dropship', max_length=255, blank=True, null=True)  # Field name made lowercase.
    retail_map = models.DecimalField(db_column='Retail_MAP', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    shipping_length_inches = models.DecimalField(db_column='Shipping_Length_inches', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    shipping_width_inches = models.DecimalField(db_column='Shipping_Width_inches', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    shipping_height_inches = models.DecimalField(db_column='Shipping_Height_inches', max_digits=10, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    reserved_for_future_use = models.CharField(db_column='Reserved_for_Future_Use', max_length=255, blank=True, null=True)  # Field name made lowercase.
    quantity = models.IntegerField(db_column='Quantity', blank=True, null=True)  # Field name made lowercase.
    manufacturer_id = models.CharField(db_column='Manufacturer_id', max_length=255, blank=True, null=True)  # Field name made lowercase.
    accessories = models.TextField(db_column='Accessories', blank=True, null=True)  # Field name made lowercase.
    action = models.CharField(db_column='Action', max_length=255, blank=True, null=True)  # Field name made lowercase.
    type_of_barrel = models.CharField(db_column='Type_of_Barrel', max_length=255, blank=True, null=True)  # Field name made lowercase.
    barrel_length = models.CharField(db_column='Barrel_Length', max_length=255, blank=True, null=True)  # Field name made lowercase.
    chamber = models.CharField(db_column='Chamber', max_length=255, blank=True, null=True)  # Field name made lowercase.
    chokes = models.CharField(db_column='Chokes', max_length=255, blank=True, null=True)  # Field name made lowercase.
    condition = models.CharField(db_column='Condition', max_length=255, blank=True, null=True)  # Field name made lowercase.
    capacity = models.TextField(db_column='Capacity', blank=True, null=True)  # Field name made lowercase.
    dram = models.CharField(db_column='Dram', max_length=255, blank=True, null=True)  # Field name made lowercase.
    edge = models.CharField(db_column='Edge', max_length=255, blank=True, null=True)  # Field name made lowercase.
    firing_casing = models.CharField(db_column='Firing_casing', max_length=255, blank=True, null=True)  # Field name made lowercase.
    finish = models.CharField(db_column='Finish', max_length=255, blank=True, null=True)  # Field name made lowercase.
    fit = models.CharField(db_column='Fit', max_length=255, blank=True, null=True)  # Field name made lowercase.
    feet_per_second = models.CharField(db_column='Feet_per_second', max_length=255, blank=True, null=True)  # Field name made lowercase.
    frame = models.CharField(db_column='Frame', max_length=255, blank=True, null=True)  # Field name made lowercase.
    caliber = models.CharField(db_column='Caliber', max_length=255, blank=True, null=True)  # Field name made lowercase.
    grain_weight = models.CharField(db_column='Grain_Weight', max_length=255, blank=True, null=True)  # Field name made lowercase.
    grips = models.CharField(db_column='Grips', max_length=255, blank=True, null=True)  # Field name made lowercase.
    hand = models.CharField(db_column='Hand', max_length=255, blank=True, null=True)  # Field name made lowercase.
    manufacturer = models.CharField(db_column='Manufacturer', max_length=255, blank=True, null=True)  # Field name made lowercase.
    manufacturer_part_number = models.CharField(db_column='Manufacturer_part_number', max_length=255, blank=True, null=True)  # Field name made lowercase.
    manufacturer_weight = models.CharField(db_column='Manufacturer_weight', max_length=255, blank=True, null=True)  # Field name made lowercase.
    moa = models.CharField(db_column='MOA', max_length=255, blank=True, null=True)  # Field name made lowercase.
    nsn_national_stock_number = models.CharField(db_column='NSN_National_Stock_Number', max_length=255, blank=True, null=True)  # Field name made lowercase.
    objective = models.CharField(db_column='Objective', max_length=255, blank=True, null=True)  # Field name made lowercase.
    ounce_of_shot = models.CharField(db_column='Ounce_of_shot', max_length=255, blank=True, null=True)  # Field name made lowercase.
    packaging = models.CharField(db_column='Packaging', max_length=255, blank=True, null=True)  # Field name made lowercase.
    power = models.CharField(db_column='Power', max_length=255, blank=True, null=True)  # Field name made lowercase.
    reticle = models.CharField(db_column='Reticle', max_length=255, blank=True, null=True)  # Field name made lowercase.
    safety = models.CharField(db_column='Safety', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sights = models.CharField(db_column='Sights', max_length=255, blank=True, null=True)  # Field name made lowercase.
    size = models.CharField(db_column='Size', max_length=255, blank=True, null=True)  # Field name made lowercase.
    type = models.CharField(db_column='Type', max_length=255, blank=True, null=True)  # Field name made lowercase.
    units_per_box = models.CharField(db_column='Units_per_box', max_length=255, blank=True, null=True)  # Field name made lowercase.
    units_per_case = models.CharField(db_column='Units_per_case', max_length=255, blank=True, null=True)  # Field name made lowercase.
    wt_characteristics = models.CharField(db_column='Wt_Characteristics', max_length=255, blank=True, null=True)  # Field name made lowercase.
    sub_category = models.CharField(db_column='Sub_Category', max_length=255, blank=True, null=True)  # Field name made lowercase.
    diameter = models.CharField(db_column='Diameter', max_length=255, blank=True, null=True)  # Field name made lowercase.
    color = models.CharField(db_column='Color', max_length=255, blank=True, null=True)  # Field name made lowercase.
    material = models.CharField(db_column='Material', max_length=255, blank=True, null=True)  # Field name made lowercase.
    stock = models.CharField(db_column='Stock', max_length=255, blank=True, null=True)  # Field name made lowercase.
    lens_color = models.CharField(db_column='Lens_Color', max_length=255, blank=True, null=True)  # Field name made lowercase.
    handle_color = models.CharField(db_column='Handle_Color', max_length=255, blank=True, null=True)  # Field name made lowercase.
    category_name = models.CharField(db_column='Category_Name', max_length=255, blank=True, null=True)  # Field name made lowercase.
    message_type = models.CharField(db_column='Message_Type', max_length=255, blank=True, null=True)  # Field name made lowercase.
    message_text = models.TextField(db_column='Message_Text', blank=True, null=True)  # Field name made lowercase.
    municipality = models.CharField(db_column='Municipality', max_length=255, blank=True, null=True)  # Field name made lowercase.
    state = models.CharField(db_column='State', max_length=255, blank=True, null=True)  # Field name made lowercase.
    territory_restriction_type = models.CharField(db_column='Territory_Restriction_Type', max_length=255, blank=True, null=True)  # Field name made lowercase.
    restriction_detail = models.CharField(db_column='Restriction_Detail', max_length=255, blank=True, null=True)  # Field name made lowercase.
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
    detaileddescription = models.CharField(db_column='DetailedDescription', max_length=255, blank=True, null=True)  # Field name made lowercase.
    shippingweight = models.CharField(db_column='ShippingWeight', max_length=255, blank=True, null=True)  # Field name made lowercase.
    shippinglength = models.CharField(db_column='ShippingLength', max_length=255, blank=True, null=True)  # Field name made lowercase.
    shippingwidth = models.CharField(db_column='ShippingWidth', max_length=255, blank=True, null=True)  # Field name made lowercase.
    shippingheight = models.CharField(db_column='ShippingHeight', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute1 = models.CharField(db_column='Attribute1', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute2 = models.CharField(db_column='Attribute2', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute3 = models.CharField(db_column='Attribute3', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute4 = models.CharField(db_column='Attribute4', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute5 = models.CharField(db_column='Attribute5', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute6 = models.CharField(db_column='Attribute6', max_length=255, blank=True, null=True)  # Field name made lowercase.
    attribute7 = models.CharField(db_column='Attribute7', max_length=255, blank=True, null=True)  # Field name made lowercase.
    prop65warning = models.CharField(db_column='Prop65Warning', max_length=255, blank=True, null=True)  # Field name made lowercase.
    prop65reason = models.CharField(db_column='Prop65Reason', max_length=255, blank=True, null=True)  # Field name made lowercase.
    countryoforigin = models.CharField(db_column='CountryOfOrigin', max_length=255, blank=True, null=True)  # Field name made lowercase.
    groundshippingrequired = models.CharField(db_column='GroundShippingRequired', max_length=255, blank=True, null=True)  # Field name made lowercase.
    price = models.CharField(db_column='Price', max_length=255, blank=True, null=True)  # Field name made lowercase.
    avgshipcost = models.CharField(db_column='AvgShipCost', max_length=255, blank=True, null=True)  # Field name made lowercase.
    qty = models.CharField(db_column='Qty', max_length=255, blank=True, null=True)  # Field name made lowercase.
