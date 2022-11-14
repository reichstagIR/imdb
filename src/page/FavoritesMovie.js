import React,{useEffect , useState} from 'react';
//API
import fetchDataFromAPI from "../utils/fetchDataFromAPI";
//Lib
import {useNavigate} from "react-router-dom";
//Redux
import {useSelector , useDispatch} from "react-redux";
import {toggleModal} from "../redux/account/accountAction";
import {v4} from "uuid";
import {MovieCard} from "../components";

const FavoritesMovie = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const accountDetails = useSelector(state => state.accountState);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(accountDetails.isLogin){
            setLoading(true);
            fetchDataFromAPI(`/account/${accountDetails.accountId}/favorite/movies` , {session_id: accountDetails.sessionId})
                .then(response => {
                    setData(response.results);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setError(error.code);
                })
        }else{
            navigate('/');
            dispatch(toggleModal());
        }
    } , [])


    return (
        <div className="h-full overflow-auto scroll-hidden">
            <h1 className="text-3xl font-semibold text-white">My Profile</h1>
            <h3 className="text-md font-semibold text-white my-1">Favorite Movies</h3>
            {loading ? <div className="h-full flex items-center justify-center"><div className="loader"></div></div> : (
                error ? <div className="h-full flex items-center justify-center text-2xl text-white font-semibold"><p>{error}</p></div> : (
                    data.length === 0 ? <div className="h-full flex items-center justify-center text-2xl text-white font-semibold h-[calc(100vh-6.125rem]"><p>No Favorite Movie is Hear!</p></div> : (
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

export default FavoritesMovie;
