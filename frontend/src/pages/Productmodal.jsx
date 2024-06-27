import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";


const Productmodal = ({ isOpen, onClose, selectProduct, handleChange, handleUpdateProduct, handleProductClick,  }) => {
  return (
    <Modal
        className="md:p-5 sm:p-0 " style={{ maxHeight: "80vh", overflowY: "auto", maxWidth: '100vh' }}
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
      >

        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {/* {selectedProduct && selectedProduct.name ? `Title: ${selectedProduct && selectedProduct.name}` : ''} */}
          </ModalHeader>
          <ModalBody>
            {selectProduct && (
              <>
                <div className="text-black">
                  {/* Lipsey */}
                  <div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Brand:</label>
                      <input type="text" name="brand" className="w-[100%] border text-center border-black" value={selectProduct.brand} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Category:</label>
                      <input type="text" name="category" className="w-[100%] border text-center border-black" value={selectProduct.category} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Description:</label>
                      <input type="text" name="detailed_description" className="w-[100%] border text-center border-black" value={selectProduct.detailed_description} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Model:</label>
                      <input type="text" name="model" className="w-[100%] border text-center border-black" value={selectProduct.model} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Mpn:</label>
                      <input type="text" name="mpn" className="w-[100%] border text-center border-black" value={selectProduct.mpn} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Price:</label>
                      <input type="text" name="price" className="w-[100%] border text-center border-black" value={selectProduct.price} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Quantity:</label>
                      <input type="text" name="quantity" className="w-[100%] border text-center border-black" value={selectProduct.quantity} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Shipping_height:</label>
                      <input type="text" name="shipping_height" className="w-[100%] border text-center border-black" value={selectProduct.shipping_height} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Shipping_weight:</label>
                      <input type="text" name="shipping_weight" className="w-[100%] border text-center border-black" value={selectProduct.shipping_weight} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Shipping_width:</label>
                      <input type="text" name="shipping_width" className="w-[100%] border text-center border-black" value={selectProduct.shipping_width} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Sku:</label>
                      <input type="text" name="sku" className="w-[100%] border text-center border-black" value={selectProduct.sku} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Title:</label>
                      <input type="text" name="title" className="w-[100%] border text-center border-black" value={selectProduct.title} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">User:</label>
                      <input type="text" name="user" className="w-[100%] border text-center border-black" value={selectProduct.user} onChange={handleChange} />
                    </div>
                    <div className="flex gap-5 my-2">
                      <label htmlFor="" className="w-60 font-semibold">Upc:</label>
                      <input type="text" name="upc" className="w-[100%] border text-center border-black" value={selectProduct.upc} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </ModalBody>
          <ModalFooter className="flex lg:gap-[20%] md:gap-[20%]">
            <Button className="bg-red-700 text-white" color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct} className="bg-[#089451] text-white" onPress={onClose}>
              Add to product
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
  );
};

export default Productmodal;
