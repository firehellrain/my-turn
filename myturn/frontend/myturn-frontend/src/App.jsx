import { Text } from '@chakra-ui/react'
import Login from './Auth/Login'
import Navbar from './shared/components/Navbar'
import Fonts from './styles/Fonts'

function App() {


  return (
    <>
      <Fonts/>
      <Navbar/>
      <Login/>
    </>
  )
}

export default App
