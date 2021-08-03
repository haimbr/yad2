import React, { useContext, useState } from 'react'
import { setEntirePropertiesArrAction, setOnePropertyAction } from '../../../actions/searchAction';
import { SearchContext } from '../../../context/SearchContext';
import * as propertiesTypeData from '../data/propertiesTypeData';

const DropDownCheckBox = ({ propertiesArr, arrName, header }) => {

    const [isOpen, setIsOpen] = useState(false);
    const { searchData, dispatchSearchData } = useContext(SearchContext);


    const getArrStatus = () => {
        const isSelectedAll = !searchData.propertyTypes[arrName].includes(undefined);
        const isSelectedPartial = searchData.propertyTypes[arrName].some((element) => typeof element === "string");
        if (!isSelectedAll && !isSelectedPartial) return "empty";
        return isSelectedAll ? "checked" : "partial-checked";
    }


    const getCheckedCount = () => {
        const count = searchData.propertyTypes[arrName].filter(property => typeof property === "string").length;
        return count > 0 ? `נבחרו ${count} סוגים` : "";
    }


    const getPropertyStatus = (index) => {
        return searchData.propertyTypes[arrName][index] ? "checked" : "empty";
    }


    const onHeaderClicked = () => {
        const isAllOptionsChecked = getArrStatus() === "checked";
        dispatchSearchData(setEntirePropertiesArrAction(arrName, isAllOptionsChecked ? null : propertiesTypeData[arrName]))
    }



    const onPropertyClicked = (propertyName, index) => {
        const isOptionsEmpty = getPropertyStatus(index) === "empty";
        dispatchSearchData(setOnePropertyAction(arrName, index, isOptionsEmpty ? propertyName : undefined))
    }


    const onClickDropdownIcon = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen)
    }
    return (
        <div className="dropdown-checkbox">
            <div className="dropdown-header" onClick={onHeaderClicked}>
                <div className="checkbox-element">
                    <div className="">
                        <label className={getArrStatus()}>
                            <span className="checkmark"></span>
                        </label>
                        <span> { header } </span>
                        <span className="gray-text">{getCheckedCount()}</span>
                    </div>

                    <span
                        className={`dropdown ${isOpen ? "dropdown__clicked" : "dropdown__not-clicked"}`}
                        onClick={onClickDropdownIcon}
                    ></span>
                </div>
            </div>

            {isOpen && <div className="properties-list">
                {propertiesArr.map((property, index) => (
                    <div key={index} onClick={() => onPropertyClicked(property, index)}>
                        <div className="checkbox-element">
                            <label className={getPropertyStatus(index)}>
                                <span className="checkmark"></span>
                            </label>
                            <span>{property}</span>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default DropDownCheckBox;
