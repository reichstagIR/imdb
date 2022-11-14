import axios from "axios";

const fetchAccountDetailsRequest = () => {
    return {
        type: "FETCH_ACCOUNT_DETAILS_REQUEST",
    }
}

const fetchAccountDetailsSuccess = (accountDetails) => {
    return {
        type: "FETCH_ACCOUNT_DETAILS_SUCCESS",
        payload: accountDetails,
    }
}

const fetchAccountDetailsFailure = (errorMessage) => {
    return {
        type: "FETCH_ACCOUNT_DETAILS_FAILURE",
        payload: errorMessage,
    }
}

const accountLogOutSuccess = () => {
    return {
        type: "ACCOUNT_LOG_OUT_SUCCESS",
    }
}

const toggleModal = () => {
    return {
        type: "TOGGLE_MODAL",
    }
}

const logOutAccount = (sessionId) => {
    return async (dispatch) => {
        await axios.delete("https://api.themoviedb.org/3/authentication/session?api_key=e3d6f9a300a2e2727474267bf30ea98a", {
            params: {
                session_id: sessionId,
            }
        });
        dispatch(accountLogOutSuccess())
    }
}


const fetchAccountDetails = (username , password) =>  {
    return async (dispatch) => {
        dispatch(fetchAccountDetailsRequest());
        //create token
        const createToken = await axios.get("https://api.themoviedb.org/3/authentication/token/new?api_key=e3d6f9a300a2e2727474267bf30ea98a");

        //validation password and username
        try {
            const validationToken = await axios.post("https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=e3d6f9a300a2e2727474267bf30ea98a", {
                username,
                password,
                request_token: createToken.data.request_token,
            });

            const sessionId = await axios.post("https://api.themoviedb.org/3/authentication/session/new?api_key=e3d6f9a300a2e2727474267bf30ea98a", {
                request_token: validationToken.data.request_token
            });

            const accountDetails = await axios.get("https://api.themoviedb.org/3/account?api_key=e3d6f9a300a2e2727474267bf30ea98a", {
                params: {
                    session_id: sessionId.data.session_id
                },
            });

            dispatch(fetchAccountDetailsSuccess({accountData: accountDetails.data , sessionId: sessionId.data.session_id , accountID: accountDetails.data.id}));

        } catch {
            dispatch(fetchAccountDetailsFailure("invalid username or password"));
        }
    }
}

export  {fetchAccountDetails , toggleModal , logOutAccount};