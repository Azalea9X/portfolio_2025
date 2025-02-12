
import Map from "./map"; 
import Card from "./card"; 
import ImageCard from "./image"; 
import { parseAppSegmentConfig } from "next/dist/build/segment-config/app/app-segment-config";
import React from "react"; 
import uuid4 from "uuid4";
import Grid from "./grid"; 
 
const getProperties = async(slug) => {
    try {
        const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT; 
        const response = await fetch(HYGRAPH_ENDPOINT, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify({
                query: `query MyQuery {
  properties {
    beds
    description
    images {
      id
      url
      fileName
    }
    location {
      lattitude
      longitude
    }
      managingBroker{
      name, phoneNumber}
      elevator,
      parking,
      pool,
    name
    price
    slug
    id
  }
}`})
        }); // Use the variable here
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

const json = await response.json();

        return json.data.properties;

    } catch (error) {
        console.error("Error fetching properties:", error);
        return [];
    }
}

const Main = async () => {
    const properties = await getProperties();
   (()=> {
    alert("Hi!");
   })
    console.log("Properties:", properties); // This will print the fetched properties to the console


    return(
        <><Grid properties={properties}/>
                        <main>

                <article>
                    <Map />
                </article>
                <article className="listings">
                    <h2>Rental listings</h2>
                    <div className="card-container">
                        {(() => {
                            const elements = [];
                            for (let i = 0; i < properties.length; i++) {
                                elements.push(
                                    <>
                                        <Card 
                                            key={uuid4()}
                                            beds={properties[i].beds}
                                            description={properties[i].description}
                                            location={{latitude: properties[i].location.lattitude, longitude: properties[i].location.longitude}}
                                            name={properties[i].name}
                                            price={properties[i].price}
                                            slug={properties[i].slug}
                                            width={300}
                                            height={200} 
                                        />


                                        <ImageCard 
url={properties[i].images.url}
id={properties[i].name}


             

                                            alt={properties[0].images.fileName}
                                        />
                                   

                                    </>
                                );
                            }

                            return elements;
                        })()}
                    </div>
                </article>
            </main>
        </>
    );
}

export default Main;
