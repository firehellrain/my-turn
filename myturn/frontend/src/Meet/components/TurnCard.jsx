import { Avatar,Box, HStack,Text } from '@chakra-ui/react'
import React from 'react'

const TurnCard = () => {
  return (
      <HStack w="50%" maxWidth={"800px"} h="70px">
          <Avatar/>
            <Text>Ha pedido un turno</Text>
      </HStack>
  )
}

export default TurnCard