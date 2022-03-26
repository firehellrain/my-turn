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
  Button,
  Divider,
  HStack,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import axios from "axios";

/* hooks */
import React, { useState } from "react";

/* assets */
import LogoBlanco from "../assets/LogoBlanco.png";

/* custom elements */

/* 
TODO: cambiar color de boton de inicio de sesión
TODO: poner slider con distinta info
TODO: poner fondo con algunos colores
TODO: ajustar boton de mostrar para modo oscuro
TODO: mejorar color rectangulo izq en modo oscuro
*/

const MotionImage = motion(Image);

const Login = () => {
  const leftBg = useColorModeValue("secondary", "secondary_dark");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  const handlePasswordUpdate = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameUpdate = (e) => {
    setUsername(e.target.value);
  };

  const validateUserInput = () => {
    if (!password || !username) {
      setError(
        "Debes introducir un nombre de usuario y contraseña para iniciar sesión"
      );
    } else if (!password && username) {
      setError("Debes introducir una contraseña para iniciar sesión");
    } else if (password && !username) {
      setError("Debes introducir un nombre de usuario para iniciar sesión");
    } else {
      axios.post("http://localhost:8000/backend/login", {
        username: username,
        password: password,
      })
      .then( response => {
          console.log(response);
      })
      .catch(err => {
          console.log(err);
      })
    }
  };

  return (
    <Center mt="10vh" mb="50px">
      <Flex
        w="50%"
        h="70vh"
        minH="600px"
        minW="800px"
        maxW="1000px"
        maxH="600px"
        bgColor={"cyan"}
        borderRadius="lg"
        boxShadow={
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;"
        }
      >
        {/* Left Box */}
        <VStack
          w="50%"
          h="100%"
          borderTopLeftRadius={"md"}
          borderBottomLeftRadius={"md"}
          bgColor={leftBg}
          spacing="20"
        >
          <VStack spacing="5">
            <Heading mt="20" color="white">
              MyTurn
            </Heading>
            <Text color="white" fontStyle={"italic"} fontSize={"xl"}>
              Moderación de Reuniones
            </Text>
          </VStack>
          <MotionImage
            w="30%"
            userSelect={"none"}
            src={LogoBlanco}
            animate={{ transform: "rotate(360deg)" }}
            transition={{ duration: 0.75 }}
          />
          <VStack w="100%" spacing="3">
            <Divider
              w="60%"
              borderWidth={"1px"}
              borderRadius="md"
              borderColor={"white"}
            />
            <Divider
              w="40%"
              borderWidth={"1px"}
              borderRadius="md"
              borderColor={"white"}
            />
          </VStack>
          <HStack>
            <Box
              w="3"
              h="3"
              cursor={"pointer"}
              borderRadius={"100%"}
              bgColor="whiteAlpha.700"
            />
            <Box
              w="3"
              h="3"
              cursor={"pointer"}
              borderRadius={"100%"}
              bgColor="white"
            />
            <Box
              w="3"
              h="3"
              cursor={"pointer"}
              borderRadius={"100%"}
              bgColor="whiteAlpha.700"
            />
          </HStack>
        </VStack>

        {/* Right box */}
        <VStack
          w="50%"
          h="100%"
          borderTopRightRadius={"md"}
          borderBottomRightRadius={"md"}
          bgColor={"white"}
          textAlign="left"
          spacing="10"
          justify={"left"}
        >
          <Heading mt="20" color="black" mb="10">
            Inicia sesión
          </Heading>
          <Box>
            <Text fontSize="xl" color="black" fontWeight={"bold"}>
              Usuario
            </Text>
            <Input
              variant="flushed"
              w="250px"
              fontSize="lg"
              color={leftBg}
              fontWeight={"700"}
              placeholder="Nombre de usuario"
              _placeholder={{ opacity: 1, color: "gray.400" }}
              focusBorderColor="primary"
              borderColor={"gray.300"}
              onChange={handleUsernameUpdate}
            />
          </Box>
          <Box>
            <Text fontSize="xl" color="black" fontWeight={"bold"}>
              Contraseña
            </Text>
            <HStack>
              <InputGroup>
                <Input
                  variant="flushed"
                  type={isPasswordVisible ? "text" : "password"}
                  w="250px"
                  fontSize="lg"
                  color={leftBg}
                  fontWeight={"700"}
                  placeholder="Introduce tu contraseña"
                  _placeholder={{ opacity: 1, color: "gray.400" }}
                  focusBorderColor="primary"
                  borderColor={"gray.300"}
                  onChange={handlePasswordUpdate}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVisible);
                    }}
                  >
                    {isPasswordVisible ? "Ocultar" : "Mostrar"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </HStack>
          </Box>
          <Button colorScheme={"facebook"} onClick={validateUserInput}>
            Iniciar Sesión
          </Button>{" "}
          {/* TODO: cambiar y ponerlo en otro lado más estetico */}
          {error && (
            <Box w="80%">
              <Text fontSize={"lg"} color="red.400">
                {error}
              </Text>
            </Box>
          )}
        </VStack>
      </Flex>
    </Center>
  );
};

export default Login;
