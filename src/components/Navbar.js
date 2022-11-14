import React , {useState , useEffect} from 'react';
//Lib
import {useNavigate} from "react-router-dom";
//Icons
import {FaSearch} from "react-icons/fa"
//Redux
import {useSelector , useDispatch} from "react-redux";
import {toggleModal , logOutAccount} from "../redux/account/accountAction";

const Navbar = () => {


    const mic = useSelector(state => state.speechSate);
    const accountState = useSelector(state => state.accountState);

    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setInputValue(mic.speechText);
    } , [mic])



    const navigateToSearchPage = () => {
        if(inputValue){
            navigate(`/search?q=${mic.speechText || inputValue}`);
        }
    }


    const openDropDownHandler = () => {
        setIsMenuOpen(prevState => !prevState);
    }

    const logOutHandler = () => {
        dispatch(logOutAccount(accountState.sessionId));
        navigate("/");
    }

    const redirectFavoriteHandler = () => {
        navigate("/favorite");
    }

    const redirectRatedHandler = () => {
        navigate("/rated");
    }

    return (
        <div className="bg-[#272727] py-6 px-10 flex items-center justify-between">
            <div>
                {accountState.isLogin ? (
                    <div className="w-10 relative">
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                        <img src={`https://www.gravatar.com/avatar/${accountState?.accountDetails?.avatar?.gravatar?.hash}`} className="rounded-full w-full" alt="profile-img" onClick={openDropDownHandler}/>
                        <div className={`absolute -left-5 -right-5 z-40 rounded-lg mt-2 bg-[#121212] border-white border-[1px] ${isMenuOpen ? "visible" : "invisible"} flex flex-column items-center`}>
                            <p className="text-[#e5e7eb] text-sm my-1">{accountState?.accountDetails?.username}</p>
                            <span className="w-full h-2 bg-gray-400 h-[1px]"></span>
                            <button type="text" className="my-1 text-[#ababab] font-semibold" onClick={redirectFavoriteHandler}>Favorite</button>
                            <span className="w-full h-2 bg-gray-400 h-[1px]"></span>
                            <button type="text" className="my-1 text-[#ababab] font-semibold" onClick={redirectRatedHandler}>Rated</button>
                            <span className="w-full h-2 bg-gray-400 h-[1px]"></span>
                            <button type="text" className="my-1 text-[#ababab] font-semibold" onClick={logOutHandler}>Log out</button>
                        </div>
                    </div>
                ) : (
                    <button type="login" className="text-white bg-[#D91921] px-3 py-[5px] rounded-lg" onClick={() => dispatch(toggleModal())}>Login</button>
                )}
            </div>
            <div className="inline-block border-b-[1px] border-white">
                <div className="flex items-center">
                    <FaSearch className="text-lg text-white" onClick={navigateToSearchPage}/>
                    <input type="text" className="search-input" value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
