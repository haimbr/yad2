import React, { useContext, useState } from 'react'
import ApartmentCharacteristics from './ApartmentCharacteristics';
import ApartmentFloor from './ApartmentFloor';
import ApartmentSize from './ApartmentSize';
import SearchByEntryDate from './SearchByEntryDate';
import InputElement from './../InputElement.component';
import { SearchContext } from '../../../context/SearchContext';
import { clearSearchAction, setFreeTextAction } from '../../../actions/searchAction';
import SearchButton from './../simple-search/SearchButton';

const AdvancedSearch = ({ setAdsArr, setIsNoResult, setResultsCount, setIsAdvancedSearchOpen }) => {


    const { dispatchSearchData } = useContext(SearchContext);
    const [isCheckboxClicked, setIsCheckboxClicked] = useState(false);


    const onFreeTextChanged = (event) => {
        dispatchSearchData(setFreeTextAction(event.target.value));
    };


    const onCheckboxClicked = () => {
        setIsCheckboxClicked(!isCheckboxClicked);
    };

    const onClearClicked = () => {
        dispatchSearchData(clearSearchAction());
    };
    


    return (
        <div className="advanced-search__component">
            <h3>מאפייני דירה</h3>
            <ApartmentCharacteristics />
            <ul>
                <ApartmentFloor />
                <ApartmentSize />
                <SearchByEntryDate />
            </ul>
            <ul>
                <div className="free-text">
                    <InputElement label={"חיפוש חופשי"} inputAttributes={{ onBlur: onFreeTextChanged }} />
                </div>
                <div className="select-only-kibbutzim">
                    <div className="checkbox-element" onClick={onCheckboxClicked} >
                        <label className={isCheckboxClicked ? "checked" : "empty"}>
                            <span className="checkmark"></span>
                        </label>
                        <span>הצגת מושבים וקיבוצים בלבד</span>
                    </div>
                </div>
            </ul>
            <div className="advanced-search-bottom">
                <SearchButton setAdsArr={setAdsArr} setIsNoResult={setIsNoResult} setResultsCount={setResultsCount} setIsAdvancedSearchOpen={setIsAdvancedSearchOpen} />
                <span className="clear-search" onClick={onClearClicked}>נקה</span>
            </div>
        </div>
    )
}

export default AdvancedSearch;
