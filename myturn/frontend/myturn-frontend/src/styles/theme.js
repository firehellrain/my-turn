import { extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const colors = {
    primary:"#00ACC9",
    
    secondary: "#16365B",
    secondary_dark:"#1B4066"
}

const fonts = {
    heading: "Malacitana",
    body: "Malacitana",
}

const theme = extendTheme({config,colors,fonts})

export default theme