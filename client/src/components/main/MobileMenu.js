import React from 'react';


const quickSearchData = [
    { text: 'נדל"ן', icon: 'home-icon' },
    { text: 'רכב', icon: 'car-icon' },
    { text: 'יד שנייה', icon: 'furniture-icon' },
    { text: 'עסקים למכירה', icon: 'business-icon' },
    { text: 'דרושים IL', icon: 'search-icon' },
    { text: 'חיות מחמד', icon: 'animals-icon' },
    { text: 'תיירות ונופש', icon: 'tourism-icon' },
    { text: 'לימודים', icon: 'studies-icon' },
];

const navByCategoryData = [
    { text: 'נדל"ן', dropdownIcon: true },
    { text: 'רכב', dropdownIcon: true },
    { text: 'יד שנייה', dropdownIcon: true },
    { text: 'דרושים IL', dropdownIcon: true },
    { text: 'עסקים למכירה', dropdownIcon: true },
    { text: 'חיות מחמד', dropdownIcon: true },
    { text: 'בעלי מקצוע', dropdownIcon: true },
    { text: 'תיירות ונופש', dropdownIcon: false },
    { text: 'לימודים', dropdownIcon: false },
    { text: 'מגזין יד2', dropdownIcon: false },
];

const MobileMenu = ({ setDisplayLogin, setDisplayMobileNav }) => {



    return (
        <div className="mobile-menu-container">
            <div className="mobile-menu">

                <span className="close-icon" onClick={() => setDisplayMobileNav(false)}></span>
                <div className="user">
                    <div className="login-icon" onClick={() => setDisplayLogin(true)}>
                        <img src="./images/user-icon.png" alt="user-icon" />
                        <span>התחברות</span>
                    </div>
                    <button>פרסום מודעה </button>
                    <div className="icons">
                        <div><img src="./images/bell-icon.png" alt="bell-icon" />התראות שלי</div>
                        <div><img src="./images/like-icon.png" alt="like-icon" />מודעות שאהבתי</div>
                        <div><img src="./images/search-icon.png" alt="search-icon" />חיפושים אחרונים</div>
                        <div><img src="./images/compare-icon.png" alt="compare-icon" />השוואת רכבים</div>
                    </div>
                </div>
                <div className="quick-search">
                    <p>חיפוש מהיר באתר</p>
                    <ul>
                        {quickSearchData.map((item, index) => (
                            <li key={index}>
                                <img src={`./images/mobile-icons/${item.icon}.png`} alt={item.icon} />
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="nav-by-category">
                    <p>ניווט לפי קטגוריות</p>
                    <ul>
                        {navByCategoryData.map((item, index) => (
                            <li key={index}>
                                <span>{item.text}</span>
                                {item.dropdownIcon && <span className="dropdown-icon"></span>}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="menu_bottom_section">
                   
                <span><img src="./images/mobile-icons/terms-icon.png" alt="terms-icon" />תקנון</span>
                <span><img src="./images/mobile-icons/privacy-icon.png" alt="privacy-icon" />פרטיות ותנאים</span>
                <span><img src="./images/mobile-icons/accessibility-icon.png" alt="accessibility-icon" />נגישות</span>
                <span><img src="./images/mobile-icons/question-mark-icon .png" alt="question-mark-icon" />מענה לשאלות</span>
                <span><img src="./images/mobile-icons/contact-icon.png" alt="contact-icon" />יצירת קשר</span>
                </div>

            </div>
            <div className="backdrop"></div>
        </div>

    )
}

export default MobileMenu;
