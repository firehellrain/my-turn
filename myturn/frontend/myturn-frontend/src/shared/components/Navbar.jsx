import {
  IconButton,
  HStack,
  useColorMode,
  Spacer,
  Avatar,
} from "@chakra-ui/react";
import { TriangleDownIcon } from '@chakra-ui/icons';
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

const Navbar = () => {
  const auth = useContext(AuthContext);

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack p="3" spacing="4" borderBottomWidth="1px">
      <Spacer />
      <IconButton
        bgColor={"transparent"}
        _hover={{bgColor:"transparent"}}
        fontSize="xl"
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
      />
      <HStack>
        <Avatar h="40px" w="40px" name="pablo perez" bgColor={"primary"}/>
        <TriangleDownIcon cursor="pointer"/>
      </HStack>
      
    </HStack>
  );
};

export default Navbar;
