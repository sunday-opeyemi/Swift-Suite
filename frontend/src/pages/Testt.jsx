// import React, { useEffect, useState } from "react";
// import { BsSearch } from "react-icons/bs";
// import axios from "axios";
// import CustomPagination from "./CustomPagination";
// import gif from "../Images/gif.gif";
// // import Sort from "../components/Sortcomponent/Sort";
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { BsFillFilterSquareFill } from "react-icons/bs";
// import { FaList, FaTh } from 'react-icons/fa';

// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   Button,
//   useDisclosure,
//   ModalFooter,
// } from "@nextui-org/react";

// const Catalogue = () => {
//   const navigate = useNavigate()
//   const token = JSON.parse(localStorage.getItem("token"));
//   console.log(token);
//   const [catalogueProduct, setCatalogueProduct] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(0);
//   const [currentItems, setCurrentItems] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [loader, setLoader] = useState(false);
//   // const [uniqueBrand, setUniqueBrand] = useState([]);
//   const [title, setTitle] = useState([]);
//   const [filterOpen, setfilterOpen] = useState(false)
//   const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'


//   const itemsPerPage = 99;

//   const { isOpen, onOpen, onClose } = useDisclosure();


//   const [formFilters, setFormFilters] = useState({
//     name: "",
//     price: "",
//     brand: "",
//     title: "",
//     gender: "",
//   });

//   let endpoint =
//     "https://service.swiftsuite.app/vendor/catalogue-fragrancex/46/";

//   useEffect(() => {
//     fetchData();
//   }, [token]);

//   useEffect(() => {
//     filterCatalogueProduct();
//   }, [catalogueProduct, searchQuery, currentPage]);

//   const fetchData = async () => {
//     try {
//       setLoader(true);
//       const response = await axios.get(endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });
//       console.log(response.data);
//       setCatalogueProduct(response.data);
//       setLoader(false);
//     } catch (error) {
//       setLoader(false);
//       console.log(error);
//       if(error.response.data.detail){
//         console.log('Token has expired');
//         toast.error("Token has expired");
//         localStorage.removeItem("token")
//           navigate('/signin')
//       }
//     }
//   };


//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(0); // Reset currentPage when search query changes
//   };

//   const handlePageChange = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   useEffect(() => {
//     if (catalogueProduct) {
//       const title = [...new Set(catalogueProduct.map((item) => item.title))];
//       setTitle(title);
//     }
//   }, [catalogueProduct]);

//   const handleProductClick = (product) => {
//     // Step 2: Function to handle product click
//     setSelectedProduct(product);
//     onOpen(); // Step 3: Open the modal
//   };



//   const handleFormInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormFilters({ ...formFilters, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Selected formFilters:", formFilters);
//     // Perform filtering logic here...
//     filterCatalogueProduct();
//     setFormFilters({ ...formFilters, title: "" });
//   };

//   const filterCatalogueProduct = () => {
//     let filteredItems = [...catalogueProduct];

//     // Apply form filters
//     if (formFilters.name.trim() !== "") {
//       filteredItems = filteredItems.filter((item) =>
//         item.name.toLowerCase().includes(formFilters.name.toLowerCase())
//       );
//     }

//     if (formFilters.title.trim() !== "") {
//       filteredItems = filteredItems.filter((item) =>
//         item.title.toLowerCase().includes(formFilters.title.toLowerCase())
//       );
//     }

//     if (formFilters.price !== "") {
//       filteredItems = filteredItems.filter(
//         (item) => item.price === parseFloat(formFilters.price)
//       );
//     }

//     if (formFilters.brand !== "") {
//       filteredItems = filteredItems.filter(
//         (item) => item.brand.toLowerCase() === formFilters.brand.toLowerCase()
//       );
//     }

//     if (formFilters.gender !== "") {
//       filteredItems = filteredItems.filter(
//         (item) => item.gender.toLowerCase() === formFilters.gender.toLowerCase()
//       );
//     }

