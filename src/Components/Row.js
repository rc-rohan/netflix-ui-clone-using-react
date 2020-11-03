import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchURL, isLargeRow }) {
  const base_url = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
    }
    fetchData();
    // in useEffect we need to add any of the variable as the dependency if that is used inside useEffect and that keeps on changing so here in this case we add up the  fetchURL
  }, [fetchURL]);

  const handleClick = (movie) => {
    if (trailerURL) {
      // if the trailer URL is already open means video is playing
      setTrailerURL("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          console.log(url);
          // https://www.youtube.com/watch?v=XtMThy8QKqU
          // inorder to get the "XtMThy8QKqU" value from the URL we passs use the method below we first pass the full URL and then get the search value from that URL
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => {
              handleClick(movie);
            }}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </div>
  );
}

export default Row;
