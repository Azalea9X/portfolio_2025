"use client";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState, useCallback, memo } from "react";

const Map = () => {
    alert(window.innerWidth);
    const containerStyle = {
        width: '100%',
        height: '600px' // Or a percentage, depending on your design
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
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds();
        locations.forEach(location => bounds.extend(new window.google.maps.LatLng(location.lat, location.lng)));
        map.fitBounds(bounds); // This automatically adjusts zoom and center
        setMap(map);
    }, [locations]);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);


    const svgMarker = `data:image/svg+xml;utf8,<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="12" fill="red" />
    </svg>`;


    return (
        isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {locations.map((location, index) => (
                    <Marker key={index} position={location} icon={{ url: svgMarker }} />
                ))}
            </GoogleMap>
        ) : (
            <div>Loading...</div>
        )
    );
};

export default memo(Map);
