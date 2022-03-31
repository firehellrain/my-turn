import React from "react";
import { Box, Button, Heading, Avatar, HStack, Text } from "@chakra-ui/react";
import axios from "axios";

/* HOOKS */
import { useParams } from "react-router-dom";

const UsersPannel = () => {
  const { mid } = useParams();

  /* LEAVE BUTTON LOGIC */
  const handleUserLeave = () => {};

  /* DELETE MEETING LOGIC */
  const handleDeleteMeet = () => {};

  return (
    <Box
      w="100%"
      h="100%"
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
      borderRightWidth="1px"
      minWidth={"300px"}
      textAlign="center"
    >
      <Button mt="5" colorScheme={"red"} w="200px">
        Abandonar
      </Button>
      <Heading fontSize={"2xl"} mt="5" mb="5vh">
        Código: {mid}
      </Heading>
      <Box w="100%" textAlign={"left"} fontSize="lg" mb="2" ml="2">
        <Text>Participantes:</Text>
      </Box>

      <Box overflowY={"auto"} pt="1px">

          {/* TODO: temporal poner dinámico */}
        {Array(10).fill(
          <HStack
            w="100%"
            h="60px"
            borderTopWidth={"1px"}
            mt="-1px"
            borderBottomWidth={"1px"}
            textAlign="left"
            spacing="10px"
            userSelect={"none"}
          >
            <Avatar mt="5px" ml="5" h="40px" w="40px" name="Test test" />
            <Text fontSize={"xl"}>Test testing</Text>
          </HStack>
        )}


      </Box>
    </Box>
  );
};

export default UsersPannel;
