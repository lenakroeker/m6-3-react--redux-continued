import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import ArtistRoute from "./ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

const DEFAULT_ARTIST_ID = "30uiS1n3uIGXJEYFR1GVDy";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(requestAccessToken());

    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((res) => {
        dispatch(receiveAccessToken(res.access_token));
      })
      .catch((err) => {
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route exact path="/artists/:id">
          <ArtistRoute />
        </Route>
        <Route exact path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
