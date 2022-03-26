import React from "react";
import {
  Box,
  Center,
  Flex,
  Input,
  Text,
  Image,
  Heading,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import LogoBlanco from "../assets/LogoBlanco.png";

const Login = () => {
  const leftBg = useColorModeValue("secondary", "secondary_dark");

  return (
    <Center mt="10vh">
      <Flex
        w="50%"
        h="70vh"
        minH="400px"
        minW="700px"
        maxW="1000px"
        maxH="600px"
        bgColor={"cyan"}
        borderRadius="lg"
        boxShadow={
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;"
        }
      >
        <Box
          w="50%"
          h="100%"
          borderTopLeftRadius={"md"}
          borderBottomLeftRadius={"md"}
          bgColor={leftBg}
        >
          <VStack>
            <Heading color="white">Bienvenido a myTurn!</Heading>
            <Image w="30%" src={LogoBlanco} />
            <Text color="white" fontSize="xl">Hola esto es una prueba de fuentes</Text>
          </VStack>
        </Box>
        <Box
          w="50%"
          h="100%"
          borderTopRightRadius={"md"}
          borderBottomRightRadius={"md"}
          bgColor={"white"}
        >
          {/* <Input variant="flushed" placeholder="Flushed" /> */}
        </Box>
      </Flex>
    </Center>
  );
};

export default Login;
