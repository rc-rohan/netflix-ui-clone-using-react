import React from "react";
import Row from "./Components/Row";
import requests from "./request";
import "./App.css";

function App() {
  return (
    <div className="App">
      Hello world
      <Row
        title="NFLIX ORIGINALS"
        isLargeRow
        fetchURL={requests.fetchNetflixOriginals}
      />
      <Row title="Top Rated" fetchURL={requests.fetchTrending} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
