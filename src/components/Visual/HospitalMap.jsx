// HospitalMap.jsx
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icons
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

const nearestHospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // star/marker icon
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

// ✅ Fly to user
const FlyToUser = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12, { duration: 2 });
    }
  }, [coords, map]);
  return null;
};

// ✅ Recenter button
const RecenterButton = ({ coords }) => {
  const map = useMap();
  return (
    <button
      onClick={() => coords && map.flyTo(coords, 12, { duration: 1.5 })}
      className="absolute top-20 right-4 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-blue-100 transition"
      title="Recenter to My Location"
    >
      📍
    </button>
  );
};

// ✅ Government hospitals
const governmentHospitals = [
  { id: 1, name: "Agartala Govt Medical College & G.B. Pant Hospital", lat: 23.8333, lng: 91.2778 },
  { id: 2, name: "Tripura Medical College & Dr. B.R. Ambedkar Hospital", lat: 23.83, lng: 91.29 },
  { id: 3, name: "District Hospital, Dharmanagar (North Tripura)", lat: 24.003, lng: 92.011 },
  { id: 4, name: "District Hospital, Kailashahar (Unakoti)", lat: 24.3333, lng: 92.0167 },
  { id: 5, name: "District Hospital, Khowai", lat: 23.984, lng: 91.49 },
  { id: 6, name: "District Hospital, Udaipur (Gomati)", lat: 23.526, lng: 91.53 },
  { id: 7, name: "Belonia Sub-Divisional Hospital (South Tripura)", lat: 22.512, lng: 91.432 },
];

// ✅ Haversine formula to calculate distance (km)
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const HospitalMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState("");
  const [nearest, setNearest] = useState(null);

  // Get user location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userCoords = [latitude, longitude];
        setUserLocation(userCoords);

        // Find nearest hospital
        let minDist = Infinity;
        let nearestHospital = null;
        governmentHospitals.forEach((h) => {
          const dist = getDistance(latitude, longitude, h.lat, h.lng);
          if (dist < minDist) {
            minDist = dist;
            nearestHospital = { ...h, distance: dist.toFixed(2) };
          }
        });
        setNearest(nearestHospital);
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  }, []);

  return (
    <div className="relative w-full h-[70vh] md:h-[600px] rounded-2xl shadow-xl overflow-hidden border border-blue-300">
      {/* Error */}
      {error && (
        <p className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-600 px-4 py-2 rounded-md z-20 shadow">
          {error}
        </p>
      )}

      {/* Loading */}
      {!userLocation && !error && (
        <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 text-gray-700 px-4 py-2 rounded-md z-20 shadow animate-pulse">
          📡 Fetching your location...
        </p>
      )}

      <MapContainer
        center={[23.8315, 91.282]} // Default center: Agartala
        zoom={8}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains={["a", "b", "c", "d"]}
        />

        {/* User marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userIcon}>
            <Popup>
              <b>Your Location</b>
            </Popup>
          </Marker>
        )}

        {/* Hospitals */}
        {governmentHospitals.map((h) => {
          const isNearest = nearest && h.id === nearest.id;
          return (
            <Marker
              key={h.id}
              position={[h.lat, h.lng]}
              icon={isNearest ? nearestHospitalIcon : hospitalIcon}
              eventHandlers={{
                mouseover: (e) => e.target.openPopup(),
                mouseout: (e) => e.target.closePopup(),
              }}
            >
              <Popup>
                <b>{h.name}</b>
                <br />
                🏥 Government Hospital
                {isNearest && (
                  <>
                    <br />
                    ⭐ <b>Nearest to you ({nearest.distance} km)</b>
                    <br />
                    <a
                      href={`https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${h.lat},${h.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Get Directions
                    </a>
                  </>
                )}
              </Popup>
            </Marker>
          );
        })}

        {/* Auto fly */}
        {userLocation && <FlyToUser coords={userLocation} />}
        {userLocation && <RecenterButton coords={userLocation} />}
      </MapContainer>

      {/* Floating title */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md text-blue-900 px-5 py-2 rounded-full shadow-lg z-20 text-sm font-semibold">
        🏥 Nearest Government Hospital Finder
      </div>
    </div>
  );
};

export default HospitalMap;