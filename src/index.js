import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import App from "./App";
import { MantineProvider, Button } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

function ThemeToggler() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      {colorScheme === 'light' ? (
        <Button leftSection={<IconMoon />} onClick={() => setColorScheme('dark')}>Dark</Button>
      ) : (
        <Button leftSection={<IconSun/>} onClick={() => setColorScheme('light')}>Light</Button>
      )}
    </div>
  );
}

function Root() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ThemeToggler />
      <App />
    </MantineProvider>
  );
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
