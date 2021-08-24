import React, { useContext } from 'react'
import { searchAds } from '../../../api/apartmentsUtils';
import { SearchContext } from './../../../context/SearchContext';

const SearchButton = ({ setAdsArr, setIsNoResult, setResultsCount, setIsAdvancedSearchOpen,isMobileMode, setIsMobileMode, setIsMobileSearchOpen }) => {

    const { searchData } = useContext(SearchContext);


    const onClickSearch = async () => {
        if(isMobileMode){ setIsMobileMode(false); setIsMobileSearchOpen(true)}
        console.log(isMobileMode)
        setIsAdvancedSearchOpen(false);
        const apartmentsArr = await searchAds(searchData);
        setAdsArr(apartmentsArr.data.apartmentsArr);
        setResultsCount(apartmentsArr?.data.resultsCount);
        if (apartmentsArr.data.apartmentsArr.length < 1) {
            setIsNoResult(true);
        } else {
            setIsNoResult(false);
        }
    }

    return (
        <div className="search-button__container">
            <div onClick={onClickSearch} className="search-button">
                <span className="search-icon"></span>
                <span >חיפוש</span>
            </div>
        </div>

    )
}

export default SearchButton;
