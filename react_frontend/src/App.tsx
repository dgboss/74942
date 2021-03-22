import React from "react";
import "./App.css";
import ContentContainer from "./Components/ContentContainer";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const appTheme = createMuiTheme({
    typography: {
        button: {
            textTransform: "none",
        },
    },
});

function App() {
  return (
    <MuiThemeProvider theme={appTheme}>
        <ContentContainer data-testid="app-content_container" />
    </MuiThemeProvider>
  );
}

export default App;
