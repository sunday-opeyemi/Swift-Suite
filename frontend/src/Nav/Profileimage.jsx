import React, { useState } from 'react';
import avatar from '../Images/avatar.webp'

function Profileimage() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const displayImage = uploadedImage || avatar; // Path to default avatar

  return (
    <label htmlFor="avatarInput" className="h-12 w-10 rounded-full">
      <img className="rounded-full cursor-pointer" src={displayImage} alt="" />
      <input
        type="file"
        id="avatarInput"
        accept="image/*"
        className="hidden cursor-pointer"
        onChange={handleImageChange}
      />
    </label>
  );
}

export default Profileimage;
