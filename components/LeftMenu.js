'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import RightMenu from "@/components/RightMenu";
import Image from 'next/image';



export default function LeftMenu({ onItemClick }) {
    const [filteredItems, setFilteredItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isFilterClicked, setIsFilterClicked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const catalogueUrl = 'https://catalogue.ogsl.ca';
    const baseQuery = 'projects=*baseline*';
    let urlBaseSearch = `${catalogueUrl}/api/3/action/package_search?q=${baseQuery}`;

    let urlCustomSearch = `${catalogueUrl}/api/3/action/package_search?q=`;


    const ProgressBar = dynamic(() => import('./ProgressBar'), { ssr: false })

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const onLeftMenuItemClick = (selectedItem) => {
        onItemClick(selectedItem);
    };

    const onLeftMenuItemDoubleClick = (selectedItem) => {
        window.open(`${catalogueUrl}/dataset/${selectedItem.name}`);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value); // Update state with input value
    };

    useEffect(() => {

        const fetchData = async () => {
            console.log('isFilterClicked :: ' + isFilterClicked);
            console.log('inputValue :: ' + inputValue);
            // Fetch data from an API
            if (isFilterClicked) {
                let url = '';
                console.log('inputValue :: ' + inputValue);
                try {
                    if (inputValue === '') {
                        url = urlBaseSearch;
                    } else {
                        url = `${urlCustomSearch}${inputValue}`;
                    }
                    console.log('url :: ' + url);
                    const response = await fetch(url); // Example API
                    console.log('Responseeee :: ' + response);

                    const awaitRes = await response.json();

                    setFilteredItems(awaitRes.result.results);
                } catch (error) {
                    console.log('Error :: ' + error.message);
                    setError(error.message);
                    setIsFilterClicked(false);
                }
                setIsFilterClicked(false);
                console.log('filtered :: ' + filteredItems);
            }

        };
        fetchData();
    }, [isFilterClicked]);


    return (
        <div id="sidebar">
            <button id="sidebar-toggle" data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" onClick={toggleSidebar} className="flex justify-between w-screen items-center p-2 text-sm text-gray-500 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600  bg-gray-50 dark:bg-gray-800 ">
                <div>
                    <a href="https://ogsl.ca" className="">
                        <Image src="/Images/OGSL_NoTag.png" className="h-6 me-3 sm:h-7 dark:hidden" alt="OGSL Logo" />
                        <Image src="/Images/OGSL_NoTag_White.png" className="h-6 me-3 sm:h-7 hidden dark:block" alt="OGSL Logo" />
                    </a>
                    <span className="sr-only">Open sidebar</span>
                    <span className="pt-3 self-center text-xl font-semibold whitespace-nowrap strokeLinecap">Carte de l'OGSL</span>
                </div>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 md:w-sm w-auto h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 bg-gray-50 dark:bg-gray-800 flex flex-col">
                    <a className="flex items-center justify-between ps-2.5 mb-2">
                        <div>
                            <Image src="/Images/OGSL_NoTag.png" className="h-6 me-3 sm:h-7 dark:hidden" alt="OGSL Logo" />
                            <Image src="/Images/OGSL_NoTag_White.png" className="h-6 me-3 sm:h-7 hidden dark:block" alt="OGSL Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Carte de l'OGSL</span>
                        </div>
                        <button onClick={toggleSidebar} className="flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="logo-sidebar" data-drawer-toggle="logo-sidebar">
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </a>
                    <ul className="space-y-2 font-medium">
                        <li>

                            <form className="pb-2 max-w-lg mx-auto">
                                <label>Filtrer par</label>
                                <div className="flex">
                                    <select
                                        className="py-2 pl-3 text-sm text-gray-700 dark:text-gray-200 bg-gray-50 border border-gray-300 rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        aria-labelledby="dropdown-button">
                                        <option value="search">Recherche</option>
                                        <option value="dataset">Organisation</option>
                                        <option value="project">Projet</option>
                                        <option value="service">EOV</option>
                                    </select>
                                    <div className="relative w-full">
                                        <input
                                            type="search"
                                            id="search-dropdown"
                                            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                            placeholder="Appliquer filtre"
                                            required
                                            onChange={handleChange}
                                            value={inputValue}
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => setIsFilterClicked(true)}
                                        >
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                            </svg>
                                            <span className="sr-only">Add filter item</span>
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </li>
                    </ul>
                    <span className="pt-4 border-t border-t-gray-200 dark:border-t-gray-700">Jeux de données</span>
                    <ul className="flex-grow overflow-y-auto pt-1 mt-1 space-y-2 rounded-md">
                        <RightMenu onItemClick={onLeftMenuItemClick} onItemDoubleClick={onLeftMenuItemDoubleClick} className="flex-grow overflow-y-auto" />
                    </ul>
                    <div className="pt-3 text-sm font-medium text-gray-900 dark:text-white">
                        <ProgressBar count={40} total={60} />
                    </div>
                    <ul className="pt-4 m-3 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">À propos</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>

    );
}