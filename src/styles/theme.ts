import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "500": "#f12c4c",
          solidHoverBg: "#cc2843",
          solidActiveBg: "#b3243a",
        },
      },
    },
    dark: {
      palette: {},
    },
  },
});

export default theme;
