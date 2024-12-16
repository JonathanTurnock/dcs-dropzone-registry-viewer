import { AppShell } from "@mantine/core";
import { AppHeader } from "./components/AppHeader.tsx";
import { HashRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/IndexPage.tsx";
import { ModPage } from "./pages/ModPage.tsx";

export function App() {
  return (
    <AppShell header={{ height: 66 }}>
      <HashRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/:id" element={<ModPage />} />
        </Routes>
      </HashRouter>
    </AppShell>
  );
}
