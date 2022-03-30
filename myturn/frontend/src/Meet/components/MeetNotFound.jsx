import React from "react";
import NotFound from "../../assets/NotFound.svg";
import { Center, Image,Heading, VStack,Button } from "@chakra-ui/react";

/* HOOKS */
import { useHistory } from "react-router-dom";

const MeetNotFound = () => {

    const history = useHistory();

  return (
    <Center mb="150px">
        <VStack textAlign={"center"} spacing="10">
      <Image src={NotFound} w="40%" minWidth="300px" mt="10vh"/>
      <Heading fontSize={["xl","2xl","4xl"]} maxWidth={"500px"}>Oops. ¡Parece que la reunión a la que estás intentando acceder no existe!</Heading>
      <Button fontSize="lg" colorScheme={"orange"} onClick={() => {history.push("/main")}}>Volver al menú principal</Button>
      </VStack>
    </Center>
  );
};

export default MeetNotFound;
