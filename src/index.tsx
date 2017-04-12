// import injectTapEventPlugin from "react-tap-event-plugin";
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

import * as React from "react";
import * as ReactDOM from "react-dom";

import injectTapEventPluginRequire = require("react-tap-event-plugin");
injectTapEventPluginRequire();

import { App } from "./components/App";

// theme
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {deepPurple500} from "material-ui/styles/colors";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple500,
  },
});

// redux
import {compose, createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import {reducer as formReducer} from "redux-form";
import persistState_ = require("redux-localstorage");
let persistState: any = persistState_;

interface AppStateProps {
  s: boolean;
}

const appState = (state: AppStateProps = {s: false}, action) => {
  switch (action.type) {
    case 'SUBMIT_SUCCESSFUL':
      return {s: action.successful};
    default:
      return state;
  }
}

const store = createStore(combineReducers({
  form: formReducer,
  a: appState,
}), compose(
  persistState(),
  (window as any).devToolsExtension ? (window as any).devToolsExtension() : f => f
));

// render
ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("app")
);
