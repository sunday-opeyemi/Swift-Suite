import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import CustomPagination from "./CustomPagination";
import gif from "../Images/gif.gif";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { FaList, FaTh } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import FilterComponent from "../components/FilterComponent";
import { catalogue } from "./Cataloguedata";

const Catalogue = () => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  const [catalogueProduct, setCatalogueProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loader, setLoader] = useState(false);
  const [filterOpen, setfilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState("Greater than");
  const [filterValue, setFilterValue] = useState("");
  const [filterByUPC, setFilterByUPC] = useState(false);
  const [openQuantity, setOpenQuantity] = useState(false);
  const [filterQuantityType, setFilterQuantityType] = useState("Greater than");
  const [filterQuantityValue, setFilterQuantityValue] = useState("");
  const [productChange, setProductChange] = useState("All")
  const [endpoint, setEndpoint] = useState("");
  const [filter, setFilter] = useState(false)
   const [error, setError] = useState(null);
  // console.log(productChange);
  // console.log(endpoint);




  const itemsPerPage = 99;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formFilters, setFormFilters] = useState({
    name: "",
    brand: "",
    model: "",
    type: "",
    manufacturer: "",
    manufacturer_name: "",
    category_name: "",
    msrp: "",
    sku: "",
    category: "",
  });



  useEffect(() => {
    fetchData();
  }, [token, endpoint]);

  useEffect(() => {
    filterCatalogueProduct();
  }, [catalogueProduct, searchQuery, currentPage]);

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(response.data);
      setCatalogueProduct(response.data);
      setLoader(false);
      setFilter(true);
      setError(null)
    } catch (error) {
      setLoader(false);
      console.log(error.response.data.message);
      if (error.response.data.detail) {
        console.log("Token has expired");
        toast.error("Token has expired");
        localStorage.removeItem("token");
        navigate("/signin");
      } else if(error.response && error.response.data && error.response.data.message) {
        // Set the error message state
        setError(error.response.data.message);
      } 
      // else {
      //   setError("An error occurred while fetching data");
      // }
    }
  };

  const handleProductChange = (event) => {
    const selectedProduct = catalogue.find(item => item.name === event.target.value);
    console.log(selectedProduct.endpoint);
    if (selectedProduct) {
      setProductChange(event.target.value);
      setEndpoint(selectedProduct.endpoint); // Update the endpoint state
      setError(null)
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset currentPage when search query changes
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleProductClick = (product) => {
    // Step 2: Function to handle product click
    setSelectedProduct(product);
    onOpen(); // Step 3: Open the modal
    setError(null)
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormFilters({ ...formFilters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected formFilters:", formFilters);
    // Perform filtering logic here...
    filterCatalogueProduct();
    setFormFilters({ ...formFilters });
  };

  const symbolMap = {
    "Greater than": ">",
    "Greater than or equal": ">=",
    Is: "=",
    "Less than": "<",
    "Less than or equal": "<=",
    "is not": "!=",
  };


  const quantityMap = {
    "Greater than": ">",
    "Greater than or equal": ">=",
    Is: "=",
    "Less than": "<",
    "Less than or equal": "<=",
    "is not": "!=",
  };

  const filterCatalogueProduct = () => {
    // note my filteredItems is my catalogueProduct
    let filteredItems = [...catalogueProduct];

    // the item.name first check if the name exist in the filter and if not it return 0.
    if (formFilters.name.trim() !== "") {
      filteredItems = filteredItems.filter((item) =>
        item.name && item.name.toLowerCase().includes(formFilters.name.toLowerCase())
      );
    }

    if (formFilters.brand !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.brand && item.brand.toLowerCase() === formFilters.brand.toLowerCase()
      );
    }

    // Lipsey
    if (formFilters.manufacturer !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.manufacturer && item.manufacturer.toLowerCase() === formFilters.manufacturer.toLowerCase()
      );
    }
    if (formFilters.model !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.model && item.model.toLowerCase() === formFilters.model.toLowerCase()
      );
    }
    if (formFilters.type !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.type && item.type.toLowerCase() === formFilters.type.toLowerCase()
      );
    }

    // if (formFilters.msrp !== "") {
    //   const filterMsrp = parseFloat(formFilters.msrp);
    //   console.log(filterMsrp);
    //   filteredItems = filteredItems.filter(
    //     (item) => typeof item.msrp === item.msrp && item.msrp === filterMsrp
    //   );
    // }


    if (formFilters.msrp !== "") {
      const filterMsrp = parseFloat(formFilters.msrp);
      // console.log("Filter MSRP:", filterMsrp);
      filteredItems = filteredItems.filter(
        // item.msrp means if item.msrp == to string then convert it to number parseFloat(item.msrp), that is d work of parsefloat and if it is == what d user type i.e filterMsrp
        (item) => typeof item.msrp === 'string' && parseFloat(item.msrp) === filterMsrp
      );
      // console.log("Filtered Items after MSRP filter:", filteredItems);
    }

    // CWR
    if (formFilters.manufacturer_name !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.manufacturer_name && item.manufacturer_name.toLowerCase() === formFilters.manufacturer_name.toLowerCase()
      );
    }

    if (formFilters.category_name !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.category_name && item.category_name.toLowerCase() === formFilters.category_name.toLowerCase()
      );
    }

    if (formFilters.sku !== "") {
      const filterSku = parseFloat(formFilters.sku);
      // console.log("Filter SKU:", filterSku);
      filteredItems = filteredItems.filter(
        (item) => typeof item.sku === 'string' && parseFloat(item.sku) === filterSku
      );
      // console.log("Filtered Items after Sku filter:", filteredItems);
    }


    // SSI
    if (formFilters.category !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.category && item.category.toLowerCase() === formFilters.category.toLowerCase()
      );
    }

    // Neutral
    if (filterByUPC) {
      // If filter by UPC is enabled, filter items where UPC exists
      // filteredItems = filteredItems.filter((item) => item.upc !== "");
      filteredItems = filteredItems.filter((item) => item.upc || item.upc_code || item.upccode);
      console.log(filteredItems);
    }
    // PRICE FILTER
    if (filterType && filterValue !== "") {
      if (filterType === "Greater than") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.price) > parseFloat(filterValue)
        );
      } else if (filterType === "Greater than or equal") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.price) >= parseFloat(filterValue)
        );
      } else if (filterType === "Is") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.price) === parseFloat(filterValue)
        );
      } else if (filterType === "Less than") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.price) < parseFloat(filterValue)
        );
      } else if (filterType === "Less than or equal") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.price) <= parseFloat(filterValue)
        );
      } else if (filterType === "Is not") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.price) != parseFloat(filterValue)
        );
      }
    }

    // QUANTITY FILTER
    if (filterQuantityType && filterQuantityValue !== "") {
      if (filterQuantityType === "Greater than") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.qty || item.quantity || item.quantity_available_to_ship_combined) > parseFloat(filterQuantityValue)
        );
      }
      else if (filterQuantityType === "Greater than or equal") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.qty || item.quantity || item.quantity_available_to_ship_combined) >= parseFloat(filterQuantityValue)
        );
      } else if (filterQuantityType === "Is") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.qty || item.quantity || item.quantity_available_to_ship_combined) === parseFloat(filterQuantityValue)
        );
      } else if (filterQuantityType === "Less than") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.qty || item.quantity || item.quantity_available_to_ship_combined) < parseFloat(filterQuantityValue)
        )
      }
      else if (filterQuantityType === "Less than or equal") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.qty || item.quantity || item.quantity_available_to_ship_combined) <= parseFloat(filterQuantityValue)
        )
      } else if (filterQuantityType === "Is not") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.qty || item.quantity || item.quantity_available_to_ship_combined) != parseFloat(filterQuantityValue)
        )
      }

    }
    // Apply other filters
    filteredItems = filteredItems.filter(item => {
      return (
        (!searchQuery || // If searchQuery is empty, don't apply keyword filter
          (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.brand && item.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.manufacturer && item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.manufacturer_name && item.manufacturer_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.category_name && item.category_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        // Add additional conditions here if needed
      );
    });






    // Update the current items
    setCurrentItems(filteredItems);
  };

  const filterControl = () => {
    setfilterOpen(!filterOpen);
    console.log(filterOpen);
  };

  const handleOptionClick = (value) => {
    setFilterType(value);
    setOpen(false);
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const onFilterValueChange = (e) => {
    setFilterValue(e.target.value);
  };



  const handleQuantityClick = (value) => {
    setFilterQuantityType(value);
    setOpenQuantity(false);
  };

  const toggleQuantityDropdown = () => {
    setOpenQuantity(!openQuantity);
  };
  const onFilterQuantityChange = (e) => {
    setFilterQuantityValue(e.target.value);
  };


  const handleFilterByUPCChange = (event) => {
    console.log(event);
    setFilterByUPC(event.target.checked);
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "grid" : "list"));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = currentItems.slice(startIndex, endIndex);

  const vendorIndex = (i) => {
    console.log(i);
  };
  return (
    <div className={error || loader ? 'bg-green-50 h-screen' : 'bg-green-50'}>
      <section
        className={
          filterOpen
            ? "fixed border md:h-[60%] h-[55%] md:gap-14 w-[100%] top-14 mt-4 bg-[#089451] py-10   lg:ms-[22%]  lg:me-[2%] md:me-[5%]"
            : "fixed border md:gap-14  w-[100%] top-14 bg-[#089451] mt-4 py-10   lg:ms-[22%] lg:me-[2] md:me-[5%]"
        }
      >
        <div className="flex h-[25%] lg:ms-[-260px]  md:gap-5 gap-3 md:mx-5 mx-2 justify-center">
          <div className="rounded-2xl pt-1 focus:outline-none p-2 bg-white h-[40px]">
            <button
              className="flex gap-1"
              onClick={() => {
                if (filter == true) {
                  filterControl();
                }
              }}
              disabled={filter == false}
            >
              <span className="mt-1">Filter</span>
              <span className="mt-[9px] text-[#089451]">
                <BsFillFilterSquareFill />
              </span>
            </button>
          </div>
          <div className="flex lg:w-[45%] md:w-[100%] rounded-2xl h-[40px]  md:ms-0 items-center lg:gap-[100px] md:gap-[100px] bg-white">
            <input
              className="py-3 bg-transparent outline-none px-2  w-[200px] md:w-[100%]"
              type="text"
              placeholder="Search by keyword..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="text-white bg-[#089451] px-3 h-[34px] rounded-r-2xl cursor-pointer lg:ms-28"
            >
              <BsSearch className="" />
            </button>
          </div>
          {/* Toggle on big screen */}
          <div className="lg:block md:hidden hidden gap-2 bg-white rounded-xl p-2 h-[36px]">
            <button
              onClick={() => {
                toggleViewMode();
              }}
              className="text-[#089451]"
            >
              {viewMode === "list" ? <FaTh size={15} /> : <FaList size={15} />}
            </button>
          </div>
          {/* Toggle on medium and small screen */}
          <div className="lg:hidden md:block block gap-2 bg-white rounded-xl h-[36px] p-2">
            <button
              onClick={() => {
                toggleViewMode();

              }}
              className="text-[#089451]"
            >
              {viewMode === "list" ? <FaTh size={15} /> : <FaList size={15} />}
            </button>
          </div>

          <select
            value={productChange}
            onChange={handleProductChange}
            className="cursor-pointer h-9 rounded-xl px-2 outline-none"
          >
            {catalogue.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </section>
      <div
        className={filterOpen ? "lg:ms-[24%] ms-10 mt-14 fixed  text-white" : "hidden"}
      >
        {/* Pagination */}
        {currentItems.length > 0 && (
          <CustomPagination
            pageCount={Math.ceil(currentItems.length / itemsPerPage)}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={currentItems.length}
          />
        )}

        {/* Forms */}
        <FilterComponent
          endpoint={endpoint}
          filterOpen={filterOpen}
          setfilterOpen={setfilterOpen}
          open={open}
          toggleDropdown={toggleDropdown}
          handleOptionClick={handleOptionClick}
          symbolMap={symbolMap}
          filterType={filterType}
          filterValue={filterValue}
          onFilterValueChange={onFilterValueChange}
          handleFilterByUPCChange={handleFilterByUPCChange}
          formFilters={formFilters}
          handleFormInputChange={handleFormInputChange}
          handleSubmit={handleSubmit}
          filterByUPC={filterByUPC}
          openQuantity={openQuantity}
          toggleQuantityDropdown={toggleQuantityDropdown}
          handleQuantityClick={handleQuantityClick}
          quantityMap={quantityMap}
          filterQuantityType={filterQuantityType}
          filterQuantityValue={filterQuantityValue}
          onFilterQuantityChange={onFilterQuantityChange}
        />
        {/* <div>
        {currentItems.length > 0 && (
          <p className="lg:ms-4">{currentItems.length} products match your criteria.</p>
        )}
        </div> */}
      </div>
      {/* Modal */}
      <Modal
        className="p-5" style={{ maxHeight: "80vh", overflowY: "auto" }}
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedProduct && selectedProduct.name ? `Title: ${selectedProduct && selectedProduct.name}` : ''}
          </ModalHeader>
          <ModalBody>
            {selectedProduct && (
              <>
                <div>
                  <p>{selectedProduct.metric_size ? `METRIC_SIZE: ${selectedProduct.metric_size}` : ''}</p>
                  <p>{selectedProduct.description ? `Description: ${selectedProduct.description}` : ''}</p>
                  <p>{selectedProduct.user_id ? `USER ID: ${selectedProduct.user_id}` : ''}</p>
                  <p>{selectedProduct.retail ? `RETAIL: ${selectedProduct.retail}` : ''}</p>
                  <p>{selectedProduct.cad_price ? `CAD_PRICE: ${selectedProduct.cad_price}` : ''}</p>
                  <p>{selectedProduct.eur_price ? `EUD_PRICE: ${selectedProduct.eur_price}` : ''}</p>
                  <p>{selectedProduct.gbp_price ? `GBP_PRICE: ${selectedProduct.gbp_price}` : ''}</p>
                  <p>{selectedProduct.item ? `ITEM: ${selectedProduct.item}` : ''}</p>
                  <p>{selectedProduct.qty ? `QUANTITY: ${selectedProduct.qty}` : ''}</p>
                  <p>{selectedProduct.size ? `SIZE: ${selectedProduct.size}` : ''}</p>
                  <p>{selectedProduct.url ? `URL: ${selectedProduct.url}` : ''}</p>
                  <p>{selectedProduct.aud_price ? `PRICE: ${selectedProduct.aud_price}` : ''}</p>
                </div>
                <div>
                  {/* Lipsey */}
                  <p>{selectedProduct.additionalfeature1 && `Feature1: ${selectedProduct.additionalfeature1}`}</p>
                  <p>{selectedProduct.additionalfeature2 && `Feature2: ${selectedProduct.additionalfeature2}`}</p>
                  <p>{selectedProduct.additionalfeature3 && `Feature3: ${selectedProduct.additionalfeature3}`}</p>
                  <p>{selectedProduct.itemnumber && `Itemnumber: ${selectedProduct.itemnumber}`}</p>
                  <p>{selectedProduct.description1 && `Description1: ${selectedProduct.description1}`}</p>
                  <p>{selectedProduct.description2 && `Description2: ${selectedProduct.description2}`}</p>
                  <p>{selectedProduct.calibergauge && `Calibergauge: ${selectedProduct.calibergauge}`}</p>
                  <p>{selectedProduct.capacity && `Capacity: ${selectedProduct.capacity}`}</p>
                  <p>{selectedProduct.family && `Family: ${selectedProduct.family}`}</p>
                  <p>{selectedProduct.finish && `Finish: ${selectedProduct.finish}`}</p>
                  <p>{selectedProduct.itemgroup && `Itemgroup: ${selectedProduct.itemgroup}`}</p>
                  <p>{selectedProduct.itemheight && `Itemheight: ${selectedProduct.itemheight}`}</p>
                  <p>{selectedProduct.itemlength && `Itemlength: ${selectedProduct.itemlength}`}</p>
                  <p>{selectedProduct.itemwidth && `Itemwidth: ${selectedProduct.itemwidth}`}</p>
                  <p>{selectedProduct.magazine && `Magazine: ${selectedProduct.magazine}`}</p>
                  <p>{selectedProduct.packageheight && `Packageheight: ${selectedProduct.packageheight}`}</p>
                  <p>{selectedProduct.packagelength && `Packagelength: ${selectedProduct.packagelength}`}</p>
                  <p>{selectedProduct.packagewidth && `Packagewidth: ${selectedProduct.packagewidth}`}</p>
                  <p>{selectedProduct.manufacturer && `Manufacturer: ${selectedProduct.manufacturer}`}</p>
                  <p>{selectedProduct.shippingweight && `Shippingweight: ${selectedProduct.shippingweight}`}</p>
                  <p>{selectedProduct.sightstype && `Sightstype: ${selectedProduct.sightstype}`}</p>
                  <p>{selectedProduct.stockframegrips && `Stockframegrips: ${selectedProduct.stockframegrips}`}</p>
                </div>
                <div>
                  {/* cwr */}
                  <p>{selectedProduct.category_name && 'Name: ' + selectedProduct.category_name}</p>
                  <p>{selectedProduct.manufacturer_name && 'Brand: ' + selectedProduct.manufacturer_name}</p>
                  <p>{selectedProduct.country_of_origin && 'Country of origin: ' + selectedProduct.country_of_origin}</p>
                  <p>{selectedProduct.shipping_weight && 'Shipping weight: ' + selectedProduct.shipping_weight}</p>
                  <p>{selectedProduct.harmonization_code && 'Harmonization code: ' + selectedProduct.harmonization_code}</p>
                  <p>{selectedProduct.category_id && 'Category ID: ' + selectedProduct.category_id}</p>
                  <p>{selectedProduct.exportable && 'Exportable: ' + selectedProduct.exportable}</p>
                  <p>{selectedProduct.fcc_id && 'Fcc ID: ' + selectedProduct.fcc_id}</p>
                  <p>{selectedProduct.box_height && 'Box Height: ' + selectedProduct.box_height}</p>
                  <p>{selectedProduct.manufacturer_part_number && 'Manufacturer part number: ' + selectedProduct.manufacturer_part_number}</p>
                  <p>{selectedProduct.sku && 'SKU: ' + selectedProduct.sku}</p>
                  <p>{selectedProduct.title && 'Title: ' + selectedProduct.title}</p>
                </div>
                {/* SSI */}
                <div>
                  <p>{selectedProduct.detaileddescription && 'Detaileddescription: ' + selectedProduct.detaileddescription}</p>
                  <p>{selectedProduct.status && 'Status: ' + selectedProduct.status}</p>
                  <p>{selectedProduct.groundshippingrequired && 'Groundshippingrequired: ' + selectedProduct.groundshippingrequired}</p>
                  <p>{selectedProduct.datecreated && 'Datecreated: ' + selectedProduct.datecreated}</p>
                  <p>{selectedProduct.countryoforigin && 'Countryoforigin: ' + selectedProduct.countryoforigin}</p>
                  <p>{selectedProduct.shippingheight && 'Shippingheight: ' + selectedProduct.shippingheight}</p>
                  <p>{selectedProduct.shippinglength && 'Shippinglength: ' + selectedProduct.manufacturer}</p>
                  <p>{selectedProduct.shippingwidth && 'Sippingwidth: ' + selectedProduct.shippingwidth}</p>
                </div>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              CANCEL
            </Button>
            <Button className="bg-[#089451] text-white" onPress={onClose}>
              ADD TO PRODUCT
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="lg:ms-[26%] py-40 bg-green-50 p-10">
      {loader && (
              <div className="flex justify-center items-center">
                <img
                  src={gif}
                  alt="Loading..."
                  className="lg:ms-[-100px] border p-3 shadow-xl rounded-xl w-[50px] mt-10"
                />
              </div>
            )}
      {error ? (
        <div className="lg:ms-[36%] text-red-500 text-xl mb-4">{error}</div>
      ) : (
        <div className="flex gap-6 mb-34">
          <div className="rounded-lg overflow-hidden">
            {!loader &&
              (paginatedItems.length > 0 && currentItems.length > 0 ? (
                <>
                  {viewMode === "list" ? (
                    <div className="list-view-container">
                      {/* List view  */}
                      {paginatedItems.map((product, index) => (
                        <div
                          onClick={() => handleProductClick(product)}
                          className={`${filterOpen
                            ? "grid grid-cols-3 mt-10 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
                            : "grid grid-cols-3 mt-0 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
                            }`}
                          key={index}
                        >
                          <div className="">
                            {/* FRAGRANCEX */}
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.image}
                                className="w-20 mt-10 flex justify-center items-center rounded-md mx-auto object-cover"
                              />
                            ) : (
                              ''
                            )}
                            {/* LIPSEY*/}
                            {product.imagename ? (
                              <img
                                src={`https://www.lipseyscloud.com/images/${product.imagename}`}
                                alt={product.imagename}
                                className="w-20 mt-10 flex justify-center items-center rounded-md mx-auto object-cover"
                              />
                            ) : (
                              ''
                            )}
                            {/* CWR */}
                            {product.image_300x300_url ? (
                              <img
                                src={product.image_300x300_url}
                                alt={product.image_300x300_url}
                                className="w-20 mt-5 flex justify-center items-center rounded-md mx-auto object-cover"
                              />
                            ) : (
                              ''
                            )}
                            {/* SSI */}
                            {product.imageurl ? (
                              <img
                                src={product.imageurl}
                                alt={product.imageurl}
                                className="w-20 mt-5 flex justify-center items-center rounded-md mx-auto object-cover"
                              />
                            ) : (
                              ''
                            )}
                          </div>
                          {/* FragranceX */}
                          
                          <div className="p-4 bg-green-50 my-5 flex flex-col justify-center m-0 rounded-xl">
                            {/* <p>{product.title ? `TITLE: ${product.title}` : ""}</p> */}
                            <p>{product.name ? `NAME: ${product.name}` : ""}</p>

                            {/* Lipsey */}
                            <p>{product.type || product.category_name || product.category ? `NAME: ${product.type || product.category_name || product.category} ` : ""}</p>
                            <p>{product.manufacturer || product.manufacturer_name ? `BRAND: ${product.manufacturer || product.manufacturer_name}` : ""}</p>
                            <p>{product.price ? `PRICE: ${product.price}` : ""}</p>
                          </div>
                          <div className="p-4 flex flex-col justify-center rounded-xl">
                            {/* FragranceX */}

                            <p>{product.model || product.title ? `TITLE: ${product.model || product.title}` : ""}</p>
                            <p>{product.brand ? `BRAND: ${product.brand}` : ""}</p>
                            <p>{product.gender ? `GENDER: ${product.gender}` : ""}</p>
                            {/* Lipsey */}

                            <p>{product.quantity || product.quantity_available_to_ship_combined ? `QUANTITY: ${product.quantity || product.quantity_available_to_ship_combined}` : ""}</p>
                            <p>{product.upc || product.upc_code || product.upccode ? `UPC: ${product.upc || product.upc_code || product.upccode}` : ""}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:px-0 px-4 lg:grid-cols-4">
                      {/* Grid view  */}
                      {paginatedItems.map((product, index) => (
                        <div
                          onClick={() => handleProductClick(product)}
                          className={`${filterOpen
                            ? "mt-10 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
                            : "mt-0 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
                            }`}
                          key={index}
                        >
                          <div className="px-4">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.image}
                                className="w-20 mt-10 flex justify-center items-center rounded-md mx-auto object-cover"
                              />
                            ) : (
                              ''
                            )}
                            {/* CWR */}
                            {product.image_300x300_url ? (
                              <img
                                src={product.image_300x300_url}
                                alt={product.image_300x300_url}
                                className="w-20 mt-5 flex justify-center items-center rounded-md mx-auto object-cover"
                              />
                            ) : (
                              ''
                            )}
                            {/* LIPSEY*/}
                            {product.imagename ? (
                              <img
                                src={`https://www.lipseyscloud.com/images/${product.imagename}`}
                                alt={product.imagename}
                                className="w-20 mt-10 flex justify-center items-center rounded-md mx-auto object-cover"
                              />
                            ) : (
                              ''
                            )}
                            {/* SSI */}
                            {product.imageurl ? (
                              <img
                                src={product.imageurl}
                                alt={product.imageurl}
                                className="w-20 mt-5 flex justify-center items-center rounded-md mx-auto object-cover"
                              />
                            ) : (
                              ''
                            )}
                            {/* FragranceX */}
                            {/* <p>{product.title ? `TITLE: ${product.title}` : ""}</p> */}
                            <p>{product.name || product.category ? `NAME: ${product.name || product.category}` : ""}</p>
                            <p>{product.brand ? `BRAND: ${product.brand}` : ""}</p>
                            <p>{product.gender ? `GENDER: ${product.gender}` : ""}</p>

                            {/* Lipsey */}
                            <p>{product.model || product.title ? `TITLE: ${product.model || product.title}` : ""}</p>
                            <p>{product.manufacturer || product.manufacturer_name ? `BRAND: ${product.manufacturer || product.manufacturer_name}` : ""}</p>
                            <p>{product.price ? `PRICE: ${product.price}` : ""}</p>
                            <p>{product.quantity ? `QUANTITY: ${product.quantity}` : ""}</p>
                            <p>{product.upc || product.upccode ? `UPC: ${product.upc || product.upccode}` : ""}</p>
                            {/* cwr */}
                            {/* <p>{product.manufacturer_name && 'BRAND: '+ product.manufacturer_name}</p> */}
                            <p>{product.category_name && 'NAME: ' + product.category_name}</p>
                            <p>{product.upc_code && 'UPC: ' + product.upc_code}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-black text-xl lg:ms-[100px] w-[90%] mt-20">
                  Sorry, we couldn't find any results
                </div>
              ))}
          </div>
        </div>
      )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Catalogue;