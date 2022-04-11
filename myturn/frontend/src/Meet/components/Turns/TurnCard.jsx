import { Avatar, Box, Image, HStack, Spacer, Text } from "@chakra-ui/react";
import { motion,useMotionValue,useTransform } from "framer-motion";

import point_three from "../../../assets/point_three.png";
import point_two from "../../../assets/point_two.png";
import point_up from "../../../assets/point_up.png";

const MotionBox = motion(Box);

const TurnCard = ({isMain, name, turn_type,turn_id,ws }) => {

  const x = useMotionValue(0)
  const backgroundColor = useTransform(
    x,
    [-150, 0, 100],
    ["rgba(0,235,0,1)", isMain ? "rgba(0,228,239,0.5)" : "rgba(0,0,0,0.0)", "rgba(232,63,63,1)"]
  )
  const opacity = useTransform(
    x,
    [-150, 0, 300],
    ["1", "1", "0"]
  )

  let once = true;

  const handleDrag = () => {
    if(x.get() > 200 && once){ /* PARA BORRAR */
      console.log("turn id is: " + turn_id);
      ws.send(JSON.stringify({ request: "delete_turn",turn_id:turn_id }));
      once = false;
    }
  }


  if(!isMain){
    return (
      <MotionBox
        display={"inline-block"}
        p="5"
        w="70%"
        borderWidth={"1px"}
        borderRadius={"20px"}
        textAlign="left"
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
        }
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        x={x}
        style={{x,backgroundColor,opacity}}
        onDrag={handleDrag}
      >
        <HStack>
          <Avatar userSelect="none" name={name} draggable={false}/>
          <Text fontSize={"lg"}>{name}</Text>
          <Spacer/>
          <Image userSelect="none" w="50px" draggable={false} src={turn_type === "Rodeo" ? point_three : (turn_type === "Directo" ? point_two : point_up)}/>
        </HStack>
      </MotionBox>
    );
  }else{
    return (
      <Box
        display={"inline-block"}
        p="5"
        w="70%"
        borderWidth={"1px"}
        borderRadius={"20px"}
        textAlign="left"
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
        }
        userSelect="none" 
      >
        <HStack>
          <Avatar name={name} draggable={false}/>
          <Text fontSize={"lg"}>{name}</Text>
          <Spacer/>
          <Image userSelect="none" w="50px" draggable={false} src={turn_type === "Rodeo" ? point_three : (turn_type === "Directo" ? point_two : point_up)}/>
        </HStack>
      </Box>
    );
  }
  
};

export default TurnCard;
