import React, { Component } from "react";
import style from "./movie_tv.module.css";

const Poster = props => {
  return (
    <div className={style.poster}>
      <img
        src={`https://image.tmdb.org/t/p/original${props.imagePath}`}
        alt="poster"
      />
    </div>
  );
};

export class Overview extends Component {
  getYear = d => {
    let date = String(d);
    return date.substring(0, 4);
  };

  render() {
    const { details, isMovie } = this.props;
    return (
      <div className={style.overview}>
        <Poster imagePath={details.poster_path} />
        <div className={style.info}>
          <div>
            <span className={style.title}>
              {isMovie ? details.title : details.name}
            </span>
            <span className={style.year}>
              (
              {isMovie
                ? this.getYear(details.release_date)
                : this.getYear(details.first_air_date)}
              )
            </span>
          </div>

          <div className={style.genre}>
            {details.genres &&
              details.genres.map((g, i) => (
                <span key={g.id}>
                  {g.name}
                  {i < details.genres.length - 1 && (
                    <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                      |
                    </span>
                  )}
                </span>
              ))}
          </div>

          <div className={style.plot}>
            <span>{details.overview}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
