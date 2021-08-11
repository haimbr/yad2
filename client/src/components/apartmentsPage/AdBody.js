import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSnowflake,
    faHouseDamage,
    faBoxOpen,
    faDoorClosed,
    faChair,
    faWheelchair,
    faDungeon,
    faHome,
    faPaintRoller,
    faFaucet,
    faSolarPanel,
    faBars,
    faCalendarWeek,
} from '@fortawesome/free-solid-svg-icons';

const properties = ['מיזוג', 'ממ"ד', 'מחסן', 'דלתות פנדור', 'ריהוט', 'גישה לנכים', 'מעלית', 'מזגן תדיראן', 'יחידת דיור', 'משופצת', 'מטבח כשר', 'דוד שמש', 'סורגים', 'לטווח ארוך'];
const propertiesIcons = [faSnowflake, faHouseDamage, faBoxOpen, faDoorClosed, faChair, faWheelchair, faDungeon, faSnowflake, faHome, faPaintRoller, faFaucet, faSolarPanel, faBars, faCalendarWeek];

const AdBody = ({ apartment }) => {
    return (
        <div className="Ad-body_container">
            <div className="placeHolder"></div>
            {apartment && <div className="ad-body__content">
                {apartment.apartmentDesc && <span className="property__desc">
                    <p>תיאור הנכס</p>
                    <p>{apartment.apartmentDesc}</p>
                </span>}

                <div className="apartment__details">
                    {apartment.entryDate && <span>תאריך כניסה<b>
                        {new Date(apartment.entryDate) > Date.now() ?
                            new Date(apartment.entryDate).toLocaleDateString().replaceAll('.', '/')
                            : "כניסה מיידית"}
                    </b></span>}
                    {apartment.houseCommittee > 0 && <span>ועד בית (לחודש)<b>{apartment.houseCommittee}</b></span>}
                    {apartment.balconiesNum > 0 && <span>מרפסות<b>{apartment.balconiesNum}</b></span>}
                    {apartment.floorsInBuilding > 0 && <span>קומות בבנין<b>{apartment.floorsInBuilding}</b></span>}
                    {apartment.paymentsNum > 0 && <span>מס תשלומים<b>{apartment.paymentsNum}</b></span>}
                    {apartment.parkingsNum < 0 && <span>חניות<b>{apartment.parkingsNum}</b></span>}
                </div>
                <div className="apartment-properties__container">
                    <span >מה יש בנכס?</span>
                    <span className="apartment-properties">
                        {properties.map((property, index) => (
                            <span className={apartment.apartmentProperties.includes(property) ? "bold" : ""} key={index}>
                                <FontAwesomeIcon className="property-icon" icon={propertiesIcons[index]} />
                                {property}
                            </span>
                        ))

                        }
                    </span>
                </div>
            </div>}
        </div>
    )
}

export default AdBody
