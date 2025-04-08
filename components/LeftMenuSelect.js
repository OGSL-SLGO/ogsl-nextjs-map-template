'use client';   
import {useState,useEffect } from 'react';
import dynamic from 'next/dynamic';

const Badge = dynamic(() => import('@/components/Badge'), {
    ssr: false,
  })



export default function LeftMenuSelect({ itemsTotalCount , onLeftMenuItemClick, onLeftMenuItemDoubleClick }) {
    const [filteredItems, setFilteredItems] = useState([]);
    const [error, setError] = useState(null);
    const [filteredCount, setFilteredCount] = useState(0);
    const [isFilterClicked, setIsFilterClicked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [showBadge, setShowBadge] = useState(false);
    const [badges, setBadges] = useState([]);

    const catalogueUrl = 'https://catalogue.ogsl.ca';
    const baseQuery = 'projects=*baseline*';
    let urlBaseSearch = `${catalogueUrl}/api/3/action/package_search?q=${baseQuery}`;
    
    let urlCustomSearch = `${catalogueUrl}/api/3/action/package_search?q=`;
    const handleChange = (event) => {
        setInputValue(event.target.value); // Update state with input value
      };

      const AddBadge = ({label})=> {
        setBadges([...badges, {id: nextId++, nom : label}]);
      }

      useEffect(() => {
        
            const fetchData = async () => {
            console.log('HELLOOO :: ' + isFilterClicked);
            // Fetch data from an API
            if(isFilterClicked){
            let url ='';
            console.log('inputValue :: ' + inputValue);
            try {
                if(inputValue === '') {
                    url = urlBaseSearch;
                }else{
                    url = `${urlCustomSearch}${inputValue}`;
                } 
                const response = await fetch(url); // Example API
                const awaitRes = await response.json();
                setFilteredItems(awaitRes.result.results);
                setFilteredCount(awaitRes.result.results.length);
                AddBadge(inputValue);
                }catch (error) {
                    console.log("Error :: " + error.message);
                    setError(error.message);
                    setIsFilterClicked(false);
                }
                setIsFilterClicked(false);
                setShowBadge(true);
                setInputValue('');
            }

        };
        fetchData();
    }, [isFilterClicked]);
  


  return (

    <div>

        <div id="drawer-form" className="fixed top-0 left-0 z-900 h-screen p-4 overflow-y-auto 
            transition-transform bg-white w-1/5 dark:bg-gray-800" tabIndex="-1" aria-labelledby="drawer-form-label">
            <div className="inline-flex rounded-t dark:border-gray-600">
                <a className="inline-flex w-3/12 h-3/12 ml-0" id="headerImg_OGSL">
                    <img className="" id="headerimgsrc_OGSL" src="Images/OGSL_NoTag.jpg"/>
                </a>
                

            </div>
            <form className="mb-6">
                <div className="flex">
                    <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <button id="dropdown-button" data-dropdown-toggle="dropdown" className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>
                    <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2
                                 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2
                                 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2
                                 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-2
                                 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                            </li>
                        </ul>
                    </div>
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" value={inputValue} className="block p-2.5 w-full z-20 text-sm text-gray-900 
                        bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 
                        focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                        placeholder="Search Mockups, Logos, Design Templates..." required 
                        onChange={handleChange} />
                        <button id="btnFilter" type="button" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full 
                          text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={() => setIsFilterClicked(true)} >
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
                            </svg>

                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>
                
                
                <div id="badgesSection" className="mt-3 mb-3 relative w-full" >
                    {showBadge && (badges.map(badge => (
                        
                        <Badge key={badge.index} label={badge.nom} />

                    )))}
                </div>
                <div className="mb-6 border-t-1">
                    <label htmlFor="description" className="mt-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Jeux de données
                    </label>
                
                </div>
                <div className="relative mb-6 bg-[#e8eef1]">
                    <div className="inset-y-0 left-0 flex items-center pl-3">
                        <ul className="space-y-2 font-medium mb-5">
                        {
                            filteredItems.map((item) => 
                                <li className="hover:text-blue-500, cursor-pointer bg-white mt-5 ml-5 mr-5 p-5" 
                                    onClick={() => onLeftMenuItemClick(item)} 
                                    onDoubleClick={() => onLeftMenuItemDoubleClick(item)} 
                                    key={item.id}>{item.title}
                            
                                </li> // Dynamically create <li> items
                            )
                            
                        }

                        </ul>
                    </div>
                    
                </div>

                <div className="mb-6 border-t-1">

                    <div className="mt-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de jeux de données

                        <div className="mb-6 mt-5 bg-blue-300 border-t-1">
                            
                            <span className="inline-flex items-center ml-45 mt-3 mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                {filteredCount} / {itemsTotalCount} </span>
                            
                            
                        </div>   
                    </div>

                    <div className="inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd"/>
                        </svg>

                        <label htmlFor="description" className="ml-3 mt-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white">À propos</label>
                    </div>      
                </div>
            </form>
        </div>
    </div>

    );
}