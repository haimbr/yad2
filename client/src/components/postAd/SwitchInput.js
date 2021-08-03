import React from 'react'

const SwitchInput = ({options, selectedOption, setSelectedOption}) => {
    return (
        <div className="row-select">
                {options.map((option, index) => (
                    <span
                        className={selectedOption === index ? 'option-selected' : "option"}
                        key={index}
                        onClick={() => setSelectedOption(index)}
                    >
                        {option}</span>
                ))}
            </div>
    )
}

export default SwitchInput
