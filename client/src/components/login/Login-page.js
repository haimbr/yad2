import React, { useState } from 'react'
import Login from './Login';
import SignupFirstStep from './SignupFirstStep';
import SignupSecondStep from './SignupSecondStep';


const LoginPage = ({ displayLogin, setDisplayLogin }) => {
    const [loginMode, setLoginMode] = useState("login");

    const [newUserData, setNewUserData] = useState("");


    return (
        <div className={`${"login-component"} ${!displayLogin ? "login-inactive" : "login-active"}`}>
            <div className="login-container__container">
                <span className="close" onClick={() => setDisplayLogin(false)} />
                <div className="login-component__main">
                    <div className="login-component__right">
                        <div className="welcome-text__container">
                            <img src="./images/login_logo-icon.svg" alt="logo-icon" />
                            <h2>ברוכים הבאים לאתר יד2</h2>
                            <p>טוב לראות אותך שוב!</p>
                        </div>
                        <div className="login__welcome">
                            <img src="./images/login_welcome-icon.svg" alt="welcome-icon" />
                        </div>
                    </div>
                    <div className="login-component__left">
                        <div className="connect">
                            <h2>{loginMode === "login" ? "התחברות" : "הרשמה"}</h2>
                            <p>הזן את הפרטים כדי {loginMode === "login" ? "להתחבר" : "להירשם"}</p>
                        </div>

                        <form>
                            {loginMode === "login" && <Login loginMode={loginMode} setLoginMode={setLoginMode} setDisplayLogin={setDisplayLogin} />}
                            {loginMode === "signup1" && <SignupFirstStep loginMode={loginMode} setLoginMode={setLoginMode} setNewUserData={setNewUserData} />}
                            {loginMode === "signup2" && <SignupSecondStep newUserData={newUserData} setDisplayLogin={setDisplayLogin} setLoginMode={setLoginMode}/>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
