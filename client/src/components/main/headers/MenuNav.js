import React, { useContext } from 'react'
import { logoutAction } from '../../../actions/userActions';
import { UserContext } from '../../../context/UserContext';
import { deleteUserFromCookie } from '../../../cookies/cookies';
import { logOut } from './../../login/utils';


function MenuNav({ setDisplayLogin, setDisplayMobileNav }) {


    const { userData, dispatchUserData } = useContext(UserContext);


    const onClickLogout = (event) => {
        event.stopPropagation();
        logOut(userData.token);
        dispatchUserData(logoutAction());
        deleteUserFromCookie();
    };


    const onClickUserIcon = () => {
        if(userData.user) return;
        setDisplayLogin(true);
    }


    const onClickPostNewAd = () => {
        if(!userData.user){
            setDisplayLogin(true);
        }else{

        }
    }
    

    return (
        <div className="header__menu__nav">
            <div className="header__menu__logo">
                <img src="./images/yad2Logo.png" alt="logo-icon"></img>
                <img className="mobile__logo" src="./images/Yad2_logo_white.svg" alt="logo-icon"></img>
            </div>
            <div className="header-menu__small-screen" onClick={() => setDisplayMobileNav(true)}>
                <div className="menu-icon">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p>תפריט</p>
            </div>
            <ul>
                <li className="header-menu__item">נדל"ן</li>
                <li className="header-menu__item">רכב</li>
                <li className="header-menu__item">יד שנייה</li>
                <li className="header-menu__item">דרושים IL</li>
                <li className="header-menu__item">עסקים למכירה</li>
                <li className="header-menu__item">חיות מחמד</li>
                <li className="header-menu__item">בעלי מקצוע</li>
                <li className="header-menu__item">עוד...</li>
            </ul>
            <div className="header-menu__user">
                <div className="">
                    <img src="./images/bell-icon.png" alt="bell-icon"></img>
                    <p>התראות</p>
                </div>
                <div className="">
                    <img src="./images/like-icon.png" alt="like-icon"></img>
                    <p>מודעות שאהבתי</p>
                </div>
                <div onClick={onClickUserIcon}>
                    {userData.user ?
                        <h4>{userData.user.firstName}</h4> :
                        <><img className="user-icon__img" src="./images/user-icon.png" alt="user-icon" /><p>התחברות</p></>
                    }
                    {userData.user &&
                        <div>
                            <h5>איזור אישי</h5>
                            <h5>השוואת רכבים</h5>
                            <h5>חיפושים אחרונים</h5>
                            <h5 onClick={onClickLogout}>התנתקות</h5>
                        </div>
                    }

                </div>
                <button onClick={onClickPostNewAd}>+ פרסום מודעה חדשה</button>
            </div>
        </div>
    )
};

export default MenuNav;
