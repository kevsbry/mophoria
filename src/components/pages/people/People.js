import React, { Component } from "react";
import style from "./people.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Title from "../../globalComponents/Title";
import Copyright from "../../globalComponents/Copyright";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Person = props => {
  const { personID, picturePath, name, knownFor } = props;

  return (
    <div className={style.person}>
      <div className={style["picture-container"]}>
        <img
          src={`https://image.tmdb.org/t/p/w185${picturePath}`}
          alt="person photo"
        />
      </div>
      <div className={style["info-container"]}>
        <Link
          to={`/person/${personID}`}
          style={{ textDecoration: "none", color: "#C7493A" }}
        >
          <span className={style["person-name"]}>{name}</span>
        </Link>
        <span
          style={{ color: "#C7493A", display: "block", marginBottom: "0.3em" }}
        >
          Known for:
        </span>
        {knownFor.map((f, i) => (
          <span key={f.id} className={style["person-knownfor"]}>
            {f.media_type === "movie" ? f.title : f.name}{" "}
            {i < knownFor.length - 1 && <span>| </span>}
          </span>
        ))}
      </div>
    </div>
  );
};

const Pagination = props => {
  const { pages, currentPage } = props;

  return (
    <div className={style.pagination}>
      <div className={style["page-container"]}>
        {pages.map((p, i) => (
          <>
            {currentPage > 1 && i === 0 && (
              // prev button
              <Link
                to={`/people/${currentPage - 1}`}
                className={style["page-link"]}
                onClick={() => {
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }}
              >
                {"<"}
              </Link>
            )}
            {/* number pages  */}
            {currentPage < 500 && (
              <Link
                to={`/people/${p}`}
                className={
                  String(p) === String(currentPage)
                    ? style["page-link-active"]
                    : style["page-link"]
                }
                onClick={() => {
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }}
              >
                {p}
              </Link>
            )}

            {/* next button */}
            {currentPage < 500 && i === 7 && (
              <Link
                to={`/people/${parseInt(currentPage) + 1}`}
                className={style["page-link"]}
                onClick={() => {
                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }}
              >
                {">"}
              </Link>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export class People extends Component {
  state = {
    apiKey: "325d84ad33eb95a5c0fc5427ba3f569a",
    people: [],
    currentPage: "",
    pages: [1, 2, 3, 4, 5, 6, 7, 8]
  };

  async componentDidMount() {
    const { apiKey } = this.state;
    const { page } = this.props.match.params;
    let tempPages = [];

    //pagination logic when page > 4
    if (parseInt(page) > 4) {
      for (let i = 1; i < 5; i++) tempPages.unshift(parseInt(page) - i);
      for (let i = 0; i < 4; i++) tempPages.push(parseInt(page) + i);

      this.setState(() => {
        return {
          pages: [...tempPages]
        };
      });
    }

    console.log(tempPages);

    await axios
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`
      )
      .then(res => {
        this.setState(() => {
          return {
            people: [...res.data.results],
            currentPage: page
          };
        });
      })
      .catch(err => console.log(err));
    console.log(this.state.currentPage);
  }

  render() {
    const { people, pages, currentPage } = this.state;

    return (
      <div className={style.people}>
        <div style={{ marginTop: "4%", gridColumnStart: "2" }}></div>
        <Title titleName="Popular" />
        <Pagination pages={pages} currentPage={currentPage} />
        <div className={style["people-container"]}>
          {people.map(p => (
            <Person
              key={p.id}
              personID={p.id}
              picturePath={p.profile_path}
              name={p.name}
              knownFor={p.known_for}
            />
          ))}
        </div>
        <Pagination pages={pages} currentPage={currentPage} />
        <Copyright />
      </div>
    );
  }
}

export default People;
