import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import AddressInputs from './pages/AddressInputs';
import AboutTheProperty from './pages/AboutTheProperty';
import PostAdHeader from './PostAdHeader'
import PaymentAndDates from './pages/PaymentAndDates';
import ContactPage from './pages/ContactPage';
import FilesPage from './pages/FilesPage';
import { UserContext } from './../../context/UserContext';
import { sendNewOdToServer } from './utils';
import { setMessageAction } from '../../actions/userActions';


const PostAd = () => {
    const { userData, dispatchUserData } = useContext(UserContext);

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

    const history = useHistory();


    const onClickSubmit = async () => {
        dispatchUserData(setMessageAction("המודעה נשלחת ברגעים אלו"));
        const res = await sendNewOdToServer(userData.token, {
            address: addressState.details,
            aboutTheProperty: aboutThePropertyState.details,
            paymentAndDates: paymentAndDatesState.details,
            contactDetails: contactDetailsState.details
        }, filesState.details.files)
        if (res.data) {
            dispatchUserData(setMessageAction("המודעה נשלחה בהצלחה"));
            history.push("/");
        }else{
            dispatchUserData(setMessageAction("אופסס התרחשה תקלה נסה שוב"));
        }

    }

    return (
        <div className="post-add__container">
            {userData.message && <div className="user-message">
                <p>{userData.message}</p>
            </div>}
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
                        <h3>סיום ופרסום</h3>
                    </div>
                    {currentStage === 6 && <div className="publish-page">
                        <p>זהו, אנחנו בסוף. לנו נשאר לשמור את המודעה שלך, לך נשאר לבחור את מסלול הפרסום.</p>
                        <span className="line"></span>
                        <div className="post-type">
                            <h3>בסיסי</h3>
                            <img src="./images/post-type-background.png" alt="" />
                            <p>&#10003; מודעה רגילה</p>
                            <p>&#10005; הקפצה אוטומטית לחסכון בזמן</p>
                            <span className="submit-button" onClick={onClickSubmit}><b>חינם</b> / 40 ימים</span>
                        </div>
                    </div>}
                </div>
            </ul>
        </div>
    )
}

export default PostAd;
