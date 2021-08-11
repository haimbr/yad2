import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt, faPlus, faVideo } from '@fortawesome/free-solid-svg-icons';

const FileInput = ({ isImage }) => {
    const [chosenFile, setChosenFile] = useState('');
    const fileRef = useRef();

    const removeFile = () => {
        setChosenFile('');
        fileRef.current.value = '';
    }

    return (
        <div className="file-input__container">
            <div className="input-container">
                <p >תמונה ראשית</p>
                <div className="chose-file-container">
                    {isImage ?
                        <>
                            <FontAwesomeIcon className="chose-file-icon" icon={faPlus} />
                            <span>העלאת תמונות</span>
                        </> :
                        <>
                            {chosenFile.length === 0 ?
                                <>
                                    <FontAwesomeIcon className="chose-file-icon" icon={faVideo} />
                                    <span>העלאת סרטון</span>
                                </> :
                                <span className="video-upload-message">הסרטון עלה, אפשר להמשיך בפרסום</span>
                            }
                        </>
                    }
                </div>
                <input type="file" name="files" ref={fileRef} accept={isImage ? "image/*" : "video/*"} onChange={(e) => setChosenFile(e.target.value)}></input>
                {isImage && chosenFile.length > 0 &&
                    <img
                        src={URL.createObjectURL(fileRef.current.files[0])}
                        alt="chosen-file">

                    </img>
                }
                {chosenFile.length > 0 &&
                    <span className="icons__container">
                        <span onClick={removeFile}><FontAwesomeIcon className="file-input-icon" icon={faTrashAlt} /></span>
                        <span><FontAwesomeIcon className="file-input-icon" icon={faPen} /></span>
                    </span>
                }
            </div>

        </div>
    )
}

export default FileInput;
