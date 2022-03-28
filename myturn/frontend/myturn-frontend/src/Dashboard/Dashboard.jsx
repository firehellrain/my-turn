import {
  VStack,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Button,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

import { AuthContext } from "../shared/context/auth-context";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  return (
    <VStack spacing="10" mt={["5vh","10vh"]}>
      <VStack
        spacing="5"
        textAlign={"center"}
        w="300px"
        h="auto"
        borderRadius={"md"}
        bgColor={"primary"}
        p="20px"
        
        boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
      >
        <Heading fontSize="2xl">Ingresa en una reunión</Heading>
        <HStack>
          <PinInput size="sm" >
            <PinInputField
              borderWidth={"0 0 3px 0"}
              borderRadius="0"
              fontSize="xl"
              fontWeight={"600"}
              _focus={{ borderWidth: "0 0 3px 0" }}
            />
            <PinInputField
              borderWidth={"0 0 3px 0"}
              borderRadius="0"
              fontSize="xl"
              fontWeight={"600"}
              _focus={{ borderWidth: "0 0 3px 0" }}
            />
            <PinInputField
              borderWidth={"0 0 3px 0"}
              borderRadius="0"
              fontSize="xl"
              fontWeight={"600"}
              _focus={{ borderWidth: "0 0 3px 0" }}
            />
            <PinInputField
              borderWidth={"0 0 3px 0"}
              borderRadius="0"
              fontSize="xl"
              fontWeight={"600"}
              _focus={{ borderWidth: "0 0 3px 0" }}
            />
          </PinInput>
        </HStack>
        <Button onClick={() => history.push("/meet/2343")}>Entrar</Button>
      </VStack>

      <VStack
        spacing="5"
        textAlign={"center"}
        w="300px"
        h="auto"
        borderRadius={"md"}
        bgColor={"secondary"}
        p="20px"
        mt="10"
        color="white"
        boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
      >
        <Heading>Crea una nueva</Heading>
        <Input color="white" type="text" maxLength={20} w="200px" />
        <Button colorScheme={"purple"}>Crear</Button>
      </VStack>
      <Heading fontSize="3xl">
        ESTO ES TEMPORAL PARA IR VIENDO NO ES EL DISEÑO FINAL ^^
      </Heading>
    </VStack>
  );
};

export default Dashboard;
