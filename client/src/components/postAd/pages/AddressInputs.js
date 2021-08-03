import React, { createRef, useState } from 'react'
import useOnClickOutsideClose from '../../../hooks/useOnClickOutsideClose';
import AutoCompleteResult from '../AutoCompleteResult';
import SelectInput from '../SelectInput'
import { searchAutoCompleteCity } from '../utils';



const apartmentTypes = [
    "דירה או אולי פנטהאוז",
    "דירה",
    "דירת גן",
    "בית פרטי/קוטג'",
    "גג/פנטהאוז",
    "מגרשים",
    "דופלקס",
    "דירת נופש",
    "דו משפחתי",
    "מרתף/פרטר",
    "טריפלקס",
    "יחידת דיור",
    "משק חקלאי/נחלה",
    "משק עזר",
    "דיור מוגן",
    "בניין מגורים",
    "סטודיו/לופט",
    "מחסן",
    "קב' רכישה/זכות לנכס",
    "חניה",
    "כללי"
];


const warningMessagesArr = [
    "שדה חובה סוג הנכס",
    "יש לבחור ישוב מתוך הרשימה",
    "יש לבחור רחוב מתוך הרשימה",
    "יש לבחור מס' בית",
    "שדה חובה קומה",
    'שדה חובה סה"כ קומות בבניין'
]

