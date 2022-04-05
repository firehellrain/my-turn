import React from "react";
import { Box, Button, Heading, Avatar, HStack, Text } from "@chakra-ui/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

/* HOOKS */
import { useParams } from "react-router-dom";

const UsersPannel = () => {
  const { mid } = useParams();

  /* LEAVE BUTTON LOGIC */
  const handleUserLeave = () => {};


  return (
    <Box
      w="100%"
      h="100%"
      maxH="90vh"
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
      borderRightWidth="1px"
      minWidth={"300px"}
      textAlign="center"
    >
      <Button mt="5" fontSize={"xl"} variant="ghost" borderWidth={"3px"} colorScheme={"red"} w="200px">
        <FontAwesomeIcon icon={faArrowLeft} style={{"marginRight":"10px"}}/>Abandonar
      </Button>
      <Heading fontSize={"2xl"} mt="5" mb="5vh">
        Código: {mid}
      </Heading>
      <Box w="100%" textAlign={"left"} fontSize="lg" mb="2" ml="2">
        <Text>Participantes:</Text>
      </Box>

      <Box pt="1px" maxH={"75%"} overflowY={"auto"}>

          {/* TODO: temporal poner dinámico */}
  
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
 


      </Box>
    </Box>
  );
};

export default UsersPannel;
