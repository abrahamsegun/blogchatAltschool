import React from 'react'
import { Box } from '@mui/material'
import HeadLanding from './HeadLanding'
import SubOne from './SubOne'
import SubTwo from './SubTwo'
import Subthree from './Subthree'
import SubFour from './SubFour'
import Fivesub from './Fivesub'
import SixSub from './SixSub'



const LandingPage :React.FC= () => {
  const Main={
    backgroundClor:"rgba(255, 255, 255, 1)",
    width:{
      lg:"1440px"
    },
    margin:"0 auto"
  }
  return (
    <Box sx={Main}>
      <HeadLanding></HeadLanding>
      <SubOne></SubOne>
      <SubTwo></SubTwo>
      <Subthree></Subthree>
      <SubFour></SubFour>
     <Fivesub></Fivesub>
     <SixSub></SixSub>
    </Box>
  )
}

export default LandingPage
