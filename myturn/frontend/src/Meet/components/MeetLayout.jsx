import React from 'react'

import { Grid, GridItem } from "@chakra-ui/react";

/* HOOKS */
import { useHistory } from "react-router-dom";
import UsersPannel from './UsersPannel';
import Turns from './Turns';
import UserActions from './UserActions';

const MeetLayout = ({meet}) => {

  const history = useHistory();


  /* WEBSOCKET */
  const ws = new WebSocket("ws://localhost:8000/ws/");
  

   /* USER LEAVE */
   const handleUserLeave = () => {
    //TODO: implementar lógica del servidor
    //TODO: maybe poner are you sure you want to leave?
    history.push("/main");
  };

  return (
    <Grid templateColumns={"1fr 4fr 1.5fr"}  h="90vh"> {/*  */}
      <GridItem colSpan={1} rowSpan={1} colStart={1}>
        <UsersPannel/> {/* Muestra lista de usuarios presentes, código de reunión y botón para abandonar */}
      </GridItem>
      <GridItem colSpan={1} rowSpan={1}  colStart={2}>
        <Turns title={meet.meeting_name}/> {/* Título de la renunión y turnos */}
      </GridItem>
      <GridItem colSpan={1} rowSpan={1} colStart={3}>
        <UserActions/> {/* Tipos de turnos, cambio de moderador y botón para eliminar reunión */}
      </GridItem>
    </Grid>
  );
}

export default MeetLayout