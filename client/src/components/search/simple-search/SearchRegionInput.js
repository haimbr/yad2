import React, { createRef, useContext, useState } from 'react'
import InputElement from '../InputElement.component';
import { searchAutoComplete } from '../utils';
import { SearchContext } from '../../../context/SearchContext';
import { setRegionAction } from '../../../actions/searchAction';
import useOnClickOutsideClose from '../../../hooks/useOnClickOutsideClose';


const SearchRegionInput = () => {
    const ref = createRef();
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const { searchData, dispatchSearchData } = useContext(SearchContext);

    useOnClickOutsideClose(ref, () => setIsOpen(false));

    const onChangeAutoCompleteInput = async (event) => {
        const searchValue = event.target.value;
        dispatchSearchData(setRegionAction(searchValue));
        const results = await searchAutoComplete(searchValue);
        setAutocompleteResults(results);
    }

    const onClickAutocomplete = (autocompleteArr) => {
        let autocompleteText = "";
        autocompleteArr.forEach((item) => autocompleteText += item.value)
        dispatchSearchData(setRegionAction(autocompleteText));
        setIsOpen(false);
    }



    const onInputClicked = (event) => {
        event.stopPropagation();
        setIsOpen(true);
    }

    return (
        <div className="autocomplete__container" ref={ref}>
            <InputElement 
                className={"autocomplete__input"}
                label={"חפשו אזור, עיר, שכונה או רחוב"}
                inputAttributes={{
                    placeholder: "לדומה: פארק הים",
                    onChange: onChangeAutoCompleteInput,
                    value: searchData.region,
                    onClick: onInputClicked,
                }}
            />
            {
                (autocompleteResults?.length !== 0 && isOpen) &&
                <div className="dropdown">
                    <div className="autocomplete-results">
                        <p>חפשו אזור, עיר, שכונה או רחוב</p>
                        {
                            autocompleteResults?.map((result) => (
                                <div className={result.type} key={result.key}>
                                    <span className="autocomplete-text" onClick={() => onClickAutocomplete(result.data)}>{
                                        result.data?.map((str, index) => (
                                            <span key={index} className={str.className}>{str.value}</span>
                                        ))
                                    }</span>
                                    <span className={"autocomplete__subject"}>{result.subject}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default SearchRegionInput;
