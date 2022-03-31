import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router";

import Fondo from "../../assets/Fondo.svg";

const Background = props => {

  const location = useLocation();

  return (
    <Box
      h="100vh"
      backgroundSize={"cover"}
      bgImage={!location.pathname.startsWith("/meet") && Fondo} 
      backgroundPosition="center center"
      backgroundAttachment={"fixed"}
      overflow="auto"

    >{props.children}</Box>
  );
};

export default Background;
