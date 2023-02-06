import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import {CssBaseline} from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import darkTheme from "./CustomTheme";
// import App from "./DragAndDrop";

ReactDOM.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </StyledEngineProvider>
    </React.StrictMode>,
    document.getElementById('root'));