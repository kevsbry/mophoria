import React from "react";
import style from "./movies_tvs.module.css";
import axios from "axios";
import Title from "../../globalComponents/Title";
import Item from "./Item";
import Filter from "./Filter";
import Copyright from "../../globalComponents/Copyright";

class Movies_Tvs extends React.Component {
  state = {
    apiKey: "325d84ad33eb95a5c0fc5427ba3f569a",
    items: [],
    itemsCopy: [],
    initialItemsValue: [],
    currentTitle: "Popular",
    selectedGenreID: "All",
    selectedYear: "All",
    type: this.props.type,
  };

  async componentDidMount() {
    const { type, apiKey } = this.state;
    //initial items
    await axios
      .get(
        `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}&language=en-US&page=1`
      )
      .then((res) => {
        this.setState(() => {
          return {
            items: res.data.results,
            itemsCopy: res.data.results,
            initialItemsValue: res.data.results,
          };
        });
      })
      .catch((err) => console.log(err));
  }

  getYear = (date) => {
    let str = String(date);
    return str.substring(0, 4);
  };

  // SEARCH AND FILTER ONSEARCH
  onSearch = async (e) => {
    //change items on search
    if (e.target.value === "") {
      this.setState(() => {
        return {
          items: [...this.state.initialItemsValue],
          currentTitle: "Popular",
        };
      });
    } else {
      await axios
        .get(
          `https://api.themoviedb.org/3/search/${this.state.type}?api_key=${this.state.apiKey}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
        )
        .then((res) => {
          this.setState(() => {
            return {
              items:
                this.state.selectedYear === "All"
                  ? res.data.results
                  : res.data.results.filter(
                      (d) =>
                        this.getYear(d.release_date) === this.state.selectedYear
                    ),
              currentTitle: "Search Result",
            };
          });
        })
        .catch((err) => console.log(err));

      //set itemsCopy after items is set to new values
      this.setState(() => {
        return {
          itemsCopy: [...this.state.items],
        };
      });

      //filter search result based on selected genre
      this.onChangeGenre(this.state.selectedGenreID);
    }
  };

  //FILTERS !
  onChangeGenre = (genre) => {
    if (genre !== this.state.selectedGenreID) {
      this.setState(() => {
        return {
          selectedGenreID: genre,
        };
      });
    }

    const { items } = this.state;
    let newItems = [];

    if (String(genre) !== "All") {
      for (let i = 0; i < items.length; i++) {
        for (
          let genre_id = 0;
          genre_id < items[i].genre_ids.length;
          genre_id++
        ) {
          if (items[i].genre_ids[genre_id] === parseInt(genre)) {
            newItems.push(items[i]);
          }
        }
      }
      this.setState(() => {
        return {
          items: [...newItems],
        };
      });
    } else {
      this.setState(() => {
        return {
          items: [...this.state.itemsCopy],
        };
      });
    }
  };

  onChangeYear = (year) => {
    if (year !== this.state.selectedYear) {
      this.setState(() => {
        return {
          selectedYear: year,
        };
      });
    }

    if (year !== "All") {
      this.setState(() => {
        return {
          items: this.state.items.filter(
            (item) => this.getYear(item.release_date) === year
          ),
        };
      });
    } else {
      this.setState(() => {
        return {
          items: this.state.itemsCopy,
        };
      });
    }
  };

  render() {
    const { currentTitle, items, type } = this.state;

    return (
      <div className={style.movies}>
        <Filter
          apiKey={this.state.apiKey}
          onSearch={this.onSearch}
          onChangeGenre={this.onChangeGenre}
          onChangeYear={this.onChangeYear}
        />
        <Title titleName={currentTitle} />
        <div className={style["items-container"]}>
          {items.map((item, i) => (
            <Item key={item.id} item={item} type={type} itemNum={i} />
          ))}
        </div>

        <Copyright />
      </div>
    );
  }
}

export default Movies_Tvs;
