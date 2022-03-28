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

const Dashboard = () => {
  const auth = useContext(AuthContext);

  
  return (
    <VStack>
      <VStack
        spacing="5"
        textAlign={"center"}
        w="300px"
        h="auto"
        borderRadius={"md"}
        bgColor={"primary"}
        p="20px"
        mt="10"
        boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;"
      >
        <Heading fontSize="2xl">Ingresa en una reunión</Heading>
        <HStack>
          <PinInput size="sm">
            <PinInputField borderWidth={"0 0 3px 0"} borderRadius="0" _focus={{"borderWidth":"0 0 3px 0"}}/>
            <PinInputField borderWidth={"0 0 3px 0"} borderRadius="0" _focus={{"borderWidth":"0 0 3px 0"}}/>
            <PinInputField borderWidth={"0 0 3px 0"} borderRadius="0" _focus={{"borderWidth":"0 0 3px 0"}}/>
            <PinInputField borderWidth={"0 0 3px 0"} borderRadius="0" _focus={{"borderWidth":"0 0 3px 0"}}/>
          </PinInput>
        </HStack>
        <Button >Entrar</Button>
      </VStack>
      <Heading>Crea una nueva</Heading>
      <Input type="text" maxLength={20} w="200px" />
      <Button variant="outline">Crear</Button>
      <Heading fontSize="3xl">
        ESTO ES TEMPORAL PARA IR VIENDO NO ES EL DISEÑO FINAL ^^
      </Heading>
    </VStack>
  );
};

export default Dashboard;
