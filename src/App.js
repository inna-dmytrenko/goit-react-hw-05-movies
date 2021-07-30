import { Route, Switch } from "react-router-dom";
import Container from "./components/Container/Container";
import AppBar from "./components/AppBar/AppBar";
import HomePageView from "./views/HomePageView";
import MoviesPageView from "./views/MoviesPageView";
import MovieDetailsPageView from "./views/MovieDetailsPageView";
import NotFountMovie from "./views/NotFountMovie";

function App() {
  return (
    <Container>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <HomePageView />
        </Route>
        <Route path="/movie/:movieId">
          <MovieDetailsPageView />
        </Route>
        <Route path="/movie" exact>
          <MoviesPageView />
        </Route>
        {/* <Route>
          <NotFountMovie />
        </Route> */}
      </Switch>
    </Container>
  );
}

export default App;
