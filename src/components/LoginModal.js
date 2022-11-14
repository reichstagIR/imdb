import React, {useState} from 'react';
//IMG
import tmdb from "../assets/images/themovedb.svg";
//Redux
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {fetchAccountDetails, toggleModal} from "../redux/account/accountAction";

const LoginModal = () => {

    const dispatch = useDispatch();
    const accountState = useSelector(state => state.accountState);

    const [input, setInput] = useState({
        username: "",
        password: "",
    });

    const onFocusHandler = (event) => {
        event.target.nextSibling.style.top = "-20px";
        event.target.nextSibling.style.zIndex = "-1";
        event.target.nextSibling.style.fontSize = "0.8rem";
        event.target.nextSibling.style.color = "#2f829b";
    }

    const onBlurOutHandler = (event) => {
        if(event.target.value){
            event.target.nextSibling.style.top = "-20px";
            event.target.nextSibling.style.zIndex = "-1";
            event.target.nextSibling.style.fontSize = "0.8rem";
            event.target.nextSibling.style.color = "#2f829b";
        }else{
            event.target.nextSibling.style.top = "-4px";
            event.target.nextSibling.style.zIndex = "-1";
            event.target.nextSibling.style.fontSize = "0.8rem";
            event.target.nextSibling.style.color = "#aaadae";
        }
    }

    const closeModal = (event) => {
        if(event.target.classList.contains("modal")){
            dispatch(toggleModal());
        }
    }


    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
        <div onClick={closeModal} className={`${accountState.isModalActive ? "" : "modal-wrapper-close"} modal fixed flex items-start justify-center inset-0 z-50 bg-[rgba(0,0,0,0.6)]`}>
            <div  className="modal-content-close relative w-full max-w-md py-16 px-16 z-50 rounded-md top-[15%] opacity-100 duration-500" style={{background: "linear-gradient(180deg, rgba(35,41,44,1) 0%, rgba(8,22,26,1) 100%)"}}>
                <div className="flex mb-7 items-center justify-between">
                    <img src={tmdb} alt="logo-tmdb" className="w-44"/>
                    <p className="text-[#3ba1c0] font-semibold text-sm">Login</p>
                </div>
                <h1 className="text-5xl text-white font-semibold mb-10">New <br /> Account</h1>
                <div className="login-modal-input-wrapper mb-10">
                    <input type="text" id="username" className="login-modal-input" autoComplete="off" onFocus={onFocusHandler} onBlur={onBlurOutHandler} value={input.username} onChange={(event) => setInput({...input , username: event.target.value})}/>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label form="username" className="login-modal-label">Username</label>
                </div>
                <div className="login-modal-input-wrapper">
                    <input type="password" id="password" className="login-modal-input" onFocus={onFocusHandler} onBlur={onBlurOutHandler} value={input.password} onChange={(event) => setInput({...input , password: event.target.value})}/>
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label form="password" className="login-modal-label">Password</label>
                    <p className="mt-3 font-semibold text-sm text-[#aaadae]">{accountState.error}</p>
                </div>
                <button type="button" onClick={() => dispatch(fetchAccountDetails(input.username , input.password))} disabled={accountState.loading && "disabled"} className="disabled:opacity-30 mt-7 px-16 py-2 text-white font-semibold rounded-lg cursor-pointer" style={{background: "linear-gradient(117deg, rgba(68,190,237,1) 0%, rgba(61,116,186,1) 100%)"}}>Login</button>
            </div>
        </div>
    );
};

export default LoginModal;
