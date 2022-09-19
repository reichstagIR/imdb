import React from 'react';
//Component
import {Sidebar , Navbar , MenuSetting} from "./components";
//Redux

import {useSelector} from "react-redux";


const App = () => {

    const isMenuActive = useSelector(state => state.menuState.isMenuActive);


    return (
        <div className="flex min-h-screen bg-[#121212]">
            <Sidebar />
            <div className={isMenuActive ? "lg:w-[calc(100%-18rem)] w-full" : "w-full"}>
                <Navbar />
            </div>
            <MenuSetting />
        </div>
    );
};

export default App;
