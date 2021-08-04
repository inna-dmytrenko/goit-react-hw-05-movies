import { RiArrowGoBackFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import {
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import * as movieShelfAPI from '../services/movieshelf-api';
import PageHeading from '../components/PageHeading/PageHeading';
import styles from './styles.module.css';
import CastView from './CastView';
import ReviewsView from './ReviewsView';

export default function MovieDetailsPageView() {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const { path } = useRouteMatch();

  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    movieShelfAPI.fetchMovie(movieId).then(resp => setMovie(resp));
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from, {
      search: location.state?.search,
      page: location.state?.page,
    });
  };

  return (
    <>
      <PageHeading text={`Movie `} />
      <button type="button" onClick={onGoBack} className={styles.btnGoBack}>
        <RiArrowGoBackFill className={styles.iconGoBack} /> Go Back
      </button>
      <div className={styles.aboutMovie}>
        {movie && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.overview}
            ></img>
            <span>
              <h1 className={styles.titleMovie}>{movie.title}</h1>
              <h2>{movie.tagline}</h2>
              <ul className={styles.generes}>
                <li className={styles.itemGeneres}>{movie.vote_average} / </li>
                <li className={styles.itemGeneres}>{movie.release_date} / </li>
                <li className={styles.itemGeneres}>
                  {' '}
                  {movie.genres.map(({ name }) => name).join(', ')}
                </li>
              </ul>
              <p className={styles.overview}>{movie.overview}</p>
              <ul>
                <li className={styles.budget}>
                  <h3>BUDGET:</h3>
                  <p>
                    {movie.budget
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                    $
                  </p>
                </li>

                <li>
                  <h3>REVENUE:</h3>
                  <p>
                    {movie.revenue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                    $
                  </p>
                </li>
              </ul>
            </span>
          </>
        )}
      </div>
      <div className={styles.titleCastRev}>
        <NavLink
          className={styles.link}
          to={{
            pathname: `${match.url}/cast`,
            state: location.state,
          }}
        >
          Series Cast
        </NavLink>
        <NavLink
          className={styles.link}
          to={{
            pathname: `${match.url}/reviews`,
            state: location.state,
          }}
        >
          Reviews
        </NavLink>
      </div>

      <Switch>
        <Route path={`${path}/cast`}>
          <CastView />
        </Route>
        <Route path={`${path}/reviews`}>
          <ReviewsView movieId={movieId} />
        </Route>
      </Switch>
    </>
  );
}
