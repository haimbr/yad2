import React from 'react'

const selectInput = ({ options, onChange }) => {
    return (
        <div className="custom-select" onChange={onChange}>
            <select>
                {
                    options.map((option, index) => (
                        <option value={option} key={index} hidden={index === 0}> {option}</option>
                    ))
                }
            </select>
        </div >
    )
}

export default selectInput;


