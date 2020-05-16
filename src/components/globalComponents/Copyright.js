import React, { Component } from "react";
import style from "./global.module.css";
import CopyrightIcon from "@material-ui/icons/Copyright";

export class Copyright extends Component {
  render() {
    return (
      <div className={style.copyright}>
        <span>Copyright</span>
        &nbsp;
        <CopyrightIcon className={style["cp-right-icon"]} fontSize="small" />
        &nbsp;
        <span>2020 mophoria.com All rights reserved</span>
      </div>
    );
  }
}

export default Copyright;
