import { Box, Typography } from '@mui/material'
import React,{useEffect, useState} from 'react'
import img1 from "../assets/Photo/carbon_analytics(1).jpg"
import img2 from "../assets/Photo/fluent_people-community-32-filled.jpg"
import img3 from "../assets/Photo/Vector.jpg"
const Subthree :React.FC= () => {
    const [screenWidth, setScreenWidth]=useState<number>(window.innerWidth)

    useEffect(()=>{
        const HandleSize=()=>{
            setScreenWidth(window.innerWidth)
        };
         window.addEventListener("resize",HandleSize)
    
         return window.removeEventListener("resize", HandleSize)
        },[screenWidth])
        const typo2={
          fontSize:screenWidth <= 600 ? "18px" :screenWidth <= 1200 ? "20px" : "24px",
          lineHeight:screenWidth<=1000?"25px":"35px",
          wordSpacing:".1rem",
          fontWeight:"400",
          fontFamily:"DM Sans",
          color:"#111111"
      }
  return (
    <div style={{
      marginInline:"auto"
    }}>
      <Box
        sx={{
  width: screenWidth<=600?"80%":screenWidth<=1200?"90%":"75%", marginBlock:screenWidth<=1000?"25px":"40px", marginInline:"auto"

        }}
      
      >
        <Box>
              <Typography sx={{textAlign:"center", fontWeight:"600", fontSize:screenWidth <= 600 ? "30px" :screenWidth <= 1200 ? "35px" : "42px"
               , marginBottom:screenWidth<=1000?"15px":"20px"}}>Why you should join BlogChat</Typography>
              <Typography sx={typo2}>
              Our goal is to make writers and readers see our platform as their next heaven for blogging, ensuring ease in interactions, connecting with like-minded peers, have access to favorite content based on interests and able to communicate your great ideas with people
              </Typography>
              </Box>
              <Box 
              sx={{
                display: screenWidth<=1000?"block":"flex",
                flexDirection: screenWidth<=1000?"column":"row",
                justifyContent:"space-between",
                gap:"25px",
                marginInline:"auto",
                width: screenWidth<=900?"70%":"100%",
                marginBlock:screenWidth<=1200?"30px":"70px",
                
              }}>
                <Box 
                sx={{
                    width: screenWidth<=600?"100%":screenWidth<=1200?"300px":"400px",
                    minHeight:screenWidth<=900?"250px":"324px",
                    marginBottom:screenWidth<1000?"80px":"0"
                    
                }}>
                    <div
                     style={{
                        width:screenWidth<=600?"75px":screenWidth<=1200?"80px":"92px", height:screenWidth<=600?"75px":screenWidth<=1200?"80px":"88px", backgroundColor:" rgba(214, 209, 248, 0.2)",marginInline:"auto",
                        borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center"
    
                    }}
                    >
                        
                       <Box sx={{width:screenWidth<=600?"40px":screenWidth<=1200?"42px":"50px", height:screenWidth<=600?"40px":screenWidth<=1200?"44px":"50px",}}
                       ><img src={img1} alt='img carbon' style={{width:"100%", height:"100%"}}></img></Box> 
                        
                    </div>

                    <Typography 
                    sx={{
                        fontFamily:"DM sans ", fontSize:screenWidth<1000?"18px":"22px", fontWeight:"600",marginBlock:screenWidth<=900?"10px":"20px"
                    }}>Analytics</Typography>
                    <Typography sx={{
                        fontFamily:"DM Sans", fontSize:screenWidth<=900?"16px":"18px"
                    }}>Analytics to track the number of views, likes and comment and also analyze the performance of your articles over a period of time</Typography>
                </Box>
                <Box
                 sx={{
                  width: screenWidth<=600?"100%":screenWidth<=1200?"300px":"400px",
                  minHeight:screenWidth<=900?"250px":"324px",
                  marginBottom:screenWidth<1000?"80px":"0"
                }}>
                <div
                 style={{
                    width:screenWidth<=600?"75px":screenWidth<=1200?"80px":"92px", height:screenWidth<=600?"75px":screenWidth<=1200?"80px":"88px", backgroundColor:" rgba(214, 209, 248, 0.2)",
                    borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", marginInline:"auto"

                }}
                >
                    <Box
                    sx={{
                        width:screenWidth<=600?"40px":screenWidth<=1200?"42px":"50px", height:screenWidth<=600?"40px":screenWidth<=1200?"44px":"50px",
                    }}>

                        <img src={img2} alt="img two" style={{width:"100%", height:"100%"}}></img>
                    </Box>
                    </div>

                    <Typography
                      sx={{
                        fontFamily:"DM sans ", fontSize:screenWidth<1000?"18px":"22px", fontWeight:"600",marginBlock:screenWidth<=900?"10px":"20px"
                    }}
                    >Analytics</Typography>
                    <Typography
                    sx={{
                        fontFamily:"DM Sans", fontSize:screenWidth<=900?"16px":"18px"
                    }}>
                    Users on the platform can interact with posts they like, comment and engage in discussions                    </Typography>
                </Box>
                <Box
                 sx={{
                  width: screenWidth<=600?"100%":screenWidth<=1200?"300px":"400px",
                  minHeight:screenWidth<=900?"250px":"324px",
                  marginBottom:screenWidth<1000?"80px":"0"
                }}>
                <div 
                style={{
                    width:screenWidth<=600?"75px":screenWidth<=1200?"80px":"92px", height:screenWidth<=600?"75px":screenWidth<=1200?"80px":"88px", backgroundColor:" rgba(214, 209, 248, 0.2)",
                    borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", marginInline:"auto"

                }}
                >
                    <Box 
                    sx={{
                        width:screenWidth<=600?"40px":screenWidth<=1200?"42px":"50px", height:screenWidth<=600?"40px":screenWidth<=1200?"44px":"50px",
 
                    }}
                    >
                        <img src={img3} alt="img three" style={{width:"100%", height:"100%"}}></img>

                    </Box>
                    </div>

                    <Typography
                      sx={{
                        fontFamily:"DM sans ", fontSize:screenWidth<1000?"18px":"22px", fontWeight:"600",marginBlock:screenWidth<=900?"10px":"20px"
                    }}
                    >Content creation</Typography>
                    <Typography 
                         sx={{
                            fontFamily:"DM Sans", fontSize:screenWidth<=900?"16px":"18px"
                        }}>
                    Write nice and appealing with our in-built markdown, a rich text editor
                    </Typography>
                </Box>
              </Box>
      </Box>
    </div>
  )
}

export default Subthree
