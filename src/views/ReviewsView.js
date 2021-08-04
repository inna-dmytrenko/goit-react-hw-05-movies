import { useState, useEffect } from 'react';

import * as movieShelfAPI from '../services/movieshelf-api';
import styles from './styles.module.css';

export default function ReviewsView({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const defaultAvatar =
    'https://premiumt.ru/wp-content/uploads/2019/02/avatar.png';
  useEffect(() => {
    movieShelfAPI.fetchReviews(movieId).then(resp => setReviews(resp.results));
  }, [movieId]);

  return (
    <div>
      <ul>
        {reviews.length > 0 ? (
          reviews.map(review => {
            const img = review.author_details.avatar_path?.includes('http')
              ? review.author_details.avatar_path.slice(
                  1,
                  review.author_details.avatar_path.length - 1,
                )
              : review.author_details.avatar_path
              ? imgUrl + review.author_details.avatar_path
              : defaultAvatar;

            return (
              <li key={review.id} className={styles.reviews}>
                <h4>Author: {review.author}</h4>
                <img
                  src={img}
                  alt={review.author}
                  width={80}
                  className={styles.imgReview}
                />
                <p className={styles.contentText}>{review.content}</p>
              </li>
            );
          })
        ) : (
          <li>
            <h5 className={styles.textReviews}>
              We don't have any reviews for this film.
            </h5>
          </li>
        )}
      </ul>
    </div>
  );
}
