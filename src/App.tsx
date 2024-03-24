import React from 'react'
import { BrowserRouter } from "react-router-dom";
import Root from './Router/Root';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Component/Custom';
import { AuthContextProvider } from './Auth/Context';

const App:React.FC=()=> {
  return (
    <div>
      <AuthContextProvider>
    <ThemeProvider theme={Theme}>
            <BrowserRouter>    
          <Root></Root>    
       </BrowserRouter> 
    </ThemeProvider>
      </AuthContextProvider>
     </div>
  )
}

export default App