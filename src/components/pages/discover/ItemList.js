import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./discover.module.css";
import axios from "axios";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const Item = props => {
  const { type, itemID, title, vote, date } = props;

  return (
    <div className={style.item}>
      <div style={{ width: "100%" }}>
        <div className={style.title}>
          <Link
            to={`/${type}/${itemID}`}
            style={{ textDecoration: "none", color: "#c7493a" }}
          >
            <span>{title}</span>
          </Link>
        </div>
        <span className={style.vote}>{vote} / 10</span>
      </div>
      <span className={style.date}>{date}</span>
    </div>
  );
};

export class ItemList extends Component {
  onClickArrowDown = () => {
    if (this.state.maxItems === 10) {
      this.setState(() => {
        return {
          maxItems: 20
        };
      });
      this.arrowDown.current.style.transform = "rotate(180deg)";
      this.arrowDown.current.style.transition = "transform 200ms ease-in";
    } else if (this.state.maxItems === 20) {
      this.setState(() => {
        return {
          maxItems: 10
        };
      });
      this.arrowDown.current.style.transform = "rotate(0deg)";
      this.arrowDown.current.style.transition = "transform 200ms ease-in";
    }
  };

  state = {
    items: [],
    maxItems: 10
  };

  async componentDidMount() {
    const { apiURL } = this.props;
    this.arrowDown = React.createRef();

    await axios
      .get(apiURL)
      .then(res => {
        this.setState(() => {
          return { items: res.data.results };
        });
      })
      .catch(err => console.log(err));

    console.log(this.state.items);
  }

  render() {
    const { title, type } = this.props;
    return (
      <div className={style["item-list"]}>
        <span className={style["item-list-title"]}>{title}</span>
        {this.state.items &&
          this.state.items.map(
            (item, i) =>
              i < this.state.maxItems && (
                <Item
                  key={item.id}
                  type={type}
                  itemID={item.id}
                  title={type === "movie" ? item.title : item.name}
                  vote={item.vote_average}
                  date={
                    type === "movie" ? item.release_date : item.first_air_date
                  }
                />
              )
          )}
        <KeyboardArrowDownIcon
          ref={this.arrowDown}
          onClick={this.onClickArrowDown}
          className={style["arrow-down"]}
          fontSize="large"
        />
      </div>
    );
  }
}

export default ItemList;
