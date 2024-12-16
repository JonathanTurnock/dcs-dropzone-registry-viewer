import "@mantine/core/styles.css";
import "@fontsource/montserrat/600-italic.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider forceColorScheme={"dark"}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
