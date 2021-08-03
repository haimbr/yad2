import React, { useState } from 'react'
import SelectInput from '../SelectInput';
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
    faBars
} from '@fortawesome/free-solid-svg-icons';
import SwitchInput from '../SwitchInput';



const roomsNumOptions = ['בחירת מספר חדרים', 0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 8, 9, 10, 11, 12];
const parkingOptions = ['ללא', 3, 2, 1];
const balconiesOptions = ['ללא', 3, 2, 1];
const properties = ['מיזוג', 'ממ"ד', 'מחסן', 'דלתות פנדור', 'ריהוט', 'גישה לנכים', 'מעלית', 'מזגן תדיראן', 'יחידת דיור', 'משופצת', 'מטבח כשר', 'דוד שמש', 'סורגים'];
const propertiesIcons = [faSnowflake, faHouseDamage, faBoxOpen, faDoorClosed, faChair, faWheelchair, faDungeon, faSnowflake, faHome, faPaintRoller, faFaucet, faSolarPanel, faBars];

const AboutTheProperty = ({ setCurrentStage, setAboutThePropertyState }) => {

    const [roomsNum, setRoomsNum] = useState("");
    const [parkingsNum, setParkingsNum] = useState(0);
    const [balconiesNum, setBalconiesNum] = useState(0);
    const [apartmentDesc, setApartmentDesc] = useState("");
    const [apartmentProperties, setApartmentProperties] = useState([]);
    const [warningMessage, setWarningMessage] = useState("");



    const onClickNext = () => {
        if (!roomsNum) return setWarningMessage("שדה חובה מספר חדרים");
        setAboutThePropertyState({
            isValid: true,
            details: {
                roomsNum,
                parkingsNum,
                balconiesNum,
                apartmentDesc,
                apartmentProperties: [...apartmentProperties],
            }
        });
        setCurrentStage(3);
    }

    const onPropertyClicked = (property) => {
        if (apartmentProperties.includes(property)) {
            setApartmentProperties(apartmentProperties.filter(item => item !== property));
        } else {
            setApartmentProperties([...apartmentProperties, property]);
        };
    };


    return (
        <div className="aboutTheProperty-container">
            <span className="">
                <label>מספר חדרים*</label>
                <SelectInput options={roomsNumOptions} onChange={(event) => setRoomsNum(event.target.value)} />
                {!roomsNum && <span className="warning-message">{warningMessage}</span>}
            </span>
            <span>
                <label>חניה</label>
                <SwitchInput options={parkingOptions} selectedOption={parkingsNum} setSelectedOption={setParkingsNum} />
            </span>
            <span>
                <label>מרפסת</label>
                <SwitchInput options={balconiesOptions} selectedOption={balconiesNum} setSelectedOption={setBalconiesNum} />
            </span>



            <div className="publish-properties-container">
                {properties.map((property, index) =>
                    <div
                        onClick={() => onPropertyClicked(property)}
                        key={index}
                        className={apartmentProperties.includes(property) ? 'publish-property-option chosen-property-option' : 'publish-property-option'} >
                        {property}
                        <FontAwesomeIcon className="property-icon" icon={propertiesIcons[index]} />
                    </div>
                )}
            </div>
            <div className="textarea-container">
                <p>מה חשוב לך שידעו על הנכס?</p>
                <label>פרוט הנכס</label>
                <textarea onBlur={(e) => { setApartmentDesc(e.target.value) }} maxLength="400" placeholder="זה המקום לתאר את הפרטים הבולטים, למשל, האם נערך שיפוץ במבנה, מה שופץ, כיווני אוויר, האווירה ברחוב וכו'"></textarea>
            </div>
            <div className="buttonsNextPreviousWrap">
                <span onClick={() => setCurrentStage(1)}>חזרה</span>
                <span className="" onClick={onClickNext}>להמשיך לשלב הבא</span>
            </div>
        </div>

    )
}

export default AboutTheProperty
