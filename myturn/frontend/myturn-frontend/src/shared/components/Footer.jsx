import React from "react";
import { Box, Center, Text,useColorModeValue } from "@chakra-ui/react";
/* import FooterSvg from '../../assets/Footer.svg'; */

const Footer = () => {

  const color = useColorModeValue("secondary", "secondary_dark");

  return (
    <Box position="fixed" bottom={0} h="50px" w="100%" bgColor={color} color="whiteAlpha.800">
      <Center>
        <Text mt="15px">© 2022 CEETSII</Text>
      </Center>
    </Box>
  );
};

export default Footer;
