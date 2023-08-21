import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    
    axios.get('/favorites')
      .then((response) => {
        setFavoriteMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching favorite movies:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1>Favorite Movies</h1>
      <div id="favorite-movies">
        {favoriteMovies.length > 0 ? (
          <ul className="list-group">
            {favoriteMovies.map((movie) => (
              <li className="list-group-item" key={movie.id}>
                <div className="row">
                  <div className="col-3">
                    <img src={movie.poster} alt={movie.title} className="img-fluid" />
                  </div>
                  <div className="col-9">
                    <h3>{movie.title} ({movie.year})</h3>
                    <p>Type: {movie.type}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no favorite movies yet.</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;