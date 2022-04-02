import {
  Heading,
  VStack,
  HStack,
  Avatar,
  Text,
  Spacer,
} from "@chakra-ui/react";
import React from "react";
import TurnCard from "./TurnCard";

const Turns = ({ title }) => {
  return (
    <VStack w="100%" spacing="10" mt="10">
      <Heading>{title}</Heading>
      <VStack w="100%">
        <TurnCard />

      {/* TODO: REMOVE AND REMOVE COMPONENTS IMPORTS */}
        <HStack w="50%" maxWidth={"800px"} h="70px">
          <Spacer />

          <Text>Ha pedido un turno</Text>
          <Avatar />
        </HStack>


      </VStack>
    </VStack>
  );
};

export default Turns;
