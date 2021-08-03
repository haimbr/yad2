import React, { createContext, useReducer } from 'react';
import { getUserFromCookie } from '../cookies/cookies';
import userReducer, { userDataInitialState } from './../reducers/userReducer';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const cookieUserData = getUserFromCookie();
    const [userData, dispatchUserData] = useReducer(userReducer, cookieUserData || userDataInitialState);

    return (
        <UserContext.Provider value={ { userData, dispatchUserData } }>
            {props.children }
        </UserContext.Provider>
    );
}; 

export default UserContextProvider;