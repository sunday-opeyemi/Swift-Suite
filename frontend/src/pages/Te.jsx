import React, { useEffect, useState, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import CustomPagination from "./CustomPagination";
import gif from '../Images/gif.gif'
import Sort from "../components/Sortcomponent/Sort";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";

const Catalogue = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  const [catalogueProduct, setCatalogueProduct] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loader, setLoader] = useState(false);

  const itemsPerPage = 99;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const observer = useRef(null);

  let endpoint =
    "https://service.swiftsuite.app/vendor/catalogue-fragrancex/46/";

  useEffect(() => {
    fetchData();
  }, [token, currentPage]);

  useEffect(() => {
    filterCatalogueProduct();
  }, [catalogueProduct, searchQuery, currentPage]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the element is visible
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setCurrentPage((prevPage) => prevPage + 1); // Load next page
    }
  };

  const fetchData = async () => {
    try {
      setLoader(true);
      const response = await axios.get(`${endpoint}?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(response.data);
      setCatalogueProduct((prevProducts) => [...prevProducts, ...response.data]);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error);
    }
  };

  const filterCatalogueProduct = () => {
    const filteredItems = catalogueProduct.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCurrentItems(filteredItems);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0); // Reset currentPage when search query changes
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedItems = currentItems.slice(startIndex, endIndex);

  return (
    <div className="bg-green-50 h-screen">
      <section className="fixed h-[40%] border lg:gap-14 w-[100%] top-14 bg-[#089451] py-10 lg:ps-40 lg:ms-[22%] lg:me-[2%]">
        <div className="flex h-[25%] gap-10">
          <div className="rounded-2xl pt-1 focus:outline-none p-2 bg-white">
            <span value="">Adv Search</span>
          </div>

          <div className="flex lg:w-[45%] md:w-[100%] rounded-2xl  md:ms-0 items-center lg:gap-[100px] md:gap-[100px] bg-white">
            <input
              className="lg:block py-3 hidden bg-transparent outline-none px-2  w-[120px] md:w-[100%]"
              type="text"
              placeholder="Search for products by keyword"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              type="submit"
              className="lg:block hidden text-white bg-[#089451] px-3 h-[34px] rounded-r-2xl cursor-pointer lg:ms-28"
            >
              <BsSearch className="lg:block hidden" />
            </button>
          </div>
        </div>
      </section>
      <div className="ms-[26%] mt-14 fixed  text-white">
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
        <Sort
          className="ms-[80%]"
          setCurrentItems={setCurrentItems}
          catalogueProduct={catalogueProduct}
        />
      </div>

      <div className="lg:ms-[22%] py-40 bg-green-50 p-10">
        <div className="flex gap-6 mb-34">
          <div className=" rounded-lg overflow-hidden">
            {loader && (
              <div className="flex justify-center items-center">
                <img src={gif} alt="Loading..." className="w-[100px] mt-20" />
              </div>
            )}
            {!loader && paginatedItems.length > 0 ? (
              paginatedItems.map((product, index) => (
                <div
                  onClick={() => handleProductClick(product)}
                  className="grid grid-cols-3 mt-10 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
                  key={index}
                >
                  <div className="p-4">
                    <img
                      src={product.image}
                      alt={product.image}
                      className="w-60 mt-10 flex justify-center items-center rounded-md mx-auto object-cover"
                    />
                  </div>
                  <div className="p-4 bg-green-50 my-5 rounded-xl">
                    <p>ID: {product.id}</p>
                    <p>NAME: {product.name}</p>
                    <p>BRAND: {product.brand}</p>
                    <p>PRICE: {product.aud_price}</p>
                    <p>CAD_PRICE: {product.cad_price}</p>
                    <p>EUD_PRICE: {product.eur_price}</p>
                    <p>GBP_PRICE: {product.gbp_price}</p>
                    <p>GENDER: {product.gender}</p>
                    <p>ITEM: {product.item}</p>
                    <p>QTY: {product.qty}</p>
                    <p>SIZE: {product.size}</p>
                    <p>TITLE: {product.title}</p>
                    <p>UPC: {product.upc}</p>
                    <p>PRICE: {product.price}</p>
                  </div>
                  <div className="p-4">
                    <p>METRIC_SIZE: {product.metric_size}</p>
                    <p>Description: {product.description}</p>
                    <p>USER ID: {product.user_id}</p>
                    <p>RETAIL: {product.retail}</p>
                    <p className="text-green-300 hover:text-black">
                      URL: {product.url}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-black text-xl lg:ms-[100px] w-[90%] mt-20">
                Sorry, we couldn't find any results
              </div>
            )}
          </div>
        </div>

        <Modal
          className="p-5"
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
                  <p>Description: {selectedProduct.description}</p>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button className="bg-[#089451] text-white" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div ref={observer} className="loader" /> {/* Intersection Observer target */}
    </div>
  );
};

export default Catalogue;