//     // Apply other filters
//     filteredItems = filteredItems.filter((item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     // Update the current items
//     setCurrentItems(filteredItems);
//   };


//   const filterControl = () => {
//     setfilterOpen(!filterOpen)
//     console.log(filterOpen);
//   }

//   const toggleViewMode = () => {
//     setViewMode((prevMode) => (prevMode === 'list' ? 'grid' : 'list'));
//   };


//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   const paginatedItems = currentItems.slice(startIndex, endIndex);

//   const vendorIndex = (i) => {
//     console.log(i);
//   };

//   return (
//     <div className="bg-green-50 h-screen ">
//      <section className={filterOpen ? "fixed border h-[40%] lg:gap-14 w-[100%] top-14 bg-[#089451] py-10 lg:ps-32 lg:ms-[22%] lg:me-[2%]" : "fixed border lg:gap-14 w-[100%] top-14 bg-[#089451] py-10 lg:ps-32 lg:ms-[22%] lg:me-[2%]"}>
//         <div className="flex h-[25%] gap-10">
//           <div className="rounded-2xl pt-1 focus:outline-none p-2 bg-white h-[40px]">
//             <button className="flex gap-1" onClick={filterControl}>
//               <span className="mt-1">Filter</span>
//               <span className="mt-[9px] text-[#089451]"><BsFillFilterSquareFill /></span>
//             </button>
//           </div>
//           <div className="flex lg:w-[45%] md:w-[100%] rounded-2xl h-[40px]  md:ms-0 items-center lg:gap-[100px] md:gap-[100px] bg-white">
//             <input
//               className="lg:block py-3 hidden bg-transparent outline-none px-2  w-[120px] md:w-[100%]"
//               type="text"
//               placeholder="Search for products by keyword"
//               value={searchQuery}
//               onChange={handleSearch}
//             />
//             <button
//               type="submit"
//               className="lg:block hidden text-white bg-[#089451] px-3 h-[34px] rounded-r-2xl cursor-pointer lg:ms-28"
//             >
//               <BsSearch className="lg:block hidden" />
//             </button>
//           </div>
//         <div className="flex gap-2 bg-white rounded-xl h-[40px] p-2">
//           <button onClick={toggleViewMode} className="text-[#089451]">
//           {viewMode === 'list' ? <FaTh size={20} /> : <FaList size={20} />}
//           </button>
          
//         </div>
//         </div>
//       </section>
//       <div className={filterOpen ? "ms-[26%] mt-14 fixed  text-white" : 'hidden'}>
//         {/* {message} */}

//         {/* Pagination */}
//         {currentItems.length > 0 && (
//           <CustomPagination
//             pageCount={Math.ceil(currentItems.length / itemsPerPage)}
//             onPageChange={handlePageChange}
//             currentPage={currentPage}
//             itemsPerPage={itemsPerPage}
//             totalItems={currentItems.length}
//           />
//         )}

//         <form
//           className="w-full grid lg:grid-cols-4 my-4 lg:ms-[12%]"
//           onSubmit={handleSubmit}
//         >
//           <input
//             className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border border-black w-[80%] focus:bg-black"
//             type="text"
//             placeholder="Search by name"
//             name="name"
//             value={formFilters.name}
//             onChange={handleFormInputChange}
//           />

//           <input
//             className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border border-black w-[80%] focus:bg-black"
//             type="number"
//             placeholder="Filter by price"
//             name="price"
//             value={formFilters.price}
//             onChange={handleFormInputChange}
//           />

//           <select
//             className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border border-black w-[80%] focus:bg-black"
//             name="title"
//             value={formFilters.title}
//             onChange={handleFormInputChange}
//           >
//             <option value="title">Title</option>
//             {title.map((item, index) => (
//               <option key={index} value={item}>
//                 {item}
//               </option>
//             ))}
//           </select>


//           <input
//             className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border border-black w-[80%] focus:bg-black"
//             type="text"
//             placeholder="Filter by brand"
//             name="brand"
//             value={formFilters.brand}
//             onChange={handleFormInputChange}
//           />


