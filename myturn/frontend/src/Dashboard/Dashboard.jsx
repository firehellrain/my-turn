import {
  VStack,
  Heading,
  Button,
  Input,
  useColorMode,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import React from "react";

import { AuthContext } from "../shared/context/auth-context";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlus } from "@fortawesome/free-solid-svg-icons";

import Illustration from "../assets/dashboardImg.svg";
import MyTurnLogo from "../assets/MyTurnLogo.svg";

const MotionButton = motion(Button);

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  return (
    <HStack w="100%" justify="center" mb="80px" spacing="0" mt="10">
      <VStack spacing={5} maxWidth={"600px"}>
        <Image src={Illustration} w="60%" minWidth={"400px"} maxWidth="600px" />
        <Heading borderBottomWidth="2px" pb="10px" borderColor={"secondary"}>
          Contecta con otros usuarios
        </Heading>
        <Text textAlign={"center"} fontSize="xl" w="60%">
          Consigue el código de la reunión para unirte a una sesión.
        </Text>

        <Heading fontSize="2xl">Únete a una reunión</Heading>
        <VStack spacing="2">
          <Input
            placeholder="Código de la reunión"
            fontSize="lg"
            w="200px"
            maxLength={4}
            borderColor="primary"
            borderWidth={"2px"}
          />
          <MotionButton
            w="200px"
            bgColor={"primary"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.05 }}
            fontSize="lg"
          >
            Entrar {/*TODO: PONER ICONO */}
            <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faUsers} />
          </MotionButton>
        </VStack>
      </VStack>

      <VStack spacing="10" maxWidth={"600px"}>
        <Heading
          borderBottomWidth="2px"
          pb="10px"
          borderColor={"secondary"}
          pt="5vh"
        >
          Crea una reunión
        </Heading>
        <Text fontSize={"xl"} w="60%" textAlign={"center"}>
          Comienza una reunión y comparte el código con aquellos que desees.
        </Text>
        <VStack>
          <Input
            placeholder="Nombre de la reunión"
            w="300px"
            fontSize="lg"
            maxLength={20}
            borderColor="primary"
            borderWidth={"2px"}
          />
          <MotionButton
            w="300px"
            bgColor={"primary"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.05 }}
            fontSize="lg"
          >
            Crear
            <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faPlus} />
          </MotionButton>
        </VStack>
        <Image w="60%" minWidth={"400px"} maxWidth="600px" src={MyTurnLogo} />
      </VStack>
    </HStack>
  );
};

export default Dashboard;
