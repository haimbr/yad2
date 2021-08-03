import React, { useState } from 'react'
import AddressInputs from './pages/AddressInputs'
import AboutTheProperty from './pages/AboutTheProperty';
import PostAdHeader from './PostAdHeader'
import PaymentAndDates from './pages/PaymentAndDates';


const PostAd = () => {


    const [currentStage, setCurrentStage] = useState(1);

    const [addressState, setAddressState] = useState({
        isValid: false,
        details: null
    })
    const [aboutThePropertyState, setAboutThePropertyState] = useState({
        isValid: false,
        details: null
    })
    const [paymentAndDatesState, setPaymentAndDatesState] = useState({
        isValid: false,
        details: null
    })


    return (
        <div className="post-add__container">
            <PostAdHeader />
            <ul className="choose-sub-category">
                <div className="post-page">
                    <div className="post-page__header">
                        <span className={addressState.isValid ? "valid-input": ""}><p>1</p></span>
                        <h3>כתובת הנכס</h3>
                    </div>
                    <AddressInputs
                        setAddressState={setAddressState}
                        setCurrentStage={setCurrentStage}
                    />
                </div>
                <div className="post-page">
                    <div className="post-page__header">
                        <span className={aboutThePropertyState.isValid ? "valid-input": ""}><p>2</p></span>
                        <h3>על הנכס</h3>
                    </div>
                    <AboutTheProperty
                        setAboutThePropertyState={setAboutThePropertyState}
                        setCurrentStage={setCurrentStage}
                    />
                </div>
                <div className="post-page">
                    <div className="post-page__header">
                        <span className={paymentAndDatesState.isValid ? "valid-input": ""}><p>3</p></span>
                        <h3>תשלומים, תאריכים ועוד</h3>
                    </div>
                    <PaymentAndDates
                        setPaymentAndDatesState={setPaymentAndDatesState}
                        setCurrentStage={setCurrentStage}
                    />
                </div>
            </ul>
        </div>
    )
}

export default PostAd;
