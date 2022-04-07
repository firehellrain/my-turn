import {
  Heading,
  HStack,
  VStack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import TurnCard from "./TurnCard";

const Turns = ({ title, turns, ws }) => {
  const textColor = useColorModeValue("black", "white");

  return (
    <VStack w="100%" spacing="10" mt="10">
      <HStack
        w="100%"
        h="10px"
        pl="20"
        pr="20"
        spacing="10"
        textAlign={"center"}
      >
        <Box bgColor={textColor} h="2px" w="50%" />
        <Heading whiteSpace={"nowrap"}>{title}</Heading>
        <Box bgColor={textColor} h="2px" w="50%" />
      </HStack>
      <VStack
        w="100%"
        overflowY="auto"
        overflowX={"hidden"}
        maxHeight={"75vh"}
        pb="50px"
      >
        <Heading fontSize={"xl"}>Turno actual</Heading>
        {(turns && turns.length > 0) && (
          <TurnCard
            isMain={true}
            key={turns[0].id}
            name={turns[0].turn_type}
            turn_type={turns[0].turn_type}
            turn_id={turns[0].id}
            ws={ws}
          />
        )}

        <Box
          h="2px"
          borderColor={"black"}
          borderTopWidth="2px"
          pb="20"
          w="40%"
        />

        {turns &&
          turns.map((turn) => {
            return (
              <TurnCard
                key={turn.id}
                name={turn.turn_type}
                turn_type={turn.turn_type}
                turn_id={turn.id}
                ws={ws}
              />
            );
          })}
      </VStack>
    </VStack>
  );
};

export default Turns;
