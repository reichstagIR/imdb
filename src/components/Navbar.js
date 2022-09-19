import React from 'react';
//Icons
import {FaSearch} from "react-icons/fa"

const Navbar = () => {
    return (
        <div className="bg-[#272727] py-6 flex items-center justify-center">
            <form onSubmit={() => {}} className="inline-block border-b-[1px] border-white">
                <div className="flex items-center">
                    <FaSearch className="text-lg text-white"/>
                    <input type="text" className="search-input"/>
                </div>
            </form>
        </div>
    );
};

export default Navbar;
