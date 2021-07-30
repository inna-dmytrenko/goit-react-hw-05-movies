import { useEffect, useState } from "react";
import {
  // Link,
  // Route,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import * as movieShelfAPI from "../services/movieshelf-api";
import PageHeading from "../components/PageHeading/PageHeading";
import styles from "./styles.module.css";
import CastView from "./CastView";
import ReviewsView from "./ReviewsView";

export default function MovieDetailsPageView() {
  const history = useHistory();
  const location = useLocation();
  // console.log(history)
  const { path, url } = useRouteMatch();
  // // console.log(url)

  const { movieId } = useParams();
  console.log(useParams());
  const [movie, setMovie] = useState(null);
  // console.log(movieId)
  // const [castes, setCastes] = useState(null)
  // const [reviews, setReviews] = useState(null)
  useEffect(() => {
    movieShelfAPI.fetchMovie(movieId).then((resp) => setMovie(resp));
  }, [movieId]);

  // const handelCast = () => {
  //   movieShelfAPI.fetchCast(movieId).then((resp) => setCastes(resp.cast))
  //   history.push({ ...location, search: '/cast' })
  // }
  // const handelReviews = () => {
  //   // movieShelfAPI.fetchReviews(movieId).then(resp => setReviews(resp.results));
  //   history.push({ ...location, search: '/reviews' })
  // }

  // useEffect(() => {
  //   movieShelfAPI.fetchReviews(movieId).then((resp) => setReviews(resp.results))
  //   // history.push({ ...location, search: '/reviews' })
  // }, [movieId])
  const onGoBack = () => {
    history.push(location?.state?.from ?? "/");
  };
  return (
    <>
      <PageHeading text={`Movie ${movieId}`} />
      {movie && (
        <>
          <button type="button" onClick={onGoBack}>
            Go Back
          </button>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.overview}
          ></img>
          <h1>{movie.title}</h1>
          <h2>{movie.tagline}</h2>
          <p>
            {movie.vote_average} * {movie.release_date} *{" "}
            {movie.genres.map((genere) => genere.name).join(", ")}
          </p>
          <p>{movie.overview}</p>
          <ul>
            <li>
              <h3>BUDGET</h3>
              <p>{movie.budget} $</p>
            </li>
            <li>
              <h3>POPULARITY</h3>
              <p>{movie.popularity}</p>
            </li>
            <li>
              <h3>REVENUE</h3>
              <p>{movie.revenue} $</p>
            </li>
          </ul>
          <hr />

          {/* <Route path={`${path}:movieId`}> */}
          {/* <button type="button" onClick={handelCast}>
            Cast
          </button> */}
          {/* {castes && (
            <ul className={styles.item}>
              {castes.map((cast) => (
                <li key={cast.id}>
                  <img
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                        : 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png'
                    }
                    alt={cast.name}
                  />
                  <p>{cast.name}</p>
                  <p>{cast.character}</p>
                </li>
              ))}
            </ul> */}
          {/* )} */}
          {/* </Route> */}

          {/* <NavLink to={`${url}/reviews`}>Reviews</NavLink> */}
          {/* <button type="button" onClick={handelReviews}>
            Reviews
          </button> */}
          {/* {reviews && (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <h4>{review.author}</h4>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          )} */}
        </>
      )}
      <hr />

      <NavLink className={styles.link} to={`${url}/cast`}>
        cast
      </NavLink>
      <NavLink
        // onClick={handelReviews}
        className={styles.link}
        to={`${url}/reviews`}
      >
        Reviews
        {/* <div>
          {reviews && (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <h4>{review.author}</h4>
                  <p>{review.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div> */}
      </NavLink>

      <Switch>
        <Route path={`${path}/cast`}>
          <CastView />
        </Route>
        <Route path={`${path}/reviews`}>
          <ReviewsView movieId={movieId} />
        </Route>
      </Switch>
      {/* {castes && <div>cast</div>} */}
    </>
  );
}
