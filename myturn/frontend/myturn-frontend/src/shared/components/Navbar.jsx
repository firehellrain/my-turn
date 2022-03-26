import { IconButton,HStack,useColorMode, Spacer } from "@chakra-ui/react";
import React from "react";
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack p="20px">
      <Spacer/>
      <IconButton
        fontSize="xl"
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode} 
      />
    </HStack>
  );
};

export default Navbar;
