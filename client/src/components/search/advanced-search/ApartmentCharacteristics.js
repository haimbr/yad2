import React, { useContext } from 'react';
import { setApartmentCharacteristics } from '../../../actions/searchAction';
import { SearchContext } from '../../../context/SearchContext';
import { apartmentCharacteristics } from '../data/propertiesTypeData';

const ApartmentCharacteristics = () => {


    const { searchData, dispatchSearchData } = useContext(SearchContext);

    const getCharacteristicState = (index) => {
        return searchData.apartmentCharacteristics[index] !== undefined ? "checked" : "empty";
    }

    const onClickCharacteristic = (index, name) => {
        const value = searchData.apartmentCharacteristics[index] !== undefined ? undefined : name;
        dispatchSearchData(setApartmentCharacteristics(index, value));
    }

    return (
        <div className="apartment-characteristics">
            <ul>
                {
                    apartmentCharacteristics.map((element, index) => (
                        <div key={index} onClick={() => onClickCharacteristic(index, element)}>
                            <div className="checkbox-element">
                                <label className={getCharacteristicState(index)}>
                                    <span className="checkmark"></span>
                                </label>
                                <span>{element}</span>
                            </div>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default ApartmentCharacteristics
