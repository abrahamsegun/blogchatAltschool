import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"

const NotFound :React.FC= () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
   useEffect(() => {
       const handleResize = () => {
         setScreenWidth(window.innerWidth);
       };
   
       window.addEventListener('resize', handleResize);
   
       return () => {
         window.removeEventListener('resize', handleResize);
       };
     }, []);
  return (
    <div style={{width:"50%", minHeight:"40%", margin:"auto", display:"flex", flexDirection:"column",
    justifyContent:"center",marginBlock:"20px"
    }}>
      <h3 style={{color:"red", marginBottom:"1rem"}}>404 Error - Page Not Found</h3>
      <div className='found'>
      <p style={{fontFamily:"DANS SANS", fontSize:"16Ppx", marginBottom:"1rem"}}>The page you are looking for does not exist.</p>
      <p style={{fontFamily:"DANS SANS", fontSize:"16Ppx", marginBottom:"1rem"}}>Don't panic you can go to the home page </p>

      </div>
      <Link to='/'><button
      style={{padding:screenWidth<=600?"7px":screenWidth<=1000?"10px":"15px", fontSize:screenWidth<=900?"17px":"20px", backgroundColor:"grey", border:"1px solid grey"
    , borderRadius:screenWidth<=900 ?"10px":"14px"
    }}
       className="btn">Go Home</button></Link>
      
    </div>
  )
}

export default NotFound
