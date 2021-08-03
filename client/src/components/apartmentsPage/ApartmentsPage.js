import React, { useState } from 'react'
import Header from './../main/headers/Header';
import MobileMenu from './../main/MobileMenu';
import LoginPage from './../login/Login-page';
import Footer from './../main/Footer';
import SearchPage from './../search/SearchPage.component';

const ApartmentsPage = () => {
    const [displayLogin, setDisplayLogin] = useState(false);
    const [displayMobileNav, setDisplayMobileNav] = useState(false);

    return (
        <div >
            
            <Header setDisplayLogin={setDisplayLogin} setDisplayMobileNav={setDisplayMobileNav} />
            <SearchPage />
            {displayMobileNav && <MobileMenu setDisplayLogin={setDisplayLogin} setDisplayMobileNav={setDisplayMobileNav}  />}
            <LoginPage displayLogin={displayLogin} setDisplayLogin={setDisplayLogin} />
            <Footer />
        </div>
    )
}

export default ApartmentsPage;
