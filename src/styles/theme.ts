import { extendTheme } from "@mui/joy/styles";

const theme = extendTheme({
  fontFamily: {
    body: "Sora",
    fallback: "sans-serif",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "500": "#f12c4c",
          solidHoverBg: "#cc2843",
          solidActiveBg: "#b3243a",
          solidDisabledBg: "#333",
          solidDisabledColor: "#666666",
          softColor: "#f12c4c",
        },
        background: {
          surface: "#0f1923",
          backdrop: "rgba(12,21,29,.78)",
        },
        text: {
          primary: "#797b95",
        },
        neutral: {
          outlinedColor: "#bcbfc2",
          plainHoverBg: "#797b95",
        },
      },
    },
    dark: {
      palette: {},
    },
  },
  components: {
    JoyButton: {
      defaultProps: {
        size: "lg",
      },
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    },
    JoyFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "10px",
          fontWeight: "bold",
        },
      },
    },
    JoyInput: {
      defaultProps: {
        size: "lg",
      },
      styleOverrides: {
        root: {
          color: "#ffffff",

          ":hover": {
            color: "#ffffff",
          },
        },
        input: {
          "::placeholder": {
            color: "#fff",
          },
        },
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: "none",
          border: "none",
          backgroundColor: "#1a242d",
          padding: "32px 24px",
          [theme.breakpoints.down("md")]: {
            width: "100%",
          },
        }),
      },
    },
    JoySelect: {
      styleOverrides: {
        root: {
          minHeight: "3rem",
        },
      },
    },
  },
});

export default theme;
