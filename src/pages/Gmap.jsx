import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 41.87485363156238, // arc coordinates
  lng: -87.65106846432064
};

const Gmap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyB9DdlpwHl8HPmiUbF-UNgWaduPERUVztk",
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessName: "Loading...",
    address: "Loading...",
    city: "Loading...",
    state: "Loading...",
    zipCode: "Loading..."
  });

  const fileInputRef = useRef(null);
  const userDocId = "gIx5UzgWBZ3EqKLUiN4X"; // Replace with actual document ID

    useEffect(() => {
        const fetchBusinessData = async () => {
        try {
            console.log("Fetching Business data...");
            const userDocRef = doc(db, "Businesses", userDocId);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
            console.log("Business data found:", docSnap.data());
            setBusinessInfo({
                businessName: docSnap.data().businessName || "Unknown",
                address: docSnap.data().address || "Unknown",
                city: docSnap.data().city || "Unknown",
                state: docSnap.data().state || "Unknown",
                zipCode: docSnap.data().zipCode || "Unknown"
            });

            } else {
            console.log("No such user found!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        };
        fetchUserData()
    }, []);


  const [userLocation, setUserLocation] = useState(null);
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


  if (loadError) return <div>Error loading maps</div>;

  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={userLocation}
    >
      <Marker position={userLocation} />
    </GoogleMap>
  );
};

export default Gmap;