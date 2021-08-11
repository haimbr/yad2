import React, { createRef, useContext, useState } from 'react'
import useOnClickOutsideClose from '../../../hooks/useOnClickOutsideClose';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from '../../../context/SearchContext';
import { setOnlyWithImgAction, setOnlyWithPriceAction, setSortParameterAction } from '../../../actions/searchAction';
import { searchAds } from '../../../api/apartmentsUtils';




const sortTypes = ["לפי תאריך", "מחיר - מהזול ליקר", "מחיר - מהיקר לזול"];
const sortTypesInEnglish = ["updatedAt", "priceAscending", "priceDescending"];

const SortAds = ({ setAdsArr, setIsNoResult, setResultsCount }) => {
    const sortOptionsRef = createRef();
    const displayOptionsRef = createRef();
    const { searchData, dispatchSearchData } = useContext(SearchContext);

    const [sortType, setSortType] = useState(sortTypes[0]);
    const [isSortOptionsOpen, setIsSortOptionsOpen] = useState(false);
    const [isDisplayOptionsOpen, setIsDisplayOptionsOpen] = useState(false);

    useOnClickOutsideClose(displayOptionsRef, () => { setIsDisplayOptionsOpen(false) });
    useOnClickOutsideClose(sortOptionsRef, () => { setIsSortOptionsOpen(false) });


    const onClickSortType = (index) => {
        dispatchSearchData(setSortParameterAction(sortTypesInEnglish[index]))
        setSortType(sortTypes[index]);
        onClickSort();
    }


    const onClickSort = async () => {
        const apartmentsArr = await searchAds(searchData);
        setAdsArr(apartmentsArr.data.apartmentsArr);
        setResultsCount(apartmentsArr?.data.resultsCount);
        setIsSortOptionsOpen(false);
        if (apartmentsArr.data.apartmentsArr.length < 1) {
            setIsNoResult(true);
        } else {
            setIsNoResult(false);
        }
    }

    const onClickDisplayOnly = (actionFunc) => {
        dispatchSearchData(actionFunc());
        onClickSort();

    }



    return (
        <div className="sort-ad__container">
            <div className="sort-by" ref={sortOptionsRef}  >
                <p > מיין לפי</p>
                <div className="sort-button" onClick={() => setIsSortOptionsOpen(!isSortOptionsOpen)} >{sortType}</div>
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
                <p>הצג מודעות</p>
                <div
                    className={searchData.onlyWithPrice ? "color-orange" : ""}
                    onClick={() => onClickDisplayOnly(setOnlyWithPriceAction)}>
                    &#8362; עם מחיר
                </div>
                <div
                    className={searchData.onlyWithImg ? "color-orange" : ""}
                    onClick={() => onClickDisplayOnly(setOnlyWithImgAction)}>
                    <FontAwesomeIcon className="icon" icon={faImage} /> עם תמונה
                </div>
                <div><FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />תצוגת מפה</div>
            </div>
        </div>
    )
}

export default SortAds
