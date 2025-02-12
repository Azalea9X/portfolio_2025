"use client"; 
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component

const ImageCard = ({ url, filename, width, height, id }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    // No side effects are currently necessary in this component
  }, []);

  const handleImageError = () => setError(true);

  const handleImageClick = (e) => {
    // Prevent default behavior to avoid potential page reloads on click
  
    // Open a modal or trigger a custom event to display the full-size image
    // Use the id prop to uniquely identify the image for the modal
    //

  }

  const createModal = (el) => {
    // Create a modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block'; // Display the modal when the image is clicked
    modal.innerHTML = `
    <div class="modal-content">
      <img src="${url}" alt="${filename}" />
      <span class="close" style={{
      position: 'absolute',
      top: '-300px',
      right: '25px',
      cursor: 'pointer',
      fontSize: '9990px',
      color: "white!important",
      zIndex: 1000
}}
      onClick={exitModal}>×</span>
      <p>Image ID: ${id}</p>
      
      

    </div>

    
    `
    document.body.appendChild(modal);
    const btn = document.createElement('button'); 
    btn.className = 'btnModal';
    btn.textContent="Close";
    btn.addEventListener('click', (e) => {
      e.preventDefault();
modal.style.opacity="0";
document.body.removeChild(modal);
document.body.removeChild(btn);
    })
 
    modal.appendChild(btn);
   
  }

const exitModal = (el) => {
  // Close the modal when the user clicks outside of it
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.style.display = 'none';
  }
 
}


  return (
    <figure>
      <img
        src={url}
        alt={filename} // Provide a meaningful description
        width={width}
        height={height}
        layout="fixed" // Use fixed layout for consistent dimensions
        onError={handleImageError}
        onMouseEnter={
          (e) => {
            createModal(e.target);
            handleImageClick(e);
          }}

          onMouseLeave = {
            (e) => {
              exitModal(e.target);
            }
          }
        
      />
      <figcaption>{filename}</figcaption>
      {error && <p>Image failed to load.</p>}
    </figure>
  );
};

export default ImageCard;