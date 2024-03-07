import { checkbox } from '@nextui-org/react';
import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { IoChevronDown } from 'react-icons/io5'


const Producttype = () => {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: 'RSR', checked: false },
    { id: 2, label: 'Shoes', checked: false },
    { id: 3, label: 'Heels', checked: false },
    { id: 4, label: 'Jackets', checked: false },
    { id: 5, label: 'Stationeries', checked: false },
    { id: 6, label: 'Shoes', checked: false },
    { id: 7, label: 'Shoes', checked: false },
    { id: 8, label: 'Glasses', checked: false },
  ]);




  const [checkBoxesProduct, setCheckBoxesProduct] = useState([
    { id: 1, label: 'RSR', checked: false },
    { id: 2, label: 'Shoes', checked: false },
    { id: 3, label: 'Heels', checked: false },
    { id: 4, label: 'Jackets', checked: false },

  ]);
  const [isChecked, setIsChecked] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [order, setOrder] = useState(false);
  const [tracking, setTracking] = useState(false);

  console.log(isChecked);
  console.log(inventory);
  console.log(order);
  console.log(tracking);

  const [host, setHost] = useState(false)
  const [hostCategory, setHostCategory] = useState(false)
  const [brand, setBrand] = useState(false)


  // const onSubmit = (data) => {
  //   let form = { ...store, ...data }
  //   console.log(form);
  //   dispatch(handleNextStep(form))
  // }

  const SelectAll = (e) => {
    e.preventDefault()
    const updatedCheckboxes = checkboxes.map(checkbox => ({ ...checkbox, checked: true }));
    // console.log(checkboxes);
    setCheckboxes(updatedCheckboxes);
  };

  const DeselectAll = (e) => {
    e.preventDefault()
    const Deselect = checkboxes.map(checkbox => ({ ...checkbox, checked: false }));
    // console.log(Deselect);
    setCheckboxes(Deselect)
  };
  
  const handleCheckboxChange = (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids]; // Convert to array if single ID is provided
    }

    const updatedCheckboxes = checkboxes.map(checkbox => {
        if (ids.includes(checkbox.id)) {
            return { ...checkbox, checked: !checkbox.checked };
        }
        return checkbox;
    });

    setCheckboxes(updatedCheckboxes);

    ids.forEach(id => {
        const clickedCheckbox = updatedCheckboxes.find(checkbox => checkbox.id === id);
        if (clickedCheckbox) {
            console.log(clickedCheckbox.label + ': ' + clickedCheckbox.checked);
        } else {
            console.log('Checkbox not found');
        }
    });
};



const handleCheckboxProduct = (ids) => {
    if (!Array.isArray(ids)) {
        ids = [ids]; // Convert to array if single ID is provided
    }

    const updatedCheckboxes = checkBoxesProduct.map(checkbox => {
        if (ids.includes(checkbox.id)) {
            return { ...checkbox, checked: !checkbox.checked };
        }
        return checkbox;
    });

    setCheckBoxesProduct(updatedCheckboxes);
    ids.forEach(id => {
        const clickedCheckbox = updatedCheckboxes.find(checkbox => checkbox.id === id);
        if (clickedCheckbox) {
            console.log(clickedCheckbox.label + ': ' + clickedCheckbox.checked);
        } else {
            console.log('Checkbox not found');
        }
    });
};





  const toggleUp = () => {
    setHost(false);
  };

  const toggleDown = () => {
    setHost(true);
  };

  const toggleUpCategory = () => {
    setHostCategory(false);
  };

  const toggleDownCategory = () => {
    setHostCategory(true);
  };


  const toggleUpBrand = () => {
    setBrand(false);
  };

  const toggleDownBrand = () => {
    setBrand(true);
  };





  return (
    <div>ProductType</div>
  )
}

export default ProductType