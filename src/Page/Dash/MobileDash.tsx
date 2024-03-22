import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { BlogPage } from '../../Default';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const MobileDash: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [menu, setMenu] = useState<boolean>(false);
  const navigate=useNavigate();

  const toggleMenu = () => {
    setMenu(!menu);
  };
  const handleNavigate=()=>{
   navigate("/")
   setMenu(!menu)
  }
  const handleblog=()=>{
    navigate("/dashboard")
    setMenu(!menu)
  }
  const handleAcc=()=>{
    navigate("/accountupdate")
    setMenu(!menu)
  }
  const handlebook=()=>{
    navigate("/bookmarks")
    setMenu(!menu)
  }
  const writeaBlog=()=>{
    navigate("/admin/blog");
  }

  useEffect(() => {
    const handleSize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [screenWidth]);

  const HEAD = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px"
  };

  return (
    <div>
      <Box sx={HEAD}>
        <Typography sx={{ fontSize: screenWidth < 400 ? "17px" : "19px", color: "blue", fontWeight: "bold" }}>BLOGPOST</Typography>
        <Typography><MenuIcon onClick={toggleMenu} sx={{ fontSize: screenWidth < 400 ? "26px" : "30px" }} /></Typography>
      </Box>
      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBlock:"1rem"}}>
                <Typography sx={{fontSize:screenWidth <= 900  ? "19px" :"22px",fontFamily:"DM SANS" }}>FEED</Typography>
                <button onClick={writeaBlog} style={{fontSize:screenWidth <= 900  ? "16px" :"18px",border:"none", width:screenWidth <= 900  ? "120px" :"170px", cursor:"pointer", padding:screenWidth <= 900  ? "5px" :"8px",fontFamily:"DM SANS"  }}>Write a blog</button>
            </Box>
      <BlogPage />
      {menu && (
        <Box sx={{position:"absolute", top:"0", backgroundColor:"white", width:"100vw", height:"100vh"}}>
          <Box sx={HEAD}>
            <Typography sx={{ fontSize: screenWidth < 400 ? "17px" : "19px", color: "blue", fontWeight: "bold" }}>BLOGPOST</Typography>
            <Typography><CloseIcon onClick={toggleMenu} sx={{ fontSize: screenWidth < 400 ? "26px" : "30px" }} /></Typography>
          </Box>
          <Box sx={{display:"flex", flexDirection:"column", width:"50%", marginInline:"auto",
              gap:screenWidth<=400?"25px":"35px", alignItems:"center", marginTop:"30px"
        }}>
            <Typography sx={{fontSize:screenWidth<420?"18px":"20px", fontFamily:"DANS SANS", fontWeight:"600", color:"darkblue",cursor:"pointer", "hover":{padding:"4px", backgroundColor:"blue", color:"white"}}} onClick={handleNavigate} >Home</Typography>
            <Typography sx={{fontSize:screenWidth<420?"18px":"20px", fontFamily:"DANS SANS", fontWeight:"600", color:"darkblue",cursor:"pointer", "hover":{padding:"4px", backgroundColor:"blue", color:"white"}}} onClick={handleblog}>Blogs</Typography>
            <Typography sx={{fontSize:screenWidth<420?"18px":"20px", fontFamily:"DANS SANS", fontWeight:"600", color:"darkblue",cursor:"pointer", "hover":{padding:"4px", backgroundColor:"blue", color:"white"}}} onClick={handlebook}>Bookmarks</Typography>
            <Typography sx={{fontSize:screenWidth<420?"18px":"20px", fontFamily:"DANS SANS", fontWeight:"600", color:"darkblue",cursor:"pointer", "hover":{padding:"4px", backgroundColor:"blue", color:"white"}}} onClick={handleAcc}>Account</Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default MobileDash;
