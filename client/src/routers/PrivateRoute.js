import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext(UserContext);

    return (
        <Route
            {...rest}
            component={(props) => (
                !!userData.user ?
                    <Component {...props} /> :
                    <Redirect to={{ pathname: "/apartments-page" }} />
            )}
        />);
};

export default PrivateRoute;