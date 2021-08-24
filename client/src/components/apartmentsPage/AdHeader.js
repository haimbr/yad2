import React, { useState } from 'react'
import { getApartmentBody, serverUrl } from './../../api/apartmentsUtils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faClone } from "@fortawesome/free-solid-svg-icons";
import AdBody from './AdBody';
import Header from '../main/headers/Header';

const AdHeader = ({ apartment }) => {


    const [isOpen, setIsOpen] = useState("close");
    const [isPhoneNumberOpen, setIsPhoneNumberOpen] = useState(false);
    const [apartmentBodyData, setApartmentBodyData] = useState("");
    const [isDisplayImagesOpen, setIsDisplayImagesOpen] = useState(false);

    const onClickOpenAd = () => {
        const getBodyData = async () => {
            const result = await getApartmentBody(apartment.apartmentId);
            console.log(result);
            setApartmentBodyData(result)
        }

        if (isOpen === true) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
            getBodyData();
        }
    }

    const onClickShowPhonNum = (e) => {
        e.stopPropagation();
        setIsPhoneNumberOpen(!isPhoneNumberOpen);
    }

    const onImgClicked = (e) => {
        if (isOpen) {
            e.stopPropagation();
            setIsDisplayImagesOpen(true)
        }
    }

    return (
        <div className={`ad-header__container ${isOpen === true ? 'adOpen' : ''}`} onClick={onClickOpenAd}>
            {isOpen === true && <span className="mobile__header"><Header /></span>}
            <div className="header__img" onClick={onImgClicked}>
                {apartment.mainImg &&
                    <>
                        <img src={serverUrl + "/get-file?key=" + apartment.mainImg} alt="" />
                        {apartment.filesNum > 1 && <span>
                            <FontAwesomeIcon className="icon" icon={faClone} />
                            <b>{apartment.filesNum - 1}+</b>
                        </span>}

                    </>
                }
            </div>

            <div className="main-content">
                <div className="right-side">
                    <span className="">
                        <p>{apartment.address}</p>
                        <p>{apartment.propertyType} {apartment.city}</p>
                    </span>
                    <span className="rooms-and-floor">
                        <p>{apartment.roomsNum}<br /> <b>חדרים</b></p>
                        <p>{apartment.floor} <br /> <b>קומה</b></p>
                        <p>{apartment.size} <br /> <b>מ"ר</b></p>
                    </span>
                </div>
                <div className="left-side">
                    <span>
                        <h3>&#8362;{apartment.price}</h3>
                        <p>{apartment.publishedDate.replaceAll(".", "/")}</p>
                    </span>

                    {isOpen === true && !isDisplayImagesOpen && <div className="show-phonNumber__button" onClick={onClickShowPhonNum}>
                        <FontAwesomeIcon className="icon" icon={faPhone} />
                        <p>הצגת מספר טלפון</p>
                        {isPhoneNumberOpen &&
                            <div className="contact-details">
                                <span>{apartment.contacts.name}</span>
                                <span>{apartment.contacts.phonNumber}</span>
                                <span>שליחת דוא״ל למפרסם</span>
                            </div>
                        }
                    </div>}
                </div>
            </div>
            {isOpen === true && <AdBody apartment={apartmentBodyData} isDisplayImagesOpen={isDisplayImagesOpen} setIsDisplayImagesOpen={setIsDisplayImagesOpen} />}
        </div>
    )
}

export default AdHeader
