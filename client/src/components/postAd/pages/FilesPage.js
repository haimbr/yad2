import React, { createRef } from 'react'
import FileInput from '../FileInput';

const FilesPage = ({ setCurrentStage, setFilesState }) => {

    const formRef = createRef();


    const validateInputs = () => {    
        setFilesState({
            isValid: true,
            details: {
                files: new FormData(formRef.current)
            }
        })
        setCurrentStage(5);
    };


    return (
        <div className="files-page__container">
            <p>
                ידעת שמודעות עם תמונות ברורות מקבלות פי 10 יותר פניות?<br></br> לא להסס להעלות לפה תמונות
                (אפשר עד 10 + וידאו) ולהבליט את הצדדים הטובים ביותר של הנכס
            </p>
            <form ref={formRef} >
                <div className="main-image">
                    <FileInput isImage={false} />

                    <span className="main-image__container"><FileInput isImage={true} /></span>
                </div>
                <h3>תמונות שיופיעו בגוף המודעה</h3>
                <div className="rest-images">
                    {new Array(9).fill().map((e, index) => (
                        <FileInput isImage={true} key={index} />
                    ))}
                </div>
            </form>
            <div className="buttonsNextPreviousWrap">
                <span onClick={() => setCurrentStage(3)} >חזרה</span>
                <span onClick={validateInputs}>להמשיך לשלב הבא</span>
            </div>
        </div>
    )
}

export default FilesPage;
