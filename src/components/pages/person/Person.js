import React from "react";
import style from "./person.module.css";
import axios from "axios";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Title from "../../globalComponents/Title";
import People from "../home/People";
import Copyright from "../../globalComponents/Copyright";

//Biography Component
const Biography = React.forwardRef((props, ref) => {
  const { details, onClickArrowDown } = props;
  return (
    <>
      <div ref={ref.biography} className={style.biography}>
        <div className={style["person-image"]}>
          <img
            ref={ref.image}
            src={`https://image.tmdb.org/t/p/original/${details.profile_path}`}
            alt="person image"
          />
        </div>
        <div className={style["biography-details"]}>
          <span className={style["person-name"]}>{details.name}</span>
          <div className={style["social-icons"]}>
            <FacebookIcon
              style={{ color: "#4267B2", marginRight: "0.2em" }}
              className={style["social-icon"]}
            />
            <InstagramIcon
              style={{ color: "#A136B5", marginRight: "0.2em" }}
              className={style["social-icon"]}
            />
            <TwitterIcon
              style={{ color: "#2CAAE1" }}
              className={style["social-icon"]}
            />
          </div>
          <span className={style["biography-title"]}>Biography</span>
          <span className={style["biography-text"]}>{details.biography}</span>
        </div>
      </div>
      <div ref={ref.arrowDown} className={style["biography-arrow-container"]}>
        <KeyboardArrowDownIcon
          className={style["biography-arrow-down"]}
          fontSize="large"
          onClick={onClickArrowDown}
        />
      </div>
    </>
  );
});

//Personal Details Component
const PersonalDetails = (props) => {
  const { details } = props;
  const loopNames = (names) => {
    let finalNames = "";
    for (let i = 0; i < names.length; i++) {
      finalNames += names[i];
      if (i < names.length - 1) finalNames += " | ";
    }
    return finalNames;
  };

  return (
    <div className={style["personal-details"]}>
      <div>
        Birthday: <span>{details.birthday}</span>
      </div>
      <div>
        Birth Place: <span>{details.place_of_birth}</span>
      </div>
      <div>
        Known for: <span>{details.known_for_department}</span>
      </div>
      <div>
        Alternate Names:{" "}
        {
          <span>
            {details.also_known_as && loopNames(details.also_known_as)}
          </span>
        }
      </div>
      <div>
        Homepage:{" "}
        <span>{details.homepage !== null ? details.homepage : "N/A"}</span>
      </div>
    </div>
  );
};

// Filmography Component
const Filmography = (props) => {
  return (
    <div className={style.filmography}>
      {props.cast &&
        props.cast.map((c) => (
          <div
            className={style.project}
            onClick={() => {
              window.open(window.origin + "/movie/" + c.id, "_self");
            }}
          >
            <span className={style["project-title"]}>{c.title}</span>
            <span className={style["project-date"]}>{c.release_date}</span>
            <span className={style["project-person-role"]}>{c.character}</span>
          </div>
        ))}
    </div>
  );
};

// Pictures Component
const Pictures = (props) => {
  const { pictures, onClickPicture } = props;
  return (
    <div className={style.pictures}>
      {pictures &&
        pictures.map(
          (p, i) =>
            i < 14 && (
              <img
                src={`https://image.tmdb.org/t/p/w185/${p.file_path}`}
                alt="person image"
                onClick={() => {
                  onClickPicture(p.file_path);
                }}
              />
            )
        )}
    </div>
  );
};

class Person extends React.Component {
  personID = () => {
    const { personID } = this.props.match.params;
    return personID;
  };

  state = {
    apiKey: "325d84ad33eb95a5c0fc5427ba3f569a",
    personID: this.personID(),
    personDetails: {},
    filmography: [],
    pictures: [],
    isBiographyOverflow: false,
  };

  isOverflow = false;
  onClickArrowDown = () => {
    if (this.isOverflow) {
      this.biography.current.style.maxHeight = "none";
      this.arrowDown.current.style.transform = "rotate(180deg)";
      this.arrowDown.current.style.transition = "transform 150ms";
      this.isOverflow = false;
    } else {
      this.biography.current.style.maxHeight =
        window.innerWidth > 800
          ? `${this.biographyImage.current.clientHeight}px`
          : `${this.biographyImage.current.clientHeight + 400}px`;
      this.arrowDown.current.style.transform = "rotate(0deg)";
      this.arrowDown.current.style.transition = "transform 150ms";
      this.isOverflow = true;
    }
  };

  manipulateDOM = async () => {
    //biography
    let imageHeight = this.biographyImage.current.clientHeight;
    let biographyHeight = this.biography.current.clientHeight;

    // overflow hidden if condition is true
    if (biographyHeight > imageHeight + 10) {
      this.biography.current.style.maxHeight =
        window.innerWidth > 800 ? `${imageHeight}px` : `${imageHeight + 400}px`;
      this.biography.current.style.overflow = "hidden";
      this.isOverflow = true;
    }

    if (this.isOverflow) this.arrowDown.current.style.visibility = "visible";
    else this.arrowDown.current.style.visibility = "hidden";
  };

  async componentDidMount() {
    const { apiKey, personID } = this.state;
    this.biography = React.createRef();
    this.biographyImage = React.createRef();
    this.arrowDown = React.createRef();

    //details
    await axios
      .get(
        `https://api.themoviedb.org/3/person/${personID}?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        this.setState(() => {
          return {
            personDetails: res.data,
          };
        });
      })
      .catch((err) => console.log(err));

    //movie credits
    await axios
      .get(
        `https://api.themoviedb.org/3/person/${personID}/movie_credits?api_key=${apiKey}&language=en-US`
      )
      .then((res) => {
        this.setState(() => {
          return {
            filmography: res.data,
          };
        });
      })
      .catch((err) => console.log(err));

    //pictures
    await axios
      .get(
        `https://api.themoviedb.org/3/person/${personID}/images?api_key=${apiKey}`
      )
      .then((res) => {
        this.setState(() => {
          return {
            pictures: [...res.data.profiles],
          };
        });
      })
      .catch((err) => console.log(err));

    this.manipulateDOM();
  }

  onClickPicture = (imagePath) => {
    window.open(window.origin + "/image" + imagePath, "_blank");
  };

  render() {
    return (
      <div className={style.person}>
        <Biography
          ref={{
            biography: this.biography,
            image: this.biographyImage,
            arrowDown: this.arrowDown,
          }}
          details={this.state.personDetails}
          onClickArrowDown={this.onClickArrowDown}
        />
        <Title titleName="Personal details" />
        <PersonalDetails details={this.state.personDetails} />
        <Title titleName="Filmography" />
        <Filmography cast={this.state.filmography.cast} />
        <Title titleName="Pictures" more={false} />
        <Pictures
          pictures={this.state.pictures}
          onClickPicture={this.onClickPicture}
        />
        <Title titleName="Trending People" />
        <People apiKey={this.state.apiKey} />
        <Copyright />
      </div>
    );
  }
}

export default Person;
