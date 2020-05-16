import React, { Component } from "react";
import axios from "axios";
import style from "./movie_tv.module.css";

const PictureContainer = props => {
  return (
    <div className={style["picture-container"]}>
      {props.pictures.map(
        (p, i) =>
          i < 4 && (
            <div className={style.image} key={i}>
              <img
                onClick={() => {
                  props.onImageClick(p.file_path);
                }}
                src={`https://image.tmdb.org/t/p/${props.width}/${p.file_path}`}
                alt="movie picture"
              />
            </div>
          )
      )}
    </div>
  );
};

class Picture extends Component {
  state = {
    backdrops: [],
    posters: []
  };

  async componentDidMount() {
    const { isMovie, isPerson, itemID, apiKey } = this.props;

    let apiURL = isMovie
      ? `https://api.themoviedb.org/3/movie/${itemID}/images?api_key=${apiKey}`
      : `https://api.themoviedb.org/3/tv/${itemID}/images?api_key=${apiKey}`;

    await axios
      .get(apiURL)
      .then(res => {
        this.setState(() => {
          return {
            backdrops: [...res.data.backdrops],
            posters: [...res.data.posters]
          };
        });
      })
      .catch(err => console.log(err));

    this.props.setImages(this.state.posters, this.state.backdrops);
  }

  onImageClick = imagePath => {
    window.open(window.origin + "/image" + imagePath, "_blank");
  };

  render() {
    return (
      <div className={style.picture}>
        <PictureContainer
          onImageClick={this.onImageClick}
          pictures={this.state.backdrops}
          width="w780"
        />
        <PictureContainer
          onImageClick={this.onImageClick}
          pictures={this.state.posters}
          width="w780"
        />
      </div>
    );
  }
}

export default Picture;
