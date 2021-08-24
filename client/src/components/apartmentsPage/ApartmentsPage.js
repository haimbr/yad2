import React, { useContext, useState } from 'react'
import Header from './../main/headers/Header';
import MobileMenu from './../main/MobileMenu';
import LoginPage from './../login/Login-page';
import Footer from './../main/Footer';
import SearchPage from './../searchAndSort/SearchPage.component';
import { useEffect } from 'react';
import { getApartmentsHeaders } from './../../api/apartmentsUtils';
import AdHeader from './AdHeader';
import { UserContext } from '../../context/UserContext';
import { setMessageAction } from '../../actions/userActions';
import Pagination from './Pagination';



const ApartmentsPage = () => {

    const { userData, dispatchUserData } = useContext(UserContext);
    const [isMobileMode, setIsMobileMode] = useState(false);
    const [displayLogin, setDisplayLogin] = useState(false);
    const [displayMobileNav, setDisplayMobileNav] = useState(false);
    const [isNoResult, setIsNoResult] = useState(false);
    const [adsArr, setAdsArr] = useState([]);
    const [resultsCount, setResultsCount] = useState(0);


    useEffect(() => {
        const getData = async () => {
            const apartmentsArr = await getApartmentsHeaders();
            setAdsArr(apartmentsArr?.data.apartmentsArr || []);
            setResultsCount(apartmentsArr?.data.resultsCount);
        }
        getData();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            dispatchUserData(setMessageAction(""));
        }, 4000);

    }, [userData.message, dispatchUserData]);

    return (
        <div className={isMobileMode ? "mobile-mode" : ""}>
            {userData.message && <div className="user-message">
                <p>{userData.message}</p>
            </div>}
            <Header setDisplayLogin={setDisplayLogin} setDisplayMobileNav={setDisplayMobileNav} />
            <LoginPage displayLogin={displayLogin} setDisplayLogin={setDisplayLogin} />
            <SearchPage
                setAdsArr={setAdsArr}
                setIsNoResult={setIsNoResult}
                resultsCount={resultsCount}
                setResultsCount={setResultsCount}
                isMobileMode={isMobileMode}
                setIsMobileMode={setIsMobileMode}
            />
            {displayMobileNav && <MobileMenu setDisplayLogin={setDisplayLogin} setDisplayMobileNav={setDisplayMobileNav} />}


            {!isNoResult && <div className="apartments__container">
                {adsArr.map((apartment, index) => (
                    <AdHeader key={index} apartment={apartment} />
                ))}
            </div>}
            {resultsCount > 0 && <Pagination resultsCount={resultsCount} setAdsArr={setAdsArr} />}

            {isNoResult && <div className="no_results__container">
                <img src="./images/no_results.svg" alt="no_results" />
                <div>
                    <p>לא מצאנו תוצאות לחיפוש המבוקש</p>
                    <p>אנא נסו חיפוש אחר</p>
                </div>
            </div>}
            <Footer />
        </div>
    )
}

export default ApartmentsPage;
