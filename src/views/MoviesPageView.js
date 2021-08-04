import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';

import PageHeading from '../components/PageHeading/PageHeading';
import * as movieShelfAPI from '../services/movieshelf-api';
import { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

export default function MoviesPageView() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

  const location = useLocation();
  const history = useHistory();
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const handleSubmit = async e => {
    e.preventDefault();
    setPage(1);
    history.push({
      pathname: history.location.pathname,
    });
    if (query.trim() === '') {
      setQuery('');
      return toast('Please enter something!');
    } else {
      const { results } = await movieShelfAPI.fetchSearch(query, 1);

      setMovies(results);

      if (results.length < 1) {
        setQuery('');
        return toast.error(`Your search - ${query} - did not match any images`);
      }
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (location.state?.search) {
      movieShelfAPI
        .fetchSearch(location.state?.search, location.state?.page - 1)
        .then(resp => {
          setMovies([...resp.results]);
          setQuery(location.state.search);
          setPage(location.state.page);
        });
    }
  }, [location]);
  const getSetQuery = e => {
    setQuery(e.target.value);
  };
  const handleLoadMore = async () => {
    const { results } = await movieShelfAPI.fetchSearch(query, page);
    setMovies(prev => [...prev, ...results]);
    setPage(prev => prev + 1);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <PageHeading text="Movie"></PageHeading>
      <div className={styles.div}>
        <form onSubmit={handleSubmit} action="" className={styles.form}>
          <button type="submit" className={styles.button}>
            <label className={styles.buttonLabel}>Search</label>
          </button>
          <input
            className={styles.input}
            value={query}
            onChange={getSetQuery}
            placeholder={'Search'}
            autoFocus
            autoComplete="off"
            type="text"
          ></input>
        </form>
      </div>

      {movies && (
        <ul className={styles.link}>
          {movies.map(({ id, poster_path, title, vote_average }) => (
            <li key={id} className={styles.itemMovie}>
              <Link
                to={{
                  pathname: `/movie/${id}`,
                  state: {
                    search: query !== undefined ? query : '',
                    page: page,
                    id: id,
                    from: location.pathname,
                  },
                }}
              >
                <div>
                  <img
                    className={styles.img}
                    src={
                      poster_path
                        ? imgUrl + poster_path
                        : 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'
                    }
                    alt={title}
                  ></img>
                </div>
                <div className={styles.blok}>
                  <h3 className={styles.title}>{title}</h3>

                  <p className={styles.voteAverage}>{vote_average}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {movies?.length >= 20 && (
        <button
          type="button"
          onClick={handleLoadMore}
          className={styles.loadMore}
        >
          Load More
        </button>
      )}
      <ToastContainer />
    </>
  );
}
