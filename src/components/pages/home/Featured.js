import React from "react";
import axios from "axios";
import PropsTypes from "prop-types";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import CloseIcon from "@material-ui/icons/Close";
import "./style.css";

const Carousel = props => {
  return (
    <div className="carousel-slide">
      {props.content.map(c => (
        <React.Fragment key={c.id}>
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${c.poster_path}`}
            alt=""
          />

          <img
            className="backdrop"
            src={`https://image.tmdb.org/t/p/w1280${c.backdrop_path}`}
            alt="movie backdrop"
          />
        </React.Fragment>
      ))}
    </div>
  );
};

//overlay
const PosterOverlay = props => {
  return (
    <div className="poster-overlay">
      {props.movie.map((m, i) => (
        <React.Fragment key={m.id}>
          {i === props.currentIndex && <span>{`${m.vote_average} / 10`}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

const BackdropOverlay = props => {
  return (
    <div className="backdrop-overlay">
      <PlayArrowIcon
        className="playBtn"
        onClick={props.onPlay}
        fontSize="large"
      />
      {props.movie.map(
        (m, i) =>
          i === props.currentIndex && (
            <span key={m.id}>{`${m.title} | ${props.videoType}`}</span>
          )
      )}
    </div>
  );
};

//prev and next btn
const PrevBtn = props => {
  return (
    <div className="prev-btn" onClick={props.onPrevClick}>
      <NavigateBeforeIcon className="featured-prev" />
    </div>
  );
};

const NextBtn = props => {
  return (
    <div className="next-btn" onClick={props.onNextClick}>
      <NavigateNextIcon className="featured-next" />
    </div>
  );
};

//modal
const ModalVideo = props => {
  return (
    <div className="modal">
      <div className="close">
        <CloseIcon
          className="closeModal"
          fontSize="large"
          onClick={props.onClose}
        />
        <span>Close</span>
      </div>
      <iframe
        src={"https://www.youtube.com/embed/" + `${props.videoKey}`}
        title="trailer"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

class Featured extends React.Component {
  onPlay = () => {
    const modal = document.querySelector(".modal");
    modal.classList.toggle("modal-active");
  };

  slideTransformValue = 0;
  onPrevClick = () => {
    const carouselSlide = document.querySelector(".carousel-slide");
    if (this.slideTransformValue > 0) {
      this.setState(() => {
        return { currentMovieIndex: this.state.currentMovieIndex - 1 };
      });
      this.slideTransformValue -= 100;
      carouselSlide.style.transform = `translateX(-${this.slideTransformValue}%)`;
    }
  };

  onNextClick = () => {
    const carouselSlide = document.querySelector(".carousel-slide");

    if (this.slideTransformValue < 1900) {
      this.setState(() => {
        return { currentMovieIndex: this.state.currentMovieIndex + 1 };
      });
      this.slideTransformValue += 100;
      carouselSlide.style.transform = `translateX(-${this.slideTransformValue}%)`;
    }
  };

  onModalClose = () => {
    const modal = document.querySelector(".modal");
    modal.classList.remove("modal-active");
  };

  onWindowClick = () =>
    window.addEventListener("click", e => {
      if (e.target.tagName === "HTML") {
        const modal = document.querySelector(".modal");
        modal.classList.remove("modal-active");
      }
    });

  // STATE
  state = {
    currentMovieIndex: 0,
    currentVideoKey: "",
    currentVideoType: "",
    trending: []
  };

  componentDidUpdate(prevProps, prevState) {
    //check if user go next or back then get movievideos and set new videoKey, videoType
    if (prevState.currentMovieIndex !== this.state.currentMovieIndex) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${
            this.state.trending[this.state.currentMovieIndex].id
          }/videos?api_key=${this.props.apiKey}&language=en-US`
        )
        .then(res => {
          this.setState({
            currentVideoKey: res.data.results[0].key,
            currentVideoType: res.data.results[0].type
          });
        })
        .catch(err => console.log(err));
    }
  }

  async componentDidMount() {
    //get trending movies
    await axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.props.apiKey}`
      )
      .then(res => {
        this.setState(() => {
          return {
            trending: [...res.data.results]
          };
        });
      })
      .catch(err => {
        console.log(err);
      });

    //get movie trailers
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${
          this.state.trending[this.state.currentMovieIndex].id
        }/videos?api_key=${this.props.apiKey}&language=en-US`
      )
      .then(res => {
        this.setState({
          currentVideoKey: res.data.results[0].key,
          currentVideoType: res.data.results[0].type
        });
      })
      .catch(err => console.log(err));

    this.setState({});

    //close modal
    this.onWindowClick();
  }

  render() {
    return (
      <div className="featured">
        <Carousel
          content={this.state.trending}
          current={this.state.currentMovieIndex}
        />
        <PrevBtn onPrevClick={this.onPrevClick} />
        <NextBtn onNextClick={this.onNextClick} />
        <BackdropOverlay
          movie={this.state.trending}
          currentIndex={this.state.currentMovieIndex}
          videoType={this.state.currentVideoType}
          onPlay={this.onPlay}
        />
        <PosterOverlay
          movie={this.state.trending}
          currentIndex={this.state.currentMovieIndex}
        />
        <ModalVideo
          videoKey={this.state.currentVideoKey}
          onClose={this.onModalClose}
        />
      </div>
    );
  }
}

Featured.propTypes = {
  apiKey: PropsTypes.string.isRequired
};

export default Featured;
