import React,{useEffect, useState} from 'react'
import { Box, Typography } from '@mui/material'
import { BlogPage } from '../../Default';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {useAuthState} from"react-firebase-hooks/auth";
import { Auth } from '../../Auth/Auth';



const auth = getAuth();


const Dashboard :React.FC= () => {
  const presentUser= useAuthState(Auth)
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
   const nagivate= useNavigate();
    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
      const feed=()=>{

      }
      const RecentBlogs=()=>{
        nagivate("/dashboard")
      }
      const BookMarks=()=>{
        nagivate("/bookmarks")
        
      }
    
      const Analys=()=>{
        
      }
      const handleNOTUSER=()=>{
        nagivate("/login")
      }

    
      const account=()=>{
        nagivate("/accountupdate")
      }
      const noft=()=>{
        
      }
      const handlelogeout=()=>{
        signOut(auth).then(() => {
         nagivate("/");
        }).catch((error:any) => {
          console.error(error.message)
        });
      }

      const writeaBlog=()=>{
        nagivate("/admin/blog");
      }

      const Main={
        MaxWidth:"1440px",
          width: screenWidth <= 900  ? "100vw" :screenWidth <= 1200  ? "1000px" :"1440px",
          minWidth: screenWidth <= 900  ? "auto" :screenWidth <= 1200  ? "1050px" :"1240px",
          fontFamily:"DM SANS",
          minHeight:"100vh" ,
          display:"flex",
          gap:"0",
          marginInline:"auto",
          backgroundColor:"white",
          borderRight:"1.5px solid lightpink  "

       
        

      }
      const mainleft={
        width: screenWidth <= 900  ? "25%" :screenWidth <= 1200  ? "250px" :"300px",
        fontFamily:"DM SANS",
        backgroundColor:"lightpink",
        paddingLeft:screenWidth <= 900  ? "10px" :"15px",
        paddingTop:screenWidth <= 900  ? "12px" :"20px",
      }
      const MainRight={
        width: screenWidth <= 900  ? "75%" :screenWidth <= 1200  ? "750px" :"1140px",
        fontFamily:"DM SANS",
        backgroundColor:"#ffffff",
        marginLeft:screenWidth <= 900  ? "10px" :"15px",
        paddingTop:screenWidth <= 900  ? "12px" :"20px",
       border:" 1px solid rgba(208, 208, 208, 1)",
      }
      const title={
        fontSize: screenWidth <= 900  ? "22px" :"24px",
        fontWeight:"600",
        lineHeight: "170%",
        letterSpacing:".06rem",
        marginBottom:screenWidth <= 900  ? "20px" :"30px",
        color:"blue"
      
      }
  const Overview ={
    marginBottom:screenWidth <= 900  ? "20px" :"27px",
    paddingLeft:screenWidth <= 900  ? "12px" :"18px",
    fontSize:screenWidth <= 900  ? "19px" :"22px",
    fontFamily:"DM SANS",
  }
  const personal={
    marginBlock:screenWidth <= 900  ? "15px" :"20px",
    paddingLeft:screenWidth <= 900  ? "12px" :"18px",
    fontSize:screenWidth <= 900  ? "19px" :"22px",
    fontFamily:"DM SANS",

  }
  const box1={
      display:"flex",
      flexDirection:"column",
      gap: screenWidth <= 900  ? "20px" :"30px",
      marginBottom:screenWidth <= 900  ? "20px" :"30px",
      fontSize:screenWidth <= 900  ? "17px" :"19px",
      fontFamily:"DM SANS",
  }
  const box2={
    display:"flex",
    flexDirection:"column",
    gap: screenWidth <= 900  ? "20px" :"30px",
    marginBottom:screenWidth <= 900  ? "20px" :"30px",
    fontSize:screenWidth <= 900  ? "17px" :"19px",
    fontFamily:"DM SANS",
}
const logout={
    color:"red",
    fontSize:screenWidth <= 900  ? "17px" :"19px",
    fontFamily:"DM SANS", cursor:"pointer"
}
       const feed2 ={
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        fontFamily:"DM SANS",
        fontWeight:"400"
        
       }
       const feed3 ={
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        fontFamily:"DM SANS",
        fontWeight:"600"
        
       }

      const Blog={
        heigth: "auto"

      }
      const maniTypo={ cursor: "pointer", ":hover": { backgroundColor: "white", padding:"5px" } }

  return (
    <Box style={Main}>
      { !presentUser ? 

      <>
        <div style={{
          fontSize:"16px", fontFamily:"DM SANS"
        }}><p>Please kindly log in or sign up</p>
          <button onClick={handleNOTUSER}></button>
        </div>
      </>
        :
        <>
        <Box sx={mainleft}>
            <Typography sx={title}  >BLOGCHAT</Typography>
            <Typography sx={Overview} >Overview</Typography>

            <Box sx={box1}>
            <Typography onClick={feed} sx={{ cursor: "pointer", ":hover": { backgroundColor: "white", padding:"5px" } }} />                
            <Typography onClick={RecentBlogs}  sx={maniTypo}>Recents blog</Typography>
                <Typography onClick={BookMarks}  sx={maniTypo}>Bookmarks</Typography>
                <Typography   sx={maniTypo}>Drafts</Typography>
                <Typography onClick={Analys}  sx={maniTypo}>Analytics</Typography>
            </Box>

            <Box sx={box2}>
                <Typography sx={personal}>Personal</Typography>
                <Box onClick={account}  sx={maniTypo}>Account</Box>
                <Box onClick={noft} sx={maniTypo}>Nortifications</Box>
            </Box>

            <Box sx={logout} onClick={handlelogeout}>Log Out</Box>
        </Box>


        {/* Right */}
        <Box sx={MainRight}>
          <Box sx={{width:screenWidth<=900?"100%":screenWidth<=1200?"700px":"1076px", marginInline:"auto", paddingInline: screenWidth<=1000?"0.7rem":"0"}}>
            <Box sx={feed2}>
                <Typography sx={{fontSize:screenWidth <= 900  ? "19px" :"22px",fontFamily:"DM SANS" }}>FEED</Typography>
                <button onClick={writeaBlog} style={{fontSize:screenWidth <= 900  ? "16px" :"18px",border:"none", width:screenWidth <= 900  ? "120px" :"170px", cursor:"pointer", padding:screenWidth <= 900  ? "5px" :"8px",fontFamily:"DM SANS"  }}>Write a blog</button>
            </Box>
            <Box margin={1}
            sx={{ width:"100%", display:"flex", justifyContent:"flex-end"         }}><Typography sx={feed3}
            ><Typography component="span" sx={{fontFamily:"DM Sans", fontWeight:"400", marginRight:".2rem"}}>Welcome,  </Typography> {presentUser[0]?.displayName?.toUpperCase()}</Typography></Box>
            <Box sx={Blog}>
              <BlogPage></BlogPage>
            </Box>

          </Box>
        </Box>
        
        </>
        

      }
    </Box>
  )
}

export default Dashboard
