import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const HeadLanding: React.FC = () => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
    const [menu, setMenu] = useState<boolean>(false);
    const navigate = useNavigate(); // Corrected variable name

    useEffect(() => {
        const handleSize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleSize);

        return () => {
            window.removeEventListener("resize", handleSize);
        };
    }, [screenWidth]);

    
   const homealong=()=>{
       navigate("/")
    }

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const handleNavigate = () => {
        navigate("/");
        toggleMenu();
    };

    const handleAbout = () => { // Corrected function syntax
        toggleMenu();
    };

    const handleCont = () => { // Corrected function syntax
        toggleMenu();
    };

    const handleblogs = () => { // Corrected function syntax
        navigate("/dashboard")
        toggleMenu();
    };
    const loginnn=()=>{
        navigate("/login")
    }
    const signnup=()=>{
        navigate("/signup")
    }

    const Main = {
        width:screenWidth<=1200?"100%":"1440px",
        color: "#543ee0",
        display: "flex",
        justifyContent: screenWidth <= 1200 ? "space-between" : "none",
        height: screenWidth<=1200?"85px":"60px",
        border: "1px solid rgba(208, 208, 208, 1)",
        alignItems: "center",
        
    };

    const Logo = {
        fontSize: {
            xs: "22px",
            sm: "24px",
            md: "27px",
            lg: "31px"
        },
        fontWeight: '600',
        color: '#543EE0',
        cursor: 'pointer',
        width: screenWidth<1200?"auto":"214px",
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        height: {
            lg: "72px"
        },
        marginLeft: {
            lg: "72px"
        },
        marginTop: {
            lg: "13px"
        },
        marginRight: {
            lg: "250px"
        }
    };

    const handlelogin = {
        paddingBlock: screenWidth <= 600 ? "7px" : screenWidth <= 1000 ? "8px" : "10px",
        paddingInline: screenWidth <= 600 ? "12px" : screenWidth <= 1000 ? "18px" : "25px",
        border: "1px solid #543EE0",
        borderRadius: { lg: "8px" },
        textAlign: "center",
        cursor:"pointer",
        "&:hover":{
            color: "white",
            backgroundColor: "#543ee0",
        },
    };

    const nav = {
        width: screenWidth<=1200?"auto":"805px",
        display: "flex",
        alignItems: "center",
        height: {
            lg: "56px"
        },
        justifyContent:"flex-end",
        gap:screenWidth<=1200?"auto":"100px",
        fontFamily: 'DM Sans',
        marginRight:screenWidth<=600?"10px":"0"
    };

    const handlesignup = {
        padding: screenWidth <= 600 ? "5px" : screenWidth <= 1000 ? "8px" : "10px",
        border: "1px solid #543EE0",
        borderRadius: { lg: "8px" },
        color: "white",
        backgroundColor: "#543EE0",
        textAlign: "center",
        cursor:"pointer",
        "&:hover":{
            color: "#543ee0",
            backgroundColor: "white",
        },
        display:screenWidth<=600?"none":"block"
    };

    const navli = {
        color: "rgba(17, 17, 17, 1)",
        width: "350px",
        height: {
            lg: "24px"
        },
        fontSize: {
            lg: "16px"
        },
        fontFamily: 'DM SANS',
        fontWeight: {
            lg: "700"
        },
        lineHeight: {
            lg: "24px"
        },
        display: screenWidth <= 1200 ? "none" : "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap:"30px"
    };

    const logbtn = {
        display: "flex",
        gap: screenWidth <= 600 ? "15px" : screenWidth <= 1000 ? "20px" : "30px",
        width: { lg: "338px" },
        fontSize: screenWidth <= 600 ? "20px" : screenWidth <= 1000 ? "23px" : "30px",
        lineHeight: { lg: "27px" },
        marginLeft: {
            xs: "10px"
        }
    };

    const HEAD = {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
    };
    return (
        <div id='home'>
        <Box sx={Main} >
            <Box sx={Logo}>BLOGCHAT</Box>

            <Box sx={nav}>
                <Box sx={navli}>
               <Typography onClick={homealong}   sx={{fontFamily:"DM Sans",cursor:"pointer", fontSize:"22px", fontWeight:"600", color:"#111111", ":hover":{color:"blue", }}}>Home</Typography>
                    <a href="#about" style={{textDecoration:"none"}} > <Typography  sx={{fontFamily:"DM Sans",cursor:"pointer", fontSize:"22px", fontWeight:"600", color:"#111111", ":hover":{color:"blue", }}}>About</Typography></a>
                    <a href="#contact" style={{textDecoration:"none"}} > <Typography  sx={{fontFamily:"DM Sans",cursor:"pointer", fontSize:"22px", fontWeight:"600", color:"#111111", ":hover":{color:"blue", }}}>Contact</Typography></a>
                    <Typography onClick={handleblogs} sx={{fontFamily:"DM Sans",cursor:"pointer", fontSize:"22px", fontWeight:"600", color:"#111111", ":hover":{color:"blue", }}}>Blogs</Typography>
                </Box>
                <Box sx={{ display: screenWidth >= 1200 ? "none" : "block", marginTop: screenWidth <= 600 ? "5px" : "10px" }}>
                    <Box onClick={toggleMenu}>
                        <MenuIcon sx={{ fontSize: "30px" }} ></MenuIcon>
                    </Box>
                </Box>
                <Box sx={logbtn}>
                    <Box sx={handlelogin} onClick={loginnn}>Log in</Box>
                    <Box sx={handlesignup} onClick={signnup}>Sign up</Box>
                </Box>
            </Box>
            {menu && (
                <Box sx={{ position: "absolute", top: "0", backgroundColor: "white", width: "100vw", height: "100vh" }}>
                    <Box sx={HEAD}>
                        <Typography sx={{ fontSize: screenWidth < 400 ? "18px" : "20px", color: "blue", fontWeight: "bold" }}>BLOGCHAT</Typography>
                        <Typography><CloseIcon onClick={toggleMenu} sx={{ fontSize: screenWidth < 400 ? "26px" : "30px" }} /></Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", width: "50%", marginInline: "auto", gap: screenWidth <= 400 ? "25px" : "35px", alignItems: "center", marginTop: "30px" }}>
    <Typography sx={{ fontSize: screenWidth < 420 ? "18px" : "20px", fontFamily: "DANS SANS", fontWeight: "600", color: "darkblue", cursor: "pointer", ":hover": { padding: "4px", backgroundColor: "blue", color: "white" } }} onClick={handleNavigate}>
        Home
    </Typography>
    <a href="#about" style={{textDecoration:"none"}} >
    <Typography sx={{ fontSize: screenWidth < 420 ? "18px" : "20px", fontFamily: "DANS SANS", fontWeight: "600", color: "darkblue", cursor: "pointer", ":hover": { padding: "4px", backgroundColor: "blue", color: "white" } }} onClick={handleAbout}>
        About
    </Typography>
    </a>
    <a href="#contact" style={{textDecoration:"none"}} >
    <Typography sx={{ fontSize: screenWidth < 420 ? "18px" : "20px", fontFamily: "DANS SANS", fontWeight: "600", color: "darkblue", cursor: "pointer", ":hover": { padding: "4px", backgroundColor: "blue", color: "white" } }} onClick={handleCont}>

        Contacts
    </Typography>
    </a>
    <Typography sx={{ fontSize: screenWidth < 420 ? "18px" : "20px", fontFamily: "DANS SANS", fontWeight: "600", color: "darkblue", cursor: "pointer", ":hover": { padding: "4px", backgroundColor: "blue", color: "white" } }} onClick={handleblogs}>

        Blogs
    </Typography>
</Box>

                </Box>
            )}
        </Box>


        </div>
    );
};

export default HeadLanding;

