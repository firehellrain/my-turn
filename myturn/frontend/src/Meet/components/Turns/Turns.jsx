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
      <VStack w="100%" overflowY="auto" maxHeight={"75vh"} pb="50px">
        <TurnCard isLeft name="Suavemente" text="Suavemente, besame, que quiero sentir tus labios"/>
        <TurnCard name="Jose Ramirez" text="Ha solicitado un turno"/>
        <TurnCard isLeft name="Jose Ramirez" text="Ha solicitado un turno"/>
        <TurnCard name="Jose Ramirez" text="Ha solicitado un turno"/>
        <TurnCard isLeft name="Jose Ramirez" text="Ha solicitado un turno"/>
        <TurnCard name="Jose Ramirez" text="Ha solicitado un turno"/>


      </VStack>
    </VStack>
  );
};

export default Turns;
