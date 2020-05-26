import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/home/Home";
import Movie from "./components/pages/movie/Movie";
import Tv from "./components/pages/tv/Tv";
import Image from "./components/pages/globalPages/Image";
import Person from "./components/pages/person/Person";
import Discover from "./components/pages/discover/Discover";
import Movies_Tvs from "./components/pages/movies_tvs/Movies_Tvs";
import People from "./components/pages/people/People";
import About from "./components/pages/About";

const SearchBackground = (props) => {
  return <div className="search-background"></div>;
};

function App() {
  return (
    <div className="App">
      <SearchBackground />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/movie/:movieID" component={Movie} />
        <Route path="/tv/:tvID" component={Tv} />
        <Route path="/image/:imagePath" component={Image} />
        <Route path="/person/:personID" component={Person} />
        <Route path="/discover" component={Discover} />
        <Route path="/movies" render={() => <Movies_Tvs type="movie" />} />
        <Route path="/tvs" render={() => <Movies_Tvs type="tv" />} />
        <Route path="/people/:page" component={People} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
