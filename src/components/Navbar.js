import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const getYear = (str) => {
  let string = String(str);
  return string.substring(0, 4);
};

const ItemDescription = (props) => {
  switch (props.item.media_type) {
    case "movie":
      return (
        <React.Fragment>
          <span>{props.item.title}</span>
          <span>{`${getYear(props.item.release_date)} ${
            props.item.media_type
          }`}</span>
        </React.Fragment>
      );
    case "tv":
      return (
        <React.Fragment>
          <span>{props.item.name}</span>
          <span>{`${getYear(props.item.first_air_date)} ${
            props.item.media_type
          } show`}</span>
        </React.Fragment>
      );
    case "person":
      return (
        <React.Fragment>
          <span>{props.item.name}</span>
          <span>{props.item.media_type}</span>
        </React.Fragment>
      );
  }
};

const onMediaClick = (id, mediaType) => {
  if (mediaType === "movie")
    window.location.href = window.origin + "/movie/" + id;
  else if (mediaType === "tv")
    window.location.href = window.origin + "/tv/" + id;
  else if (mediaType === "person")
    window.location.href = window.origin + "/person/" + id;
};

const Search = (props) => {
  return (
    <div className="search-container">
      <input
        type="text"
        onChange={props.onSearch}
        placeholder="Search mophoria.com"
      />
      <CloseIcon className="closeSearchBtn" onClick={props.triggerSearchBar} />
      <div className="results">
        {props.SearchedItems !== null &&
          props.SearchedItems.map(
            (item, i) =>
              i < 7 && (
                <div
                  className="item"
                  key={i}
                  onClick={() => {
                    onMediaClick(item.id, item.media_type);
                  }}
                >
                  {item.media_type === "movie" || item.media_type === "tv" ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                      alt="item poster"
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w185${item.profile_path}`}
                      alt="item poster"
                    />
                  )}

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <ItemDescription item={item} />
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.navbarMenuRef = React.createRef();
    this.linkContainerRef = React.createRef();

    this.state = {
      Nav: [
        {
          name: "Discover",
          link: "/discover",
        },
        {
          name: "Movies",
          link: "/movies",
        },
        {
          name: "TV shows",
          link: "/tvs",
        },
        {
          name: "People",
          link: "/people/1",
        },
        {
          name: "About",
          link: "/about",
        },
      ],
      SearchedItems: null,
    };
  }

  onMenuClick = () => {
    let navbar = document.querySelector(".navbar");
    let linkContainer = document.querySelector(".link-container");

    navbar.classList.toggle("navbar-active");
    linkContainer.classList.toggle("link-container-active");
  };

  apiKey = "325d84ad33eb95a5c0fc5427ba3f569a";
  onSearch = (e) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
      )
      .then((res) => {
        this.setState(() => {
          return {
            SearchedItems: [...res.data.results],
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });

    if (e.target.value === "") {
      this.setState({
        SearchedItems: [],
      });
    }
  };

  triggerSearchBar = () => {
    const searchBar = document.querySelector(".search-container");
    const navBar = document.querySelector(".navbar");
    const searchBackground = document.querySelector(".search-background");
    navBar.classList.toggle("navbar-hide");
    searchBar.classList.toggle("search-container-active");
    searchBackground.classList.toggle("search-background-active");
    const input = document.querySelectorAll(".search-container input");
    input.forEach((element) => {
      element.focus();
    });
  };

  componentDidMount() {
    //hide search
    const searchBackground = document.querySelector(".search-background");
    searchBackground.addEventListener("click", () => {
      this.triggerSearchBar();
    });
  }

  onClickLink = () => {
    this.navbarMenuRef.current.classList.toggle("navbar-active");
    this.linkContainerRef.current.classList.toggle("link-container-active");
  };

  render() {
    return (
      <div className="navbar-container">
        <div ref={this.navbarMenuRef} className="navbar" style={{ zIndex: 1 }}>
          <Search
            onSearch={this.onSearch}
            SearchedItems={this.state.SearchedItems}
            triggerSearchBar={this.triggerSearchBar}
          />

          <span className="logo">
            <Link
              to="/mophoria"
              style={{ textDecoration: "none", color: "#C7493A" }}
            >
              Mophoria{" "}
            </Link>
          </span>

          <div
            ref={this.linkContainerRef}
            className="link-container"
            onClick={this.onClickLink}
          >
            {this.state.Nav.map((nav, i) => (
              <Link key={i} className="link" to={nav.link}>
                {nav.name}
              </Link>
            ))}
          </div>

          <div className="search-button">
            <SearchIcon
              className="search"
              fontSize="default"
              onClick={this.triggerSearchBar}
            />
          </div>

          <div
            ref={this.menuIconRef}
            className="menu-button"
            onClick={this.onMenuClick}
          >
            <MenuIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
