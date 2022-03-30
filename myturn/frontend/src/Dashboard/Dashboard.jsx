import {
  VStack,
  Heading,
  Button,
  Input,
  useColorModeValue,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlus } from "@fortawesome/free-solid-svg-icons";

import Illustration from "../assets/dashboardImg.svg";
import MyTurnLogo from "../assets/MyTurnLogo.svg";
import axios from "axios";

const MotionButton = motion(Button);

const Dashboard = () => {

  const history = useHistory();

  const borderColor = useColorModeValue("black", "white");

  /* INPUT HANDLING FOR JOINING A MEET */
  const [code, setCode] = useState(null);

  const handleJoinMeet = (e) => {
    setCode(e.target.value);
  };

  const checkMeetExists = () => {

    axios.post("http://localhost:8000/backend/api-token-auth/") //TODO: terminar de implementar

  }

  /* FETCHING FUNCTIONS */
  const [meet, setMeet] = useState(null);
  const [loading, setLoading] = useState(false);

  const createMeet = () => {
    setLoading(true);
  };

  return (
    <HStack w="100%" justify="center" mb="80px" spacing="0" mt="10">
      <VStack spacing={5} maxWidth={"600px"}>
        <Image src={Illustration} w="60%" minWidth={"400px"} maxWidth="600px" draggable={false} userSelect="none"/>
        <Heading borderBottomWidth="2px" pb="10px" borderColor={borderColor}>
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
            onChange={handleJoinMeet}
          />
          <MotionButton
            w="200px"
            bgColor={"primary"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.025 }}
            fontSize="lg"
            onClick={() => {
              history.push(`/meet/${code}`);
            }}
          >
            Entrar
            <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faUsers} />
          </MotionButton>
        </VStack>
      </VStack>

      <VStack spacing="10" maxWidth={"600px"}>
        <Heading
          borderBottomWidth="2px"
          pb="10px"
          borderColor={borderColor}
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
            transition={{ duration: 0.025 }}
            fontSize="lg"
            onClick={() => {
              history.push("/meet/1234");
            }}
          >
            Crear
            <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faPlus} />
          </MotionButton>
        </VStack>
        <Image w="60%" minWidth={"400px"} maxWidth="600px" src={MyTurnLogo} draggable={false} userSelect="none"/>
      </VStack>
    </HStack>
  );
};

export default Dashboard;
