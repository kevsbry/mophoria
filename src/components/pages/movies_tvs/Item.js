import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./movies_tvs.module.css";

export class Item extends Component {
  getYear = date => {
    let str = String(date);
    return str.substring(0, 4);
  };

  constructor(props) {
    super(props);
    this.item = React.createRef();
    this.poster = React.createRef();
  }

  componentDidMount() {
    this.item.current.style.maxHeight = `${this.poster.current.clientHeight}px`;
    this.item.current.style.overflowY = "scroll";
  }

  render() {
    const { type, item, itemNum } = this.props;

    return (
      <div ref={this.item} className={style.item}>
        <div className={style["poster-container"]}>
          <img
            ref={this.poster}
            src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
            alt="movie poster"
          />
        </div>
        <div className={style["item-info-container"]}>
          <Link
            to={type === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`}
            style={{ textDecoration: "none" }}
          >
            <span className={style["item-title"]}>
              <span style={{ fontWeight: "normal" }}>{itemNum + 1}.</span>{" "}
              {type === "movie" ? item.title : item.name} (
              {type === "movie"
                ? this.getYear(item.release_date)
                : this.getYear(item.first_air_date)}
              )
            </span>
          </Link>
          <span className={style["item-overview"]}>{item.overview}</span>
        </div>
      </div>
    );
  }
}

export default Item;
