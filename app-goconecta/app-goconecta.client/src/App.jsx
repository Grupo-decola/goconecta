import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { Router } from "./Router";
import { theme } from "./theme";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="bottom-center" />
      <Header />
      <AuthProvider>
        <Router />
      </AuthProvider>
      <Footer />
    </MantineProvider>
  );
}

export default App;
