import validator from 'validator';
const axios = require('axios');


const serverUrl = 'http://localhost:3030';

export const warningMessages = [
    "שדה חובה",
    "מבנה האימייל שהוזן אינו תקין",
    "תווים לא תקינים הוזנו",
    "מינימום 6 תווים",
    "לפחות אות קטנה אחת",
    "לפחות אות גדולה אחת",
    "לפחות ספרה אחת",
    "סיסמה לא תואמת",
    "אותיות בלבד",
    "מספר פלאפון לא תקין"
];

export const checkEmail = (emailInput, emailState, setEmailState) => {
    if (validator.isEmail(emailInput)) {
        setEmailState({ ...emailState, warningMessage: "", isValid: true, email: emailInput });
    } else {
        const warningMessage = emailInput.length > 0 ? warningMessages[1] : warningMessages[0];
        setEmailState({ ...emailState, warningMessage: warningMessage, isValid: false });
    }
};


export const checkPassword = (passwordInput, loginMode, setPasswordState) => {
    if (passwordInput.length < 1) {
        setPasswordState({ warningMessage: warningMessages[0], isValid: false });
    } else if (loginMode === "login") {
        setPasswordState({ isValid: true, warningMessage: "", password: passwordInput });
    } else if (/[\u0590-\u05FF]/.test(passwordInput)) {
        setPasswordState({ warningMessage: warningMessages[2], isValid: false });
    } else if (passwordInput.length < 6) {
        setPasswordState({ warningMessage: warningMessages[3], isValid: false });
    } else if (!/(.*[a-z].*)/.test(passwordInput)) {
        setPasswordState({ warningMessage: warningMessages[4], isValid: false });
    } else if (!/(.*[A-Z].*)/.test(passwordInput)) {
        setPasswordState({ warningMessage: warningMessages[5], isValid: false });
    } else if (!/.*[0-9].*/.test(passwordInput)) {
        setPasswordState({ warningMessage: warningMessages[6], isValid: false });
    } else {
        setPasswordState({ isValid: true, warningMessage: "", password: passwordInput });
    }
};


export const checkRepeatPassword = (passwordInput, password, setRepeatPasswordState) => {
    if (passwordInput.length < 1) {
        setRepeatPasswordState({ warningMessage: warningMessages[0], isValid: false });
    } else if (passwordInput !== password) {
        setRepeatPasswordState({ warningMessage: warningMessages[7], isValid: false });
    } else {
        setRepeatPasswordState({ warningMessage: "", isValid: true });
    }
};


export const checkName = (name, setNameState) => {
    if (name.length < 1) {
        setNameState({ isValid: false, warningMessage: warningMessages[0] })
    } else if (/.*[0-9].*/.test(name)) {
        setNameState({ isValid: false, warningMessage: warningMessages[8] })
    } else {
        setNameState({ isValid: true, warningMessage: "", name: name })
    }
}

export const checkPhonNumber = (phonNumber, setPhonNumberState) => {
    if (phonNumber.length < 1) {
        setPhonNumberState({ isValid: false, warningMessage: warningMessages[0] });
    } else if (!/^0(5[^7]|[2-4]|[8-9]|7[0-9])[0-9]{7}$/.test(phonNumber)) {
        setPhonNumberState({ isValid: false, warningMessage: warningMessages[9] })
    } else {
        setPhonNumberState({ phonNumber, isValid: true, warningMessage: "" })
    }
}


export const checkIfEmailExists = async (email) => {

    try {
        const result = await axios.post(serverUrl + '/users/isEmailExists', { email });
        console.log(result.data);
        return result.data.isEmailExists;
    } catch (err) {
        console.log("ff", err);
        return true;
    }
}

export const signup = async (userData) => {
    try {
        const result = await axios.post(serverUrl + '/users/signup', userData);
        return (result.data);
    } catch (err) {
        console.log("ff", err);
    }
}

export const login = async (userData) => {
    try {
        const result = await axios.post(serverUrl + '/users/login', userData);
        return (result.data);
    } catch (err) {
        console.log("ff", err.message);
    }
}

export const logOut = async (token) => {
    try {
        const result = await axios.post(serverUrl + '/users/logout', {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        console.log(result.data);
        return (result.data);
    } catch (err) {
        console.log("ff", err);
    }
}