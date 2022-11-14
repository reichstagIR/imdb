//Icons
import {BsClockHistory , BsFileEarmarkMusic , BsStar} from "react-icons/bs";
import {BiCategory , BiMovie} from "react-icons/bi";
import {FaBiohazard} from "react-icons/fa";
import {GiCrownOfThorns , GiFamilyHouse , GiLoveMystery , GiMaterialsScience ,GiMissileSwarm} from "react-icons/gi";
import {MdAnimation , MdOutlineTheaterComedy , MdUpcoming} from "react-icons/md";
import {RiAdvertisementLine} from "react-icons/ri";
import {VscGithubAction} from "react-icons/vsc";

export const navLink = [
    {
        part: "Categories",
        icon:  <BiCategory />,
        links: [
            {
                title: "Popular",
                titleIcon: <BiMovie />
            },
            {
                title: "Top Rated",
                titleIcon: <BsStar />
            },
            {
                title: "Upcoming",
                titleIcon: <MdUpcoming />
            },
        ]
    },
    {
        part : "Genre",
        links : [
            {
                title: "Action",
                id: 28,
                titleIcon: <VscGithubAction />
            },
            {
                title: "Comedy",
                id: 35,
                titleIcon: <MdOutlineTheaterComedy />
            },
            {
                title: "Family",
                id: 10751,
                titleIcon: <GiFamilyHouse />
            },
            {
                title: "History",
                id: 36,
                titleIcon: <BsClockHistory />
            },
            {
                title: "Mystery",
                id: 9648,
                titleIcon: <GiLoveMystery />
            },
            {
                title: "Sci-Fi",
                id: 878,
                titleIcon: <GiMaterialsScience />
            },
            {
                title: "War",
                id: 10752,
                titleIcon: <GiMissileSwarm />,
            },
            {
                title : "Adventure",
                id: 12,
                titleIcon: <RiAdvertisementLine />
            },
            {
                title: "Horror",
                id: 27,
                titleIcon: <GiCrownOfThorns />
            },
            {
                title: "Animation",
                id: 16,
                titleIcon : <MdAnimation />
            }
        ]
    }
]