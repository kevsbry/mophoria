import React, { Component } from "react";
import Copyright from "../globalComponents/Copyright";

export class About extends Component {
  render() {
    const style = {
      container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "75vh",
      },
      text: {
        color: "white",
        fontWeight: "bold",
        fontSize: "2rem",
        marginBottom: "4rem",
        width: "60%",
        textAlign: "center",
      },
      link: {
        textDecoration: "none",
        color: "#C74939",
        fontSize: "1.4rem",
      },
    };

    return (
      <>
        <div style={style.container}>
          <span style={style.text}>
            This the first react project I created a few months ago while being
            in quarantine, this is just for fun and practice purposes.
          </span>
          <a
            style={style.link}
            href="https://github.com/kevsbry/mophoria.git"
            target="_blank"
          >
            Github Repository
          </a>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Copyright />
        </div>
      </>
    );
  }
}

export default About;
