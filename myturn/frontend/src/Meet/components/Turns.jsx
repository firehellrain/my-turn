import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'

const Turns = ({title}) => {
  return (
    <VStack w="100%"  mt="10">
        <Heading>{title}</Heading>
    </VStack>
  )
}

export default Turns