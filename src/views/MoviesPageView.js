import PageHeading from "../components/PageHeading/PageHeading";
import * as movieShelfAPI from "../services/movieshelf-api";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function MoviesPageView() {
  const [query, setQuery] = useState("");
  const [movies, setMovie] = useState(null);
  const [page, setPage] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target);
    // setQuery(e.target.value);
    movieShelfAPI
      .fetchSearch(query, page)
      .then((resp) => setMovie(resp.results));
    setPage((prev) => prev + 1);
    console.log(query);
  };
  const getSetQuery = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };
  const handleLoadMore = async () => {
    setPage((prev) => prev + 1);
    const { results } = await movieShelfAPI.fetchSearch(query, page);
    setMovie((prev) => [...prev, ...results]);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  //  const handleLoadMore = async () => {
  //   setPage(prev => prev + 1);
  //   const { results } = await bookShelfAPI.fetchAuthors(page);
  //   setBooks(prev => [...prev, ...results]);
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     left: 0,
  //     behavior: 'smooth',
  //   });
  // };
  return (
    <>
      <PageHeading text="Movie"></PageHeading>
      <form onSubmit={handleSubmit} action="">
        <input
          // value={setQuery}
          onInput={getSetQuery}
          placeholder={"Search"}
        ></input>
      </form>
      <hr />
      {movies && (
        <ul className={styles.link}>
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                ></img>

                <h1>{movie.title}</h1>
                {/* <h2>{movie.tagline}</h2> */}
                <p>{movie.vote_average}</p>
              </div>
            </Link>
          ))}
          <button type="button" onClick={handleLoadMore}>
            Load More
          </button>
        </ul>
      )}
    </>
  );
}
