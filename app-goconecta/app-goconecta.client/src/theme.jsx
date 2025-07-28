import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "primary-orange",
  defaultRadius: 6, // Based on your UI specs which use 6px radius for buttons and inputs
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, sans-serif",
  headingFamily: "Poppins, Inter, sans-serif",
  colors: {
    // Primary colors
    "primary-dark": [
      // Azul Escuro - Use for: Headers, navigation, primary buttons
      // Example: <AppShell header={{ background: 'primary-dark.6' }} />
      // Example: <Navbar bg="primary-dark.6" />
      "#E9EAEF", // lightest shade (0)
      "#D2D5E0",
      "#A6ABc2",
      "#7981A3",
      "#4D5785",
      "#323C66",
      "#182348", // original shade (6) - Main color for headers, navigation
      "#131C3A",
      "#0F152D",
      "#0A0E1F", // darkest shade (9)
    ],
    "primary-orange": [
      // Laranja - Use for: CTAs, action buttons, links
      // Example: <Button color="primary-orange">Submit</Button>
      // Example: <Anchor color="primary-orange.5">Learn more</Anchor>
      "#FBF1E7", // lightest shade (0)
      "#F6E3CE",
      "#EDC79D",
      "#E5AA6C",
      "#DC8C3B",
      "#DA7818", // original shade (5) - Main color for buttons, CTAs, links
      "#B46313",
      "#8F4F0F",
      "#6A3B0B",
      "#452708", // darkest shade (9)
    ],
    "background-soft": [
      // Laranja Apagado - Use for: Soft backgrounds, cards, sections
      // Example: <Card bg="background-soft.1">Content</Card>
      // Example: <Box bg="background-soft.0" p="md">Section content</Box>
      "#F7F2EE", // lightest shade (0) - Ideal for light section backgrounds
      "#EFE6DD",
      "#DFCDBB",
      "#D0B49A",
      "#C09C7C", // original shade (4) - Main color for cards, feature sections
      "#A47F5F",
      "#886A4F",
      "#6C543F",
      "#503E2F",
      "#342820", // darkest shade (9)
    ],

    // Neutral colors
    white: [
      // Use for: Main backgrounds, text on dark backgrounds
      // Example: <Paper bg="white.0">Content on white background</Paper>
      // Example: <Text color="white.0" bg="primary-dark.6">Light text on dark background</Text>
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
    ],
    "gray-light": [
      // Use for: Alternative backgrounds, separators
      // Example: <Divider color="gray-light.1" />
      // Example: <Box bg="gray-light.1" p="md">Secondary section</Box>
      "#FFFFFF", // lightest shade (0)
      "#F5F5F5", // original shade (1) - Main color for backgrounds, separators
      "#E0E0E0",
      "#CCCCCC",
      "#B8B8B8",
      "#A3A3A3",
      "#8F8F8F",
      "#7A7A7A",
      "#666666",
      "#525252", // darkest shade (9)
    ],
    "gray-medium": [
      // Use for: Secondary text, placeholders
      // Example: <Text color="gray-medium.4">Secondary information</Text>
      // Example: <TextInput placeholder="Type here" styles={{ input: { '::placeholder': { color: theme.colors['gray-medium'][4] } } }} />
      "#F0F0F0", // lightest shade (0)
      "#E1E1E1",
      "#C4C4C4",
      "#A7A7A7",
      "#8A8A8A", // original shade (4) - Main color for secondary text, placeholders
      "#707070",
      "#575757",
      "#3E3E3E",
      "#252525",
      "#0C0C0C", // darkest shade (9)
    ],
    "gray-dark": [
      // Use for: Main text content
      // Example: <Text color="gray-dark.4">Primary content text</Text>
      // Example: <Title color="gray-dark.4">Heading</Title>
      "#E6E6E6", // lightest shade (0)
      "#CCCCCC",
      "#999999",
      "#666666",
      "#333333", // original shade (4) - Main color for primary text
      "#2A2A2A",
      "#222222",
      "#1A1A1A",
      "#111111",
      "#080808", // darkest shade (9)
    ],

    // Status colors
    success: [
      // Use for: Confirmations, positive status indicators
      // Example: <Alert color="success">Operation successful!</Alert>
      // Example: <Badge color="success">Completed</Badge>
      "#E9F7EC", // lightest shade (0)
      "#D3EFD9",
      "#A7DFB3",
      "#7BCE8D",
      "#4FBD67",
      "#28A745", // original shade (5) - Main color for success messages
      "#218838",
      "#1A692C",
      "#134A1F",
      "#0D2B13", // darkest shade (9)
    ],
    error: [
      // Use for: Alerts, errors, cancellations
      // Example: <Alert color="error">An error occurred</Alert>
      // Example: <Button color="error">Cancel</Button>
      "#FBEAEC", // lightest shade (0)
      "#F7D5D9",
      "#EFA9B3",
      "#E87D8D",
      "#E05967",
      "#DC3545", // original shade (5) - Main color for errors, alerts
      "#B62C39",
      "#91222D",
      "#6D1A22",
      "#491216", // darkest shade (9)
    ],
    warning: [
      // Use for: Warnings, pending status
      // Example: <Alert color="warning">Your session will expire soon</Alert>
      // Example: <Badge color="warning">Pending</Badge>
      "#FFF8E6", // lightest shade (0)
      "#FFF2CC",
      "#FFE599",
      "#FFD866",
      "#FFCC33",
      "#FFC107", // original shade (5) - Main color for warnings, pending status
      "#D39E00",
      "#A67C00",
      "#7A5B00",
      "#4D3900", // darkest shade (9)
    ],
    info: [
      // Use for: Neutral information
      // Example: <Alert color="info">For your information</Alert>
      // Example: <Badge color="info">New</Badge>
      "#E6F5F7", // lightest shade (0)
      "#CCEBEF",
      "#99D7DF",
      "#66C3CF",
      "#33B0BF",
      "#17A2B8", // original shade (5) - Main color for information messages
      "#138496",
      "#0F6674",
      "#0B4853",
      "#072A31", // darkest shade (9)
    ],
  },
});
