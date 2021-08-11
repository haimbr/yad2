import React, { useState } from 'react'
import SearchContextProvider from '../../context/SearchContext';
import AdvancedSearch from './advanced-search/AdvancedSearch';
import AdvancedSearchButton from './simple-search/AdvancedSearchButton';
import PropertiesTypesList from './simple-search/PropertiesTypesList';
import SearchByPrice from './simple-search/SearchByPrice';
import SearchByRooms from './simple-search/SearchByRooms';
import SearchRegionInput from './simple-search/SearchRegionInput';
import SearchButton from './simple-search/SearchButton';
import MobileSearchHeader from './MobileSearchHeader';
import SortAds from './sort/SortAds';


const SearchPage = ({ setAdsArr, setIsNoResult, resultsCount, setResultsCount }) => {

    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
    const [isMobileMode, setIsMobileMode] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(true);
    const [isPropertyTypeDropdownOpen, setIsPropertyTypeDropdownOpen] = useState(false);

    return (
        <div className={isMobileMode && !isMobileSearchOpen ? "search-container__mobile" : ""}>
            <SearchContextProvider>
                {<MobileSearchHeader
                    setIsMobileMode={setIsMobileMode}
                    isMobileSearchOpen={isMobileSearchOpen}
                    setIsMobileSearchOpen={setIsMobileSearchOpen}
                    setIsDropdownOpen={setIsPropertyTypeDropdownOpen}
                    isDropdownOpen={isPropertyTypeDropdownOpen}
                />}

                <div className={`search-component ${isMobileMode ? "search-mobile-mode" : ""}`}>

                    <div className="simple-search__component">
                        <div className="header_section">
                            <h3>איזה נכס ל<b>השכרה</b> תרצו לחפש?</h3>
                            <button>
                                <img src="./images/bell-icon3.png" alt="bell-icon" />
                                <span >קבלו התראה במייל על החיפוש</span>
                            </button>
                        </div>
                        <div className="form-container">
                            <form className="simple-search">
                                <SearchRegionInput />
                                <PropertiesTypesList isDropdownOpen={isPropertyTypeDropdownOpen} setIsDropdownOpen={setIsPropertyTypeDropdownOpen} />
                                <SearchByRooms isMobileMode={isMobileMode} />
                                <SearchByPrice isMobileMode={isMobileMode} />
                                <AdvancedSearchButton isAdvancedSearchOpen={isAdvancedSearchOpen} setIsAdvancedSearchOpen={setIsAdvancedSearchOpen} />
                                <SearchButton setAdsArr={setAdsArr} setIsNoResult={setIsNoResult} setResultsCount={setResultsCount} setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}/>
                            </form>
                        </div>
                    </div>

                    {isAdvancedSearchOpen && <AdvancedSearch setAdsArr={setAdsArr} setIsNoResult={setIsNoResult} setResultsCount={setResultsCount} setIsAdvancedSearchOpen={setIsAdvancedSearchOpen}/>}


                </div>
                <div className="apartment-page-header">
                    <h1>נדל"ן להשכרה</h1>
                    {resultsCount && <p>מציג {resultsCount} מודעות</p>}
                </div>
                <SortAds setAdsArr={setAdsArr} setIsNoResult={setIsNoResult} setResultsCount={setResultsCount} />
            </SearchContextProvider>
        </div>
    )
}

export default SearchPage;
