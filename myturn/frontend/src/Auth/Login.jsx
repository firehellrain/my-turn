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
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

/* hooks */
import React, { useState, useContext,useEffect } from "react";
/* import { useNavigate } from "react-router"; */
import { useHistory } from "react-router-dom";

/* assets */
/* TODO: buscar logos buenos */
import LogoBlanco from "../assets/LogoBlanco.png";
import LogoUMA from "../assets/Logo_UMA.png";
import LogoInformatica from "../assets/LogoInformatica.png"

/* custom elements */
import { AuthContext } from "../shared/context/auth-context";

/* 
TODO: cambiar color de boton de inicio de sesión
TODO: poner slider con distinta info
*/
const MotionBox = motion(Box);
const MotionImage = motion(Image);

const Login = () => {
  const auth = useContext(AuthContext);

  /*  const navigate = useNavigate(); */
  const history = useHistory();

  const leftBg = useColorModeValue("secondary", "secondary_dark");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
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
      setIsLoading(true); //Start loading untill response
      axios
        .post("http://localhost:8000/backend/api-token-auth/", {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response);
          setIsLoading(false);
          auth.login(response.data.token);
          
          history.push("main");
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response) setError(err.response.statusText);
        });
    }
  };

  /* CARROUSEL */
  const [slide, setSlide] = useState(1)
  const variants = {
    active: { scale:1.2 },
    inactive: { scale:1 },
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSlide(slide + 1);
      if(slide == 3) setSlide(1);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [slide]);

  return (
    <Center
      mt={["10vh", "5vh"]}
      mb="50px"

    >
      <Flex
        w="50%"
        h="70vh"
        minH="550px"
        minW="800px"
        maxW="1000px"
        bgColor={"cyan"}
        borderRadius="lg"
        boxShadow={
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;"
        }
        mb="50px"
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
            src={slide == 1 ? LogoBlanco : LogoUMA}
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
            <HStack pt="10">
              <MotionBox
                w="3"
                h="3"
                cursor={"pointer"}
                borderRadius={"100%"}
                bgColor={slide == 1 ? "white" : "whiteAlpha.700"}
                onClick={() => setSlide(1)}
                variants={variants}
                animate={slide == 1 ? "active" : "inactive"}
              />
              <MotionBox
                w="3"
                h="3"
                cursor={"pointer"}
                borderRadius={"100%"}
                bgColor={slide == 2 ? "white" : "whiteAlpha.700"}
                onClick={() => setSlide(2)}
                variants={variants}
                animate={slide == 2 ? "active" : "inactive"}
              />
              <MotionBox
                w="3"
                h="3"
                cursor={"pointer"}
                borderRadius={"100%"}
                bgColor={slide == 3 ? "white" : "whiteAlpha.700"}
                onClick={() => setSlide(3)}
                variants={variants}
                animate={slide == 3 ? "active" : "inactive"}
              />
            </HStack>
          </VStack>
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
                  maxLength={30}
                  _placeholder={{ opacity: 1, color: "gray.400" }}
                  focusBorderColor="primary"
                  borderColor={"gray.300"}
                  onChange={handlePasswordUpdate}
                />
                <InputRightElement width="4.5rem">
                  <IconButton
                    h="1.75rem"
                    size="sm"
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVisible);
                    }}
                    icon={isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    color="black"
                    bgColor={"gray.100"}
                    _hover={{ bgColor: "gray.200" }}
                  />
                </InputRightElement>
              </InputGroup>
            </HStack>
          </Box>
          <Button
            bgColor={"primary"}
            isLoading={loading}
            _hover={{ bgColor: "primary_hover" }}
            color="white"
            onClick={validateUserInput}
          >
            Iniciar Sesión
          </Button>{" "}
          {/* TODO: animación */}
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
