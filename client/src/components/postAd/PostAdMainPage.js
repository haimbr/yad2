import React, { useContext, useState } from 'react'
import AddressInputs from './pages/AddressInputs'
import AboutTheProperty from './pages/AboutTheProperty';
import PostAdHeader from './PostAdHeader'
import PaymentAndDates from './pages/PaymentAndDates';
import ContactPage from './pages/ContactPage';
import PublishPage from './pages/PublishPage';
import FilesPage from './pages/FilesPage';
import { UserContext } from './../../context/UserContext';
import { sendNewOdToServer } from './utils';


const PostAd = () => {
    const { userData } = useContext(UserContext);

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
    const [contactDetailsState, setContactDetailsState] = useState({
        isValid: false,
        details: null
    })
    const [filesState, setFilesState] = useState({
        isValid: false,
        details: null
    })


    const test123 = () => {
        console.log(addressState, aboutThePropertyState, paymentAndDatesState, contactDetailsState);
        sendNewOdToServer(userData.token, {
            address: addressState.details,
            aboutTheProperty: aboutThePropertyState.details,
            paymentAndDates: paymentAndDatesState.details,
            contactDetails: contactDetailsState.details
        }, filesState.details.files)
    }

    return (
        <div className="post-add__container">
            <PostAdHeader />
            <ul className="choose-sub-category">
                <div className="post-page">
                    <div className="post-page__header">
                        <span className={addressState.isValid ? "valid-input" : ""}><p>1</p></span>
                        <h3>כתובת הנכס</h3>
                        <div className="edit">
                            <b className="edit-icon">&#9998;</b>
                            <b className="edit-אקסא">עריכה</b>
                        </div>
                    </div>
                    <div className={currentStage === 1 ? "active" : "not-active"}>
                        <AddressInputs
                            setAddressState={setAddressState}
                            setCurrentStage={setCurrentStage}
                        />
                    </div>

                </div>
                <div className="post-page">
                    <div className="post-page__header">
                        <span className={aboutThePropertyState.isValid ? "valid-input" : ""}><p>2</p></span>
                        <h3>על הנכס</h3>
                    </div>
                    <div className={currentStage === 2 ? "active" : "not-active"}>
                        <AboutTheProperty
                            setAboutThePropertyState={setAboutThePropertyState}
                            setCurrentStage={setCurrentStage}
                        />
                    </div>


                </div>
                <div className="post-page">
                    <div className="post-page__header">
                        <span className={paymentAndDatesState.isValid ? "valid-input" : ""}><p>3</p></span>
                        <h3>תשלומים, תאריכים ועוד</h3>
                    </div>
                    <div className={currentStage === 3 ? "active" : "not-active"}>
                        <PaymentAndDates
                            setPaymentAndDatesState={setPaymentAndDatesState}
                            setCurrentStage={setCurrentStage}
                        />
                    </div>

                </div>
                <div className="post-page">
                    <div className="post-page__header">
                        <span className={filesState.isValid ? "valid-input" : ""}><p>4</p></span>
                        <h3>תמונות וסרטונים</h3>
                    </div>
                    <div className={currentStage === 4 ? "active" : "not-active"}>
                        <FilesPage
                            setFilesState={setFilesState}
                            setCurrentStage={setCurrentStage}
                        />
                    </div>
                </div>
                <div className="post-page">
                    <div className="post-page__header">
                        <span className={contactDetailsState.isValid ? "valid-input" : ""}><p>5</p></span>
                        <h3>פרטים ליצירת קשר</h3>
                    </div>
                    <div className={currentStage === 5 ? "active" : "not-active"}>
                        <ContactPage
                            setContactDetailsState={setContactDetailsState}
                            setCurrentStage={setCurrentStage}
                        />
                    </div>

                </div>

                <div className="post-page">
                    <div className="post-page__header">
                        <span className={contactDetailsState.isValid ? "valid-input" : ""}><p>6</p></span>
                        <h3 onClick={test123}>סיום ופרסום</h3>
                    </div>
                    {currentStage === 6 && <PublishPage />}
                </div>
            </ul>
        </div>
    )
}

export default PostAd;
