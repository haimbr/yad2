import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';

const PostAdHeader = () => {
    const { userData } = useContext(UserContext);
    return (
        <div className="post-ad__header">
                <div className="post-ad__header__right">
                    <img src="./images/yad2Logo.png" alt="yad2 logo" />
                    <p>פרסום מודעה חדשה</p>
                </div>
                <div className="post-ad__header__left">
                    <div>
                        <span>{userData.user?.firstName}</span>
                        <img src="./images/user-icon.png" alt="user-icon" />
                    </div>
                    <p>צור קשר</p>
                    <div className="exit-button">
                         יציאה X
                    </div>
                </div>
            </div>
    )
}

export default PostAdHeader
