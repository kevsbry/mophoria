import React from "react";
import style from "./movie_tv.module.css";
import axios from "axios";

const Artist = props => {
  return (
    <div
      className={style.artist}
      onClick={() => {
        props.onClickPerson(props.personID);
      }}
    >
      <img
        className={style["artist-image"]}
        src={`https://image.tmdb.org/t/p/h632/${props.cast.profile_path}`}
        alt="actor image"
      />
      <div className={style["artist-description"]}>
        <span className={style["cast-name"]}>{props.cast.name}</span>
        <span className={style["cast-character"]}>{props.cast.character}</span>
      </div>
    </div>
  );
};

class Cast extends React.Component {
  state = {
    cast: [],
    crew: []
  };

  async componentDidMount() {
    const { isMovie, apiKey, itemID, setCast } = this.props;

    let apiURL = isMovie
      ? `https://api.themoviedb.org/3/movie/${itemID}/credits?api_key=${apiKey}`
      : `https://api.themoviedb.org/3/tv/${itemID}/credits?api_key=${apiKey}&language=en-US`;

    await axios
      .get(apiURL)
      .then(res =>
        this.setState(() => {
          return {
            cast: [...res.data.cast],
            crew: [...res.data.crew]
          };
        })
      )
      .catch(err => console.log(err));

    setCast(this.state.cast, this.state.crew);
  }

  onClickPerson = personID => {
    window.open(window.origin + "/person/" + personID, "_self");
  };

  render() {
    return (
      <div className={style.cast}>
        <div className={style["cast-container"]}>
          {this.state.cast &&
            this.state.cast.map(c => (
              <Artist
                cast={c}
                key={c.cast_id}
                personID={c.id}
                onClickPerson={this.onClickPerson}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Cast;
