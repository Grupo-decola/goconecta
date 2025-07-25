import { MantineProvider } from "@mantine/core";
import InfoPage from "./Pages/InfoPage/InfoPage";
import { theme } from "./theme";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "./App.css";

function App() {
  return (
    <MantineProvider theme={theme}>
      <InfoPage />
    </MantineProvider>
  );
}

export default App;
