import React from 'react';
import MenuNav from './MenuNav';
import Navigation from './Navigation';

const Header = ({setDisplayLogin, setDisplayMobileNav }) => {
    return (
        <div className="header__container">
            <MenuNav setDisplayLogin={setDisplayLogin} setDisplayMobileNav={setDisplayMobileNav} />
            <Navigation />
        </div>
    )
}

export default Header;
