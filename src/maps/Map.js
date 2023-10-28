import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";
import L from "leaflet";
import icon from "../images/rocket-icon.png";

const Map = () => {
  const mapRef = useRef(null); // Ref untuk mengakses instance MapContainer

  // Custom Icon untuk Marker
  const customIcon = new L.Icon({
    iconUrl: icon, // Perbaiki ini, hilangkan kurung kurawal
    iconRetinaUrl: icon, // Perbaiki ini, hilangkan kurung kurawal
    iconSize: [32, 32],
    popupAnchor: [0, 0], // Perbaiki koordinatnya
    className: "leaflet-div-icon",
  });

  const [latitude, setLatitude] = useState(-7.765317);
  const [longitude, setLongitude] = useState(110.371216);

  const socket = io("https://gmat.haikalhilmi.my.id/");
  socket.connect();

  useEffect(() => {
    const interval = setInterval(() => {
      socket.on("message", (message) => {
        const messageReplace = message.replace(";", "");
        const messageSplit = messageReplace.split(",");

        const Latitude = parseFloat(messageSplit[5]);
        const Longitude = parseFloat(messageSplit[6]);

        setLatitude(Latitude);
        setLongitude(Longitude);

        // Mengakses instance MapContainer dan panning
        if (mapRef.current) {
          mapRef.current.setView(
            [Latitude, Longitude],
            mapRef.current.getZoom()
          );
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [socket]);

  return (
    <MapContainer
      ref={mapRef}
      center={[latitude, longitude]}
      zoom={20}
      animate={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Popup>
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
