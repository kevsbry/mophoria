import React, { Component } from "react";
import style from "./movie_tv.module.css";
import axios from "axios";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const PrevButton = (props) => {
  return (
    <div>
      <NavigateBeforeIcon
        className={style["prev-btn"]}
        onClick={props.onPrev}
      />
    </div>
  );
};

const NextButton = (props) => {
  return (
    <div>
      <NavigateNextIcon className={style["next-btn"]} onClick={props.onNext} />
    </div>
  );
};

export class Videos extends Component {
  state = {
    videos: [],
  };

  async componentDidMount() {
    const { isMovie, apiKey, itemID } = this.props;
    let apiURL = isMovie
      ? `https://api.themoviedb.org/3/movie/${itemID}/videos?api_key=${apiKey}&language=en-US`
      : `https://api.themoviedb.org/3/tv/${itemID}/videos?api_key=${apiKey}&language=en-US`;

    await axios
      .get(apiURL)
      .then((res) => {
        this.setState(() => {
          return {
            videos: res.data.results,
          };
        });
      })
      .catch((err) => console.log(err));
    console.log(apiURL);
    //refs
    this.carouselRef = React.createRef();
  }

  transformValue = 0;
  onPrev = () => {
    if (this.transformValue > 0)
      if (window.innerWidth >= 800) this.transformValue -= 101;
      else this.transformValue -= 100;

    this.carouselRef.current.style.transform = `translateX(-${this.transformValue}%)`;
  };

  onNext = () => {
    if (window.innerWidth >= 800) this.transformValue += 101;
    else this.transformValue += 100;

    this.carouselRef.current.style.transform = `translateX(-${this.transformValue}%)`;
  };

  render() {
    return (
      <div className={style.videos}>
        <div ref={this.carouselRef} className={style["video-slide"]}>
          {this.state.videos.map((v) => (
            <React.Fragment key={v.id}>
              <iframe
                src={`https://www.youtube.com/embed/${v.key}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <span className={style.spacer}></span>
            </React.Fragment>
          ))}
        </div>
        <PrevButton onPrev={this.onPrev} />
        <NextButton onNext={this.onNext} />
      </div>
    );
  }
}

export default Videos;
