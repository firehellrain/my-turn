import {
  Avatar,
  Grid,
  Heading,
  HStack,
  IconButton,
  VStack,
  Box,
  Text,
  Input,
  Button
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../shared/context/auth-context";

import { useContext } from "react";

const Profile = () => {
  const auth = useContext(AuthContext);

  return (
    <Grid templateColumns="repeat(2, 1fr)" p="20">
      <VStack>

        <Box w="70%" boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"} borderRadius="lg" p="10">
          <Text mb="5" fontSize="xl">Nombre de Usuario</Text>
          <HStack spacing="5">
            <Avatar
              userSelect={"none"}
              name={auth.username}
              size="xl"
              cursor={"pointer"}
            />
            <HStack pt="40px" spacing="5">
              <Heading>{auth.username}</Heading>
              <IconButton>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{ fontSize: "20px" }}
                />
              </IconButton>
            </HStack>
          </HStack>
        </Box>

        <Box w="70%" boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"} borderRadius="lg" p="10">
          <VStack align={"left"}>
            <Text mb="5" fontSize="xl">Cambiar Contraseña</Text>
            <Input variant='flushed' placeholder='Nueva contraseña'/>
            <Input variant='flushed' placeholder='Repita la contraseña'/>
            <Button>Cambiar contraseña</Button>
          </VStack>
        </Box>
      </VStack>

      <VStack></VStack>
    </Grid>
  );
};

export default Profile;
