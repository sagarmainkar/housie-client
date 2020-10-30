import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles.css";

import store from "./redux/store";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";

import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./utils/theme";

const theme = createMuiTheme(themeFile);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
          <App />
        </FirebaseContext.Provider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
