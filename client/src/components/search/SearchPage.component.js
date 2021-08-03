import React, { useState } from 'react'
import SearchContextProvider from '../../context/SearchContext';
import AdvancedSearch from './advanced-search/AdvancedSearch';
import AdvancedSearchButton from './simple-search/AdvancedSearchButton';
import PropertiesTypesList from './simple-search/PropertiesTypesList';
import SearchByPrice from './simple-search/SearchByPrice';
import SearchByRooms from './simple-search/SearchByRooms';
import SearchRegionInput from './simple-search/SearchRegionInput';
// import SimpleSearch from './simple-search/SimpleSearch.component';
import SearchButton from './simple-search/SearchButton';

const SearchPage = () => {

    const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

    return (
        <div className="search-component">
            <SearchContextProvider>
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
                            <PropertiesTypesList />
                            <SearchByRooms />
                            <SearchByPrice />
                            <AdvancedSearchButton isAdvancedSearchOpen={isAdvancedSearchOpen} setIsAdvancedSearchOpen={setIsAdvancedSearchOpen} />
                            <SearchButton />
                        </form>
                    </div>
                </div>

                {isAdvancedSearchOpen && <AdvancedSearch />}

            </SearchContextProvider>
        </div>
    )
}

export default SearchPage;
