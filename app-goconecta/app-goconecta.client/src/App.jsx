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
import { AuthProvider } from "./Context/AuthContext.jsx";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-center" />
      <AuthProvider>
        <Header />
        <Router />
        <Footer />
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
