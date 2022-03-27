import {
  IconButton,
  HStack,
  useColorMode,
  Spacer,
  Avatar,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { FaSun, FaMoon } from "react-icons/fa";
import { AuthContext } from "../context/auth-context";
import { useContext, useState } from "react";
import { motion, useAnimation } from "framer-motion";
/* import { useNavigate } from "react-router"; */
import { useHistory } from "react-router-dom";

const MotionTriangle = motion(TriangleDownIcon);

const Navbar = () => {
  const auth = useContext(AuthContext);
  /* const navigate = useNavigate(); */
  const history = useHistory();

  const [isDropped, setIsDropped] = useState(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const dropDownController = useAnimation();

  const handleLogout = () => {
    auth.logout();
    /* navigate("../"); */
    history.push("/")
  };

  const handleDropDownClick = () => {
    setIsDropped(!isDropped);
    isDropped
      ? dropDownController.start("withdrawn")
      : dropDownController.start("dropped");
  };

  return (
    <HStack p="3" spacing="4" borderBottomWidth="1px">
      <Spacer />
      <IconButton
        bgColor={"transparent"}
        _hover={{ bgColor: "transparent" }}
        fontSize="xl"
        icon={colorMode === "dark" ? <FaSun /> : <FaMoon />}
        onClick={toggleColorMode}
      />
      {auth.isLoggedIn && (
        <HStack>
          <Avatar h="40px" w="40px" name="pablo perez" bgColor={"primary"} />
          <MotionTriangle
            cursor="pointer"
            initial="withdrawn"
            animate={dropDownController}
            variants={{
              withdrawn: {
                transform: "rotate(0deg)",
                transition: { duration: 0.3 },
              },
              dropped: {
                transform: "rotate(180deg)",
                transition: { duration: 0.3 },
              },
            }}
            onClick={handleDropDownClick}
          />
          {isDropped && (
            <Box
              h="auto"
              w="200px"
              position={"absolute"}
              right="1"
              bgColor={"primary"}
              top="60px"
              borderRadius={"md"}
              textAlign="center"
              background={"transparent"}
              borderWidth="2px"
            >
              <Button
                w="100%"
                borderRadius={"md"}
                onClick={handleLogout}
                borderBottomRadius="0"
              >
                <Text>Cerrar sesión</Text>
              </Button>
              <Button w="100%" borderRadius={"md"} borderTopRadius="0">
                <Text>Moficar mi perfil</Text>
              </Button>
            </Box>
          )}
        </HStack>
      )}
    </HStack>
  );
};

export default Navbar;
