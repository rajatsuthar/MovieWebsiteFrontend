import React, { useState } from 'react';
import axios from 'axios';
import './Search.css'
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
        const response = await axios.post('/search', { s: searchQuery });
      setMovies(response.data);
      setError('');
    } catch (err) {
      setError('An error occurred while fetching data from OMDB.');
      setMovies([]);
    }
  };
  const handleFavorite =async (movie)=>{
    try {
        const response = await axios.post('/Setfavorite',movie);
      
    } catch (err) {
      setError('An error occurred while fetching data from OMDB.');
    
    }
  }
  const navigate = useNavigate();
  const gotoFav =()=>{
  

   navigate("/favorites");

  }

  return (
    <>
    <div className='firstDiv'>
    <button type="button"
          className=" btn"
          onClick={gotoFav}>
            Your Favorites</button>
            </div>
    <div className="container mt-5">
        
      <h1>Find Your <span className='spnName'> Movies </span>Here</h1>
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div id="search-results">
        {error && <p className="text-danger">{error}</p>}
        {movies.length > 0 && (
          <>
            <h2>Search Results:</h2>
            <ul className="list-group">
              {movies.map((movie) => (
                <li className="list-group-item" key={movie.imdbID}>
                  <div className="row">
                    <div className="col-3">
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-9">
                      <h3>{movie.Title} ({movie.Year})</h3>
                      <p>Type: {movie.Type}</p>
                      <button
                        className="btn btn-outline-secondary favorite-btn"
                        onClick={() => handleFavorite(movie)}
                      >
                        Favorite
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
    </>

  );
}

export default Search;