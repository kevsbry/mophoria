import React, { Component, useState, useRef } from "react";
import style from "./movies_tvs.module.css";
import axios from "axios";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const Select = React.forwardRef((props, ref) => {
  const { placeholder, type } = props;
  return (
    <select
      onChange={(e) => {
        props.onChangeGenre(e.target.value);
      }}
      ref={ref}
      className={style["select"]}
    >
      <option value="All" disabled selected>
        {placeholder}
      </option>
      <option value="All">All</option>

      {type === "genre"
        ? props.options.map((op) => (
            <option key={op.id} value={op.id}>
              {op.name}
            </option>
          ))
        : props.options.map((op, i) => (
            <option key={i} value={op}>
              {op}
            </option>
          ))}
    </select>
  );
});

const InputSelect = (props) => {
  const { type, options, placeholder, onChange } = props;
  const [selectedOption, setSelectedOption] = useState("");

  const input = useRef();
  const optionContainer = useRef();
  const option = useRef();

  const onChangeInput = (e) => {
    setSelectedOption(e.target.value);
  };

  const onClickInput = () => {
    optionContainer.current.style.display = "block";
  };

  const onClickOption = (e) => {
    let textContent = e.target.textContent;
    onChange(e.target.getAttribute("value"));

    optionContainer.current.style.display = "none";
    input.current.value = textContent;
  };

  const capitalize = (word) => {
    let capitalized =
      String(word).charAt(0).toUpperCase() + String(word).slice(1);
    return capitalized;
  };

  return (
    <div className={style["input-select"]}>
      <input
        ref={input}
        placeholder={placeholder}
        // className={style.select}
        onClick={onClickInput}
        onChange={onChangeInput}
      />
      <ArrowDropDownIcon className={style["arrow-down"]} fontSize="large" />
      <div>
        <div ref={optionContainer} className={style["input-select-options"]}>
          {options
            .filter((op) =>
              type === "genre"
                ? String(op.name).includes(capitalize(selectedOption))
                : op.includes(selectedOption)
            )
            .map((op, i) =>
              type === "genre" ? (
                <span value={op.id} ref={option} onClick={onClickOption}>
                  {op.name}
                </span>
              ) : (
                <span value={op} ref={option} onClick={(e) => onClickOption(e)}>
                  {op}
                </span>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export class Filter extends Component {
  constructor(props) {
    super(props);
    let date = new Date();
    let currentYear = date.getFullYear();
    let years = ["All"];

    for (let i = 0; i < 10; i++) {
      years.push(String(currentYear - i));
    }

    this.state = {
      years: [...years],
      genres: ["All"],
      sortBy: ["Latest", "Oldest"],
    };

    this.genre = React.createRef();
    this.selectContainer = React.createRef();
  }

  async componentDidMount() {
    const { apiKey } = this.props;

    await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      )
      .then((res) =>
        this.setState(() => {
          return {
            genres: [...res.data.genres],
          };
        })
      )
      .catch((err) => console.log(err));
  }

  render() {
    const { onChangeGenre, onChangeYear } = this.props;

    return (
      <div className={style.filter}>
        <div ref={this.inputContainer} className={style["input-container"]}>
          <input
            onChange={(e) => this.props.onSearch(e)}
            type="text"
            placeholder="Keyword"
          />
        </div>
        <div ref={this.selectContainer} className={style["select-container"]}>
          <InputSelect
            type="year"
            options={this.state.years}
            placeholder="Year"
            onChange={onChangeYear}
          />

          <InputSelect
            ref={this.genre}
            onChange={onChangeGenre}
            placeholder="Genre"
            type="genre"
            options={this.state.genres}
          />

          {/* <Select
            placeholder="Sort by"
            type="sort"
            options={this.state.sortBy}
          /> */}
        </div>
      </div>
    );
  }
}

export default Filter;
