import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import App from "./App";
import { MantineProvider, Button, Group } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

function ThemeToggler() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group>
      <Button leftSection={<IconSun/>} onClick={() => setColorScheme('light')}>Light</Button>
      <Button leftSection={<IconMoon />} onClick={() => setColorScheme('dark')}>Dark</Button>
    </Group>
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
