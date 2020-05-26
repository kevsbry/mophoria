import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const PrevBtn = (props) => {
  return (
    <div className="theaters-prevBtn" onClick={props.onPrev}>
      <NavigateBeforeIcon className="theaters-prev" />
    </div>
  );
};

const NextBtn = (props) => {
  return (
    <div className="theaters-nextBtn" onClick={props.onNext}>
      <NavigateNextIcon className="theaters-next" />
    </div>
  );
};

class Theaters extends React.Component {
  carouselTransformVal = 0;

  onPrev = () => {
    if (this.carouselTransformVal > 0) this.carouselTransformVal -= 100;
    console.log(this.carouselTransformVal);

    // const carousel = document.querySelector(".theaters-carousel-slide");
    this.carouselRef.current.style.transform = `translateX(-${this.carouselTransformVal}%)`;
  };

  onNext = () => {
    this.carouselTransformVal += 100;
    // const carousel = document.querySelector(".theaters-carousel-slide");
    this.carouselRef.current.style.transform = `translateX(-${this.carouselTransformVal}%)`;
  };

  onMovieClick = (id, isMovie) => {
    window.location.href = isMovie
      ? window.origin + "/movie/" + id
      : window.origin + "/tv/" + id;
  };

  state = {
    inTheaters: [],
    region: "us",
  };

  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
  }

  async componentDidMount() {
    this.movie = React.createRef();

    await axios
      .get(
        this.props.api
        // `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.props.apiKey}&language=en-US&region=${this.state.region}`
      )
      .then((res) => {
        this.setState(() => {
          return {
            inTheaters: [...res.data.results],
          };
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="theaters">
        <React.Fragment>
          <div ref={this.carouselRef} className="theaters-carousel-slide">
            {this.state.inTheaters.map((m) => (
              <div key={m.id} className="theaters-poster">
                <img
                  src={`https://image.tmdb.org/t/p/w342/${m.poster_path}`}
                  alt="movie poster"
                />
                <div
                  className="theaters-overlay"
                  ref={this.movie}
                  onClick={() => {
                    this.onMovieClick(m.id, this.props.isMovie);
                  }}
                >
                  {this.props.isMovie ? (
                    <span>{m.title}</span>
                  ) : (
                    <span>{m.name}</span>
                  )}
                  {this.props.isMovie && <span>{`(${m.release_date})`}</span>}
                </div>
              </div>
            ))}
          </div>
          <PrevBtn onPrev={this.onPrev} />
          <NextBtn onNext={this.onNext} />
        </React.Fragment>
      </div>
    );
  }
}

Theaters.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default Theaters;
