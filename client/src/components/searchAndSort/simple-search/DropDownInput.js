import React from 'react'


const InputElement = ({ className, label, inputAttributes,isOpen,onClick }) => {

    return (
        <div className="input-component" onClick={onClick}>
            <label>{label}</label>
            <div className={className}>
                <input type="text" {...inputAttributes} />
                <span
                    className={`dropdown ${isOpen ? "dropdown__clicked" : "dropdown__not-clicked"}`}>
                </span>

            </div>
        </div>
    )
}

export default InputElement;