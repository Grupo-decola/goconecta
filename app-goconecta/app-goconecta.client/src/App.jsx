import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <div className="router-container">
        <Router />
      </div>
      <Footer />
    </MantineProvider>
  );
}

export default App;
