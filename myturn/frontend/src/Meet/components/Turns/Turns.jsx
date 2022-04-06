import {
  Heading,
  HStack,
  VStack,
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import TurnCard from "./TurnCard";

const Turns = ({ title }) => {

  const textColor = useColorModeValue("black","white")

  return (
    <VStack w="100%" spacing="10" mt="10">
      <HStack w="100%" h="10px" pl="20" pr="20" spacing="10" textAlign={"center"}>
        <Box bgColor={textColor} h="2px" w="50%"/>
      <Heading whiteSpace={"nowrap"}>{title}</Heading>
        <Box bgColor={textColor} h="2px"  w="50%"/>
      </HStack>
      <VStack w="100%" overflowY="auto" overflowX={"hidden"} maxHeight={"75vh"} pb="50px">

        <Heading fontSize={"xl"}>Turno actual</Heading>
        <TurnCard isMain={true} name="Suavemente"/>

        <Box h="2px" borderColor={"black"} borderTopWidth="2px" pb="20" w="40%"/>

        <TurnCard name="Suavemente" />
        <TurnCard name="Suavemente" />
        <TurnCard name="Suavemente" />
        <TurnCard name="Suavemente" />
        <TurnCard name="Suavemente" />

      </VStack>
    </VStack>
  );
};

export default Turns;
