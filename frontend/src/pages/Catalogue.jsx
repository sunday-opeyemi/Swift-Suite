import React, { useContext, useEffect, useState } from "react";
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
import { AppContext } from "../context/Dashboard";
import FilterComponent from "../components/FilterComponent";

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
  const [title, setTitle] = useState([]);
  const [filterOpen, setfilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState("Greater than");
  const [filterValue, setFilterValue] = useState("");
  const [filterByUPC, setFilterByUPC] = useState(false);
  console.log(filterByUPC);

  const itemsPerPage = 99;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { sideBarOpen, setSideBarOpen, isTablet } = useContext(AppContext);

  const [formFilters, setFormFilters] = useState({
    name: "",
    brand: "",
    gender: "",
  });

  let endpoint =
    "https://service.swiftsuite.app/vendor/catalogue-fragrancex/46/";

  useEffect(() => {
    fetchData();
  }, [token]);

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
      setSelectedPriceRange("all");
    } catch (error) {
      setLoader(false);
      console.log(error);
      if (error.response.data.detail) {
        console.log("Token has expired");
        toast.error("Token has expired");
        localStorage.removeItem("token");
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    if (isTablet) {
      setSideBarOpen(false);
    } else {
      setSideBarOpen(true);
    }
  }, [isTablet]);

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

  const filterCatalogueProduct = () => {
    // note my filteredItems is my catalogueProduct
    let filteredItems = [...catalogueProduct];

    // Apply form filters
    if (formFilters.name.trim() !== "") {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(formFilters.name.toLowerCase())
      );
    }

    if (formFilters.brand !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.brand.toLowerCase() === formFilters.brand.toLowerCase()
      );
    }

    if (formFilters.gender !== "") {
      filteredItems = filteredItems.filter(
        (item) => item.gender.toLowerCase() === formFilters.gender.toLowerCase()
      );
    }

    if (filterType && filterValue !== "") {
      if (filterType === "Greater than") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.aud_price) > parseFloat(filterValue)
        );
      } else if (filterType === "Greater than or equal") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.aud_price) >= parseFloat(filterValue)
        );
      } else if (filterType === "Is") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.aud_price) === parseFloat(filterValue)
        );
      } else if (filterType === "Less than") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.aud_price) < parseFloat(filterValue)
        );
      } else if (filterType === "Less than or equal") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.aud_price) <= parseFloat(filterValue)
        );
      } else if (filterType === "Is not") {
        filteredItems = filteredItems.filter(
          (item) => parseFloat(item.aud_price) != parseFloat(filterValue)
        );
      } 
      if (filterByUPC) {
        // If filter by UPC is enabled, filter items where UPC exists
        filteredItems = filteredItems.filter((item) => item.upc !== "");
      }
    }
    // Apply other filters, This is responsible for filter input.
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

  const handleFilterByUPCChange = (event) => {
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
    <div className="bg-green-50 h-screen ">
      <section
        className={
          filterOpen
            ? "fixed border h-[45%] lg:gap-14 w-[100%] top-14 bg-[#089451] py-10 lg:ps-32 lg:ms-[22%] lg:me-[2%]"
            : "fixed border lg:gap-14 w-[100%] top-14 bg-[#089451] py-10 lg:ps-32 lg:ms-[22%] lg:me-[2%]"
        }
      >
        <div className="flex h-[25%] gap-10">
          <div className="rounded-2xl pt-1 focus:outline-none p-2 bg-white h-[40px]">
            <button
              className="flex gap-1"
              onClick={() => {
                if (loader == false) {
                  filterControl();
                }
              }}
              disabled={loader == true}
            >
              <span className="mt-1">Filter</span>
              <span className="mt-[9px] text-[#089451]">
                <BsFillFilterSquareFill />
              </span>
            </button>
          </div>
          <div className="flex lg:w-[45%] md:w-[100%] rounded-2xl h-[40px]  md:ms-0 items-center lg:gap-[100px] md:gap-[100px] bg-white">
            <input
              className="py-3 bg-transparent outline-none px-2  w-[120px] md:w-[100%]"
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
          <div className="lg:block md:hidden hidden flex gap-2 bg-white rounded-xl p-2 h-[36px]">
            <button
              onClick={() => {
                toggleViewMode();
                setSideBarOpen(!sideBarOpen);
              }}
              className="text-[#089451]"
            >
              {viewMode === "list" ? <FaTh size={15} /> : <FaList size={15} />}
            </button>
          </div>
          {/* Toggle on medium and small screen */}
          <div className="lg:hidden md:block block flex gap-2 bg-white rounded-xl h-[36px] p-2">
          <button
              onClick={() => {
                toggleViewMode();
                
              }}
              className="text-[#089451]"
            >
              {viewMode === "list" ? <FaTh size={15} /> : <FaList size={15} />}
            </button>
          </div>
        </div>
      </section>
      <div
        className={filterOpen ? "ms-[24%] mt-14 fixed  text-white" : "hidden"}
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
        />
        {currentItems.length > 0 && (
                <p>{currentItems.length} products match your criteria.</p>
              )}
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
            Title: {selectedProduct && selectedProduct.name}
          </ModalHeader>
          <ModalBody>
            {selectedProduct && (
              <>
                <p>METRIC_SIZE: {selectedProduct.metric_size}</p>
                <p>Description: {selectedProduct.description}</p>
                <p>USER ID: {selectedProduct.user_id}</p>
                <p>RETAIL: {selectedProduct.retail}</p>
                <p>CAD_PRICE: {selectedProduct.cad_price}</p>
                <p>EUD_PRICE: {selectedProduct.eur_price}</p>
                <p>GBP_PRICE: {selectedProduct.gbp_price}</p>
                <p>ITEM: {selectedProduct.item}</p>
                <p>QTY: {selectedProduct.qty}</p>
                <p>SIZE: {selectedProduct.size}</p>
                <p>URL: {selectedProduct.url}</p>
                <p>PRICE: {selectedProduct.price}</p>
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

      <div className="lg:ms-[22%] py-40 bg-green-50 p-10">
        <div className="flex gap-6 mb-34">
          <div className="rounded-lg overflow-hidden">
            {loader && (
              <div className="flex justify-center items-center">
                <img
                  src={gif}
                  alt="Loading..."
                  className="lg:ms-[400px] w-[100px] mt-10"
                />
              </div>
            )}
            {!loader &&
              (paginatedItems.length > 0 && currentItems.length > 0 ? (
                <>
                  {viewMode === "list" ? (
                    <div className="list-view-container">
                      {/* List view  */}
                      {paginatedItems.map((product, index) => (
                        <div
                          onClick={() => handleProductClick(product)}
                          className={`${
                            filterOpen
                              ? "grid grid-cols-3 mt-10 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
                              : "grid grid-cols-3 mt-0 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
                          }`}
                          key={index}
                        >
                          <div className="p-4">
                            <img
                              src={product.image}
                              alt={product.image}
                              className="w-20 mt-10 flex justify-center items-center rounded-md mx-auto object-cover"
                            />
                          </div>
                          <div className="p-4 bg-green-50 my-5 rounded-xl">
                            <p>TITLE: {product.title}</p>
                            <p>NAME: {product.name}</p>
                          </div>
                          <div className="p-4">
                            <p>UPC: {product.upc}</p>
                            <p>BRAND: {product.brand}</p>
                            <p>PRICE: {product.aud_price}</p>
                            <p>GENDER: {product.gender}</p>
                            <p className="text-green-300 hover:text-black"></p>
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
                          className={`${
                            filterOpen
                              ? "mt-10 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
                              : "mt-0 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
                          }`}
                          key={index}
                        >
                          <div className="px-4">
                            <img
                              src={product.image}
                              alt={product.image}
                              className="w-20 justify-center items-center rounded-md mx-auto object-cover"
                            />
                            <p>TITLE: {product.title}</p>
                            <p>NAME: {product.name}</p>
                            <p>UPC: {product.upc}</p>
                            <p>BRAND: {product.brand}</p>
                            <p>PRICE: {product.aud_price}</p>
                            <p>GENDER: {product.gender}</p>
                            <p className="text-green-300 hover:text-black"></p>
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
      </div>
      <ToastContainer />
    </div>
  );
};

export default Catalogue;
