import React, { useContext, useState } from 'react'
import SelectInput from '../SelectInput';
import { UserContext } from '../../../context/UserContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';




const ContactPage = ({ setContactDetailsState, setCurrentStage }) => {
    const { userData } = useContext(UserContext);

    const [isUserApprovedPolicy, setIsUserApprovedPolicy] = useState(false);
    const [publisherName, setPublisherName] = useState(userData.user.firstName);
    const [startTelNum, setStartTelNum] = useState(userData.user.phonNumber.substring(0, 3));
    const [telNum, setTelNum] = useState(userData.user.phonNumber.substring(3));
    const [email, setEmail] = useState(userData.user.email);
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

    const [isNewContactInputOpen, setIsNewContactInputOpen] = useState(false);
    const [newContactName, setNewContactName] = useState('');
    const [newContactTelNum, setNewContactTelNum] = useState('');
    const [newContactStartTelNum, setNewContactStartTelNum] = useState('055');
    const [isNewPhoneNumberValid, setIsNewIsPhoneNumberValid] = useState(false);



    const startTelOptions = [startTelNum, ' 050', ' 051', ' 052', ' 053', ' 054', ' 055', ' 058', ' 02', ' 03', ' 04', ' 08', ' 09', ' 077', ' 073', ' 072', ' 074', ' 076', ' 078', ' 079'];

    const [warningMessages, setWarningMessages] = useState(new Array(6));

    const validateInputs = () => {
        const newWarningMessages = [new Array(4)];
        if (!publisherName) newWarningMessages[0] = "שדה חובה שם איש קשר";
        if (!isPhoneNumberValid) newWarningMessages[1] = "מספר הטלפון אינו תקין";
        if (isNewContactInputOpen && !isNewPhoneNumberValid) newWarningMessages[2] = "מספר הטלפון אינו תקין";
        if (!isUserApprovedPolicy) newWarningMessages[3] = "חובה לסמן אם תרצו להמשיך";

        if (newWarningMessages.every(item => item === null)) {
            setContactDetailsState({
                isValid: true,
                details: {
                    mainContact: {
                        name: publisherName,
                        phonNumber: startTelNum + telNum,
                        email: email,
                    },
                    secondaryContact: !isNewContactInputOpen ? undefined : {
                        name: newContactName,
                        phonNumber: newContactStartTelNum + newContactTelNum,
                    }
                }
            });
            setCurrentStage(6);
        } else {
            setWarningMessages(newWarningMessages);
        }
    }

    const onPhoneNumChange = (setNum, setValidation, newNum) => {
        setNum(newNum);
        setValidation(false);
    }

    const validatePhoneNumber = (startNum, restNum, setValidation, inputIndex) => {
        const phoneNumber = (startNum + restNum).trim();
        if (/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/.test(phoneNumber)) {
            setValidation(true);
        } else {
            const newWarningMessages = [...warningMessages]
            newWarningMessages[inputIndex] = "מספר הטלפון אינו תקין";
            setWarningMessages(newWarningMessages);
            setValidation(false);
        }
    }

    return (
        <div className="contact-details">
            <p>אלו פרטי הקשר שיופיעו במודעה</p>
            <div className="contact-details__inputs">
                <span className="contact-name">
                    <label>שם איש קשר*</label>
                    <input
                        className="simple-search-input"
                        type="search"
                        value={publisherName}
                        onChange={(e) => setPublisherName(e.target.value)}
                    />
                    {!publisherName && <span className="warning-message">{warningMessages[0]}</span>}
                </span>
                <span className="phoneNumber__input">
                    <label>טלפון ראשי*</label>
                    <input
                        className="simple-search-input"
                        type="search"
                        value={telNum}
                        onChange={(e) => onPhoneNumChange(setTelNum, setIsPhoneNumberValid, e.target.value)}
                    />
                    {!isPhoneNumberValid && <span className="warning-message">{warningMessages[1]}</span>}
                </span>
                <span className="startTelNum__input">
                    <SelectInput
                        options={startTelOptions}
                        onChange={(e) => onPhoneNumChange(setStartTelNum, setIsPhoneNumberValid, e.target.value)}
                    />
                </span>
                {telNum && <span
                    className={isPhoneNumberValid ? "valid-phonNumber" : "invalid-PhonNumber"}
                    onClick={() => { validatePhoneNumber(startTelNum, telNum, setIsPhoneNumberValid, 1) }}>
                    <span className="v-icon"></span>
                    {isPhoneNumberValid ? "המספר אומת" : "אימות מספר טלפון"}
                </span>}
            </div>

            {!isNewContactInputOpen && <div className="add-contact" onClick={() => setIsNewContactInputOpen(true)}>
                <span className="open-icon"></span>
                <span>הוספת איש קשר נוסף</span>
            </div>}

            {isNewContactInputOpen &&
                <div className="contact-details__inputs">
                    <span className="contact-name">
                        <label>איש קשר נוסף</label>
                        <input className="simple-search-input" type="search" value={newContactName}
                            onChange={(e) => setNewContactName(e.target.value)} />
                    </span>
                    <span className="phoneNumber__input">
                        <label>טלפון נוסף</label>
                        <input
                            className="simple-search-input"
                            type="search"
                            value={newContactTelNum}
                            onChange={(e) => onPhoneNumChange(setNewContactTelNum, setIsNewIsPhoneNumberValid, e.target.value)}
                        />
                        {!isNewPhoneNumberValid && <span className="warning-message">{warningMessages[2]}</span>}
                    </span>
                    <span className="startTelNum__input">
                        <SelectInput
                            options={startTelOptions}
                            onChange={(e) => onPhoneNumChange(setNewContactStartTelNum, setIsNewIsPhoneNumberValid, e.target.value)}
                        />
                    </span>
                    {newContactTelNum && <span
                        className={isNewPhoneNumberValid ? "valid-phonNumber" : "invalid-PhonNumber"}
                        onClick={() => { validatePhoneNumber(newContactStartTelNum, newContactTelNum, setIsNewIsPhoneNumberValid, 2) }}>
                        <span className="v-icon"></span>
                        {isNewPhoneNumberValid ? "המספר אומת" : "אימות מספר טלפון"}
                    </span>}
                    <span className="trash-icon" onClick={() => setIsNewContactInputOpen(false)}>
                        <FontAwesomeIcon icon={faTrashAlt} />ביטול
                    </span>
                </div>
            }


            <div className="contact-details__inputs">
                <span className="contact-name">
                    <label>דוא"ל</label>
                    <input className="simple-search-input" type="search" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </span>
            </div>


            <div className="checkbox-element" onClick={() => setIsUserApprovedPolicy(!isUserApprovedPolicy)}>
                <label className={isUserApprovedPolicy ? "checked" : "empty"}>
                    <span className="checkmark"></span>
                </label>
                <span>קראתי ואישרתי את <b>התקנון</b>*</span>
                {!isUserApprovedPolicy && <span className="warning-message">{warningMessages[3]}</span>}
            </div>


            <div className="buttonsNextPreviousWrap">
                <span className="" onClick={validateInputs}>המשך לבחירת מסלול</span>
            </div>
        </div>
    )
}

export default ContactPage;
