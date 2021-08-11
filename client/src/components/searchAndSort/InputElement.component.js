import React from 'react'


const InputElement = ({ className, label, inputAttributes }) => {



    return (
        <div className="input-component">
            <label>{label}</label>
            <div className={className}>
                <input type="text" {...inputAttributes} />
            </div>
        </div>
    )
}

export default InputElement;
