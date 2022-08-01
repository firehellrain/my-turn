import {
  Heading,
  HStack,
  VStack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import TurnCard from "./TurnCard";
import { AuthContext } from "../../../shared/context/auth-context";

import { useContext } from "react";
import { AnimatePresence } from "framer-motion";


const Turns = ({ title, turns, ws, users, modId }) => {
  const textColor = useColorModeValue("black", "white");
  const auth = useContext(AuthContext);

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
            name={users[turns[0].turn_user_id]}
            turn_type={turns[0].turn_type}
            turn_id={turns[0].id}
            ws={ws}
          />
        )}

        <Box
          h="2px"
          borderTopWidth="2px"
          pb="20"
          w="40%"
        />

        <AnimatePresence>
        {turns &&
          turns.map((turn) => {
            return (
              <TurnCard
                isMain={!(auth.userId === modId) && !(auth.userId === turn.turn_user_id) } 
                key={turn.id}
                name={users[turn.turn_user_id]}
                turn_type={turn.turn_type}
                turn_id={turn.id}
                ws={ws}
              />
            );
          })}
          </AnimatePresence>
      </VStack>
    </VStack>
  );
};

export default Turns;
