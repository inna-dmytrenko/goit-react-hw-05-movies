import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as movieShelfAPI from '../services/movieshelf-api';
import styles from './styles.module.css';

export default function CastView() {
  const { movieId } = useParams();
  const [castes, setCastes] = useState(null);
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const defaultAvatar =
    'https://premiumt.ru/wp-content/uploads/2019/02/avatar.png';
  useEffect(() => {
    let cleanUp = false;
    movieShelfAPI.fetchCast(movieId).then(resp => {
      if (!cleanUp) {
        setCastes(resp.cast);
      }
    });
    return () => (cleanUp = true);
  }, [movieId]);
  return (
    <>
      {castes?.length > 0 ? (
        <ul className={styles.item}>
          {castes.map(cast => (
            <li key={cast.id}>
              <img
                className={styles.imgCast}
                src={
                  cast.profile_path ? imgUrl + cast.profile_path : defaultAvatar
                }
                alt={cast.name}
              />
              <h4>{cast.name}</h4>
              <p>{cast.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h5 className={styles.textReviews}>
          We don't have any Series Cast for this film.
        </h5>
      )}
    </>
  );
}
