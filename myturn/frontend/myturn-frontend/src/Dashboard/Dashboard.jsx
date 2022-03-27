import { VStack, Heading,HStack,PinInput,PinInputField,Button, Input } from "@chakra-ui/react";
import React from "react";

import { AuthContext } from "../shared/context/auth-context";
import { useContext,useEffect } from "react";

const Dashboard = () => {

  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log(auth.isLoggedIn);
  }, [])
  

  return (
    <VStack>
      <Heading>Ingresa en una reunión</Heading>
      <HStack>
        <PinInput >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Button variant="outline">Entrar</Button>
      <Heading>Crea una nueva</Heading>
      <Input type="text" maxLength={20} w="200px"/>
      <Button variant="outline">Crear</Button>
      <Heading fontSize="3xl">ESTO ES TEMPORAL PARA IR VIENDO NO ES EL DISEÑO FINAL ^^</Heading>
    </VStack>
  );
};

export default Dashboard;
