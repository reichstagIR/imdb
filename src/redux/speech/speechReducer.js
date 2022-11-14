const initialState = {
    isMicActive : false,
    speechText : "",
}

const menuReducer = (state = initialState , action) => {
    switch (action.type){
        case "SET_SPEECH":
            return {
                ...state,
                speechText: action.payload,
            }
        default:
            return state;
    }
};
export default menuReducer;