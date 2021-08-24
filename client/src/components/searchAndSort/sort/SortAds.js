import React, { createRef, useContext, useState } from 'react'
import useOnClickOutsideClose from '../../../hooks/useOnClickOutsideClose';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMapMarkerAlt, faFilter } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from '../../../context/SearchContext';
import { searchAds } from '../../../api/apartmentsUtils';




const sortTypes = ["לפי תאריך", "מחיר - מהזול ליקר", "מחיר - מהיקר לזול"];
const sortTypesInEnglish = ["updatedAt", "priceAscending", "priceDescending"];

const searchParameters = {
    sortBy: sortTypesInEnglish[0],
    onlyWithPrice: false,
    onlyWithImg: false,
}

const SortAds = ({ setAdsArr, setIsNoResult, setResultsCount }) => {


    const [searchOnlyWithImg, setSearchOnlyWithImg] = useState(false);
    const [searchOnlyWithPrice, setSearchOnlyWithPrice] = useState(false);


    const [sortType, setSortType] = useState(sortTypes[0]);

    const sortOptionsRef = createRef();
    const displayOptionsRef = createRef();
    const { searchData } = useContext(SearchContext);



    const [isSortOptionsOpen, setIsSortOptionsOpen] = useState(false);
    const [isDisplayOptionsOpen, setIsDisplayOptionsOpen] = useState(false);

    useOnClickOutsideClose(displayOptionsRef, () => { setIsDisplayOptionsOpen(false) });
    useOnClickOutsideClose(sortOptionsRef, () => { setIsSortOptionsOpen(false) });



    const getNewDataFromServer = async () => {
        const apartmentsArr = await searchAds(searchData, searchParameters.sortBy, searchParameters.onlyWithImg, searchParameters.onlyWithPrice);
        setAdsArr(apartmentsArr.data.apartmentsArr);
        setResultsCount(apartmentsArr?.data.resultsCount);
        setIsNoResult(apartmentsArr.data.apartmentsArr.length < 1);
    }

    const onClickSortType = (index) => {
        setSortType(sortTypes[index]);
        searchParameters.sortBy = sortTypesInEnglish[index];
        getNewDataFromServer();
        setIsSortOptionsOpen(false);
    }


    const onClickOnlyWithImg = () => {
        setSearchOnlyWithImg(!searchOnlyWithImg);
        searchParameters.onlyWithImg = !searchParameters.onlyWithImg;
        getNewDataFromServer();
        setIsDisplayOptionsOpen(false);
    }

    const onClickOnlyWithPrice = () => {
        setSearchOnlyWithPrice(!searchOnlyWithPrice);
        searchParameters.onlyWithPrice = !searchParameters.onlyWithPrice;
        getNewDataFromServer();
        setIsDisplayOptionsOpen(false);
    }

    return (
        <div className="sort-ad__container">
            <div className="sort-by" ref={sortOptionsRef}  >
                <p > מיין לפי</p>
                <div className="sort-button" onClick={() => setIsSortOptionsOpen(!isSortOptionsOpen)} ><span>{sortType}</span></div>
                {isSortOptionsOpen && <div className="sort-dropdown" ref={sortOptionsRef}>
                    {sortTypes.map((type, index) => (
                        <div key={index} onClick={() => onClickSortType(index)}>
                            <span className={sortType === sortTypes[index] ? "checked" : "unchecked"}></span>
                            <span className="">{type}</span>
                        </div>
                    ))}
                </div>}
            </div>
            <div className="display-asd">
                <p >הצג מודעות</p>
                <div className="sort-button__mobile" onClick={() => setIsDisplayOptionsOpen(!isDisplayOptionsOpen)}>
                    <FontAwesomeIcon className="icon" icon={faFilter} /> סנן תוצאות
                </div>
                <div
                    className={`sort-element ${searchOnlyWithPrice ? "color-orange" : ""}`}
                    onClick={() => onClickOnlyWithPrice()}>
                    <span>&#8362; עם מחיר</span>
                </div>
                <div
                    className={`sort-element ${searchOnlyWithImg ? "color-orange" : ""}`}
                    onClick={() => onClickOnlyWithImg()}>
                    <FontAwesomeIcon className="icon" icon={faImage} /> עם תמונה
                </div>
                <div className="map__mode"><FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />תצוגת מפה</div>
            </div>


            {isDisplayOptionsOpen && <div className="dialog-content__mobile" >
                <div className="checkbox-element">
                    <label className={searchOnlyWithPrice ? 'checked' : ""} onClick={() => setSearchOnlyWithPrice(!searchOnlyWithPrice)}>
                        <span className="checkmark"></span>
                    </label>
                    <span>רק עם מחיר</span>
                </div>
                <div className="checkbox-element">
                    <label className={searchOnlyWithImg ? 'checked' : ""} onClick={() => setSearchOnlyWithImg(!searchOnlyWithImg)}>
                        <span className="checkmark"></span>
                    </label>
                    <span>רק עם תמונה</span>
                </div>
            </div>}

            {(isDisplayOptionsOpen || isSortOptionsOpen) && <span className="mobile__backdrop" onClick={() => setIsDisplayOptionsOpen(false)}></span>}
        </div>
    )
}

export default SortAds



