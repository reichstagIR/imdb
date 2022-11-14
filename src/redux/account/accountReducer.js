const initialState = {
    loading: false,
    accountDetails: [],
    isLogin: false,
    error : "",
    isModalActive: false,
    sessionId: "",
    accountId: "",
}

const accountReducer = (state = initialState , action) => {
    switch (action.type){
        case "FETCH_ACCOUNT_DETAILS_REQUEST":
            return {
                isModalActive: true,
                error : "",
                accountDetails: [],
                isLogin: false,
                loading: true,
                sessionId: "",
                accountId: "",
            }
        case "FETCH_ACCOUNT_DETAILS_SUCCESS":
            return {
                isModalActive: false,
                error: "",
                accountDetails: action.payload.accountData,
                isLogin: true,
                loading: false,
                sessionId: action.payload.sessionId,
                accountId: action.payload.accountID,
            }
        case "FETCH_ACCOUNT_DETAILS_FAILURE":
            return {
                isModalActive: true,
                error: action.payload,
                accountDetails: [],
                isLogin: false,
                loading: false,
                sessionId: "",
                accountId: "",
            }
        case "TOGGLE_MODAL":
            return {
                ...state,
                isModalActive: !state.isModalActive,
            }
        case "ACCOUNT_LOG_OUT_SUCCESS":
            return {
                isModalActive: false,
                error : "",
                accountDetails: [],
                isLogin: false,
                loading: false,
                sessionId: "",
                accountId: "",
            }
        default:
            return state;
    }
}

export default accountReducer;