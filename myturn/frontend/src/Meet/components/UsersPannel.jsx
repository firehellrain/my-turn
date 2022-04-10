import React, { useEffect, useState } from "react";
import { Box, Button, Heading, Avatar, HStack, Text,Spinner } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faCrown } from "@fortawesome/free-solid-svg-icons";
/* HOOKS */
import { useParams,useHistory } from "react-router-dom";

const UsersPannel = ({ users }) => {
  const { mid } = useParams();
  const history = useHistory();

  /* LEAVE BUTTON LOGIC */
  const handleUserLeave = () => {
    history.push("/main")
  };

  const [formatedUsers, setFormatedUsers] = useState([]);

  useEffect(() => {
    /* convertimos */
    if (users) {
      var array = [];

      for (let i in users) array.push({name: users[i],id:i});

      setFormatedUsers(array);
      /* console.log(array); */
    }
  }, [users]);

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
      <Button
        mt="5"
        fontSize={"xl"}
        variant="ghost"
        borderWidth={"3px"}
        colorScheme={"red"}
        w="200px"
        onClick={handleUserLeave}
      >
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: "10px" }} />
        Abandonar
      </Button>
      <Heading fontSize={"2xl"} mt="5" mb="5vh">
        Código: {mid}
      </Heading>
      <Box w="100%" textAlign={"left"} fontSize="lg" mb="2" ml="2">
        <Text>Participantes:</Text>
      </Box>

      <Box pt="1px" maxH={"75%"} overflowY={"auto"}>
        {users ?
          formatedUsers.map((user) => {
            return (
              <HStack
                w="100%"
                h="60px"
                borderTopWidth={"1px"}
                mt="-1px"
                borderBottomWidth={"1px"}
                textAlign="left"
                spacing="10px"
                userSelect={"none"}
                key={user.id}
              >
                <Avatar mt="5px" ml="5" h="40px" w="40px" name={user.name} />
                <Text fontSize={"xl"} maxWidth="180px">{user.name}</Text>
                <FontAwesomeIcon icon={faCrown} />
              </HStack> 
            );
          }) : <Spinner/>}
          {/* TODO: mejorar spinner */}
      </Box>
    </Box>
  );
};

export default UsersPannel;
