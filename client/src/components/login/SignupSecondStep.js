import React, { useContext, useState } from 'react'
import { loginAction } from '../../actions/userActions';
import { UserContext } from '../../context/UserContext';
import { saveUserOnCookie } from '../../cookies/cookies';
import InputComponent from './Input.component';
import { checkName, checkPhonNumber, signup } from './utils';

const SignupSecondStep = ({ newUserData, setDisplayLogin, setLoginMode }) => {

    const { dispatchUserData } = useContext(UserContext);

    const [firstNameState, setFirstNameState] = useState({
        name: "",
        warningMessage: "",
        isValid: false,
    });

    const [lastNameState, setLastNameState] = useState({
        name: "",
        warningMessage: "",
        isValid: false,
    });

    const [phonNumberState, setPhonNumber] = useState({
        phonNumber: "",
        warningMessage: "",
        isValid: false,
    });


    const [isTermsClicked, setIsTermsClicked] = useState(false);
    const [isReceiveAdClicked, setIsReceiveAdClicked] = useState(false);
    const [birthDate, setBirthDate] = useState("בחר תאריך לידה");


    const onClickRegister = async (event) => {
        event.preventDefault();
        const userData = await signup({
            email: newUserData.email,
            password: newUserData.password,
            firstName: firstNameState.name,
            lastName: lastNameState.name,
            phonNumber: phonNumberState.phonNumber,
            birthDate: birthDate,
        });
        dispatchUserData(loginAction(userData));
        saveUserOnCookie(userData);
        setDisplayLogin(false);
        setLoginMode("login");
    }

    return (
        <div className="signup-second-step">
            < InputComponent
                isLoginMode={false}
                label="שם פרטי"
                inputState={firstNameState}
                inputAttributes={{
                    type: "text",
                    placeholder: "הקלד שם פרטי",
                    onChange: (event) => checkName(event.target.value, setFirstNameState)
                }}
            />
            < InputComponent
                isLoginMode={false}
                label="שם משפחה"
                inputState={lastNameState}
                inputAttributes={{
                    type: "text",
                    placeholder: "הקלד שם משפחה",
                    onChange: (event) => checkName(event.target.value, setLastNameState)
                }}
            />
            < InputComponent
                isLoginMode={false}
                label="מספר טלפון"
                inputState={phonNumberState}
                inputAttributes={{
                    type: "text",
                    placeholder: "טלפון",
                    onChange: (event) => checkPhonNumber(event.target.value, setPhonNumber)
                }}
            />

            <div className="search-date birth-date">
                <span>{birthDate}</span>
                <input type="date" max="2003-01-01" onChange={(event) => setBirthDate(new Date(event.target.value).toLocaleDateString())} />
            </div>

            <div className="checkbox-element" onClick={() => setIsTermsClicked(!isTermsClicked)}>
                <label className={isTermsClicked ? ' checked' : "empty"}>
                    <span className="checkmark"></span>
                </label>
                <span>קראתי ומאשר את <b>תקנון</b> האתר</span>
            </div>
            <div className="checkbox-element" onClick={() => setIsReceiveAdClicked(!isReceiveAdClicked)}>
                <label className={isReceiveAdClicked ? ' checked' : "empty"}>
                    <span className="checkmark"></span>
                </label>
                <span>מאשר קבלת דיוור פרסומי כללי מיד2</span>
            </div>
            <div className="login-form__nav">
                <button
                    disabled={!firstNameState.isValid || !lastNameState.isValid || !phonNumberState.isValid || !isTermsClicked}
                    type="submit"
                    onClick={onClickRegister}>
                    שלח
                </button>
            </div>
        </div>
    )
}

export default SignupSecondStep
