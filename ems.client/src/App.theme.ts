import { createTheme } from "@mui/material/styles";

const primaryMain = "#1fb4fb";
const secondaryMain = "#9E9E9E";
const textSecondary = "#616161";
const textPrimary = "#000000";
const textInput = "#424242";

const projectTheme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
    },
    secondary: {
      main: secondaryMain,
    },
    text: {
      primary: textPrimary,
      secondary: textSecondary,
    },
  },
  spacing: 8,
  typography: {
    fontFamily: "Poppins,sans-serif",
    h1: {
      fontSize: 44,
      lineHeight: "50px",
      fontWeight: 400,
      "@media(max-width:1199px)": {
        fontSize: 36,
        lineHeight: "42px",
      },
      "@media(max-width:599px)": {
        fontSize: 30,
        lineHeight: "36px",
      },
    },
    h2: {
      fontSize: 24,
      lineHeight: "30px",
      fontWeight: 400,
      "@media(max-width:599px)": {
        fontSize: 20,
        lineHeight: "26px",
      },
    },
    h3: {
      fontSize: 20,
      lineHeight: "30px",
      fontWeight: 400,
      "@media(max-width:599px)": {
        fontSize: 18,
        lineHeight: "24px",
      },
    },
    h4: {
      fontSize: 18,
      lineHeight: "24px",
      fontWeight: 400,
      "@media(max-width:599px)": {
        fontSize: 16,
        lineHeight: "22px",
      },
    },
    h5: {
      fontSize: 16,
      lineHeight: "20px",
      fontWeight: 400,
      "@media(max-width:599px)": {
        fontSize: 14,
        lineHeight: "20px",
      },
    },
    h6: {
      fontSize: 14,
      lineHeight: "20px",
      fontWeight: 400,
    },
    body1: {
      fontSize: 16,
      lineHeight: "24px",
      "@media(max-width:599px)": {
        fontSize: 14,
        lineHeight: "20px",
      },
    },
    body2: {
      fontSize: 14,
      lineHeight: "20px",

      "@media(max-width:599px)": {
        fontSize: 12,
        lineHeight: "16px",
      },
    },
    subtitle1: {
      fontSize: 12,
      lineHeight: "18px",
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          display: "flex",
          fontSize: "16px",
          lineHeight: "20px",
        },
        input: {
          caretColor: primaryMain,
          color: textInput,
          "::placeholder": {
            color: secondaryMain,
            opacity: 1,
          },
        },
        adornedStart: {
          "& .MuiButtonBase-root.MuiIconButton-root": {
            padding: "18px 12px",
          },
        },
        adornedEnd: {
          "& .MuiButtonBase-root.MuiIconButton-root": {
            padding: "18px 12px",
            marginRight: 0,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          minHeight: "20px",
          "&.MuiInputBase-input.MuiOutlinedInput-input": {
            paddingRight: "40px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          lineHeight: "20px",
          color: secondaryMain,
          transform: "translate(12px, 16px)",

          "&.Mui-focused, &[data-shrink = true]": {
            transform: "translate(12px, -7px) scale(0.75);",
            backgroundColor: "#FFFFFF",
            padding: "0 1px",
          },
          "&.Mui-focused:not(.Mui-error)": {
            color: primaryMain,
          },
          "&.Mui-disabled": {
            color: secondaryMain,
            backgroundColor: "#FFFFFF",
          },
          "&.Mui-error": {
            color: "red",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          display: "flex",
          padding: "0",
          borderRadius: "6px",
          "& .MuiOutlinedInput-notchedOutline": {
            top: "-1px",
          },
          "& .MuiOutlinedInput-notchedOutline legend": {
            display: "none",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
          },
          "&.Mui-disabled": {
            color: textPrimary,
            background: "#F6F6F6",
          },
          "&:hover:not(.Mui-focused, .Mui-disabled, .Mui-error) .MuiOutlinedInput-notchedOutline":
            { borderColor: textSecondary },
        },

        input: {
          height: "20px",
          padding: "16px 12px",
          borderColor: "#BDBDBD",
          borderRadius: "6px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          "&.Mui-disabled": {
            "-webkit-text-fill-color": textPrimary,
          },
          "&.MuiInputBase-inputAdornedEnd": {
            paddingRight: "0",
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "24px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          transiton: "all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
          "& .MuiFormControlLabel-label": {
            color: "#424242",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "0 15px 0 0",
          zIndex: 1,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "36px",
          letterSpacing: "0.25px",
          textTransform: "capitalize",
        },
        sizeMedium: {
          padding: 0,
        },
        sizeLarge: {
          padding: "4px 16px",
        },
        textPrimary: {
          paddingTop: "4px",
          paddingBottom: "4px",
          "&.MuiButton-sizeSmall": {
            padding: "3px 16px",
          },
          "&.Mui-disabled": {
            color: "#9E9E9E",
          },
        },
        outlinedPrimary: {
          "&:hover": {
            boxShadow: "inset 0 0 0 50px #1fb4fb",
            color: "#FFFFFF",
          },
          "&.MuiButton-sizeMedium": {
            paddingTop: "3px",
            paddingBottom: "3px",
          },
          "&.MuiButton-sizeSmall": {
            padding: "3px 16px",
          },
          "&.Mui-disabled": {
            color: "#9E9E9E",
            border: "1px solid #9E9E9E",
          },
        },
        containedPrimary: {
          color: "#FFFFFF",
          boxShadow: "none",
          position: "relative",
          "&.MuiButton-sizeMedium": {
            padding: "4px 16px",
          },
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#1fb4fb",
          },
          "&:active": {
            transform: "scale(0.97)",
          },
          "&.Mui-disabled": {
            color: "#9E9E9E",
            backgroundColor: "#E0E0E0",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 12px 1px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: "10",
          "@media(max-width:599px)": {
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            zIndex: "10",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          justifyContent: "space-between",
          padding: "4.5px 24px",

          "@media(max-width:1199px)": {
            padding: "4.5px 20px",
          },
          "@media(max-width:599px)": {
            padding: "6px 16px",
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.12)",
          borderRadius: "4px",
          maxHeight: "300px !important",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: "13px 16px",
          "&:hover:not(.active), &:focus:not(.active)": {
            backgroundColor: "#FAFAFA",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 12px 1px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          borderRadius: "6px",
          "@media(max-width:1399px)": {
            padding: "20px",
          },
          "@media(max-width:1199px)": {
            padding: "20px 16px",
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          tableLayout: "fixed",
          "@media(max-width:1199px)": {
            tableLayout: "auto",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            padding: "13px 10px",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "17.5px",
            height: "44px",
            color: "#616161",
            backgroundColor: "#F5F5F5",
            borderBottom: "none",

            "@media(max-width:599px)": {
              fontSize: 14,
              lineHeight: "17.5px",
            },
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            padding: "17px 10px",
            fontWeight: "400",
            color: "#424242",
            minHeight: "56px",
            height: "56px",
            verticalAlign: "middle",
            borderTop: "1px solid #E9E9E9",
            borderBottomColor: "#E9E9E9",

            "@media(max-width:599px)": {
              fontSize: 14,
              lineHeight: "20px",
            },
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          lineHeight: "20px",
          fontWeight: 400,
          marginLeft: "4px",
          marginRight: "4px",
          "@media(max-width:1199px)": {
            marginLeft: "3px",
            marginRight: "3px",
          },
          "&.MuiButtonBase-root": {
            border: "1px solid #BDBDBD",
            height: "32px",
            width: "32px",
            "@media(max-width:599px)": {
              height: "28px",
              width: "28px",
              minWidth: "28px",
            },
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(130, 28, 107, 0.1)",
            borderColor: primaryMain,
            color: primaryMain,
            "&:hover": {
              backgroundColor: "rgba(130, 28, 107, 0.1)",
            },
          },
          "&:hover": {
            backgroundColor: "rgba(97, 97, 97, 0.1)",
          },
          "&.Mui-disabled": {
            opacity: "0.5",
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
          "@media(max-width:899px)": {
            marginLeft: "3px",
            marginRight: "3px",
          },
        },
      },
    },
  },
});

export default projectTheme;
