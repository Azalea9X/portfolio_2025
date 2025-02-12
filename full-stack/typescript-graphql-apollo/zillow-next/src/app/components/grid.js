"use client";
import { useState, useEffect } from "react";
import Card from "./card";
import Map from "./map";

// ... (getProperties remains unchanged) ...

const Grid = ({ properties }) => {
    let [selectedProperty, setSelectedProperty] = useState("");
    let [filteredProperties, setFilteredProperties] = useState(properties || []);

    //Extract unique property names for the dropdown.  Error handling added.
    const propertyNames = properties ? [...new Set(properties.map(p => p.name || "").filter(name => name !== ""))] : [];


    const handlePropertyChange = (event) => {
        setSelectedProperty(event.target.value);
       
        if (selectedProperty) {
       let filtered = properties.filter(p=> {
        
        return JSON.stringify(selectedProperty) === JSON.stringify(p);
     
       });
 







setFilteredProperties(filtered);
for (const x in selectedProperty) {


}
    }}


   useEffect(() => {
  console.log(selectedProperty);

  if (selectedProperty === "") {
    setFilteredProperties(properties); // Show all properties if nothing is selected
  } else {
    const filteredProperties = properties.filter(property => property.name === selectedProperty);
    setFilteredProperties(filteredProperties);
    const listingsElement = document.querySelector("article.listings");
    listingsElement.innerHTML = ''; // Clear existing listings
    filteredProperties.forEach(property => {
      const card = document.createElement('div');
      card.classList.add('searchCard'); // Add card class for styling purposes. This class is not defined in the provided code snippet.
      card.innerHTML = `<h2>${property.name}</h2>
      <h3>Description: ${property.description}</h3>
      <h3>Price: ${property.price}</h3>
      <h3>Location: Latitude- ${property.location.lattitude} Longitude- ${property.location.longitude}</h3>
      
      <img src="${property.images.url}" alt="${property.description}"/>
      `;
      listingsElement.appendChild(card);
    });
  }
}, [selectedProperty, properties]);

    return (
        <div>
            <label htmlFor="propertySelect">Select Property:</label>
            <select id="propertySelect" value={selectedProperty} onChange={handlePropertyChange}>
                <option value="">All Properties</option> {/*Show all option*/}
                {propertyNames.map((propertyName) => (
                    <option key={propertyName} value={propertyName}>
                        {propertyName}
                    </option>
                ))}
            </select>
          
        </div>
    );
};

export default Grid;
