import React from 'react';
//Lib
import {Link} from "react-router-dom";
import StarRatings from 'react-star-ratings';
//Helper
import {shorter} from "../utils/functions";

const MovieCart = ({ movieDetails }) => {

    const rate = +((movieDetails?.vote_average * 5) / 10).toFixed(1);

    return (
        <Link to={`/detail/${movieDetails?.id}`}>
            <div className="mb-7 flex flex-col items-center">
                <div className="w-56">
                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails?.poster_path}`} alt="movie-poster" className="rounded-2xl"/>
                </div>
                <p className="text-xl text-[#d5cfc1] font-semibold mt-1 whitespace-nowrap">{shorter(movieDetails?.title)}</p>
                <StarRatings rating={rate} numberOfStars={5} starDimension="1.2rem" name="rating" starRatedColor="#f9ae00" starSpacing="0.1rem"/>
            </div>
        </Link>
    );
};

export default MovieCart;
