import React from 'react'

const InputComponent = ({ isLoginMode, label, inputState, ShowPasswordObject, inputAttributes }) => {
    return (
        <div className="input__container">

            <label>
                {!isLoginMode && inputState.isValid && <i>&#10003;</i>}
                {label}
            </label>

            <div className={
                `${"input__box"}
                ${inputState.isValid ? "valid-input" : ""}
                ${inputState.warningMessage ? "invalid-input" : ""}`
            }>

                <input {...inputAttributes} />

                {ShowPasswordObject &&
                    <span><img
                        alt="eye-icon"
                        src={ShowPasswordObject.isShowPasswordClicked ? "./images/open-eye.svg" : "./images/close-eye.svg"}
                        onClick={() => ShowPasswordObject.setIsShowPasswordClicked(!ShowPasswordObject.isShowPasswordClicked)}
                    /></span>
                }
            </div>
            <p
                className={`
                    ${"warning-message__not-active"}
                    ${inputState.warningMessage ? "warning-message__active" : ""}`}>
                {inputState.warningMessage}
            </p>
        </div>
    )
}

export default InputComponent;
