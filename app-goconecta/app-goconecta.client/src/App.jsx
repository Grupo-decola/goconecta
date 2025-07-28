import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './App.css';
import Packages from './Pages/Packages';

export default function App() {
  return (
    <MantineProvider>
      <Packages />
    </MantineProvider>
  );
}