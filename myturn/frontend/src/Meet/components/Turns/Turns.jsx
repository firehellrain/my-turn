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
        <TurnCard isLeft name="Suavemente" text="Suavemente, besame, que quiero sentir tus labios"/>

      </VStack>
    </VStack>
  );
};

export default Turns;
