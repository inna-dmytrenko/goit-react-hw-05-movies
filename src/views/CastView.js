import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import * as movieShelfAPI from "../services/movieshelf-api";
import styles from "./styles.module.css";

export default function CastView() {
  const { movieId } = useParams();
  const [castes, setCastes] = useState(null);

  useEffect(() => {
    movieShelfAPI.fetchCast(movieId).then((resp) => setCastes(resp.cast));
  }, [movieId]);
  return (
    <>
      {castes && (
        <ul className={styles.item}>
          {castes.map((cast) => (
            <li key={cast.id}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                    : "https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
                }
                alt={cast.name}
              />
              <p>{cast.name}</p>
              <p>{cast.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
