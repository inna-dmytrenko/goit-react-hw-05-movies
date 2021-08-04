import { Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';

import Spinner from './views/Loader';

const HomePageView = lazy(() =>
  import('./views/HomePageView.js' /* webpackChunkName: "home-view" */),
);
const MoviesPageView = lazy(() =>
  import(
    './views/MoviesPageView.js' /* webpackChunkName: "movies-search-view" */
  ),
);
const MovieDetailsPageView = lazy(() =>
  import(
    './views/MovieDetailsPageView.js' /* webpackChunkName: "movie-view" */
  ),
);
const NotFountMovie = lazy(() =>
  import('./views/NotFountMovie.js' /* webpackChunkName: "404-view" */),
);

function App() {
  return (
    <Container>
      <Suspense fallback={<Spinner />}>
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
          <Route>
            <NotFountMovie />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
