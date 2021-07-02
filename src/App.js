import React, {useEffect, useState} from 'react';
import Movie from './components/Movie';


const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const FEATURED_API = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY+"&language=es-MX";
const SEARCH_API =  BASE_URL+"/search/movie?"+API_KEY+"&query=";

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()  => {
      getMovies(FEATURED_API)
    }, []);

    const getMovies = (API) => {
      fetch(API)
            .then((res) => res.json())
            .then((data) => {
              setMovies(data.results);
            });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(searchTerm) {
          getMovies(SEARCH_API + searchTerm);
            fetch(SEARCH_API + searchTerm)
          
          setSearchTerm("");
      }
    };

    const handleOnChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    return (
        <>
            <header> 
                <form onSubmit={handleOnSubmit}>
                    <input 
                        className="search"
                        type="search" 
                        placeholder="Busqueda..."
                        value = {searchTerm}
                        onChange ={handleOnChange}
                    />
                </form>           
            </header>
            <div className="movie-container">
                {movies.length > 0 &&
                    movies.map((movie)=> <Movie Key=
                    {movie.id} {...movie} />)} 
            </div> 
        </>  
        
        
    );  
 
}

export default App;
