import React, { useState } from 'react'
import { serverUrl } from './../../../api/apartmentsUtils';




const DisplayImages = ({ filesArr, setIsDisplayImagesOpen }) => {

    const videos = filesArr?.filter((file) => file.includes("video")) || [];
    const images = filesArr?.filter((file) => !file.includes("video")) || [];

    const [currentImg, setCurrentImg] = useState(0);
    const [isImgMode, setIsDisplayImagMode] = useState(true);

 

    return (
        <div className="display-img__container">
            <div className="back-to-ad">
                <span onClick={() => setIsDisplayImagesOpen(false)}>חזרה למודעה</span>
            </div>
            <div className="files__container">
                <div className="images-nav-top">
                    {videos.length > 0 &&
                        <div className="nav_button">
                            <span onClick={() => setIsDisplayImagMode(false) }>וידאו</span>
                            <span onClick={() => setIsDisplayImagMode(true) }>תמונות</span>
                        </div>
                    }
                    <div className="">
                        <span>מסך מלא</span>
                    </div>
                </div>

                {isImgMode && <div className="images__container">
                    <span className="next-icon" onClick={() => setCurrentImg(currentImg + 1 < images.length ? currentImg + 1 : 0)}></span>
                    <span className="prev-icon" onClick={() => setCurrentImg(currentImg - 1 >= 0 ? currentImg - 1 : images.length-1)}></span>
                    <div className={`slider ${"slider_img" + currentImg}`}>
                        {images.map((file, index) => (
                            <div className="img" key={index}>
                                <img src={serverUrl + "/get-file?key=" + file} alt="" />
                            </div>
                        ))}
                    </div>
                </div>}

                {!isImgMode && <div className="">
                    {videos.length > 0 && <div className="videos">
                        <video width="400" controls>
                            <source src={serverUrl + "/get-file?key=" + videos[0]} type="video/mp4" />
                        </video>
                    </div>}
                </div>}

                {isImgMode && <span className="img-status">
                      תמונה {currentImg+1} מתוך {images.length}  
                </span>}

            </div>
        </div>
    )
}

export default DisplayImages;
