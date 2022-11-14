import React , {useState , useEffect} from 'react';
//Components
import {MovieCard} from "../components";
//Lib
import fetchDataFromAPI from "../utils/fetchDataFromAPI";
import {v4} from "uuid";
import {useSearchParams} from "react-router-dom";

const Search = () => {

    const [data , setData] = useState([]);
    const [loading , setLoading] = useState(false);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();

    const query = searchParams.get("q");

    useEffect(() => {
        setLoading(true);
        fetchDataFromAPI("/search/movie" , {query})
            .then(response => {
                setError("");
                setData(response.results);
                setLoading(false);
            })
            .catch(error => {
                setError(error.code);
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        setLoading(false);
        fetchDataFromAPI("/search/movie" , {query})
            .then(response => {
                setError("");
                setData(response.results);
                setLoading(false);
            })
            .catch(error => {
                setData(error.code);
                setLoading(false);
            })
    } , [query])

    return (
        <div className="h-full overflow-auto scroll-hidden">
            {loading ? <div className="h-full flex items-center justify-center h-[calc(100vh-6.125rem]"><div className="loader"></div></div> : (
                error ? <div className="h-full flex items-center justify-center text-2xl text-white font-semibold h-[calc(100vh-6.125rem]"><p>{error}</p></div> : (
                    data.length === 0 ? <div className="h-full flex items-center justify-center text-2xl text-white font-semibold h-[calc(100vh-6.125rem]"><p>No Result</p></div> : (
                        <div className="container-lg mt-4">
                            <div className="row gy-0">
                                {data?.map((movie) => (
                                    <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={v4()}>
                                        <MovieCard movieDetails={movie}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )
            )}
        </div>
    );
};

export default Search;
