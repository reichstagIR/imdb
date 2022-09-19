import {combineReducers} from "redux";
import menuReducer from "./menu/menuReducer";

const reducer = combineReducers({
    menuState : menuReducer,
})

export default reducer;