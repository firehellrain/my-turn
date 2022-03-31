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

import React, { useState, useContext,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faPlus } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../shared/context/auth-context";

import Illustration from "../assets/dashboardImg.svg";
import MyTurnLogo from "../assets/MyTurnLogo.svg";
import axios from "axios";

const MotionButton = motion(Button);

const Dashboard = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const borderColor = useColorModeValue("black", "white");
  const isMobile = useMediaQuery('max-width:1200px'); /* FIXME:  */

  /* ON REFRESH CHECK IF USER HAS MEET */
  const [userHasMeet, setUserHasMeet] = useState(false);
  useEffect(() => {

    console.log(isMobile);
    let config = {
      headers: {
        Authorization: "Token " + auth.token,
      },
    };

    axios
      .get(`http://localhost:8000/backend/user_has_meet`, config)
      .then((response) => {
        /* console.log("HAS MEET: ", response.data); */
        setUserHasMeet(true);
        setCode(response.data.meeting.meeting_id);
      })
      .catch((err) => {
        console.log("has meet error: ", err);
        setUserHasMeet(false);
      });
  }, [])
  

  /* INPUT HANDLING FOR JOINING A MEET */
  const [code, setCode] = useState(null);
  const [loadingAccessMeet, setLoadingAccessMeet] = useState(false);
  const [errorMeetExists, setErrorMeetExists] = useState("");
  

  const handleJoinMeetInput = (e) => {
    setCode(e.target.value);
  };

  const checkMeetExists = () => {
    setLoadingAccessMeet(true);

    let config = {
      headers: {
        Authorization: "Token " + auth.token,
      },
    };

    

    axios
      .get(`http://localhost:8000/backend/access_meet/${code}`, config)
      .then((response) => {
        /* console.log(response.data); */
        setLoadingAccessMeet(false);
        history.push(`/meet/${code}`);
      })
      .catch((err) => {
        /* console.log(err.response.data); */
        setLoadingAccessMeet(false);
        if (err.response.status === 400) setErrorMeetExists(err.response.data);
        else setErrorMeetExists("Algo ha ido mal");
      });
  };

  /* FETCHING FUNCTIONS */
  const [meetName, setMeetName] = useState(null);
  const [loadingCreateMeet, setLoadingCreateMeet] = useState(false);
  const [errorCreateMeet,setErrorCreateMeet] = useState("");

  const handleCreateMeetInput = (e) => {
    setMeetName(e.target.value);
  };

  const createMeet = () => {

    if(!meetName){
      setErrorCreateMeet("¡Debes introducir un nombre de reunión!");
      return;
    }
    else if(meetName.trim().length < 1){ //validador de nombre de reunión
      setErrorCreateMeet("Introduce un nombre válido porfavor");
      return;
    }

    setLoadingCreateMeet(true);
    //el servidor me comprueba automaticamente si el usuario es moderador de alguna reunión
    let config = {
      headers: {
        Authorization: "Token " + auth.token,
      },
    };

    axios
      .post(
        `http://localhost:8000/backend/create_meet`,
        { meetname: meetName },
        config
      )
      .then((response) => {
        console.log(response.data);
        setCode(response.data.meeting.meeting_id)
        setLoadingCreateMeet(false);
        // redirigir a la reunión si se ha podido crear
        history.push(`/meet/${response.data.meeting.meeting_id}`);
      })
      .catch((err) => {

        setLoadingCreateMeet(false);
        //filtramos según el código de error
        if(err.response.status === 400) setErrorCreateMeet("¡Ya eres moderador de una reunión!");
        else setErrorCreateMeet("Algo ha ido mal");
      });
  };

  return (
    <HStack w="100%" justify="center" mb="80px" spacing="0" mt="10">
      <VStack spacing={5} maxWidth={"600px"}>
        <Image
          src={Illustration}
          w="60%"
          minWidth={"400px"}
          maxWidth="600px"
          draggable={false}
          userSelect="none"
        />
        <Heading borderBottomWidth="2px" pb="10px" borderColor={borderColor}>
          Contecta con otros usuarios
        </Heading>
        <Text textAlign={"center"} fontSize="xl" w="60%">
          Consigue el código de la reunión para unirte a una sesión.
        </Text>

        <Heading fontSize="2xl">Únete a una reunión</Heading>
        <VStack spacing="2">
          {userHasMeet ? (
            <MotionButton
              w="200px"
              bgColor={"primary"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.025 }}
              fontSize="lg"
              onClick={checkMeetExists}
              isLoading={loadingAccessMeet}
            >
              Acceder a reunión 
              <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faUsers} />
            </MotionButton>
          ) : (
            <>
              <Input
                placeholder="Código de la reunión"
                fontSize="lg"
                w="200px"
                maxLength={4}
                borderColor="primary"
                borderWidth={"2px"}
                onChange={handleJoinMeetInput}
                isInvalid={errorMeetExists}
              />
              <MotionButton
                w="200px"
                bgColor={"primary"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.025 }}
                fontSize="lg"
                onClick={checkMeetExists}
                isLoading={loadingAccessMeet}
              >
                Entrar
                <FontAwesomeIcon
                  style={{ marginLeft: "10px" }}
                  icon={faUsers}
                />
              </MotionButton>{" "}
            </>
          )}
          {errorMeetExists && (
            <Text w="200px" textAlign={"center"} color="red.600">
              {errorMeetExists}
            </Text>
          )}
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
            onChange={handleCreateMeetInput}
            isInvalid={errorCreateMeet}
          />
          <MotionButton
            w="300px"
            bgColor={"primary"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.025 }}
            fontSize="lg"
            onClick={createMeet}
            isLoading={loadingCreateMeet}
          >
            Crear
            <FontAwesomeIcon style={{ marginLeft: "10px" }} icon={faPlus} />
          </MotionButton>
          {errorCreateMeet && (
            <Text w="250px" textAlign={"center"} color="red.600">
              {errorCreateMeet}
            </Text>
          )}
        </VStack>
        <Image
          w="60%"
          minWidth={"400px"}
          maxWidth="600px"
          src={MyTurnLogo}
          draggable={false}
          userSelect="none"
        />
      </VStack>
    </HStack>
  );
};

export default Dashboard;
