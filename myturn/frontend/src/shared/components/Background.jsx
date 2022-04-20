import { Box,useColorMode } from "@chakra-ui/react";
import { useLocation } from "react-router";

import Fondo from "../../assets/Fondo.svg";
import FondoDark from "../../assets/FondoDark.svg";

const Background = props => {

  const { colorMode } = useColorMode()
  const location = useLocation();

  return (
    <Box
      h="100vh"
      backgroundSize={"cover"}
      bgImage={!location.pathname.startsWith("/meet") && (colorMode == "light" ? Fondo : FondoDark)} 
      backgroundPosition="center center"
      backgroundAttachment={"fixed"}
      overflow="auto"

    >{props.children}</Box>
  );
};

export default Background;