//           <input
//             className="rounded-md p-2 sm:text-xs lg:text-base bg-transparent border border-black w-[80%] focus:bg-black"
//             type="text"
//             placeholder="Filter by gender"
//             name="gender"
//             value={formFilters.gender}
//             onChange={handleFormInputChange}
//           />
      

//           {currentItems.length > 0 && (
//             <p>{currentItems.length} products match your criteria.</p>
//           )}
//           <button className="bg-white rounded-xl w-[40%] mt-3 text-black" type="submit">Search</button>
//         </form>
//         {/* <Sort
//           className="ms-[80%]"
//           setCurrentItems={setCurrentItems}
//           catalogueProduct={catalogueProduct}
//         /> */}
//       </div>

//       <div className="lg:ms-[22%] py-40 bg-green-50 p-10">
//         <div className="flex gap-6 mb-34">
//           <div className=" rounded-lg overflow-hidden">
//             {viewMode === 'list' ? (
//             {loader && (
//               <div className="flex justify-center items-center">
//                 <img
//                   src={gif}
//                   alt="Loading..."
//                   className="
//                lg:ms-[400px] w-[100px] mt-10"
//                 />
//               </div>
//             )}
//             {!loader &&
//               (paginatedItems.length > 0 && currentItems.length > 0 ? (
//                 paginatedItems.map((product, index) => (
//                   <div
//                     onClick={() => handleProductClick(product)}
//                     className="grid grid-cols-3 mt-10 shadow-xl cursor-pointer rounded-xl bg-white mb-5"
//                     key={index}
//                   >
//                     <div className="p-4">
//                       <img
//                         src={product.image}
//                         alt={product.image}
//                         className="w-60 mt-10 flex justify-center items-center rounded-md mx-auto object-cover"
//                       />
//                     </div>
//                     <div className="p-4 bg-green-50 my-5 rounded-xl">
//                       <p>NAME: {product.name}</p>
//                       <p>BRAND: {product.brand}</p>
//                       <p>PRICE: {product.aud_price}</p>
//                       <p>GENDER: {product.gender}</p>
//                       <p>TITLE: {product.title}</p>
//                       <p>UPC: {product.upc}</p>
//                       <p>PRICE: {product.price}</p>
//                     </div>
//                     <div className="p-4">
//                       <p className="text-green-300 hover:text-black">
//                         URL: {product.url}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-black text-xl lg:ms-[100px] w-[90%] mt-20">
//                   Sorry, we couldn't find any results
//                 </div>
//               ))})}
//           </div>
//         </div>

//         <Modal
//           className="p-5"
//           isOpen={isOpen}
//           onClose={onClose}
//           isDismissable={false}
//         >
//           <ModalContent>
//             <ModalHeader className="flex flex-col gap-1">
//               Title: {selectedProduct && selectedProduct.name}
//             </ModalHeader>
//             <ModalBody>
//               {selectedProduct && (
//                 <>
//                       <p>METRIC_SIZE: {selectedProduct.metric_size}</p>
//                       <p>Description: {selectedProduct.description}</p>
//                       <p>USER ID: {selectedProduct.user_id}</p>
//                       <p>RETAIL: {selectedProduct.retail}</p>
//                       <p>CAD_PRICE: {selectedProduct.cad_price}</p>
//                       <p>EUD_PRICE: {selectedProduct.eur_price}</p>
//                       <p>GBP_PRICE: {selectedProduct.gbp_price}</p>
//                       <p>ITEM: {selectedProduct.item}</p>
//                       <p>QTY: {selectedProduct.qty}</p>
//                       <p>SIZE: {selectedProduct.size}</p>
//                 </>
//               )}
//             </ModalBody>
//             <ModalFooter>
//               <Button color="danger" variant="light" onPress={onClose}>
//                 CANCEL
//               </Button>
//               <Button className="bg-[#089451] text-white" onPress={onClose}>
//                 ADD TO PRODUCT
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Catalogue;
