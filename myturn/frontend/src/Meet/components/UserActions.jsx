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

const UserActions = ({ ws }) => {
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

  /* LOCKING AND UNLOCKING TURNS */
  const [isThreeLocked, setIsThreeLocked] = useState(false);
  const [isTwoLocked, setIsTwoLocked] = useState(false);
  const [isOneLocked, setIsOneLocked] = useState(false);

  const handleThreeLock = () => {
    setIsThreeLocked(!isThreeLocked);
  };

  const handleTwoLock = () => {
    setIsTwoLocked(!isTwoLocked);
  };

  const handleOneLock = () => {
    setIsOneLocked(!isOneLocked);
  };

  /* REQUESTS FOR ADDING TURNS */
  const handleAddTurn = (type) => {
    console.log("llamadas")
    ws.send(JSON.stringify({ request: "add_turn", turn_type: type }));
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

      <HStack>
        <Button
          boxShadow={
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
          }
          w="100px"
          h="100px"
          isDisabled={isThreeLocked}
          onClick={() => handleAddTurn("Rodeo")}
        >
          <Image w="100px" draggable={false} src={point_three} />
        </Button>
        {auth.amIMod && <IconButton
          colorScheme={isThreeLocked ? "green" : "red"}
          icon={isThreeLocked ? <UnlockIcon /> : <LockIcon />}
          onClick={handleThreeLock}
        />}
        
      </HStack>

      <HStack>
        <Button
          boxShadow={
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
          }
          w="100px"
          h="100px"
          isDisabled={isTwoLocked}
          onClick={() => handleAddTurn("Directo")}
        >
          <Image w="100px" draggable={false} src={point_two} />
        </Button>
        {auth.amIMod &&  <IconButton
          colorScheme={isTwoLocked ? "green" : "red"}
          icon={isTwoLocked ? <UnlockIcon /> : <LockIcon />}
          onClick={handleTwoLock}
        />}
      </HStack>

      <HStack>
        <Button
          boxShadow={
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
          }
          w="100px"
          h="100px"
          isDisabled={isOneLocked}
          onClick={() => handleAddTurn("Normal")}
        >
          <Image w="100px" draggable={false} src={point_up} />
        </Button>
        {auth.amIMod && <IconButton
          colorScheme={isOneLocked ? "green" : "red"}
          icon={isOneLocked ? <UnlockIcon /> : <LockIcon />}
          onClick={handleOneLock}
        />}
      </HStack>

      <Spacer />


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
    </VStack>
  );
};

export default UserActions;
