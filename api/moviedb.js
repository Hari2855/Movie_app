import axios from "axios";
import { apiKey } from "../constants";
import { Image } from "react-native";

// endpoints

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`


export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185${path}` : null;

// dynamic endpoind
export const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
export const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
export const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
export const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`


export const personDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
export const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`





export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-gray-background-abstract-circle-random-dots-vectorillustration-400-176057922.jpg'
export const fallbackpersonimage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_gZLbv5G42EBdNCBU8eujV2evnq56ITwUxVLH8QX8DA&s'


const apiCall = async (endpoint,params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params : {}
    }

    try{
        const response = await axios.request(options);
        return response.data
    }catch(error){
        console.log('error ', error);
        return {}
    }
}

export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMoviesEndpoint)
}

export const fetchUpcomingMovies = ()=>{
    return apiCall(upcomingMoviesEndpoint)
}

export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = id=>{
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = id=>{
    return apiCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = id=>{
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = id=>{
    return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = id=>{
    return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = params=>{
    return apiCall(searchMoviesEndpoint, params);
}
