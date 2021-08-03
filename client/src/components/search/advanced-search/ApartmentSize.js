import React, { useContext } from 'react'
import { setSizeAction } from '../../../actions/searchAction';
import { SearchContext } from '../../../context/SearchContext';
import InputElement from './../InputElement.component';

const ApartmentSize = () => {

    const { searchData, dispatchSearchData } = useContext(SearchContext);

    const onSizeClicked = (event, priceType) => {
        let size = event.target.value.replace(/\D/g, '');
        dispatchSearchData(setSizeAction({ [priceType]: size }))
    }

    return (
        <div className="apartment-size">
            <label>גודל דירה (במ"ר)</label>
            <div className="search-by-size__inputs">
                <InputElement inputAttributes={{
                    placeholder: "מ-",
                    value: searchData.apartmentSize.min,
                    onChange: (event) => (onSizeClicked(event, "min"))
                }} />
                <InputElement inputAttributes={{
                    placeholder: "עד-",
                    value: searchData.apartmentSize.max,
                    onChange: (event) => (onSizeClicked(event, "max"))
                }} />
            </div>
        </div>
    )
}

export default ApartmentSize;
