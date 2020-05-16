import React, { Component } from "react";
import style from "./discover.module.css";
import Title from "../../globalComponents/Title";
import List from "../../globalComponents/List";
import People from "../../pages/home/People";
import ItemList from "./ItemList";
import Copyright from "../../globalComponents/Copyright";

export class Discover extends Component {
  state = {
    apiKey: "325d84ad33eb95a5c0fc5427ba3f569a"
  };

  render() {
    const { apiKey } = this.state;

    return (
      <div className={style.discover}>
        <Title titleName="Popular movies" />
        <List
          api={`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`}
          isMovie={true}
        />
        <Title titleName="Popular tv shows" />
        <List
          api={`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`}
          isMovie={false}
        />
        <Title titleName="Trending People" />
        <People apiKey={apiKey} />
        <Title titleName="Movies" />
        <div className={style["movie-itemlist-container"]}>
          <ItemList
            apiURL={`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`}
            title="In theaters"
            type="movie"
          />
          <ItemList
            apiURL={`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`}
            title="Upcoming"
            type="movie"
          />
        </div>
        <Title titleName="Tv shows" />
        <div className={style["movie-itemlist-container"]}>
          <ItemList
            apiURL={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`}
            title="Airing"
            type="tv"
          />
          <ItemList
            apiURL={`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=en-US&page=11`}
            title="Top rated"
            type="tv"
          />
        </div>
        <Copyright />
      </div>
    );
  }
}

export default Discover;
