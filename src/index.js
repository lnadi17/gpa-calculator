import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {CssBaseline} from "@material-ui/core";
import {MuiThemeProvider} from "@material-ui/core/styles";
import darkTheme from "./CustomTheme";
// import App from "./DragAndDrop";

ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <App/>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'));