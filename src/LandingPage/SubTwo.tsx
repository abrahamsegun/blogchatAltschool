import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import img2 from "../assets/Photo/unsplash_87gLIFoj79c.png"

const SubTwo :React.FC= () => {
    const [screenWidth, setScreenWidth]=useState<number>(window.innerWidth)
    useEffect(()=>{
    const HandleSize=()=>{
        setScreenWidth(window.innerWidth)
    };
     window.addEventListener("resize",HandleSize)

     return window.removeEventListener("resize", HandleSize)
    },[screenWidth])
    const Main ={
        width: "97%" ,
        marginInline:"auto",
        height:screenWidth<=1200?"auto":"404px",
        display:"flex",
        gap: "auto",
        flexDirection:screenWidth <= 900 ? "column" : "row",
        marginTop:screenWidth <= 600 ? "50px" :screenWidth <= 1200 ? "60px" : "80px"
        
    }

    const box1={
        width:{
            lg:"686px"
        },
        height:{
            lg:"268px"
        },

    }
    const typo1={
        fontFamily: "DM Sans",
        color:"#111111",
        marginBottom:screenWidth<=900?"0.7rem":"1rem",
        textAlign:screenWidth<=1200?"center":"left",
        fontWeight:"700",
        fontSize:screenWidth <= 600 ? "30px" :screenWidth <= 1200 ? "35px" : "42px",
        lineHeight:screenWidth <= 1200 ? "60px" : "72px",
        
    }

    const imgbx={
        width:{
            lg:"500px"
        },
        height:{

            lg:"404px"
        },
        borderRadius:{
            lg:"8px"
        },
        marginLeft:{
            lg:"80px"
        },
        display:screenWidth<=1200?"none":"flex"
    }
    const typo2={
        fontSize:screenWidth <= 600 ? "18px" :screenWidth <= 1200 ? "20px" : "24px",
        lineHeight:screenWidth<=1000?"25px":"35px",
        wordSpacing:".1rem",
        fontWeight:"400",
        fontFamily:"DM Sans",
        color:"#111111"
    }
  return (
    <div id='about'>
    <Box sx={Main} >
        <Box sx={box1}>
            <Typography sx={typo1}>About Blogchat</Typography>
            <Typography sx={typo2}>
            <span style={{ fontWeight:"800"}}>BLOGCHAT</span> is a multi-functional platform where authors and readers can have access to their own content. It aims to be a traditional bookworm’s heaven and a blog to get access to more text 
            based content. Our vision is to foster an inclusive and vibrant community where diversity is celebrated. We encourage open-mindedness and respect for all individuals, regardless of their backgrounds or beliefs. By promoting dialogue and understanding, we strive 
            </Typography>
        </Box>
        <Box sx={imgbx}>
            <img src={img2} alt="splash" style={{width:"100%", height:"100%"}} />
        </Box>
    </Box>

    </div>
  )
}

export default SubTwo
