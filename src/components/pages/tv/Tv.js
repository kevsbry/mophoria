import React from "react";
import axios from "axios";
import style from "../../movie_tv_components/movie_tv.module.css";
import Overview from "../../movie_tv_components/Overview";
import Title from "../../globalComponents/Title";
import Seasons from "../../movie_tv_components/Seasons";
import Videos from "../../movie_tv_components/Videos";
import Picture from "../../movie_tv_components/Picture";
import Cast from "../../movie_tv_components/Cast";
import List from "../../globalComponents/List";
import Copyright from "../../globalComponents/Copyright";
import PictureModal from "../../globalComponents/PictureModal";
import CastModal from "../../globalComponents/CastModal";
import CloseIcon from "@material-ui/icons/Close";

const SeasonModal = React.forwardRef((props, ref) => {
  const closeModal = () => {
    ref.background.current.style.visibility = "hidden";
    ref.background.current.style.opacity = "0";
    ref.background.current.style.transition = "all 200ms ease-in";

    ref.modal.current.style.visibility = "hidden";
    ref.modal.current.style.opacity = "0";
    ref.modal.current.style.transition = "all 200ms ease-in";
  };

  return (
    <>
      <div
        ref={ref.background}
        className={style["season-modal-background"]}
        onClick={closeModal}
      ></div>
      <div ref={ref.modal} className={style["season-modal"]}>
        <CloseIcon className={style.closeIcon} onClick={closeModal} />
        <Title titleName={props.seasonName} />
        {props.episodes &&
          props.episodes.map(ep => (
            <div className={style.episode}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${ep.still_path}`}
                alt="still image"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "1em"
                }}
              >
                <span className={style["episode-name"]}>{ep.name}</span>
                <span className={style["episode-num"]}>
                  Episode {ep.episode_number}
                </span>
                <span className={style["episode-overview"]}>{ep.overview}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
});

class Tv extends React.Component {
  tvID = () => {
    const { tvID } = this.props.match.params;
    return tvID;
  };

  state = {
    apiKey: "325d84ad33eb95a5c0fc5427ba3f569a",
    tvID: this.tvID(),
    details: {},
    seasonEpisodes: [],
    selectedSeasonName: "",
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

  setModalVisible = ref => {
    ref.background.current.style.visibility = "visible";
    ref.background.current.style.opacity = "1";
    ref.background.current.style.transition = "all 200ms ease-in";

    ref.modal.current.style.visibility = "visible";
    ref.modal.current.style.opacity = "1";
    ref.modal.current.style.transition = "all 200ms ease-in";
  };

  openPictureModal = () => {
    this.setModalVisible({
      background: this.pictureModalBackground,
      modal: this.pictureModal
    });
  };

  openCastModal = () => {
    this.setModalVisible({
      background: this.castModalBackground,
      modal: this.castModal
    });
  };

  openSeasonModal = async (seasonNum, seasonName) => {
    this.setModalVisible({
      background: this.seasonModalBackground,
      modal: this.seasonModal
    });
    const { apiKey, tvID } = this.state;
    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${tvID}/season/${seasonNum}?api_key=${apiKey}&language=en-US`
      )
      .then(res => {
        this.setState(() => {
          return {
            seasonEpisodes: res.data.episodes,
            selectedSeasonName: seasonName
          };
        });
      })
      .catch(err => console.log(err));
    this.seasonModal.current.scrollTop = 0;
  };

  async componentDidMount() {
    const { apiKey, tvID } = this.state;
    this.pictureModalBackground = React.createRef();
    this.pictureModal = React.createRef();
    this.castModalBackground = React.createRef();
    this.castModal = React.createRef();
    this.seasonModalBackground = React.createRef();
    this.seasonModal = React.createRef();

    await axios
      .get(
        `https://api.themoviedb.org/3/tv/${tvID}?api_key=${apiKey}&language=en-US`
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
          ref={{ background: this.castModalBackground, modal: this.castModal }}
          cast={this.state.cast}
          crew={this.state.crew}
        />

        <SeasonModal
          ref={{
            background: this.seasonModalBackground,
            modal: this.seasonModal
          }}
          episodes={this.state.seasonEpisodes}
          seasonName={this.state.selectedSeasonName}
        />

        <Overview details={this.state.details} />
        <Title titleName="Seasons" />
        <Seasons
          seriesName={this.state.details.name}
          seasons={this.state.details.seasons}
          open={this.openSeasonModal}
        />
        <Title titleName="Videos" />
        <Videos
          isMovie={false}
          apiKey={this.state.apiKey}
          itemID={this.state.tvID}
        />
        <Title
          titleName="Pictures"
          more={true}
          onClickViewAll={this.openPictureModal}
        />
        <Picture
          isMovie={false}
          itemID={this.state.tvID}
          apiKey={this.state.apiKey}
          setImages={this.setImages}
        />
        <Title
          titleName="Cast"
          more={true}
          onClickViewAll={this.openCastModal}
        />
        <Cast
          isPerson={false}
          isMovie={false}
          apiKey={this.state.apiKey}
          itemID={this.state.tvID}
          setCast={this.setCast}
        />
        <Title titleName="Similar tv shows" />
        <List
          api={`https://api.themoviedb.org/3/tv/${this.state.tvID}/similar?api_key=${this.state.apiKey}&language=en-US&page=1`}
          isMovie={false}
        />
        <Copyright />
      </div>
    );
  }
}

export default Tv;
