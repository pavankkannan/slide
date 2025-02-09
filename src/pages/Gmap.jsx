import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { collection, getDocs } from "firebase/firestore"; // Use collection and getDocs
import { db } from "/src/config/firebase.js";
import { useNavigate } from "react-router-dom";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 41.87485363156238, // Default (ARC coordinates)
  lng: -87.65106846432064,
};

const Markers = ({ businesses, userLocation, apiKey }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  const navigate = useNavigate();

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={userLocation || defaultCenter}
    >
      {/* Marker for the user's current location */}
      {userLocation && <Marker position={userLocation} />}

      {/* Markers for all businesses */}
      {businesses.map((business, index) => (
        <Marker
          key={index}
          position={{ lat: business.lat, lng: business.lng }}
          title={business.businessName}
          onClick={() => navigate(`/Spot/${business.id}`, { state: business })}
        />
      ))}
    </GoogleMap>
  );
};

const Gmap = () => {
  const [businesses, setBusinesses] = useState([]); // Store all businesses
  const [userLocation, setUserLocation] = useState(null);

  // Fetch all business data from Firestore
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        console.log("Fetching Business data...");
        const businessesCollection = collection(db, "Businesses");
        const querySnapshot = await getDocs(businessesCollection);

        const businessesData = [];
        for (const doc of querySnapshot.docs) {
          const business = doc.data();
          const address = `${business.address}, ${business.city}, ${business.state} ${business.zipCode}`;

          // Convert address to latitude/longitude
          const coordinates = await getLatLongFromAddress(
            address,
            "AIzaSyB9DdlpwHl8HPmiUbF-UNgWaduPERUVztk"
          );

          if (coordinates) {
            businessesData.push({
              id: doc.id, // Include the document ID
              businessName: business.businessName,
              address: business.address,
              city: business.city,
              state: business.state,
              zipCode: business.zipCode,
              lat: coordinates.lat,
              lng: coordinates.lng,
            });
          }
        }

        setBusinesses(businessesData); // Update state with all businesses
      } catch (error) {
        console.error("Error fetching business data:", error);
      }
    };

    fetchBusinessData();
  }, []);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  // Function to convert address to latitude/longitude
  const getLatLongFromAddress = async (address, apiKey) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error("Geocoding failed:", data.status);
        return null;
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
      return null;
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Markers
        businesses={businesses}
        userLocation={userLocation}
        apiKey="AIzaSyB9DdlpwHl8HPmiUbF-UNgWaduPERUVztk"
      />
    </div>
  );
};

export default Gmap;
