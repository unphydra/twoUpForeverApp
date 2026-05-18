import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function InteractiveMap({ places }) {
  if (!places || places.length === 0) return null;

  // We can roughly center the map based on the first location
  // A better approach for production is using L.latLngBounds
  const defaultCenter = places[0].coordinates;

  return (
    <div style={{ height: '450px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', zIndex: 1 }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={4} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {places.map((place) => (
          <Marker key={place.id} position={place.coordinates}>
            <Tooltip direction="top" offset={[0, -20]} opacity={1}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{place.name}</span>
            </Tooltip>
            {place.description && (
              <Popup>
                <div style={{ padding: '0.25rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#111', fontSize: '1rem' }}>{place.name}</h4>
                  <p style={{ margin: 0, color: '#444', fontSize: '0.9rem' }}>{place.description}</p>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
