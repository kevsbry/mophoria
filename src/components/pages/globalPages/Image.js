import React from "react";

class Image extends React.Component {
  style = {
    flex: {
      display: "flex",
      justifyContent: "center"
    },
    image: {
      width: "auto",
      height: "auto"
    }
  };

  render() {
    const { imagePath } = this.props.match.params;
    return (
      <div style={this.style.flex}>
        <img
          style={this.style.image}
          src={`https://image.tmdb.org/t/p/original/${imagePath}`}
          alt=""
        />
      </div>
    );
  }
}

export default Image;
