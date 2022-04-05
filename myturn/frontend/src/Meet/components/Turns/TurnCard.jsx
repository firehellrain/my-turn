import { Avatar, Box, Heading, HStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TurnCard = ({ isLeft, name, text }) => {


  return (
    <Box w="70%" textAlign={isLeft ? "left" : "right"}>
      <HStack mb="2">
        {isLeft ? (
          <>
            <Avatar
              name={name}
              boxShadow={
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
              }
            />
            <Heading fontSize={"xl"}>{name}</Heading>
          </>
        ) : (
          <>
            <Spacer />
            <Heading fontSize={"xl"}>{name}</Heading>
            <Avatar
              boxShadow={
                "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
              }
              name={name}
            />
          </>
        )}
      </HStack>

      <Box
        ml={isLeft && "10"}
        mr={!isLeft && "10"}
        display={"inline-block"}
        bgColor={"transparent"}
        boxShadow={
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;"
        }
        p="5"
        borderWidth={"1px"}
        borderColor=""
        borderRadius={isLeft ? "0 20px 20px 20px" : "20px 0 20px 20px"}
        textAlign="left"
      >
        <HStack>
          <Text fontSize={"lg"}>{text}</Text>
          
          <FontAwesomeIcon
            style={{
              width: "30px",
              height: "30px",
              color: "red",
              marginTop: "5px",
              cursor:"pointer"
            }}
            icon={faXmark}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default TurnCard;
