import React from 'react'

function Navigation() {
    return (
        <div className="header__nav">
            <ul>
                <li>מכירה</li>
                <li>השכרה</li>
                <li>דירות שותפים</li>
                <li>נדל"ן מסחרי</li>
            </ul>
            
            <div className="service-menu">
                <div>
                    <img src="./images/hammer-icon.png" alt="hammer-icon" />
                    <p>כונס נכסים</p>
                </div>
                <div>
                    <img src="./images/chart-icon.png" alt="chart-icon" />
                    <p>מדד הנדל"ן</p>
                </div>
                <div>
                    <img src="./images/yad1_logo.svg" alt="yad1-icon" />
                    <p>יד1 דירות חדשות</p>
                </div>
                <div>
                    <img src="./images/yadata_logo_black.svg" alt="yadata_logo" />
                    <p>הערכת שווי נכס</p>
                </div>
            </div>
        </div>
    )
};

export default Navigation;
