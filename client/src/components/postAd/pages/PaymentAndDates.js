import React, { useState } from 'react'
import SelectInput from '../SelectInput';



const paymentsNumArr = ["גמיש", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "בחירת מספר תשלומים"].reverse();

const isNumber = (value) => {
    return isNaN(value) ? "" : value;
}


const currentDate = new Date().toISOString().split('T')[0];



const PaymentAndDates = ({ setCurrentStage, setPaymentAndDatesState }) => {

    const [isAvailableImmediately, setIsAvailableImmediately] = useState(false);
    const [warningMessages, setWarningMessages] = useState([]);

    const onIsAvailableImmediatelyClicked = () => {
        setEntryDate(currentDate);
        setIsAvailableImmediately(!isAvailableImmediately)
    }

    const onLongTermClicked = () => {
        setIsLongTerm(!isLongTerm)
    }

    

    const [paymentsNum, setPaymentsNum] = useState("");
    const [houseCommittee, setHouseCommittee] = useState("");
    const [propertyTax, setPropertyTax] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [entryDate, setEntryDate] = useState("");
    const [isLongTerm, setIsLongTerm] = useState(false);

    const onClickNext = () => {
        const newWarningMessages = new Array(3);
        if (!paymentsNum) newWarningMessages[0] = "שדה חובה מספר תשלומים";
        if (!size) newWarningMessages[1] = 'שדה חובה גודל במ"ר סך הכל';
        if (!entryDate) newWarningMessages[2] = "שדה חובה";

        if (newWarningMessages.every(item => item === null)){
            setPaymentAndDatesState({
                isValid: true,
                details: {
                    paymentsNum,
                    houseCommittee,
                    propertyTax,
                    size,
                    price,
                    entryDate,
                    isLongTerm
                }
            })
            setCurrentStage(4);
        } else {
            setWarningMessages(newWarningMessages);
        }
    }

    return (
        <div className="paymentAndDates-container">
            <span className="">
                <label>מספר תשלומים*</label>
                <SelectInput options={paymentsNumArr} onChange={(event) => setPaymentsNum(event.target.value)} />
                {!paymentsNum && <span className="warning-message">{warningMessages[0]}</span>}
            </span>

            <span className="">
                <label>ועד בית</label>
                <input className="simple-search-input" type="search" placeholder="הכנסת סכום תשלום לועד בית" value={houseCommittee}
                    onChange={(e) => setHouseCommittee(isNumber(e.target.value))} />
            </span>

            <span className="">
                <label>ארנונה לחודשיים</label>
                <input className="simple-search-input" type="search" placeholder="סכום הארנונה לתשלום" value={propertyTax}
                    onChange={(e) => setPropertyTax(isNumber(e.target.value))} />
            </span>

            <span className="">
                <label>מ"ר בנוי</label>
                <input className="simple-search-input" type="search" placeholder='כמה מ"ר יש בנכס' value={size}
                    onChange={(e) => setSize(isNumber(e.target.value))} />
                     {!size && <span className="warning-message">{warningMessages[1]}</span>}
            </span>

            <span className="">
                <label>מחיר</label>
                <input className="simple-search-input" type="search" placeholder="סכום מינימלי 100" value={price}
                    onChange={(e) => setPrice(isNumber(e.target.value))} />
            </span>

            <div className="search-by-entry-date">
                <div className="search-date">
                    <input
                        type="date"
                        name="begin"
                        min={currentDate}
                        value={entryDate}
                        onChange={(e) => setEntryDate(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        disabled={isAvailableImmediately}
                    />
                </div>
                <div className="checkbox-element" onClick={onIsAvailableImmediatelyClicked}>
                    <label className={isAvailableImmediately ? "checked" : "empty"}>
                        <span className="checkmark"></span>
                    </label>
                    <span>כניסה מיידית</span>
                </div>
                {!entryDate && <span className="warning-message">{warningMessages[2]}</span>}
            </div>

            <span>
                <div className="checkbox-element" onClick={onLongTermClicked}>
                    <label className={isLongTerm ? "checked" : "empty"}>
                        <span className="checkmark"></span>
                    </label>
                    <span>לטווח ארוך</span>
                </div>
            </span>
            <div className="buttonsNextPreviousWrap">
                <span onClick={() => setCurrentStage(2)} >חזרה</span>
                <span  onClick={onClickNext}>להמשיך לשלב הבא</span>
            </div>
        </div>
    )
}

export default PaymentAndDates;
