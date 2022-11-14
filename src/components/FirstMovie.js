import React from 'react';

const FirstMovie = ({ movieDetails }) => {

    return (
        <div className="w-full h-[23rem] relative rounded -z-0 before:absolute before:inset-0 before:bg-[rgba(0,0,0,0.3)] before:-z-10 flex items-end" style={{background : `url("https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails?.backdrop_path}") center center/cover`}}>
            <div className="z-20 text-white font-semibold max-w-2xl ml-16 mb-16">
                <p className="text-lg mt-3">{movieDetails?.title}</p>
                <h2 className="text-xl">{movieDetails?.overview}</h2>
            </div>
        </div>
    );
};

export default FirstMovie;
