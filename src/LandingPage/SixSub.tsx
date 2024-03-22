import { Box, Typography } from '@mui/material'
import React,{useEffect, useState} from 'react'

const SixSub :React.FC= () => {

    const [screenWidth, setScreenWidth]=useState<number>(window.innerWidth)

    useEffect(()=>{
        const HandleSize=()=>{
            setScreenWidth(window.innerWidth)
        };
         window.addEventListener("resize",HandleSize)
    
         return window.removeEventListener("resize", HandleSize)
        },[screenWidth])
  return (

    <div id='contact'>
      <Box 
          sx={{
            width:"100%",
            height:screenWidth<=1200?"max-content":"402px",
            backgroundColor:"rgba(255, 237, 204, 0.5)",
            textAlign:screenWidth<=1200?"center":"none",
            display: screenWidth<=1200?"block":"flex",
            justifyContent:"space-between",
           paddingInline:"auto",
            paddingBlock:screenWidth<= 600?"2rem":screenWidth<1200?"2.2rem":"2.5rem"
          }}
      >
         <Box sx={{
            display:screenWidth<1200?"none":"Block",
            width:"20%", fontWeight:"700", color: "blue",marginLeft:"30px",marginTop:"30px",
            fontSize:"30px"
         }}>
            BLOGCHAT
         </Box>
         <Box sx={{
            display:screenWidth<=1200?"block":"flex", 
            width:"100%",
            justifyContent:"space-around"

         }}
              
         >
              <Box sx={{marginBottom:screenWidth<=900?"20px":"24px",

                
            }}>
                <Typography sx={{ fontWeight:"800",cursor:"pointer",
                    fontFamily:"DM Sans", fontSize:screenWidth<=600?"19px":screenWidth<=1200?"20px":"24px", 
                     lineHeight:screenWidth<=1000?"27px":"36px", marginBottom:screenWidth<=600?"15px":screenWidth<=1200?"18px":"22px"
                }}>Explore</Typography>
                <Typography sx={{ fontWeight:"bold",cursor:"pointer",fontFamily:"DM Sans", fontSize:screenWidth<1000?"15px":"18px", color:"#111111", marginBottom:screenWidth<=900?"8px":"12px"}}>Commuinity</Typography>
                <Typography sx={{ fontWeight:"bold",cursor:"pointer",fontFamily:"DM Sans", fontSize:screenWidth<1000?"15px":"18px", color:"#111111", marginBottom:screenWidth<=900?"8px":"12px"}}>Trending blogs</Typography>
                <Typography sx={{ fontWeight:"bold",cursor:"pointer",fontFamily:"DM Sans", fontSize:screenWidth<1000?"15px":"18px", color:"#111111", marginBottom:screenWidth<=900?"8px":"12px"}}>BlogChat for teams</Typography>
              </Box>

              <Box sx={{marginBottom:screenWidth<=900?"20px":"24px",}}>
                <Typography
                sx={{
                    fontFamily:"DM Sans", fontSize:screenWidth<=600?"19px":screenWidth<=1200?"20px":"24px", fontWeight:"800",
                    lineHeight:screenWidth<=1000?"27px":"36px", marginBottom:screenWidth<=600?"15px":screenWidth<=1200?"18px":"22px"
                }}
                >Support</Typography>
                <Typography sx={{ fontWeight:"bold",cursor:"pointer",fontFamily:"DM Sans", fontSize:screenWidth<1000?"15px":"18px", color:"#111111", marginBottom:screenWidth<=900?"8px":"12px"}}>Join Slack</Typography>
                <Typography sx={{ fontWeight:"bold",cursor:"pointer",fontFamily:"DM Sans", fontSize:screenWidth<1000?"15px":"18px", color:"#111111", marginBottom:screenWidth<=900?"8px":"12px"}}>Contact</Typography>
              </Box> 


              <Box sx={{marginBottom:screenWidth<=900?"20px":"24px",}}>
                <Typography
                sx={{
                    fontFamily:"DM Sans", fontSize:screenWidth<=600?"19px":screenWidth<=1200?"20px":"24px", fontWeight:"800",
                    lineHeight:screenWidth<=1000?"27px":"36px", marginBottom:screenWidth<=600?"15px":screenWidth<=1200?"18px":"22px"
                }}
                >Official blog</Typography>
                <Typography sx={{ fontWeight:"bold",cursor:"pointer",fontFamily:"DM Sans", fontSize:screenWidth<1000?"15px":"18px", color:"#111111", marginBottom:screenWidth<=900?"8px":"12px"}}>Official blog</Typography>
                <Typography sx={{ fontWeight:"bold",cursor:"pointer",fontFamily:"DM Sans", fontSize:screenWidth<1000?"15px":"18px", color:"#111111", marginBottom:screenWidth<=900?"8px":"12px"}}>Engineering blogs</Typography>
              </Box>
         </Box>
      </Box>
    </div>
  )
}

export default SixSub