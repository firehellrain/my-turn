import {
  Button,
  VStack,
  Spacer,
  Heading,
  Image,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";

import point_three from "../../assets/point_three.png";
import point_two from "../../assets/point_two.png";
import point_up from "../../assets/point_up.png";

/* HOOKS */
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserActions = ({ ws, modId, turnsBlocked }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  /* END MEETING LOGIC */
  const handleEndMeeting = () => {
    /* SOLO MODERADOR */
    let config = {
      headers: {
        Authorization: "Token " + auth.token,
      },
    };

    axios
      .get(`http://localhost:8000/backend/delete_meet`, config)
      .then((response) => {
        console.log("response delete: " + response.data);
        history.push("/main");
      })
      .catch((err) => {
        console.log("error delete: " + err);
      });
  };

  /* BLOQUEAR Y DESBLOQUEAR TURNOS */

  const handleToggleBlockTurns = () => {
    //true -> está bloqueado
    // false -> no está bloqueado
    ws.send(
      JSON.stringify({
        request: "switch_block_turns",
      })
    );
  };

  /* PETICIONES PARA AÑADIR TURNOS */

  const [isRodeoReady, setIsRodeoReady] = useState(true);

  const handleAddTurn = (type) => {
    if (type === "Rodeo" && isRodeoReady) {
      ws.send(
        JSON.stringify({
          request: "add_volatile_turn",
          turn_type: type,
          full_name: auth.username,
        })
      );
      setIsRodeoReady(false);
      setTimeout(() => {
        setIsRodeoReady(true);
      }, 60000);
    } else {
      ws.send(JSON.stringify({ request: "add_turn", turn_type: type }));
    }
  };

  return (
    <VStack
      w="100%"
      h="100%"
      borderLeftWidth="1px"
      minWidth={"300px"}
      textAlign="center"
      p="5"
      pb="20"
      spacing="5"
    >
      <Heading fontSize={"2xl"} pb="20px">
        Elige tu turno
      </Heading>

      <Button
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
        }
        w="100px"
        h="100px"
        isDisabled={turnsBlocked || !isRodeoReady}
        onClick={() => handleAddTurn("Rodeo")}
      >
        <Image w="100px" draggable={false} src={point_three} />
      </Button>

      <Button
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
        }
        w="100px"
        h="100px"
        isDisabled={turnsBlocked}
        onClick={() => handleAddTurn("Directo")}
      >
        <Image w="100px" draggable={false} src={point_two} />
      </Button>

      <Button
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
        }
        w="100px"
        h="100px"
        isDisabled={turnsBlocked}
        onClick={() => handleAddTurn("Normal")}
      >
        <Image w="100px" draggable={false} src={point_up} />
      </Button>

      <Spacer />

      {auth.userId === modId && (
        <IconButton
          colorScheme={turnsBlocked ? "green" : "red"}
          icon={turnsBlocked ? <UnlockIcon /> : <LockIcon />}
          onClick={handleToggleBlockTurns}
        />
      )}

      {auth.userId === modId && (
        <Button
          boxShadow={
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
          }
          colorScheme={"red"}
          w="210px"
          onClick={handleEndMeeting}
        >
          Terminar reunión
        </Button>
      )}
    </VStack>
  );
};

export default UserActions;
