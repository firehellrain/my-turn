import React from "react";

import { Grid, GridItem } from "@chakra-ui/react";
import UsersPannel from "./UsersPannel";
import Turns from "./Turns/Turns";
import UserActions from "./UserActions";
import { AuthContext } from "../../shared/context/auth-context";
/* HOOKS */
import { useHistory, useParams } from "react-router-dom";
import { useState, useContext } from "react";

const MeetLayout = ({ meet }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { mid } = useParams();

  const [turns, setTurns] = useState(null);
  const [users, setUsers] = useState(null);

  /* WEBSOCKET */

  const [ws, setWs] = useState(
    new WebSocket(`ws://localhost:8000/ws/join_meet/${mid}`)
  );
  /* FIXME: HAY UN BUG CUANDO TE RECONECTAS EL WS SE ABRE Y CIERRA INDEFINIDAMENTE */

  ws.onopen = () => {
    console.log("conectado al ws");

    ws.send(
      JSON.stringify({ request: "get_turn_list", token_key: auth.token })
    );

    /* EJEMPLO MANDAR TURNO */
    /* ws.send(
      JSON.stringify({
        request: "add_turn",
        turn_type: 1,
        token_key: auth.token,
      })
    ); */
    ws.send(JSON.stringify({ request: "get_user_list" }));
  };

  /* ACTUALIZACIONES DEL SERVER */
  ws.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log(data);

    if (data.hasOwnProperty("turn_list")) {
      //si recibimos datos del tipo turn_list

      console.log("se ha recibido una lista de turnos")

      /* console.log("turn list es: ");
      console.log(data.turn_list); */
      setTurns(data.turn_list);
    } else if (data.hasOwnProperty("user_list")) {
      setUsers(data.user_list);
    }
  };

  ws.onclose = function (e) {
    console.error("Chat socket closed unexpectedly");
    setWs(new WebSocket(`ws://localhost:8000/ws/join_meet/${mid}`));
  };

  /* USER LEAVE */
  const handleUserLeave = () => {
    //TODO: implementar lógica del servidor
    //TODO: maybe poner are you sure you want to leave?
    history.push("/main");
  };

  return (
    <Grid templateColumns={"1fr 4fr 1.5fr"} h="90vh">
      <GridItem colSpan={1} rowSpan={1} colStart={1}>
        <UsersPannel users={users} />
        {/* Muestra lista de usuarios presentes, código de reunión y botón para abandonar */}
      </GridItem>
      <GridItem colSpan={1} rowSpan={1} colStart={2}>
        <Turns title={meet.meeting_name} turns={turns} />
        {/* Título de la renunión y turnos */}
      </GridItem>
      <GridItem colSpan={1} rowSpan={1} colStart={3}>
        <UserActions ws={ws} />
        {/* Tipos de turnos, cambio de moderador y botón para eliminar reunión */}
      </GridItem>
    </Grid>
  );
};

export default MeetLayout;
