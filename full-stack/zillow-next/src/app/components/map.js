"use client";
import ImageCard from "./card"; // This import is unused, remove it.
import Link from 'next/link'; // This import is unused, remove it.
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState, useEffect, useCallback, useMemo, memo } from "react"; // Combine imports
// dotenv is not needed here, remove it.

const Map = () => {
    const containerStyle = {
      minWidth: '150%',
      height: '90%', 
        height: window.innerWidth > 1000 ? '100% !important' : ''
      //Media queries within React, for 660px
   

    };
    const locations = [
      { lat: 36.7783, lng: 119.4179 },
      { lat: 47.6062, lng: 122.3321 },
      { lat: 45.4215, lng: 75.6972 },
      { lat: 51.5074, lng: 0.1278 },
      { lat: 25.1972, lng: 50.2744 }
    ];

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // Corrected key name, crucial
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds(); // Correctly initialize LatLngBounds
        locations.forEach(location => bounds.extend(new window.google.maps.LatLng(location.lat, location.lng))); //Extend bounds with each location
        map.fitBounds(bounds);
        setMap(map);
    }, [locations]);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    const svgMarker = `data:image/svg+xml;utf8,<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="45" cy="45" r="40" fill="red" />
    </svg>`;

    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle

                }
                zoom={2} // Adjust zoom level for better initial view
                center={{ lat: 40.7128, lng: -74.0060 }} //Center is good
                onLoad={onLoad}
                onUnmount={onUnmount}
                mapContainerClassName="testing"
            >
                {locations.map((location, index) => (
                    <Marker key={index} position={location} icon={{ url: svgMarker, scaledSize: new window.google.maps.Size(30, 30) }} />
                ))}
            </GoogleMap>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default memo(Map);
