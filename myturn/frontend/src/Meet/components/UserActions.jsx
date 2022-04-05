import { Grid, Button, VStack, GridItem, Spacer, Heading } from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../../shared/context/auth-context";

/* HOOKS */
import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserActions = () => {
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

  return (
    <VStack
      w="100%"
      h="100%"
      borderLeftWidth="1px"
      minWidth={"300px"}
      textAlign="center"
      p="5"
      pb="20"
    >
      <Heading fontSize={"2xl"}>Elige tu turno</Heading>
      <Button
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
        }
        colorScheme={"blue"}
        h="50px"
        w="210px"
      ></Button>

      <Spacer />
      <Button
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
        }
        colorScheme={"orange"}
        w="210px"
        onClick={handleEndMeeting}
      >
        Terminar reunión
      </Button>
    </VStack>
  );
};

export default UserActions;
