import React, { createRef, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from '../../context/SearchContext';
import { clearSearchAction, setRegionAction } from '../../actions/searchAction';
import AutoCompleteResult from '../postAd/AutoCompleteResult';
import { searchAutoCompleteCity } from './../postAd/utils';
import useOnClickOutsideClose from '../../hooks/useOnClickOutsideClose';
import InputElement from './InputElement.component';
import { apartmentsArr, housesArr, othersArr } from './data/propertiesTypeData';
import Header from '../main/headers/Header';

const MobileSearchHeader = ({ setIsMobileMode, isMobileSearchOpen, setIsMobileSearchOpen, isDropdownOpen, setIsDropdownOpen }) => {

    const ref = createRef();
    const [addressInputState, setAddressInputState] = useState("");
    const [autoCompleteResults, setAutoCompleteResults] = useState("");
    const [isAutoCompleteOpen, setIsAutoCompleteOpen] = useState(false);
    const { searchData, dispatchSearchData } = useContext(SearchContext);

    const onSearchCity = async (event) => {
        const searchValue = event.target.value;
        setAddressInputState(searchValue);
        const result = await searchAutoCompleteCity(searchValue, "ישוב ");
        setIsAutoCompleteOpen(true);
        setAutoCompleteResults(result);
    }


    useOnClickOutsideClose(ref, () => setIsAutoCompleteOpen(false));

    const onSearchClicked = () => {
        setIsMobileMode(true);
        setIsMobileSearchOpen(false);
    }

    const onClickBackIcon = () => {
        setIsMobileMode(false);
        setIsMobileSearchOpen(true);
    }

    const onClearClicked = () => {
        dispatchSearchData(clearSearchAction());
    };

    const onClickAutocomplete = (resultArr) => {
        let autocompleteText = "";
        resultArr.forEach((item) => autocompleteText += item.value);
        setAddressInputState(autocompleteText);
        dispatchSearchData(setRegionAction(autocompleteText));
        setIsAutoCompleteOpen(false);
    }

    return (
        <div className="mobile-search__container">

            {!isMobileSearchOpen &&
                <div>
                    <Header />
                    <span className="back-button" onClick={onClickBackIcon}></span>
                    <div className="categories-select">
                        <span>מכירה</span>
                        <span>השכרה</span>
                        <span>שותפים</span>
                        <span>מסחרי</span>
                    </div>
                    <div className="trash-icon" onClick={onClearClicked}>
                        <span>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            <p>נקה הכל</p>
                        </span>
                    </div>
                    <div className="input-container">
                        <div className="select-search-type">
                            <span>עיר ושכונה</span>
                            <span>אזור</span>
                        </div>
                    </div>
                    <span className="input-container">
                        <span ref={ref} className="search-city">
                            <InputElement
                                className={"autocomplete__input"}
                                label={"חפשו עיר"}
                                inputAttributes={{
                                    placeholder: "לדוגמה: באר שבע",
                                    onChange: onSearchCity,
                                    value: addressInputState,
                                    onClick: () => setIsAutoCompleteOpen(true),
                                    onBlur: (e) => dispatchSearchData(setRegionAction(e.target.value))
                                }}
                            />
                            {
                                autoCompleteResults?.length > 0 && isAutoCompleteOpen &&
                                <AutoCompleteResult autocompleteResults={autoCompleteResults} autocompleteType={"city"} handleClick={onClickAutocomplete} />
                            }
                        </span>
                    </span>
                    <div className="type-of-property-buttons">
                        <h4>סוג נכס</h4>
                        <span>
                            <img src="./images/mobile-icons/Building.svg" alt="Building" />
                            <h3>דירות</h3>
                            <p>{apartmentsArr.length} סוגי נכסים</p>
                        </span>
                        <span>
                            <img src="./images/mobile-icons/Country-house.svg" alt="Building" />
                            <h3>בתים</h3>
                            <p>{housesArr.length} סוגי נכסים</p>
                        </span>
                        <span>
                            <img src="./images/mobile-icons/Other.svg" alt="Building" />
                            <h3>סוגים נוספים</h3>
                            <p>{othersArr.length} סוגי נכסים</p>
                        </span>
                        <h5 onClick={() => setIsDropdownOpen(true)}>להצגת כל סוגי הנכסים </h5>
                    </div>


                    {isDropdownOpen && <>
                        <div className="dropdown-header-mobile">
                            <p>כל סוגי הנכסים</p>
                            <span className="back-icon"></span>
                        </div>
                        <div className="dropdown-footer-mobile">
                            <p>אישור</p>
                        </div>
                    </>}

                </div>

            }



            <div className={`${isMobileSearchOpen ? "mobile-start-search" : "not-active"}`} onClick={onSearchClicked}>
                <div>
                    <span className="search-icon">&#9906;</span>
                    <span>נדל"ן להשכרה</span>
                </div>
                <div>
                    <p>חיפוש</p>
                </div>
            </div>
        </div>
    )
}

export default MobileSearchHeader;
