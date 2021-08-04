import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHeading from '../components/PageHeading/PageHeading';
import * as movieShelfAPI from '../services/movieshelf-api';
import styles from './styles.module.css';

export default function HomePageView() {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    movieShelfAPI.fetchMoviesTrending(page).then(
      resp => setMovies(resp.results),
      setPage(prev => prev + 1),
    );
  }, []);

  useEffect(() => {
    if (location.state?.page) {
      movieShelfAPI.fetchMoviesTrending(location.state?.page - 1).then(resp => {
        setMovies(resp.results);
        setPage(location.state?.page);
      });
    }
  }, [location]);

  const handleLoadMore = async () => {
    setPage(prev => prev + 1);
    const { results } = await movieShelfAPI.fetchMoviesTrending(page);
    setMovies(prev => [...prev, ...results]);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 300);
  };

  return (
    <>
      <PageHeading text="Trending Today" />
      {movies && (
        <ul className={styles.link}>
          {movies.map(movie => (
            <li key={movies.indexOf(movie)} className={styles.itemMovie}>
              <Link
                to={{
                  pathname: `/movie/${movie.id}`,
                  state: {
                    page: page,
                    id: movie.id,
                    from: location.pathname,
                  },
                }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                  }
                  alt={movie.title}
                ></img>
                <div className={styles.blok}>
                  <h3>{movie.title} </h3>
                  <span className={styles.voteAverage}>
                    {movie.vote_average}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={handleLoadMore}
        className={styles.loadMore}
      >
        Load More
      </button>
    </>
  );
}
