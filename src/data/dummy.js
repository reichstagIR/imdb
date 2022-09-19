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
                titleIcon: <VscGithubAction />
            },
            {
                title: "Comedy",
                titleIcon: <MdOutlineTheaterComedy />
            },
            {
                title: "Family",
                titleIcon: <GiFamilyHouse />
            },
            {
                title: "History",
                titleIcon: <BsClockHistory />
            },
            {
                title: "Mystery",
                titleIcon: <GiLoveMystery />
            },
            {
                title: "Sci-Fi",
                titleIcon: <GiMaterialsScience />
            },
            {
                title: "War",
                titleIcon: <GiMissileSwarm />,
            },
            {
                title : "Adventure",
                titleIcon: <RiAdvertisementLine />
            },
            {
                title: "Horror",
                titleIcon: <GiCrownOfThorns />
            },
            {
                title: "Animation",
                titleIcon : <MdAnimation />
            },
            {
                title: "Music",
                titleIcon: <BsFileEarmarkMusic />
            },
            {
                title: "Biography",
                titleIcon: <FaBiohazard />
            }
        ]
    }
]