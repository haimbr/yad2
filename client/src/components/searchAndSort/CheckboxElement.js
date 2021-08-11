import React from 'react'

const CheckboxElement = ({checkMark}) => {
    return (
        <div className="checkbox-element">
            <label className={`container ${checkMark}`}>
                <span className="checkmark"></span>
            </label>
        </div>
    )
}

export default CheckboxElement;