const AddressInputs = ({ setAddressState, setCurrentStage }) => {



    const [typeOfProperty, setTypeOfProperty] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("")
    const [floor, setFloor] = useState("");
    const [floorsInBuilding, setFloorsInBuilding] = useState("");

    const validateInputs = () => {
        const newWarningMessages = new Array(6);
        if (!typeOfProperty) newWarningMessages[0] = warningMessagesArr[0];
        if (!city) newWarningMessages[1] = warningMessagesArr[1];
        if (!street) newWarningMessages[2] = warningMessagesArr[2];
        if (!houseNumber) newWarningMessages[3] = warningMessagesArr[3];
        if (!floor) newWarningMessages[4] = warningMessagesArr[4];
        if (!floorsInBuilding) newWarningMessages[5] = warningMessagesArr[5];

        if (newWarningMessages.every(item => item === null)) {
            setCurrentStage(2);
            setAddressState({
                isValid: true,
                details: {
                    typeOfProperty,
                    city,
                    street,
                    houseNumber,
                    floor,
                    floorsInBuilding
                }
            })
        } else {
            setWarningMessages(newWarningMessages);
        }
    }


    const [warningMessages, setWarningMessages] = useState(new Array(6));
    const [cityInputState, setCityInputState] = useState("");
    const [streetInputState, setStreetInputState] = useState("");
    const [autoCompleteCitiesResults, setAutoCompleteCitiesResults] = useState();
    const [autoCompleteStreetsResults, setAutoCompleteStreetsResults] = useState();
    const [isCitiesOpen, setIsCitiesOpen] = useState(false);
    const [isStreetsOpen, setIsStreetsOpen] = useState(false);


    const cityRef = createRef();
    const streetsRef = createRef();
    useOnClickOutsideClose(cityRef, () => setIsCitiesOpen(false));
    useOnClickOutsideClose(streetsRef, () => setIsStreetsOpen(false));

    const onChosenTypeOfProperty = (event) => {
        const propertyType = event.target.value;
        setTypeOfProperty(propertyType);
    };

    const onSearchCityAutoComplete = async (event) => {
        const searchValue = event.target.value;
        setCityInputState(searchValue);
        setCity("");
        const result = await searchAutoCompleteCity(searchValue, "ישוב ");
        setAutoCompleteCitiesResults(result)
        setIsCitiesOpen(true)
    }

    const onSearchStreetsAutoComplete = async (event) => {
        const searchValue = event.target.value;
        setStreetInputState(searchValue);
        setStreet("");
        const result = await searchAutoCompleteCity(searchValue, city + " ");
        setAutoCompleteStreetsResults(result)
        setIsStreetsOpen(true)
    }


    const onClickAutocomplete = (autocompleteArr, autocompleteType) => {
        let autocompleteText = "";
        autocompleteArr.forEach((item) => autocompleteText += item.value);
        if (autocompleteType === "city") {
            setCity(autocompleteText);
            setCityInputState(autocompleteText);
        } else {
            setStreet(autocompleteText);
            setStreetInputState(autocompleteText);
        }
        setIsCitiesOpen(false);
        setIsStreetsOpen(false);
    }


    const onBlurCitiesInput = () => {
        if (!city) {
            setCityInputState("");
        }
    }
    const onBlurStreetsInput = () => {
        if (!street) {
            setStreetInputState("");
        }
    }

    const onChangeNumberInput = (event, inputType) => {
        const number = event.target.value;
        if (/^(\s*|\d+)$/.test(number)) {
            if (inputType === 'houseNumber') setHouseNumber(number);
            else if (inputType === 'floor') setFloor(number);
            else if (inputType === 'floorsInBuilding') setFloorsInBuilding(number);
        }
    }



    return (
        <div className="address-input">
            <p>סימנו עבורך את שדות החובה. שלא נפספס פרט חשוב</p>
            <div className="inputs">
                <span className="input-container">
                    <label>סוג הנכס*</label>
                    <SelectInput options={apartmentTypes} onChange={onChosenTypeOfProperty} />
                    <span className="warning-message">{!typeOfProperty ? warningMessages[0] : ""}</span>
                </span>
                <span className="input-container">
                    <label>ישוב*</label>
                    <span ref={cityRef}>
                        <input
                            className={`
                            ${"simple-search-input "}
                            ${warningMessages[1] && !city ? "border-red" : ""}`}
                            type="search"
                            placeholder="איפה נמצא הנכס?"
                            value={cityInputState}
                            onChange={onSearchCityAutoComplete}
                            onBlur={onBlurCitiesInput}
                        />
                        <span className="warning-message">{!city ? warningMessages[1] : ""}</span>
                        {
                            autoCompleteCitiesResults?.length > 0 && isCitiesOpen &&
                            <AutoCompleteResult autocompleteResults={autoCompleteCitiesResults} autocompleteType={"city"} handleClick={onClickAutocomplete} />
                        }
                    </span>
                </span>
                <span className="input-container">
                    <label>רחוב*</label>
                    <span ref={streetsRef}>
                        <input
                            className={`
                            ${"simple-search-input "}
                            ${warningMessages[2] && !street ? "border-red" : ""}`}
                            type="search"
                            placeholder="הכנס שם רחוב"
                            value={streetInputState}
                            onChange={onSearchStreetsAutoComplete}
                            onBlur={onBlurStreetsInput}
                            disabled={!city}
                        />
                        <span className="warning-message">{!street ? warningMessages[2] : ""}</span>
                        {
                            setAutoCompleteStreetsResults?.length > 0 && isStreetsOpen &&
                            <AutoCompleteResult autocompleteResults={autoCompleteStreetsResults} autocompleteType={"street"} handleClick={onClickAutocomplete} />
                        }
                    </span>
                </span>
                <span className="input-container">
                    <label>מספר בית</label>
                    <span>
                        <input
                            className={`
                            ${"simple-search-input "}
                            ${warningMessages[3] && !houseNumber ? "border-red" : ""}`}
                            type="search"
                            value={houseNumber}
                            onChange={(event) => (onChangeNumberInput(event, "houseNumber"))}
                            disabled={!street}
                        />
                        <span className="warning-message">{!houseNumber ? warningMessages[3] : ""}</span>
                    </span>
                </span>


                <div className="floors-inputs">
                    <span className="input-container">
                        <label>קומה*</label>
                        <span>
                            <input
                                className={`
                                ${"simple-search-input "}
                                ${warningMessages[4] && !floor ? "border-red" : ""}`}
                                type="search"
                                value={floor}
                                onChange={(event) => (onChangeNumberInput(event, "floor"))}
                                disabled={!houseNumber}
                            />
                            <span className="warning-message">{!floor ? warningMessages[4] : ""}</span>
                        </span>
                    </span>
                    <span className="input-container">
                        <label>סה"כ קומות בבניין*</label>
                        <span>
                            <input
                                className={`
                                ${"simple-search-input "}
                                ${warningMessages[5] && !floorsInBuilding ? "border-red" : ""}`}
                                type="search"
                                value={floorsInBuilding}
                                onChange={(event) => (onChangeNumberInput(event, "floorsInBuilding"))}
                                disabled={!street}
                            />
                            <span className="warning-message">{floorsInBuilding ? "" :warningMessages[5]}</span>
                        </span>
                    </span>
                </div>
            </div>
            <div className="buttonsNextPreviousWrap">
                <span className="" >חזרה</span>
                <span className="" onClick={validateInputs}>להמשיך לשלב הבא</span>
            </div>
        </div>
    )
}






export default AddressInputs;
