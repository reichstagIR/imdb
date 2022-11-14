import React from 'react';
//Lib
import {Routes , Route} from "react-router-dom";
//Component
import {Sidebar , Navbar , MenuSetting , SpeechSetting , LoginModal} from "./components";
import {TopMovies , Search , FavoritesMovie , RatedMovies , MovieDetails} from "./page";
//Redux
import {useSelector} from "react-redux";


const App = () => {

    const isMenuActive = useSelector(state => state.menuState.isMenuActive);

    return (
        <div className="flex min-h-screen bg-[#121212]">
            <Sidebar />
            <div className={isMenuActive ? "lg:w-[calc(100%-16rem)] w-full" : "w-full"}>
                <Navbar />
                <div className="h-[calc(100vh-6.125rem)] p-3 overflow-y-auto scroll-hidden">
                    <Routes>
                        <Route path="/" element={<TopMovies />}/>
                        <Route path="/search" element={<Search />}/>
                        <Route path="/favorite" element={<FavoritesMovie />}/>
                        <Route path="/rated" element={<RatedMovies />}/>
                        <Route path="/detail/:id" element={<MovieDetails />}/>
                    </Routes>
                </div>
            </div>
            <MenuSetting />
            <SpeechSetting />
            <LoginModal />
        </div>
    );
};

export default App;
