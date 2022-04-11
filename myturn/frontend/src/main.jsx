import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './main.css'
import { ChakraProvider } from '@chakra-ui/react'

import theme from './styles/theme'

ReactDOM.render(

    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
,
  document.getElementById('root'),
)

