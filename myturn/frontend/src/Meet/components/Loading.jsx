import { Heading, HStack, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import LoadingHand from "../../assets/LoadingHand.svg";

import { useEffect, useState, useCallback } from "react";

const MotionImage = motion(Image);

const Loading = () => {
  const fullText = "...";
  let count = 0;
  const [text, setText] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      if (count >= 3) {
        count = 1;
      } else count++;
      setText(fullText.substring(0, count));
    }, 700);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <HStack justify={"center"} mt="30vh" userSelect={"none"}>
      <MotionImage
        w="50px"
        src={LoadingHand}
        animate={{ x: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <Heading w="200px">Cargando {text}</Heading>
    </HStack>
  );
};

export default Loading;
