import React, { Component } from "react";
import style from "./movie_tv.module.css";

const getYear = (date) => {
  let string = String(date);
  return string.substring(0, 4);
};

const Season = (props) => {
  const { poster, seasonName, date, episodeCount, overview } = props;
  return (
    <div
      className={style.season}
      onClick={() => {
        props.open(props.seasonNumber, props.seasonName);
      }}
    >
      {props.poster_path !== null && (
        <>
          <img
            src={`https://image.tmdb.org/t/p/w185/${poster}`}
            alt="season poster"
          />
          <div>
            <span className={style["season-name"]}>
              {seasonName}
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "lighter",
                  marginLeft: "0.5em",
                }}
              >
                ({getYear(date)})
              </span>
            </span>
            <span className={style["episode-count"]}>
              {episodeCount} episodes
            </span>
            <span className={style["season-overview"]}>{overview}</span>
          </div>
        </>
      )}
    </div>
  );
};

export class Seasons extends Component {
  render() {
    const { open, seasons } = this.props;
    return (
      <div className={style["seasons-container"]}>
        {seasons &&
          seasons.map((s) => (
            <Season
              seasonNumber={s.season_number}
              poster={s.poster_path}
              seasonName={s.name}
              date={s.air_date}
              episodeCount={s.episode_count}
              overview={s.overview}
              open={open}
            />
          ))}
      </div>
    );
  }
}

export default Seasons;
