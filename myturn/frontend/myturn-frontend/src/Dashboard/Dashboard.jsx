import {
  VStack,
  Heading,
  Button,
  Input,
  useColorMode,
  Text,
  Grid,
  GridItem,
  Image,
  Center,
  Icon,
} from "@chakra-ui/react";
import React from "react";

import { AuthContext } from "../shared/context/auth-context";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Illustration from "../assets/dashboardImg.svg";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  return (
    <Grid templateColumns={"repeat(2,1fr)"}>
      <GridItem colSpan={1} mt="10">
        <VStack spacing={10}>
          <Image src={Illustration} w="400px" />
          <Heading>Únete a una reunión</Heading>
          <VStack>
            <Input
              placeholder="Código de la reunión"
              w="200px"
              maxLength={4}
              bgColor="primary"
              color="white"
              _placeholder={{ color: "whiteAlpha.700" }}
            />
            <Button>Entrar {/*TODO: PONER ICONO */}</Button>
          </VStack>
        </VStack>
      </GridItem>

      <GridItem
        colSpan={1}
        colStart={2}
        minWidth={"400px"}
        textAlign={"justify"}
      >
        <Center>
          <VStack spacing="10" w="60%" mt="5">
            <Heading>Crea una nueva reunión</Heading>
            <Text fontSize={"xl"}>
              Mucho texto muchisimo texto extremada unidad de texto
              tremendamente largo para rellenar no te voy a engañar
            </Text>
            <VStack align={"left"}>
              <Input
                placeholder="Nombre de la reunión"
                w="200px"
                maxLength={4}
                bgColor="primary"
                color="white"
                _placeholder={{ color: "whiteAlpha.700" }}
              />
              <Button>
                Crear
                <Icon ml="5px" />
              </Button>
            </VStack>
          </VStack>
        </Center>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
