import { Grid, Button, VStack, GridItem } from "@chakra-ui/react";
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
      maxWidth={"400px"}
      borderLeftWidth="1px"
      minWidth={"300px"}
      textAlign="center"
      p="5"
      spacing="500px"
    >
        {/* GRID DE ACCIONES DE REUNIÓN */}
      <Grid templateColumns={"1fr 1fr"} templateRows={"1fr 1fr"} w="auto" gap="2" mt="10">
        <GridItem colSpan={1} rowSpan={1} colStart={1} rowStart={1}>
            <Button borderRadius={"md"} h="100px" w="100px" colorScheme={"blue"}>Algo</Button>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} colStart={2} rowStart={1}>
            <Button borderRadius={"md"} h="100px" w="100px" colorScheme={"blue"}>Algo</Button>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} colStart={1} rowStart={2}>
            <Button borderRadius={"md"} h="100px" w="100px" colorScheme={"blue"}>Algo</Button>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} colStart={2} rowStart={2}>
            <Button borderRadius={"md"} h="100px" w="100px" colorScheme={"blue"}>Algo</Button>
        </GridItem>
      </Grid>


      <Button colorScheme={"orange"} w="210px" onClick={handleEndMeeting}>Terminar reunión</Button>
    </VStack>
  );
};

export default UserActions;
