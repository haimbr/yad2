


export const userDataInitialState = { user: null, token: "", message: "" };


const userReducer = (userData, action) => {

    switch (action.type) {
        case "LOGIN":
            return { user: { ...action.user }, token: action.token, message: "התחברת בהצלחה" };
        case "LOGOUT":
            return { user: null, token: "", message: "" };
        case "SET_MESSAGE":
            return { ...userData, message: action.message };
        default:
            return { ...userData };
    }
}

export default userReducer


