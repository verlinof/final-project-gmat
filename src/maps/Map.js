import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { io } from "socket.io-client";

const Map = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const socket = io("https://gmat.haikalhilmi.my.id/");
  socket.connect();

  useEffect(() => {
    const interval = setInterval(() => {
      socket.on("message", (message) => {
        const messageReplace = message.replace(";", "");
        const messageSplit = messageReplace.split(",");

        const randomLatitude = parseFloat(messageSplit[5]);
        const randomLongitude = parseFloat(messageSplit[6]);
        setLatitude(randomLatitude);
        setLongitude(randomLongitude);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [socket]);

  return (
    <>
      <MapContainer center={[latitude, longitude]} zoom={18}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
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
