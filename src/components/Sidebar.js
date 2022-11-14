import React , {useEffect , useState} from 'react';
//Lib
import {Link , useLocation , useSearchParams} from "react-router-dom";
//Data
import {navLink} from "../data/dummy";
//Utils
import {capitalizeFirstLetter} from "../utils/functions";
//Logo
import logo from "../assets/images/Netflix_2015_logo.svg.png";
//Redux
import {useSelector , useDispatch} from "react-redux";
import toggleMenu from "../redux/menu/menuAction";


const Sidebar = () => {

    const isMenuActive = useSelector(state => state.menuState.isMenuActive);
    const dispatch = useDispatch();
    const {pathname} = useLocation();
    const [searchParams] = useSearchParams();

    const [activeLink , setActiveMenu] = useState();


    useEffect(() => {
        setActiveMenu(() => capitalizeFirstLetter((searchParams.get("top") || "").split("_")).join(" "));
    } , [pathname])

    useEffect(() => {
        setActiveMenu(capitalizeFirstLetter((searchParams.get("top") || "popular").split("_")).join(" "))
        if(window.innerWidth < 1024){
            dispatch(toggleMenu());
        }
    }, []);



    const linkDeactivate = "flex items-center justify-start text-[#ababab] my-1 ml-3 transition duration-200 rounded-full hover:bg-[#D91921] hover:text-white py-2 px-3"
    const linkActivate = "flex items-center justify-start my-1 ml-3 transition duration-200 rounded-full bg-[#D91921] text-white py-2 px-3";

    return (
        <div className={`${isMenuActive ? "w-[16rem] border-[#1f1f1f] border-r-8" : "w-0 border-0"} transition-all duration-100 h-screen fixed lg:static bg-[#121212] top-0 bottom-0 left-0 overflow-y-auto scroll-hidden z-50`}>

            <div className="py-6 border-b-[1px] border-[#1e1e1e]">
                <img  src={logo} alt="log" className="w-44 mx-auto"/>
            </div>

            {navLink.map(part => (
                <div key={part.part} className="border-b-[1px] border-[#1e1e1e] last:border-0">
                    <p className="text-lg text-[#a2a2a2] mt-2 ml-3">{part.part}</p>
                    <div className="flex flex-col p-4">

                        {part.links.map(link => (
                            <Link key={link.title} to={`/?top=${link.title.toLowerCase().split(" ").join("_")}${link.id ? `&id=${link.id}` : ""}`}
                                  className={link.title === activeLink ? linkActivate : linkDeactivate}
                                  onClick={() =>  setActiveMenu(link.title)}>
                                <span className="text-xl mr-3">{link.titleIcon}</span>
                                <p className="text-lg font-semibold">{link.title}</p>
                            </Link>
                        ))}

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;