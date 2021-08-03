
import React, { useState } from 'react'
import { checkEmail, checkIfEmailExists, checkPassword, checkRepeatPassword } from './utils';
import InputComponent from './Input.component';

const SignupFirstStep = ({ loginMode, setLoginMode , setNewUserData}) => {

    const [isShowPasswordClicked, setIsShowPasswordClicked] = useState(false);

    const [emailState, setEmailState] = useState({
        email: "",
        warningMessage: "",
        isValid: false,
    });

    const [passwordState, setPasswordState] = useState({
        password: "",
        warningMessage: "",
        isValid: false,
    });

    const [repeatPasswordState, setRepeatPasswordState] = useState({
        warningMessage: "",
        isValid: false,
    })

    const onClickContinue = async (event) =>{
        event.preventDefault();
        const isEmailExists = await checkIfEmailExists(emailState.email);
        if(!isEmailExists){
            setNewUserData({email: emailState.email, password: passwordState.password});
            setLoginMode("signup2");
        } 
    }



    return (
        <div>
            <div>
                < InputComponent
                    isLoginMode={false}
                    label="כתובת מייל"
                    inputState={emailState}
                    inputAttributes={{
                        type: "email",
                        placeholder: "your@mail.com",
                        onChange: (event) => checkEmail(event.target.value, emailState, setEmailState)
                    }}
                />
                < InputComponent
                    isLoginMode={false}
                    label="סיסמה"
                    inputState={passwordState}
                    inputAttributes={{
                        type: isShowPasswordClicked ? "text" : "password",
                        placeholder: "הקלד סיסמה",
                        onChange: (event) => checkPassword(event.target.value, loginMode, setPasswordState)
                    }}
                    ShowPasswordObject={{ isShowPasswordClicked, setIsShowPasswordClicked }}
                />
                < InputComponent
                    isLoginMode={false}
                    label=""
                    inputState={repeatPasswordState}
                    inputAttributes={{
                        type: isShowPasswordClicked ? "text" : "password",
                        placeholder: "חזור על הסיסמה שהקלדת",
                        onChange: (event) => checkRepeatPassword(event.target.value, passwordState.password, setRepeatPasswordState)
                    }}
                    ShowPasswordObject={{ isShowPasswordClicked, setIsShowPasswordClicked }}
                />

            </div>
            <div className="login-form__nav">
                <button
                    disabled={!emailState.isValid || !passwordState.isValid || !repeatPasswordState.isValid}
                    type="submit"
                    onClick={onClickContinue}
                >
                    המשך
                </button>
                <div>
                    כבר רשום?
                    <b onClick={() => setLoginMode("login")}> התחברות </b>
                </div>
            </div>
        </div>

    )
}

export default SignupFirstStep;

