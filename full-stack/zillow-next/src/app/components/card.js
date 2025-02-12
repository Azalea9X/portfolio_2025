"use client";

import ImageCard from "./image"; 
import { useRouter } from 'next/navigation';


const Card = ({ beds, description, images, location, name, price, slug, id }) => {
    const imgs = document.querySelectorAll("img");
    const router = useRouter();

    const handleClick = (event) => {
        event.preventDefault(); // Prevent default link behavior
        router.push(`/property/#${slug}`); // Correct: Use id as the hash
    };

    return (

        <div className="card" id={`${slug}`}>
            {
 
                (()=> console.log(`${imgs}`.length))()
            }   
            <a onClick={() => handleClick(event)}>
                <h2>Property: {name}</h2>
            </a>
            <h3>Beds: {beds} beds</h3>
            <h3>
                <strong>Description: </strong>
                {description}
            </h3>
            <h3>
                <strong>Slug: </strong>
                {slug}
            </h3>

            {/* Conditional rendering for the first image with a placeholder */}
       
            {/* Conditional rendering for additional images */}
           

            <div className="price">${price}</div>
            
            <hr />
        </div>
    );
};

export default Card;