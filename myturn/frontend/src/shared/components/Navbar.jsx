import {
  IconButton,
  HStack,
  useColorMode,
  Spacer,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Image,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../context/auth-context";

import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";

import logo from "../../assets/logo.png";
import logoBlanco from "../../assets/logoBlanco.png";


const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const isMobile = useMediaQuery("(max-width:680px)");

  const { colorMode, toggleColorMode } = useColorMode();
  const navbarBg = useColorModeValue("white", "#1A202C");


  const handleLogout = () => {
    auth.logout();
    history.push("/");
  };


  return (
    <HStack
      p="3"
      spacing="4"
      borderBottomWidth="1px"
      bgColor={navbarBg}
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 12px;"}
    >
      <HStack
        spacing="5"
        onClick={() => {
          history.push("/main");
        }}
        cursor="pointer"
      >
        <Image
          src={colorMode == "dark" ? logoBlanco : logo}
          w="30px"
          ml="20px"
        />
        <Heading fontSize={"2xl"}>MyTurn!</Heading>
      </HStack>
      <Spacer />
      <IconButton
        bgColor={"transparent"}
        _hover={{ bgColor: "transparent" }}
        fontSize="xl"
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
      />
      {auth.isLoggedIn && (
        <Menu >
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {isMobile ? "Perfil" : auth.username}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => history.push("/profile")}>Perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
          </MenuList>
        </Menu>
        
      )}
    </HStack>
  );
};

export default Navbar;
