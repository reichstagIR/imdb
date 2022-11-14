import React, {useState, useEffect} from 'react';
//Helper
import fetchDataFromAPI from "../utils/fetchDataFromAPI";
//Lib
import {useParams, useNavigate, useLocation} from "react-router-dom";
import StarRatings from "react-star-ratings";
import {v4} from "uuid";
//Data
import {navLink} from "../data/dummy";
//img
import noProfile from "../assets/images/no-profile.jpg";
//Icon
import {TbWorld} from "react-icons/tb";
import {HiOutlineFilm} from "react-icons/hi";
import {IoMdArrowRoundBack} from "react-icons/io";
//Components
import {MovieCard} from "../components";

const MovieDetails = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [movieDetails, setMovieDetails] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [casts, setCasts] = useState([]);

    const releaseDate = new Date(movieDetails?.release_date).toDateString();

    const {id} = useParams();

    const {pathname} = useLocation();

    const navigate = useNavigate();


    useEffect(() => {

        setLoading(true);

        fetchDataFromAPI(`/movie/${id}`)
            .then(response => {
                setLoading(false);
                setMovieDetails(response);
                getGenres();
                fetchDataFromAPI(`/movie/${id}/credits`)
                    .then(response => setCasts(response));
                fetchDataFromAPI(`/movie/${id}/similar`)
                    .then(response => setSimilarMovies(response.results));
            })
            .catch(error => {
                setLoading(false);
                setError(error.code);
            });

    } , [pathname])

    const getGenres = () => {

        let items = [];

        const {genres} = movieDetails;

        const {links} = navLink[1];

        for(let i in genres){

            for(let link in links){

                if(genres[i].id === links[link].id){
                    items.push(links[link]);
                }

            }

        }

        return items;
    };

    const errorHandler = (event) => {
        event.target.src = noProfile;
    }

    console.log(similarMovies)


    const rate = +((movieDetails?.vote_average * 5) / 10).toFixed(1) || 0;

    return (
        <div className="h-full overflow-auto scroll-hidden p-4">
            {loading ? <div className="h-full flex items-center justify-center"><div className="loader"></div></div> : (
                error ? <div className="h-full flex items-center justify-center text-2xl text-white font-semibold"><p>{error}</p></div> : (
                    <>
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 flex lg:justify-start">
                                <div className="max-w-[24rem] shadow-gray-400">
                                    <img src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movieDetails?.poster_path}`} alt="poster-path" className="w-full rounded-2xl"/>
                                </div>
                            </div>
                            <div className="col-xl-8 col-lg-12 text-center ml-auto mt-10 xl:mt-0">
                                <div className="2xl:px-[11rem] xl:px-0">
                                    <h1 className="text-3xl text-white font-semibold">{movieDetails?.title}</h1>
                                    <p className="text-lg text-white font-semibold my-2">{movieDetails?.tagline}</p>
                                    <div className="flex justify-between items-center mt-3">
                                        <div>
                                            <StarRatings rating={rate} numberOfStars={5} starDimension="1.2rem" name="rating" starRatedColor="#f9ae00" starSpacing="0.1rem"/>
                                            <span className="ms-2 text-gray-300 font-semibold text-sm">{movieDetails?.vote_average?.toFixed(1)} / 10</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-300 font-semibold">{movieDetails?.runtime}min / {releaseDate} / {movieDetails?.spoken_languages?.[0]?.name}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-evenly my-4">
                                    {getGenres().map(item => (
                                        <div className="flex items-center" key={v4()}>
                                            <span className="text-gray-400 text-3xl">{item.titleIcon}</span>
                                            <span className="text-gray-400 font-semibold ms-2">{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-left mb-4">
                                    <h3 className="text-xl text-white font-semibold mb-2">Overview</h3>
                                    <p className="text-gray-300 leading-6">{movieDetails?.overview}</p>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-xl text-white font-semibold mb-2 text-left">Top Cast</h3>
                                    <div className="mt-1 overflow-y-auto flex items-start justify-start">
                                        {casts?.cast?.map(item => (
                                            <div className="mr-12 mb-2" key={v4()}>
                                                <div className="w-[5.5rem] h-[6.4rem] overflow-hidden rounded-lg">
                                                    <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item?.profile_path}`} alt="cast-profile" onError={(event) => errorHandler(event)} className="rounded-lg"/>
                                                </div>
                                                <p className="text-xs text-gray-300 mt-1 font-semibold">{item?.character}</p>
                                                <p className="text-gray-400 text-xs mt-1 font-semibold">{item?.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-4 flex justify-center text-[#6a9cc0]">
                                    <div className="flex border-[1px] border-[#6a9cc0]">
                                        <a href={movieDetails?.homepage || "#"} className="flex items-center px-[0.7rem] py-1" target="_blank" rel="noreferrer">WEBSITE <span className="ml-1">{<TbWorld />}</span></a>
                                        <a href={`https://www.imdb.com/title/${movieDetails?.imdb_id}` || "#"} className="flex items-center px-[0.7rem] border-x-[1px] border-[#6a9cc0] py-1" target="_blank" rel="noreferrer">IMDB <span className="ml-1">{<HiOutlineFilm />}</span></a>
                                        <button type="button" className="flex items-center px-[0.7rem] py-1" onClick={() => navigate(-1)}>BACK <span className="ml-1">{<IoMdArrowRoundBack />}</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-lg">
                            <h3 className="text-center text-white text-4xl font-semibold mt-5 mb-12">You might also like</h3>
                            <div className="row">
                                {similarMovies?.map((movie) => (
                                    <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={v4()}>
                                        <MovieCard movieDetails={movie}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default MovieDetails;
