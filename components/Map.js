'use client';

import 'leaflet/dist/leaflet.css';
import '../app/globals.css';
import { MapContainer, Polygon, TileLayer, useMap } from "react-leaflet";
import L from 'leaflet';



const FitBounds = ({ bounds }) => {

    const map = useMap();
    if (bounds) {
        ClearMap({map});
        var polygon = L.geoJSON(bounds, {color: 'red'}).addTo(map);
        
        map.fitBounds(polygon.getBounds(), {
            animate: true,
            padding: [50, 50],
            maxZoom: 10
        });
    }

    return null;
  };

  const ClearMap = ({map}) => {
    map.eachLayer((layer) => {
        if (layer instanceof L.Polygon) {
            map.removeLayer(layer);
        }
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }

    });


    return null;
  };


function Map({center,bounds}){

    return(
        <div id="container" className="h-full w-full">
            {center && (
            
                <MapContainer
                className="h-full w-full"
                center={center} zoom={6} 
                scrollWheelZoom={true}
                boundsOptions={{ padding: [1, 1] }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {bounds && <FitBounds bounds={bounds} />}
            </MapContainer>
            )}
        </div>

    )
}

export default Map;