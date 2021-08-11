import React, { useContext } from 'react'
import { setPriceAction } from '../../../actions/searchAction';
import { SearchContext } from '../../../context/SearchContext';
import InputElement from '../InputElement.component'


const mobileButtons = ["6,000-7,500", "5,000-6,000", "4,000-5,000", "3,000-4,000", "עד 3000"].reverse();



const SearchByPrice = ({ isMobileMode }) => {

    const { searchData, dispatchSearchData } = useContext(SearchContext);

    const onPriceClicked = (event, priceType) => {
        let price = parseInt(event.target.value.replace(/\D/g, ''));
        price = isNaN(price) ? '' : price.toLocaleString();
        dispatchSearchData(setPriceAction({ [priceType]: price }))
    }


    const onMobileButtonsClicked = (index) => {
        switch (index) {
            case 0:
                return dispatchSearchData(setPriceAction({ min: 0, max: 3000 }));
            case 1:
                return dispatchSearchData(setPriceAction({ min: 3000, max: 4000 }));
            case 2:
                return dispatchSearchData(setPriceAction({ min: 4000, max: 5000 }));
            case 3:
                return dispatchSearchData(setPriceAction({ min: 5000, max: 6000 }));
            case 4:
                return dispatchSearchData(setPriceAction({ min: 6000, max: 7500 }));
            default: return;
        }
    }


    return (
        <div className="search-by-price__container">
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
            {isMobileMode && <div className="mobile__buttons">
                {mobileButtons.map((item, index) => (
                    <span key={index} onClick={() => onMobileButtonsClicked(index)}>{item}</span>
                ))}
            </div>}
        </div>



    )
}

export default SearchByPrice;
