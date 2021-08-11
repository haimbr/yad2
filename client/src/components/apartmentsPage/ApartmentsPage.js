import React, { useState } from 'react'
import Header from './../main/headers/Header';
import MobileMenu from './../main/MobileMenu';
import LoginPage from './../login/Login-page';
import Footer from './../main/Footer';
import SearchPage from './../searchAndSort/SearchPage.component';
import { useEffect } from 'react';
import { getApartmentsHeaders } from './../../api/apartmentsUtils';
import AdHeader from './AdHeader';
// import SortAds from '../searchAndSort/sort/SortAds';

const ApartmentsPage = () => {
    const [displayLogin, setDisplayLogin] = useState(false);
    const [displayMobileNav, setDisplayMobileNav] = useState(false);
    const [isNoResult, setIsNoResult] = useState(false);
    const [adsArr, setAdsArr] = useState([]);
    const [resultsCount, setResultsCount] = useState("");

    useEffect(() => {

        const getData = async () => {
            const apartmentsArr = await getApartmentsHeaders();
            setAdsArr(apartmentsArr?.data.apartmentsArr || []);
            setResultsCount(apartmentsArr?.data.resultsCount);
        }
        getData();

    }, []);

    return (
        <div >

            <Header setDisplayLogin={setDisplayLogin} setDisplayMobileNav={setDisplayMobileNav} />
            <SearchPage setAdsArr={setAdsArr} setIsNoResult={setIsNoResult} resultsCount={resultsCount} setResultsCount={setResultsCount}/>
            {displayMobileNav && <MobileMenu setDisplayLogin={setDisplayLogin} setDisplayMobileNav={setDisplayMobileNav} />}
            <LoginPage displayLogin={displayLogin} setDisplayLogin={setDisplayLogin} />
           
            {!isNoResult && <div className="apartments__container">
                {adsArr.map((apartment, index) => (
                    <AdHeader key={index} apartment={apartment} />
                ))}
            </div>}
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
