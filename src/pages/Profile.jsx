import { useState, useRef } from "react";
import "./ProfilePictureButton.css";

const ProfilePictureButton = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const fileInputRef = useRef(null); // Reference to hidden file input

  const resizeAndCropToCircle = (file, size, quality, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = size;
        canvas.height = size;

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        const scale = Math.max(size / img.width, size / img.height);
        const x = (size - img.width * scale) / 2;
        const y = (size - img.height * scale) / 2;

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

        const compressedImage = canvas.toDataURL("image/jpeg", quality);
        callback(compressedImage);
      };
    };
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      resizeAndCropToCircle(file, 200, 0.8, (compressedImage) => {
        setImage(compressedImage);
      });
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-container">
      {/* Profile Picture Container */}
      <div className="profile-picture">
        <img src={image || "/default-avatar.png"} alt="Profile" className="profile-image" />

        {/* Floating "+" Button */}
        <button className="plus-button" onClick={handleButtonClick}>+</button>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden-input"
        onChange={handleImageChange}
      />

      {/* Text Box Below the Profile Picture */}
      <input
        type="text"
        className="profile-name-input"
        placeholder="Enter Name"
        maxLength="20" /* Prevents infinite text input */
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

export default ProfilePictureButton;
