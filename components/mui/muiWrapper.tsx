"use client";

import { ThemeOptions, createTheme } from "@mui/material/styles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { FC, PropsWithChildren, useMemo } from "react";
import { useTheme } from "next-themes";
import { PaletteMode, useMediaQuery } from "@mui/material";
import config from "@/tailwind.config";

const getDesignTokens = (mode: PaletteMode | undefined): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // primary: {
          //   main: config.theme?.extend?.colors
          //     ? "hsl()" ?? "#1976d2"
          //     : "#1976d2",
          // },
        }
      : {
          // primary: {
          //   main: "#90caf9",
          // },
        }),
  },
});

const MuiWrapper: FC<PropsWithChildren> = ({ children }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { theme } = useTheme();

  const muiTheme = useMemo(() => {
    const t = theme === "system" ? (prefersDarkMode ? "dark" : "light") : theme;
    return createTheme(getDesignTokens(t as PaletteMode));
  }, [theme, prefersDarkMode]);

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
};

export default MuiWrapper;
