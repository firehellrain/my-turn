import React from "react";

import { Grid, GridItem,useToast } from "@chakra-ui/react";
import UsersPannel from "./UsersPannel";
import Turns from "./Turns/Turns";
import UserActions from "./UserActions";
import { AuthContext } from "../../shared/context/auth-context";
/* HOOKS */
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";

const MeetLayout = ({ meet }) => {
  const auth = useContext(AuthContext);
  const { mid } = useParams();

  const [turns, setTurns] = useState(null);
  const [users, setUsers] = useState(null);
  const [mod,setMod] = useState(null); // Para comprobar si el usuario es moderador
  const [turnsBlocked, setTurnsBlocked] = useState(false)

  const toast = useToast()

  /* WEBSOCKET */

  const [ws, setWs] = useState(
    new WebSocket(`ws://localhost:8000/ws/join_meet/${mid}`)
  );
  /* FIXME: HAY UN BUG CUANDO TE RECONECTAS EL WS SE ABRE Y CIERRA INDEFINIDAMENTE */

  ws.onopen = () => {
    console.log("conectado al ws");

    //nos autenticamos primero
    ws.send(JSON.stringify({ request: "auth_user", token_key: auth.token}));
    ws.send(JSON.stringify({ request: "get_turn_list" }));
    ws.send(JSON.stringify({ request: "get_block_turns_status" }));

    /* ws.send(JSON.stringify({ request: "get_user_list" })); */
  };

  /* ACTUALIZACIONES DEL SERVER */
  ws.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log("ha llegado info: ");
    console.log(data);

    if (data.hasOwnProperty("turn_list")) {
      //si recibimos datos del tipo turn_list
      console.log("se ha recibido una lista de turnos")

      /* console.log("turn list es: ");
      console.log(data.turn_list); */
      setTurns(data.turn_list);
    } else if (data.hasOwnProperty("user_list")) {
      setUsers(data.user_list);
      setMod(data.meeting_mod);
      
      if(data.meeting_mod === auth.userId){
        auth.toggleMod(true); //si el nuevo moderador coincide con el id de usuario lo actualizamos
        /* console.log("usuario con id: " + auth.userId +  " es mod: " +auth.userId === mod); */
      }
    }else if(data.hasOwnProperty("v_turn")){
      toast({
        title: 'Rodeo',
        description: `El usuario ${data.full_name} cree que el debate está perdiendo el sentido`,
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
    }else if(data.hasOwnProperty("status")){
      setTurnsBlocked(data.status); /* Para controlar el bloqueo de los turnos */
    }else if (data.hasOwnProperty("error")) {
      toast({
        title: 'Ya tienes un turno pedido',
        description: "Debes cancelar tu turno para poder pedir otro nuevo",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  };

  ws.onclose = function (e) {
    console.error("Chat socket closed unexpectedly");
    setWs(new WebSocket(`ws://localhost:8000/ws/join_meet/${mid}`));
  };


  return (
    <Grid templateColumns={"1fr 4fr 1.5fr"} h="90vh">
      <GridItem colSpan={1} rowSpan={1} colStart={1}>
        <UsersPannel users={users} ws={ws} modId={mod} setMod={setMod}/>
        {/* Muestra lista de usuarios presentes, código de reunión y botón para abandonar */}
      </GridItem>
      <GridItem colSpan={1} rowSpan={1} colStart={2}>
        <Turns title={meet.meeting_name} turns={turns} users={users} ws={ws} modId={mod}/>
        {/* Título de la renunión y turnos */}
      </GridItem>
      <GridItem colSpan={1} rowSpan={1} colStart={3}>
        <UserActions ws={ws} modId={mod} turnsBlocked={turnsBlocked}/>
        {/* Tipos de turnos, cambio de moderador y botón para eliminar reunión */}
      </GridItem>
    </Grid>
  );
};

export default MeetLayout;
