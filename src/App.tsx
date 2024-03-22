import React from 'react'
import { BrowserRouter } from "react-router-dom";
import Root from './Router/Root';
import { ThemeProvider } from '@mui/material/styles';
import Theme from './Component/Custom';

const App:React.FC=()=> {
  return (
    <div>
    <ThemeProvider theme={Theme}>
            <BrowserRouter>    
          <Root></Root>    
       </BrowserRouter> 
    </ThemeProvider>
     </div>
  )
}

export default App