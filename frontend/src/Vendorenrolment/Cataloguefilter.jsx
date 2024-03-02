import React from 'react'

const Cataloguefilter = () => {

// function SelectAllOptions() {
//     const [selectedOptions, setSelectedOptions] = useState([]);

//     const options = [
//         { value: "1", label: "Option 1" },
//         { value: "2", label: "Option 2" },
//         { value: "3", label: "Option 3" }
//         // Add more options as needed
//     ];

//     const handleSelectAll = () => {
//         setSelectedOptions(options.map(option => option.value));
//     };

//     const handleOptionChange = (e) => {
//         const { value, checked } = e.target;
//         if (checked) {
//             setSelectedOptions([...selectedOptions, value]);
//         } else {
//             setSelectedOptions(selectedOptions.filter(option => option !== value));
//         }
//     };

//     return (
//         <div>
//             <select multiple>
//                 {options.map(option => (
//                     <option key={option.value} value={option.value} onChange={handleOptionChange}>
//                         {option.label}
//                     </option>
//                 ))}
//             </select>
//             <button onClick={handleSelectAll}>Select All Options</button>
//         </div>
//     );
// }

  return (
    <div>Cataloguefilter</div>
  )
}

export default Cataloguefilter