import React from "react";
import Featured from "./Featured";
import List from "../../globalComponents/List";
import People from "./People";
import Copyright from "../../globalComponents/Copyright";
import Title from "../../globalComponents/Title";

class Home extends React.Component {
  apiKey = "325d84ad33eb95a5c0fc5427ba3f569a";

  render() {
    return (
      <div className="home" style={{ zIndex: 2 }}>
        <Title titleName="Featured" />
        <Featured apiKey={this.apiKey} />

        <Title titleName="In theaters" />
        <List
          api={`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=en-US&region=us`}
          isMovie={true}
        />
        <Title titleName="People" />
        <People apiKey={this.apiKey} />
        <Title titleName="TV show" />
        <List
          api={`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&language=en-US&page=1`}
          isMovie={false}
        />
        <Copyright />
      </div>
    );
  }
}

export default Home;
