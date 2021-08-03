import React, { useContext, useState } from 'react'
import { setEntryDateAction } from '../../../actions/searchAction';
import { SearchContext } from '../../../context/SearchContext';

const SearchByEntryDate = () => {

    const { searchData, dispatchSearchData } = useContext(SearchContext);

    const minDate = new Date().toISOString().split('T')[0];

    const [isAvailableImmediatelyClicked, setIsAvailableImmediatelyClicked] = useState(false);



    const onAvailableImmediatelyClicked = () => {
        setIsAvailableImmediatelyClicked(!isAvailableImmediatelyClicked);
        dispatchSearchData(setEntryDateAction(new Date().toISOString().split('T')[0]))
    }

    const onDateClicked = (event) => {
        dispatchSearchData(setEntryDateAction(event.target.value))
    }

    return (
        <div className="search-by-entry-date">
            <div className="search-date">
                <input type="date" name="begin" min={minDate} value={searchData.entryDate} onChange={onDateClicked} />
            </div>
            <div className="checkbox-element" onClick={onAvailableImmediatelyClicked}>
                <label className={isAvailableImmediatelyClicked ? "checked" : "empty"}>
                    <span className="checkmark"></span>
                </label>
                <span>כניסה מיידית</span>
            </div>
        </div>
    )
}

export default SearchByEntryDate;
