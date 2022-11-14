import {combineReducers} from "redux";
import menuReducer from "./menu/menuReducer";
import speechReducer from "./speech/speechReducer";
import accountReducer from "./account/accountReducer";

const reducer = combineReducers({
    menuState : menuReducer,
    speechSate : speechReducer,
    accountState : accountReducer,
})

export default reducer;