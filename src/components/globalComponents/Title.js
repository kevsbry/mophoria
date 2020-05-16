import React from "react";
import style from "./global.module.css";

function Title(props) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gridColumnStart: "2"
      }}
    >
      <div className={style["title-bar"]}></div>
      <label className={style["component-label"]}>{props.titleName}</label>
      {props.more === true && (
        <span className={style["view-all"]} onClick={props.onClickViewAll}>
          View All
        </span>
      )}
    </div>
  );
}

export default Title;
