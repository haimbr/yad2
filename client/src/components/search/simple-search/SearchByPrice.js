import React, { useContext } from 'react'
import { setPriceAction } from '../../../actions/searchAction';
import { SearchContext } from '../../../context/SearchContext';
import InputElement from '../InputElement.component'

const SearchByPrice = () => {

    const { searchData, dispatchSearchData } = useContext(SearchContext);

    const onPriceClicked = (event, priceType) => {
        let price = parseInt(event.target.value.replace(/\D/g, ''));
        price = isNaN(price) ? '' : price.toLocaleString();
        dispatchSearchData(setPriceAction({ [priceType]: price }))
    }
    return (
        <div className="search-by-price">
            <label>מחיר</label>
            <div className="search-by-price__inputs">
                <InputElement inputAttributes={{
                    placeholder: "ממחיר",
                    value: searchData.price.min,
                    onChange: (event) => (onPriceClicked(event, "min"))
                }} />
                <InputElement inputAttributes={{
                    placeholder: "עד מחיר",
                    value: searchData.price.max,
                    onChange: (event) => (onPriceClicked(event, "max"))
                }} />
            </div>
        </div>

    )
}

export default SearchByPrice;
