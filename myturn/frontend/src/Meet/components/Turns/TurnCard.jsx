import { Avatar, Box, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { motion,useMotionValue,useTransform } from "framer-motion";

const MotionBox = motion(Box);
const MotionStack = motion(HStack);

const TurnCard = ({ isLeft, name, text }) => {

  const x = useMotionValue(0)
  const backgroundColor = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "rgba(0,0,0,0.0)", "rgb(230,0,0)"]
  )


  return (
    <MotionBox
      display={"inline-block"}
      bgColor={(x.get() > 20) ? "red" : "transparent"}
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
      style={{x,backgroundColor}}
      onDrag={function(){
        console.log(x.get())
      }}
    >
      <HStack>
        <Avatar/>
        <Text fontSize={"lg"}>{text}</Text>

        {/* <FontAwesomeIcon
          style={{
            width: "30px",
            height: "30px",
            color: "red",
            marginTop: "5px",
            cursor: "pointer",
          }}
          icon={faXmark}
        /> */}
      </HStack>
    </MotionBox>
  );
};

export default TurnCard;
