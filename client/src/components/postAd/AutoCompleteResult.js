import React from 'react'

const AutoCompleteResult = ({ autocompleteResults, autocompleteType, handleClick }) => {
    return (
        <div className="autocomplete-result__post-ad">
            <ul>
                {autocompleteResults?.map((resultArr, index) => (
                    <li className="autocomplete-text" key={index} onClick={() => handleClick(resultArr, autocompleteType)}>{
                        resultArr?.map((str, index) => (
                            <span key={index} className={str.className}>{str.value}</span>
                        ))
                    }</li>
                ))}
            </ul>
        </div>
    )
}

export default AutoCompleteResult;
