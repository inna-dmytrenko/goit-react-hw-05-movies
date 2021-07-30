import { useState, useEffect } from "react";
// import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom'
import * as movieShelfAPI from "../services/movieshelf-api";

export default function ReviewsView({ movieId }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    movieShelfAPI
      .fetchReviews(movieId)
      .then((resp) => setReviews(resp.results));
  }, [movieId]);
  console.log(movieId);
  return (
    <div>
      {/* <NavLink to={`/movie/${movieId}`} onClick={handelReviews}>
        handelReviews{movieId}
      </NavLink> */}
      {reviews.length > 0 ? (
        <>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <h4>{review.author}</h4>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>We don't have any reviews for this film.</div>
      )}
      {/* {reviews && <div>Not fount</div>} */}
    </div>
  );
}
