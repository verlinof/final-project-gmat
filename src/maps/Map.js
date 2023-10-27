import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // Fungsi untuk menghasilkan koordinat latitude dan longitude secara acak
  const getRandomCoordinates = () => {
    const randomLatitude = (Math.random() - 0.5) * 180;
    const randomLongitude = (Math.random() - 0.5) * 360;
    setLatitude(randomLatitude);
    setLongitude(randomLongitude);
  };

  useEffect(() => {
    // Panggil fungsi getRandomCoordinates setiap detik
    const interval = setInterval(() => {
      getRandomCoordinates();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <MapContainer center={[-7.770562351329754, 110.37774291534211]} zoom={18}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[-7.770562351329754, 110.37774291534211]}>
          <Popup>
            Latitude: {latitude}
            <br />
            Longitude: {longitude}
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default Map;
