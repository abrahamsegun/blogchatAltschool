import { Box,Typography } from '@mui/material'
import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import image from"../assets/Photo/unsplash_-2vD8lIhdnw.png"

const SubOne :React.FC= () => {
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
const Main={
    backgroundImage: `URL(${image})`,
    width:{
        sx:"100%",
        md:"100%",
        sm:"100%",
        lg: "1440px",

    },
    height:screenWidth <= 600 ?"650px":screenWidth <= 1000 ?"700px":"765px",
    backgroundColor:"rgba(0, 0, 0, .8)",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundSize: "cover",
      backgroundPosition: " center",
      overFlow:"hidden",
         opacity:"1"
    

}
const sub={
    width:{
        xs:"85%",
        sm:"75%",
        md:"800px",
        lg:"984px"
    },
    height:{
        lg:"332px"
    },
    display:"flex",
    gap:screenWidth <= 600 ?"30px":screenWidth <= 1000 ?"35px":"42px",
    flexDirection:"column"

}
const submain={

}
const typo1={
    fontFamily:"DM Sans",
    fontWeight:"800",
    fontSize:screenWidth <= 600 ?"21px":screenWidth <= 1000 ?"25px":"30px",
    lineHeight:screenWidth <= 600 ?"27px":screenWidth <= 1000 ?"30px":"35px",
    color:"black",
    marginBottom:screenWidth <= 600 ?"15px":screenWidth <= 1000 ?"25px":"30px"
}
const typo2={
    width:{
        lg: "1440px",

    },
    fontFamily:"DM Sans",
    fontWeight:"650",
    fontSize:screenWidth <= 600 ?"17px":screenWidth <= 1000 ?"19px":"22px",
    lineHeight:screenWidth <= 600 ?"27px":screenWidth <= 1000 ?"30px":"35px",
    color:"black"
}
const btn1={
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
    fontFamily:"DM SANS",
    fontWeight:"700",
    fontSize:screenWidth <= 600 ?"17px":screenWidth <= 1000 ?"20px":"22px",
    lineHeight:"27px",
    padding:"8px 16px 8px 16px",
    borderRadius:screenWidth <= 600 ?"8px":screenWidth <= 1000 ?"10px":"12px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
}
    

  return (
   <Box sx={Main}>
      
      <Box sx={sub}>
        <Box sx={submain}>
        <Typography sx={typo1}>
        Welcome to BlogChat: A Haven for Text-Based Content
        </Typography>
        <Typography sx={typo2}>Unleash the Power of Words, Connect with Like-minded Readers and Writers</Typography>

        </Box>
        <Box sx={btn1} onClick={handlestart} >Get Started</Box>
      </Box>

   </Box>
  )
}

export default SubOne
