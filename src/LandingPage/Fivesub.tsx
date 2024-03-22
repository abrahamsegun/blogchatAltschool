import { Box, Typography } from '@mui/material'
import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'



const Fivesub :React.FC= () => {
    const [screenWidth, setScreenWidth]=useState<number>(window.innerWidth)
    const navigate = useNavigate();
    const handlestart=()=>{
        navigate("/signup")
    }
    useEffect(()=>{
        const HandleSize=()=>{
            setScreenWidth(window.innerWidth)
        };
         window.addEventListener("resize",HandleSize)
    
         return window.removeEventListener("resize", HandleSize)
        },[screenWidth])

        const btn1={
            cursor:"pointer",
            width:{
                xs:"150px",
                sm:"170px",
                md:"185px",
                lg:"190px"
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
    <div 
    
    style={{
        marginInline:"auto",
    }}>
        <Box
        sx={{
            height:screenWidth<600?"400px":screenWidth<=1200?"450px":"532px",
            display:"flex", justifyContent:screenWidth<=1200?"center":"space-between", alignItems:"center",
        }}
        >
          <Box sx={{display:screenWidth<=1000?"none":"block"}}>
               
          </Box>
          <Box>
               <Typography
               sx={{width:screenWidth<=600?"auto":screenWidth<=1200?"auto":"655px", height: screenWidth<=1200?"auto":"222px",
               fontSize:screenWidth<=900?"24px":"40px" , fontWeight:"700", paddingLeft:screenWidth<1000?"10px":"15px",
               marginBottom:screenWidth<1000?"20px":"30px", lineHeight:screenWidth<1200?"48px":"72px"
            }}
               
               >
                Write, read and connect with great minds on BlogChat

               </Typography>
               <Typography
               sx={{paddingLeft:screenWidth<1000?"10px":"15px", width:"90%"}}
               >
       Share people your great ideas, and also read write-ups based on your interests. connect with people of same interests and goals  
               </Typography>
               <Box sx={btn1} onClick={handlestart} >Get Started</Box>
          </Box>
        </Box>
    </div>
  )
}

export default Fivesub
