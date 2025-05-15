import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

export default function CustomThemeProvider({ children }) {
  const [mode, setMode] = React.useState("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: "all 0.3s linear",
              },
            },
          },
        },
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // Light mode colors
                primary: {
                  main: "#0D47A1",
                },
                secondary: {
                  main: "#1565C0",
                },
                background: {
                  default: "#f4f6f8",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#1a1a1a",
                  secondary: "#555",
                },
              }
            : {
                // Dark mode colors
                primary: { main: "#90caf9" },
                secondary: { main: "#64b5f6" },
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#b0b0b0",
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "*": {
              transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease",
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
