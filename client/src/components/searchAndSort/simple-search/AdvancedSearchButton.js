import React from 'react'

const AdvancedSearchButton = ({isAdvancedSearchOpen, setIsAdvancedSearchOpen}) => {


    const onCloseIconClicked = () => {
        setIsAdvancedSearchOpen(!isAdvancedSearchOpen)
    }

    return (
        <div className="advanced-search-button" onClick={onCloseIconClicked}>
            <span className={`close-icon ${isAdvancedSearchOpen? "close-icon__open": ""}`}></span>
            <span>חיפוש מתקדם</span>
        </div>
    )
}

export default AdvancedSearchButton
