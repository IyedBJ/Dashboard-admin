import React from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import tunisiaGeoJSON from "./custom.geo.json";

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Geographiques = () => {
  const reclamations = [
    {
      id: 1,
      nomPrenom: "Mohamed Ali",
      adresse: "Tunis",
      sujet: "Panne de courant",
      status: "En cours",
      position: [36.8, 10.18], // [lat, lng]
    },
    {
      id: 2,
      nomPrenom: "Samira Ben Ahmed",
      adresse: "Sfax",
      sujet: "Erreur de facture",
      status: "Résolue",
      position: [34.74, 10.76],
    },
    {
      id: 3,
      nomPrenom: "Karim Jlassi",
      adresse: "Bizerte",
      sujet: "Problème technique",
      status: "Nouvelle",
      position: [37.27, 9.87],
    },
    {
      id: 4,
      nomPrenom: "Leila Trabelsi",
      cin: "789321654",
      email: "leila.t@gmail.com",
      adresse: "Impasse des Jasmins, Hammamet",
      dateReclamation: "2023-06-12",
      type: "Infrastructure",
      sujet: "Route endommagée après travaux",
      status: "En cours",
      image: "https://example.com/photo4.jpg",
      position: [36.4, 10.6],
    },
    {
      id: 5,
      nomPrenom: "Hassan Mrad",
      cin: "321654987",
      email: "h.mrad@protonmail.com",
      adresse: "Rue Ali Belhouane, Gabès",
      dateReclamation: "2023-06-15",
      type: "Autre",
      sujet: "Demande d'information générale",
      status: "Rejetée",
      image: "https://example.com/photo5.jpg",
      position: [33.88, 10.1],
    },
  ];

  const reclamationsAvecPosition = reclamations.filter(
    (reclamation) => reclamation.position
  );

  const reclamationsSansPosition = reclamations.filter(
    (reclamation) => !reclamation.position
  ).length;

  const regionStyle = {
    fillColor: "#3388ff",
    weight: 1,
    opacity: 1,
    color: "white",
    fillOpacity: 0.3,
  };

  return (
    <div style={{ height: "600px", width: "100%", margin: "0 auto" }}>
      {reclamationsSansPosition > 0 && (
        <div style={{ color: "red", padding: "10px" }}>
          Attention: {reclamationsSansPosition} réclamation(s) n'ont pas de
          position et ne sont pas affichées sur la carte.
        </div>
      )}

      <MapContainer
        center={[34, 9]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <GeoJSON
          data={tunisiaGeoJSON}
          style={regionStyle}
          onEachFeature={(feature, layer) => {
            layer.bindPopup(`<h3>${feature.properties.name}</h3>`);
          }}
        />

        {reclamationsAvecPosition.map((reclamation) => (
          <Marker
            key={reclamation.id}
            position={reclamation.position}
            icon={icon}
          >
            <Popup>
              <div>
                <h4>{reclamation.nomPrenom}</h4>
                <p>
                  <strong>Sujet:</strong> {reclamation.sujet}
                </p>
                <p>
                  <strong>Statut:</strong> {reclamation.status}
                </p>
                <p>
                  <strong>Adresse:</strong> {reclamation.adresse}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Geographiques;
