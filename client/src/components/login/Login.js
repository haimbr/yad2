import React, { useContext, useState } from 'react'
import { checkEmail, checkPassword, login } from './utils';
import InputComponent from './Input.component';
import { UserContext } from '../../context/UserContext';
import { loginAction } from '../../actions/userActions';
import { saveUserOnCookie } from '../../cookies/cookies';

const Login = ({ loginMode, setLoginMode, setDisplayLogin }) => {

    const { dispatchUserData } = useContext(UserContext);
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


    const onClickLogin = async (event) => {
        event.preventDefault();
        const userData = await login({
            email: emailState.email,
            password: passwordState.password,
        });
        // if(userData)
        dispatchUserData(loginAction(userData));
        saveUserOnCookie(userData);
        setDisplayLogin(false);
    }

    return (
        <div>
            <div>
                < InputComponent
                    inputAttributes={{
                        type: "email",
                        placeholder: "your@mail.com",
                        onChange: (event) => checkEmail(event.target.value, emailState, setEmailState)
                    }}
                    isLoginMode={true}
                    label="כתובת מייל"
                    inputState={emailState}

                />
                < InputComponent
                    inputAttributes={{
                        type: isShowPasswordClicked ? "text" : "password",
                        placeholder: "הקלד סיסמה",
                        onChange: (event) => checkPassword(event.target.value, loginMode, setPasswordState)
                    }}
                    isLoginMode={true}
                    label="סיסמה"
                    inputState={passwordState}
                    ShowPasswordObject={{ isShowPasswordClicked, setIsShowPasswordClicked }}
                />
                <p className="forget-password">שכחתי סיסמה</p>
            </div>
            <div className="login-form__nav">
                <button
                    disabled={!emailState.isValid || !passwordState.isValid} type="submit"
                    onClick={onClickLogin}
                >
                    התחבר
                </button>
                <div>
                    לא רשום?
                    <b onClick={() => setLoginMode("signup1")}> להרשמה </b>
                </div>
            </div>
        </div>

    )
}

export default Login;
