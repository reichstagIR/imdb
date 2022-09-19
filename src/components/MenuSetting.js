import React from 'react';
//Icons
import {AiOutlineMenu} from "react-icons/ai";
//Redux
import {useDispatch} from "react-redux";
import toggleMenu from "../redux/menu/menuAction";

const MenuSetting = () => {

    const dispatch = useDispatch();

    return (
        <div className="rounded-full bg-[#D91921] text-white fixed bottom-5 w-14 h-14 right-3 flex items-center justify-center text-2xl">
            <button type="button" onClick={() => dispatch(toggleMenu())}>
                <AiOutlineMenu />
            </button>
        </div>
    );
};

export default MenuSetting;
