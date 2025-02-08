import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { doc, getDoc } from "firebase/firestore";
import { db } from "/src/config/firebase.js";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 41.87485363156238, // Default (ARC coordinates)
  lng: -87.65106846432064,
};

const MapWithMarkers = ({ address, apiKey, userLocation }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });



  const getLatLongFromAddress = async (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setMarkerPosition({ lat: location.lat, lng: location.lng });
      } else {
        console.error("Geocoding failed:", data.status);
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };


  useEffect(() => {
    if (address) {
      getLatLongFromAddress(address);
    }
  }, [address]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={markerPosition || userLocation || defaultCenter}
    >
      {markerPosition && <Marker position={markerPosition} />}

      {userLocation && <Marker position={userLocation} />}
    </GoogleMap>
  );
};

const Gmap = () => {
  const [businessInfo, setBusinessInfo] = useState({
    businessName: "Loading...",
    address: "Loading...",
    city: "Loading...",
    state: "Loading...",
    zipCode: "Loading...",
  });

  const [userLocation, setUserLocation] = useState(null);
  const businessDocId = "6u0HCAlg8z21qPpZOtyo"; // Replace with actual document ID

  // Fetch business data from Firestore
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        console.log("Fetching Business data...");
        const businessDocRef = doc(db, "Businesses", businessDocId);
        const docSnap = await getDoc(businessDocRef);

        if (docSnap.exists()) {
          console.log("Business data found:", docSnap.data());
          setBusinessInfo({
            businessName: docSnap.data().businessName || "Unknown",
            address: docSnap.data().address || "Unknown",
            city: docSnap.data().city || "Unknown",
            state: docSnap.data().state || "Unknown",
            zipCode: docSnap.data().zipCode || "Unknown",
          });
        } else {
          console.log("No such user found!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
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

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <MapWithMarkers
        address={`${businessInfo.address}, ${businessInfo.city}, ${businessInfo.state} ${businessInfo.zipCode}`}
        apiKey="AIzaSyB9DdlpwHl8HPmiUbF-UNgWaduPERUVztk"
        userLocation={userLocation}
      />
    </div>
  );
};

export default Gmap;