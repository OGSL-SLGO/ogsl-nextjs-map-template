'use client';
import Map from "@/components/Map";
import { useState} from 'react';
import Image from 'next/image';
import RightMenu from "@/components/RightMenu";
import LeftMenu from "@/components/LeftMenu";
import MapDynamic from "@/components/MapDynamic";


export default function Home() {
  
  const catalogueUrl = 'https://catalogue.ogsl.ca';
  const [center] = useState([47.485, -62.48]); // Default center
  const [selectedLeftMenu, setSelectedLeftMenu] = useState('');
  const [bounds, setBounds] = useState(null);

  const handleLeftMenuSelect = (param) => {
    setSelectedLeftMenu(param); // Update the selected state with the parameter from Sidebar
  };

  const handleListItemClick = (selectedItem) => {
    setBounds(selectedItem.spatial);
    console.log('SPATIAL :: ' + JSON.stringify(selectedItem.spatial.coordinates));
  };

  const handleListItemDoubleClick = (selectedItem) => {
    console.log('Selected item:', selectedItem);
    window.open(`${catalogueUrl}/dataset/${selectedItem.name}`);
  };

  return (
    <div className="relative w-screen gap-16 font-[family-name:var(--font-geist-sans)]">
     
      <main>

        <div className="fixed left-10 z-50"> 
            <LeftMenu onItemClick={handleLeftMenuSelect}/>
        </div>
        
        <div className="relative z-30">
            <Map center={center} bounds={bounds}/>
            
        </div>

        <div className="fixed top-0 right-0 z-1000">
          <RightMenu onItemClick={handleListItemClick} onItemDoubleClick={handleListItemDoubleClick}/>
        </div>
      </main>

    </div>
  );
}
