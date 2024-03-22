import React,{useEffect, useState} from 'react'
import { Box, Typography } from '@mui/material'
import fineman from "../assets/Photo/fineman.png"
import { useNavigate } from 'react-router-dom'



const SubFour :React.FC= () => {
    const [screenWidth, setScreenWidth]=useState<number>(window.innerWidth)
    const navigate = useNavigate();
    useEffect(()=>{
        const HandleSize=()=>{
            setScreenWidth(window.innerWidth)
        };
         window.addEventListener("resize",HandleSize)
    
         return window.removeEventListener("resize", HandleSize)
        },[screenWidth])
        const handlestart=()=>{
          navigate("/signup")
      }
        const btn1={
          cursor:"pointer",
          width:{
              xs:"200px",
              sm:"220px",
              md:"230px",
              lg:"290px"
          },
          color:" rgba(255, 255, 255, 1)",
          backgroundColor:"#543ee0",
          height:{
              xs:"48px",
              sm:"48px",
              md:"50px",
              lg: "56px"
          },
          FontFamily:"DM SANS",
          FontWeight:"700",
          fontSize:screenWidth <= 600 ?"17px":screenWidth <= 1000 ?"20px":"22px",
          lineHeight:"27px",
          padding:"8px 16px 8px 16px",
          borderRadius:screenWidth <= 600 ?"8px":screenWidth <= 1000 ?"10px":"12px",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          marginLeft:screenWidth<1000?"10px":"15px",
          marginBlock:screenWidth<= 600?"1.5rem":screenWidth<=1000?"2rem":"2.3rem"
      }
  return (
    <div>
      <Box sx={{width:screenWidth<1000?"100%":"85%", backgroundColor:"rgba(255, 237, 204, 0.5)",
      paddingBlock:screenWidth<= 600?"2rem":screenWidth<1200?"2.2rem":"2.5rem", marginInline:"auto"
    }}>
          <Box sx=
          {{
            display:screenWidth<=1000?"block":"flex", justifyContent:"space-between", alignItems:"center"
          }}>
            <Box sx={{width:screenWidth<=600?"250px": screenWidth<=1000?"320px":"350px" , height:screenWidth<=600?"250px": screenWidth<=1000?"320px":"350px", 
          marginInline:"auto", borderRadius:"50%", marginBottom:screenWidth<1000?"1rem":"1.4rem"
          }}>
            <img src={fineman} alt="fineman pic" style={{width:"100%", height:"100%", borderRadius:"50%"}}></img>

            </Box>
            <Box sx={{marginBottom:screenWidth<1000?"1rem":"1.5rem", width:screenWidth<=1200?"100%":"50%"}}>
                <Typography
                sx={{
                  width:"100%",
                  fontSize:screenWidth<=900?"16px":"20px", lineHeight:"160%",paddingLeft:screenWidth<1000?"10px":"15px",
                  marginBottom:screenWidth<1000?".6rem":"1rem", textAlign:screenWidth<=1000?"center":"left", fontWeight:"600"
                }}
                >
                "BlogChat has become an integral part of my online experience. As a user of this incredible blogging platform, I have discovered a vibrant community of individuals who are passionate about sharing their ideas and engaging in thoughtful discussions.”
                </Typography>
                <p style={{fontSize:screenWidth<=900?"16px":"18px", lineHeight:"160%",paddingLeft:screenWidth<1000?"10px":"15px",fontWeight:"600",textAlign:screenWidth<=1000?"center":"left"}}>Adebobola Muhydeen, <span>Software developer at Apple</span> </p>
                <Box sx={btn1} onClick={handlestart} >Join BlogChat</Box>

         
              
            </Box>
          </Box>
      </Box>
    </div>
  )
}

export default SubFour
