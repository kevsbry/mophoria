import React from "react";
import axios from "axios";
import PersonIcon from "@material-ui/icons/Person";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const PersonName = (props) => {
  return (
    <div className="person-name">
      <span>{props.personName}</span>
    </div>
  );
};

const PrevButton = (props) => {
  return (
    <div className="people-prev-btn">
      <NavigateBeforeIcon className="people-prev" onClick={props.onPrev} />
    </div>
  );
};

const NextButton = (props) => {
  return (
    <div className="people-next-btn">
      <NavigateNextIcon className="people-next" onClick={props.onNext} />
    </div>
  );
};

class People extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
    };

    this.carouselSlide = React.createRef();
  }

  async componentDidMount() {
    await axios
      .get(
        `https://api.themoviedb.org/3/trending/person/day?api_key=${this.props.apiKey}`
      )
      .then((res) => {
        this.setState(() => {
          return {
            people: [...res.data.results],
          };
        });
      })
      .catch((err) => console.log(err));
  }

  transformValue = 0;
  onPrev = () => {
    if (this.transformValue > 0) this.transformValue -= 100;

    this.carouselSlide.current.style.transform = `translateX(-${this.transformValue}%)`;
  };

  onNext = () => {
    this.transformValue += 100;
    this.carouselSlide.current.style.transform = `translateX(-${this.transformValue}%)`;
  };

  render() {
    return (
      <div className="people">
        <div ref={this.carouselSlide} className="people-carousel-slide">
          {this.state.people.map((p) => (
            <React.Fragment>
              <div
                className="people-image"
                onClick={() => {
                  window.open(window.origin + "/person/" + p.id, "_self");
                }}
              >
                {p.profile_path !== null ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185/${p.profile_path}`}
                    alt="person image"
                  />
                ) : (
                  <img
                    className="empty-image"
                    src={require("../../../../src/assets/person.png")}
                    alt="empty person image"
                  />
                )}

                <PersonName personName={p.name} />
              </div>
            </React.Fragment>
          ))}
        </div>
        <PrevButton onPrev={this.onPrev} />
        <NextButton onNext={this.onNext} />
      </div>
    );
  }
}

export default People;
