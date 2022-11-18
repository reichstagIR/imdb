import React, {useState, useEffect , useRef} from 'react';
//Components
import {FirstMovie , MovieCard} from "../components";
//Utilities
import fetchDataFromAPI from "../utils/fetchDataFromAPI";
//Lib
import {useSearchParams} from "react-router-dom";
import {v4} from "uuid";
//Styles
import "bootstrap/dist/css/bootstrap-grid.min.css";
import movieDetails from "./MovieDetails";

const TopMovies = () => {

    const [data , setData] = useState([]);
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState("");
    const [pageNumber , setPageNumber] = useState(1);

    const [searchParams] = useSearchParams();

    const top = searchParams.get("top") || "popular";
    const id = searchParams.get("id") || "0";

    const moviesContainer = useRef();

    useEffect(() => {
        if(top === "popular" || top === "top_rated" || top === "upcoming"){

            setLoading(true);
            fetchDataFromAPI(`/movie/${top}`)
                .then(response => {
                    setData(response.results);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error.code);
                    setLoading(false);
                })

        }else{

            setLoading(true);
            fetchDataFromAPI("/discover/movie" , {sort_by : "popularity.desc" , with_genres : id})
                .then(response => {
                    setData(response.results);
                    setLoading(false);
                }).catch(error => {
                setError(error.code);
                setLoading(false);
            })

        }
    }, []);

    useEffect(() => {

        if(top === "popular" || top === "top_rated" || top === "upcoming"){

            fetchDataFromAPI(`/movie/${top}` , {page : pageNumber})
                .then(response => {
                    setData(prevState => [...prevState , ...response.results]);
                }).catch(error => {
                setError(error.code);
            })

        }else{

            fetchDataFromAPI(`/discover/movie` , {page : pageNumber , sort_by : "popularity.desc" , with_genres : id})
                .then(response => {
                    setData(prevState => [...prevState , ...response.results]);
                }).catch(error => {
                setError(error.code);
            })

        }

    }, [pageNumber]);

    useEffect(() => {
        if(top === "popular" || top === "top_rated" || top === "upcoming"){

            setLoading(true);
            fetchDataFromAPI(`/movie/${top}`)
                .then(response => {
                    setData(response.results);
                    setLoading(false);
                }).catch(error => {
                setData(error.code);
                setLoading(false);
            })

        }else{

            setLoading(true);
            fetchDataFromAPI("/discover/movie" , {sort_by : "popularity.desc" , with_genres : id})
                .then(response => {
                    setData(response.results);
                    setLoading(false)
                }).catch(error => {
                setData(error.code);
                setLoading(false);
            })

        }
    } , [top])


    const scrollHandler = (event) => {
        if((event.target.scrollTop + event.target.offsetHeight) === event.target.scrollHeight && pageNumber <= 500){
            setPageNumber(prevState => prevState + 1);
            alert(pageNumber)
        }
    }


    return (
        <div className="h-full overflow-auto scroll-hidden" onScroll={(event) => scrollHandler(event)} ref={moviesContainer}>
            {loading ? <div className="h-full flex items-center justify-center"><div className="loader"></div></div> : (
                error ? <div className="h-full flex items-center justify-center text-2xl text-white font-semibold"><p>{error}</p></div> : (
                    <>
                        <FirstMovie movieDetails={data[0]}/>
                        <div className="container-lg mt-4">
                            <div className="row gy-0">
                                {data.map((movie) => (
                                    <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={v4()}>
                                        <MovieCard movieDetails={movie}/>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-center p-4">
                                {pageNumber <= 500 ? <div className="loader"></div> : null}
                            </div>
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default TopMovies;
