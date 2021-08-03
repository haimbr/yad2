import React, { createContext, useReducer } from 'react';
import searchReducer, { searchDataInitialState } from './../reducers/searchReducer';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {
    const [searchData, dispatchSearchData] = useReducer(searchReducer, searchDataInitialState);

    return (
        <SearchContext.Provider value={ { searchData, dispatchSearchData } }>
            {props.children }
        </SearchContext.Provider>
    );
};

export default SearchContextProvider;