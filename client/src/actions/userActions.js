


export const loginAction = ({ user, token }) => ({
    type: "LOGIN",
    user, 
    token
});

export const logoutAction = () => ({
    type: "LOGOUT"
});
export const setMessageAction = (message) => ({
    type: "SET_MESSAGE",
    message
});