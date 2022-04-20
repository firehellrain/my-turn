import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const colors = {
    primary:"#00ACC9",
    primary_hover:"#00A1B2",
    
    secondary: "#16365B",
    secondary_dark:"#1A2B3A",

    primaryGlass:"rgba(0,172,201,0.8)",

    footer:"#00ACC9"
}

const fonts = {
    heading: "Malacitana",
    body: "Malacitana",
}

const theme = extendTheme({config,colors,fonts})

export default theme