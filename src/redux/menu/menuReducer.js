const initialState = {
    isMenuActive : true,
}

const menuReducer = (state = initialState , action) => {
    switch (action.type){
        case "TOGGLE_MENU":
            return {
                isMenuActive: !state.isMenuActive,
            };
        default:
            return state;
    }
};

export default menuReducer;
