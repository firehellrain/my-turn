import { Heading, HStack, Spacer } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

/* HOOKS */
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import MeetNotFound from "./components/MeetNotFound";
import Loading from "./components/Loading";

const Meet = () => {
  const { mid } = useParams();
  const history = useHistory();

  /* CHECK IF MEETING EXISTS */
  const [meetExists, setMeetExists] = useState(false); 
  const [loadingMeetExists, setLoadingMeetExists] = useState(true); 

  /* useEffect(() => {
    //when page is refreshed
    axios
      .post("http://localhost:8000/backend/CAMBIAR/")
      .then((response) => {})
      .catch((err) => {
        setLoadingMeetExists(false);
        setMeetExists(false);
      });
  }, []); */

  /* USER LEAVE */
  const handleUserLeave = () => {
    //TODO: implementar lógica del servidor
    //TODO: maybe poner are you sure you want to leave?
    history.push("/main");
  };

  console.log(mid);

  if (loadingMeetExists) {
    return <Loading/>;
  } else {

    if (!meetExists) {
       return (<MeetNotFound/>)
    } else {
      //meet exists
      return (
        <HStack p="5">
          <Heading
            color="black"
            fontSize={"2xl"}
            cursor="pointer"
            userSelect={"none"}
            onClick={handleUserLeave}
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ marginRight: "10px" }}
            />
            Abandonar reunión
          </Heading>
          <Spacer />
          <Heading color="black" fontSize={"2xl"}>
            Código de la reunión: {mid}
          </Heading>
        </HStack>
      );
    }
  }


};

export default Meet;
