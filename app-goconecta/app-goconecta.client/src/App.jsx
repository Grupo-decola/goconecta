import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./App.css";
import InfoPage from "./Pages/InfoPage/InfoPage";

function App() {
  return (
    <MantineProvider>
      <InfoPage />
    </MantineProvider>
  );
}

export default App;
