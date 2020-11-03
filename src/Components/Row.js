import React, { useEffect, useState } from "react";
import axios from "../axios";
import './Row.css'

function Row({ title, fetchURL,isLargeRow }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      console.log(request.data.results);
    }
    fetchData();
    // in useEffect we need to add any of the variable as the dependency if that is used inside useEffect and that keeps on changing so here in this case we add up the  fetchURL
  }, [fetchURL]);
  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            key={movie.id}
            src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
