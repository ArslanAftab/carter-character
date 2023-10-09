import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
        <App />
    </MantineProvider>
  </React.StrictMode>
);
