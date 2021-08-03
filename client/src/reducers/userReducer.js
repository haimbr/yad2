


export const userDataInitialState = { user: null, token: "" };


const userReducer = (userData, action) => {

    switch (action.type) {
        case "LOGIN":
            // console.log("loginreducer token:", action.token);
            return { user: { ...action.user }, token: action.token };
        case "LOGOUT":
            return { user: null, token: "" };
        default:
            return { ...userData };
    }
}

export default userReducer


