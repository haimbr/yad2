import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ApartmentsPage from '../components/apartmentsPage/ApartmentsPage';
import PostAdMainPage from '../components/postAd/PostAdMainPage';
import SearchContextProvider from '../context/SearchContext';
import UserContextProvider from '../context/UserContext';
import PrivateRoute from './PrivateRoute';




const AppRouter = () => {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/apartments-page" />
                    </Route>.
                    <PrivateRoute path="/postAd" component={PostAdMainPage} />

                    <SearchContextProvider>
                        <Route path="/apartments-page" component={ApartmentsPage} />
                    </SearchContextProvider>


                </Switch>
            </UserContextProvider>
        </BrowserRouter>
    )

};

export default AppRouter;