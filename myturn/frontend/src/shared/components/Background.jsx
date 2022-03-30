import { Box } from "@chakra-ui/react";
import React from "react";

import Fondo from "../../assets/Fondo.svg";

const Background = props => {
  return (
    <Box
      h="100vh"
      backgroundSize={"cover"}
      bgImage={Fondo}
      backgroundPosition="center center"
      backgroundAttachment={"fixed"}
      overflow="auto"

    >{props.children}</Box>
  );
};

export default Background;
