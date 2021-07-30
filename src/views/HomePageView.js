import { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import PageHeading from "../components/PageHeading/PageHeading";
import * as movieShelfAPI from "../services/movieshelf-api";
import styles from "./styles.module.css";

export default function HomePageView() {
  // const { url } = useRouteMatch()
  // const { page } = useParams();
  // console.log(page);

  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    movieShelfAPI.fetchMoviesTrending().then((resp) => setMovies(resp.results));
    setPage((prev) => prev + 1);
  }, []);

  const handleLoadMore = async () => {
    setPage((prev) => prev + 1);
    const { results } = await movieShelfAPI.fetchMoviesTrending(page);
    setMovies((prev) => [...prev, ...results]);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <PageHeading text="Trending Today" />
      {movies && (
        <ul className={styles.link}>
          {movies.map((movie) => (
            <li key={movies.indexOf(movie)}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
                  }
                  alt={movie.title}
                ></img>
              </Link>
              <div className={styles.blok}>
                <h3>{movie.title} </h3>
                <span className={styles.voteAverage}>{movie.vote_average}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={handleLoadMore}>
        Load More
      </button>
    </>
  );
}
