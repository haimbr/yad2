import React from 'react'

const PublishPage = () => {
    return (
        <div className="publish-page">
            <p>זהו, אנחנו בסוף. לנו נשאר לשמור את המודעה שלך, לך נשאר לבחור את מסלול הפרסום.</p>
            <span className="line"></span>
            <div className="post-type">
                <h3>בסיסי</h3>
                <img src="./images/post-type-background.png" alt="" />
                <p>&#10003; מודעה רגילה</p>
                <p>&#10005; הקפצה אוטומטית לחסכון בזמן</p>
                <span className="submit-button"><b>חינם</b> / 40 ימים</span>
            </div>
        </div>
    )
}

export default PublishPage;
