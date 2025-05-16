import React, { use, useEffect,useState } from 'react'
import Search from './components/search'
import Spinner from './components/spinner';
import MovieCard from './components/MovieCard';
import {useDebounce} from 'react-use'; 

const API_BASED_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
};

const App = () => {
 const [searchTerm, setSearchTerm] = useState('');
 const [errorMessage, setErrorMessage] = useState('');
 const [movieList, setMovieList] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [debouncedSearchTerm, setDebouncedSearchTerm] = useState();

 useDebounce( () => setDebouncedSearchTerm(searchTerm), 500,
[searchTerm] ) 

 const fetchMovies = async (query= '') => {
  setIsLoading(true);
  setErrorMessage('');
  try{  const endpoint = query ? `${API_BASED_URL}/search/movie?query=${encodeURIComponent(query)}` :
    `${API_BASED_URL}/discover/movie?sort_by=popularity.desc`; 
    const response = await fetch(endpoint, API_OPTIONS);
  
   if(!response.ok) {
      throw new Error('Network response was not ok ? ^_^');
    }
const data = await response.json();

if (data.response=== false) {
  setErrorMessage(data.Error || 'failed to fetch movies');
  setMovieList([]);
  return;
}

setMovieList(data.results || []);

} catch (error) {
    console.error('Error fetching movies:', error);
    setErrorMessage('Failed to fetch movies. Please try again later. ok');
  } finally{
    setIsLoading(false);
  }
 }
useEffect(() => { 
  fetchMovies(searchTerm); 
} , [searchTerm]); 

  return (
     
    <main>
      <div className = "pattern" />
 <div className = "wrapper"> 
  <header>
      <img src='./public/figma build/hero-.png' alt='hero banner'/>
      <h1>Want to enjoy the latest <span className='text-gradient'>Movies</span> Find a movie NOW !</h1>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
  </header>

<section className='all-movies'>
   <h2 className='pt-15'>All Movies</h2>
    {isLoading ?(
   <Spinner /> 
    ): errorMessage ? (
      <p className='text-red-600'>{errorMessage}</p>
    ): (
      <ul>
        {movieList.map((movie)=>(
          <MovieCard  key={movie.id} movie={movie}  />
        ))}
      </ul>
    )}
  </section>


  
 
 </div>
      
    </main>
  )
}

export default App