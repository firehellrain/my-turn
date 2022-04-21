import { Button,Center } from '@chakra-ui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'

const Profile = () => {
const history = useHistory();

  return (
    <Center mt="15vh">
        <Button w="300px" h="70px" fontSize="2xl" colorScheme={"messenger"} onClick={() => {window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";}}>Panel de configuración</Button>
    </Center>
  )
}

export default Profile