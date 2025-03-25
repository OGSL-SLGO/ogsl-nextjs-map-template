'use client';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import '../../app/globals.css';
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import DynamicList from "@/components/Sidebar";
import L from 'leaflet';


const FitBounds = ({ bounds }) => {

    const map = useMap();
    if (bounds) {
        console.log('BOUNDS 2 :: ' + JSON.stringify(bounds));
        map.fitBounds(L.geoJSON(bounds).getBounds());
    }

    return null;
  };

  const Polylines = ({ polyLines }) => {

    console.log('POLY :: ' + JSON.stringify(polyLines));

    const map = useMap();
    if (polyLines) {
        console.log('POLY 2 :: ' + JSON.stringify(polyLines));
        let rectangle = L.rectangle(polyLines, {color: "red", weight: 1}).addTo(map);
        map.fitBounds(rectangle.getBounds());
    }

    return null;
  };



function Map({center}){

    const [bounds, setBounds] = useState(null);
    const catalogueUrl = 'https://catalogue.ogsl.ca';

    console.log('MAP INIT :: ');

    const handleListItemClick = (selectedItem) => {
        setBounds(selectedItem.spatial);
        console.log('SPATIAL :: ' + JSON.stringify(selectedItem.spatial.coordinates));
      };

      const handleListItemDoubleClick = (selectedItem) => {
        window.open(`${catalogueUrl}/dataset/${selectedItem.name}`);
      };

    return(

        <div id="container"> 
            <div id="records-list" className="sidebar collapsed">
                <DynamicList onItemClick={handleListItemClick} onItemDoubleClick={handleListItemDoubleClick}/>
            </div>

            <MapContainer id="map" center={center} zoom={5} style={{height: '600', width:'1000'}} scrollWheelZoom={true}>
                <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
               {bounds && <Polylines positions={bounds.coordinates} />}
               {bounds && <FitBounds bounds={bounds} />}

            </MapContainer>
            
        </div>

    )
}

export default Map;