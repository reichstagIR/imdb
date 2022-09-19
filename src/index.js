import ReactDom from "react-dom/client";
//Lib
import {BrowserRouter} from "react-router-dom";
import App from "./App";
//Redux
import store from "./redux/store";
import {Provider} from "react-redux";
//Style
import "./index.scss";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);