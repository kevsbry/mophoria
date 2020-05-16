import React, { Component } from "react";
import style from "../../movie_tv_components/movie_tv.module.css";
import axios from "axios";
import Title from "../../globalComponents/Title";
import Overview from "../../movie_tv_components/Overview";
import Videos from "../../movie_tv_components/Videos";
import Picture from "../../movie_tv_components/Picture";
import Cast from "../../movie_tv_components/Cast";
import Details from "../../movie_tv_components/Details";
import List from "../../globalComponents/List";
import PictureModal from "../../globalComponents/PictureModal";
import CastModal from "../../globalComponents/CastModal";
import Copyright from "../../globalComponents/Copyright";

export class Movie extends Component {
  movieID = () => {
    const { movieID } = this.props.match.params;
    return movieID;
  };

  state = {
    apiKey: "325d84ad33eb95a5c0fc5427ba3f569a",
    movieID: this.movieID(),
    details: {},
    posters: [],
    backdrops: [],
    cast: [],
    crew: []
  };

  setImages = (posters, backdrops) => {
    this.setState(() => {
      return {
        posters: [...posters],
        backdrops: [...backdrops]
      };
    });
  };

  setCast = (cast, crew) => {
    this.setState(() => {
      return {
        cast: [...cast],
        crew: [...crew]
      };
    });
  };

  openPictureModal = () => {
    this.pictureModalBackground.current.style.opacity = "1";
    this.pictureModalBackground.current.style.visibility = "visible";
    this.pictureModalBackground.current.style.transition = "all 200ms ease-in";

    this.pictureModal.current.style.opacity = "1";
    this.pictureModal.current.style.visibility = "visible";
    this.pictureModal.current.style.transition = "all 200ms ease-in";
  };

  openCastModal = () => {
    this.castModalbackground.current.style.visibility = "visible";
    this.castModalbackground.current.style.opacity = "1";
    this.castModalbackground.current.style.transition = "all 200ms ease-in";

    this.castModal.current.style.visibility = "visible";
    this.castModal.current.style.opacity = "1";
    this.castModal.current.style.transition = "all 200ms ease-in";
  };

  async componentDidMount() {
    this.pictureModalBackground = React.createRef();
    this.pictureModal = React.createRef();
    this.castModalbackground = React.createRef();
    this.castModal = React.createRef();
    const { apiKey, movieID } = this.state;

    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`
      )
      .then(res => {
        this.setState(() => {
          return {
            details: res.data
          };
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className={style["page-grid"]}>
        <PictureModal
          ref={{
            firstRef: this.pictureModalBackground,
            secondRef: this.pictureModal
          }}
          posters={this.state.posters}
          backdrops={this.state.backdrops}
        />
        <CastModal
          ref={{ background: this.castModalbackground, modal: this.castModal }}
          cast={this.state.cast}
          crew={this.state.crew}
        />

        <Overview details={this.state.details} isMovie={true} />
        <Title titleName="Videos" />
        <Videos
          isMovie={true}
          apiKey={this.state.apiKey}
          itemID={this.state.movieID}
        />
        <Title
          titleName="Pictures"
          more={true}
          onClickViewAll={this.openPictureModal}
        />
        <Picture
          isMovie={true}
          apiKey={this.state.apiKey}
          itemID={this.state.movieID}
          setImages={this.setImages}
        />

        <Title
          titleName="Cast"
          more={true}
          onClickViewAll={this.openCastModal}
        />
        <Cast
          isPerson={false}
          isMovie={true}
          apiKey={this.state.apiKey}
          itemID={this.state.movieID}
          setCast={this.setCast}
        />
        <Title titleName="Similar movies" />
        <List
          api={`https://api.themoviedb.org/3/movie/${this.movieID()}/similar?api_key=${
            this.state.apiKey
          }&language=en-US&page=1`}
          isMovie={true}
        />

        <Title titleName="Details" />
        <Details details={this.state.details} />
        <Copyright />
      </div>
    );
  }
}

export default Movie;
