import React, { createRef, useContext, useState } from 'react'
import DropDownInput from './DropDownInput';
import DropDownCheckBox from './DropDownCheckBox';
import { apartmentsArr, housesArr, othersArr } from '../data/propertiesTypeData';
import { SearchContext } from '../../../context/SearchContext';
import { setAllPropertiesAction } from '../../../actions/searchAction';
import useOnClickOutsideClose from '../../../hooks/useOnClickOutsideClose';


const PropertiesTypesList = ({ isDropdownOpen, setIsDropdownOpen }) => {
    const ref = createRef();
    useOnClickOutsideClose(ref, () => setIsDropdownOpen(false));
    const { searchData, dispatchSearchData } = useContext(SearchContext);


    const getAllPropertiesStatus = () => {
        const isSelectedAll =
            !searchData.propertyTypes.apartmentsArr.includes(undefined) &&
            !searchData.propertyTypes.housesArr.includes(undefined) &&
            !searchData.propertyTypes.othersArr.includes(undefined);
        const isSelectedPartial =
            searchData.propertyTypes.apartmentsArr.some((element) => typeof element === "string") ||
            searchData.propertyTypes.housesArr.some((element) => typeof element === "string") ||
            searchData.propertyTypes.othersArr.some((element) => typeof element === "string");

        if (!isSelectedAll && !isSelectedPartial) return "empty";
        return isSelectedAll ? "checked" : "partial-checked";
    }

    const onClickAllPropertyOptions = () => {
        const isAllOptionsChecked = getAllPropertiesStatus() === "checked";
        dispatchSearchData(setAllPropertiesAction(isAllOptionsChecked ? null : { apartmentsArr, housesArr, othersArr }));
    }

    const onClickSelect = (event) => {
        event.stopPropagation();
        setIsDropdownOpen(false)
    }

    return (
        <div className="type-of-property__container" ref={ref} >
            <DropDownInput
                className={"type-of-property__input"}
                label={"סוג נכס"}
                isOpen={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                inputAttributes={{
                    placeholder: "בחרו סוגי נכסים",
                    disabled: "disabled",
                    value: ""
                }}
            />
            {
                isDropdownOpen &&
                <div className="dropdown_content" >
                    <ul>
                        <div onClick={onClickAllPropertyOptions}>
                            <div className="checkbox-element dropdown-main-header">
                                <label className={getAllPropertiesStatus()}>
                                    <span className="checkmark"></span>
                                </label>
                                <span>כל סוגי הנכסים</span>
                            </div>
                        </div>
                        <div className="mobile-clear" onClick={() => dispatchSearchData(setAllPropertiesAction(null))}>איפוס</div>
                        <DropDownCheckBox propertiesArr={apartmentsArr} arrName={"apartmentsArr"} header={"דירות"} />
                        <DropDownCheckBox propertiesArr={housesArr} arrName={"housesArr"} header={"בתים"} />
                        <DropDownCheckBox propertiesArr={othersArr} arrName={"othersArr"} header={"סוגים נוספים"} />
                        <div className="select" onClick={onClickSelect} >בחירה</div>
                    </ul>
                </div>
            }

        </div>
    )
}

export default PropertiesTypesList;
