import React, { useEffect, useState } from 'react';
import { Typography, Button, Divider, Box, TextField, IconButton, InputAdornment } from '@mui/material';
import Loginpic from "../../assets/Photo/womanwriting.jpg";
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import { UserCredential, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate} from 'react-router-dom';
import { useStore } from '../../ZustandStore/StoreZusatnd';
import { Auth} from '../../Auth/Auth';
import { UserAuth } from '../../Auth/Context';




const Login :React.FC= () => {
  const { User } = useStore();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [email, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [EmailError, setEmailError] = useState<boolean>(false)
  const [PasswordError, setPasswordError]=useState<boolean>(false);
  const {googleSignin, user}= UserAuth()

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePasswordReset = async () => {
    try {
      if (email === "") {
        alert("Please enter your email address");
        return;
      }
  
      await sendPasswordResetEmail(Auth, email);
      alert("Password reset email sent successfully");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Failed to send password reset email. Please try again.");
    }
  };


  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(Auth, email, password);
      const user: any = userCredential.user;
  
      if (user) {
        
        if (user && user.displayName) {
          alert(`User ${user.displayName} successfully signed in!`);
        } else {
          console.error("User object or displayName is missing.");
        }
        if (user?.displayName) {
          // Set the displayName in your Zustand store
          await useStore.setState((state) => ({
            ...state,
            User: { ...state.User, DisplayName: user.displayName }
          }));
        
        }

        
        
        setMail("");
        setPassword("");
  
        if (!user.email) {
          setEmailError(true);
          return;
        }
  
        setEmailError(false);
        navigate("/dashboard");
      }
  
    } catch (error: any) {
      alert(error);
      return;
    }
  };
  
    // Handle empty email condition or email error
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
    if(User.Email ==""){
      setEmailError(false)       
}
    
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (password.trim().length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false); // Reset PasswordError when password length is greater than or equal to 8
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignin();

    } catch (error: any) {
      alert('Error signing in with Google: ' + error.message);
    }
  };
  useEffect(()=>{
    if(user!== null){
     navigate("/dashboard")
    }
     }, [user])


  const loginMain = {
    minHeight: '100vh',
    marginInline: screenWidth <= 1200 ? '20px' : 'auto',
    backgroundColor: '#F8FAFC',
  };

  const boxNav = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: {
      xs: "100%",
      md: "80%"
    },
    marginInline: "auto",
    height: "8vh",
  };

  const title = {
    fontSize: {
      xs: "22px",
      sm: "24px",
      md: "27px",
      lg: "31px"
  },
    fontWeight: '600',
    color: '#543EE0',
    cursor: 'pointer',
  };
  const RegBtn={
    width: screenWidth <= 600 ? "150px": screenWidth <= 900 ? "170px":"200px",
    height:screenWidth <= 600 ? "48px": screenWidth <= 900 ? "52px":"60px",
    FontFamily:"DM SANS",
    FontWeight:"700",
    fontSize:screenWidth <= 600 ?"17px":screenWidth <= 1000 ?"20px":"22px",
    lineHeight:"27px",
    padding:"8px 16px 8px 16px",
    borderRadius:screenWidth <= 600 ?"8px":screenWidth <= 1000 ?"10px":"12px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#543ee0",
  border:"none",
    marginBlock:screenWidth <= 600 ?"17px":screenWidth <= 1000 ?"20px":"22px"
  }


  return (
    <Box sx={{  backgroundColor: 'rgb(248, 250, 252)'}}>
         <Box sx={loginMain} maxWidth="xl">
        <Box
          style={{
            backgroundColor: "rgb(248, 250, 252)",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <div>
            <Box sx={boxNav}>
              <Typography sx={title} onClick={() => { navigate("/") }}> BLOGCHAT</Typography>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-around", gap: { sm: "25px", md: "35px" }, alignItems: "center" }}>
              </Box>
            </Box>
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "4%", mt: "2rem", marginLeft: screenWidth <= 600 ? '10px' : screenWidth <= 900 ? '20px' : 'auto',paddingInline: screenWidth <= 600 ? '10px' : screenWidth <= 900 ? '20px' : 'auto', }}>
            <Box sx={{ display: screenWidth >= 1000 ? "block" : "none", width: "55%" }}>
              <img
                src={Loginpic}
                alt="healthcare pics"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Box sx={{ width: (screenWidth >= 1000 ? "40%" : (screenWidth >= 600 ? "80%" : "100%")) }}>
              <Box>
                <Box
                  sx={{
                    paddingBlock: "1rem"

                  }}>
                  <Typography sx={{ textAlign: "center", fontSize: { xs: "15px", sm: "18px", md: "20px", lg: "22px" } }}>Log in with</Typography>

                  <Box sx={{ textAlign: "center", color: "#9EA0A5", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: { xs: "15px, sm:20px", md: "25px" } }}>
                    <Button sx={{ fontSize: { xs: "15px", sm: "17px", md: "19px", lg: "22px" } }} onClick={handleGoogleSignIn}><GoogleIcon></GoogleIcon><Typography sx={{ paddingLeft: ".3rem" }}>Google</Typography></Button>
                    <Divider orientation="vertical" variant="middle" flexItem ></Divider>
                    <Button sx={{ fontSize: { xs: "15px", sm: "17px", md: "19px", lg: "22px" } }} ><EmailIcon></EmailIcon><Typography sx={{ paddingLeft: ".3rem" }}>Email</Typography></Button>
                  </Box>
                  <Typography sx={{ textAlign: "center", fontSize: { xs: "15px", sm: "18px", md: "20px", lg: "22px" } }}>or</Typography>
                  <Box>
                    <Box>
                      <Typography>Email</Typography>
                      <TextField
                        label="Enter your email "
                        fullWidth
                        margin="normal"
                        name="username"
                        onChange={handleEmailChange}
                        required
                        inputProps={
                          {
                            style: {
                              backgroundColor: "white",
                              color: "black"
                            }
                          }
                        }
                      />
                    </Box>
                    <Box sx={{ display: EmailError === true ? "block" : "none" }}>
                        <Typography>Invalid Email! Please enter a valid email address.</Typography>
                    </Box>
                    <Box>
                      <Typography>Password</Typography>
                      <TextField
                        label="Enter your password "
                        fullWidth
                        margin="normal"
                        name="password"
                        onChange={handlePasswordChange}
                        required
                        value={password}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleTogglePasswordVisibility}>
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                          style: { backgroundColor: "white", color: "black" }
                        }}
                      />
                    </Box>
                    <Box sx={{ display: PasswordError === true ? "block" : "none" }}>
                        <Typography>Invalid Password! Please enter a valid Password.</Typography>
                    </Box>
                    <Typography sx={{color:"blue",marginBottom:screenWidth<=600?"10px":"15px"}} onClick={handlePasswordReset}>Forget Password?</Typography>
                  </Box>
                  <Box sx={{display:"flex", width:"100%", justifyContent:"center"}}>
                  <button style={RegBtn} onClick={handleSubmit}>Log in</button>
                  </Box>
              <Box sx={{display:"flex", justifyContent:"space-between",alignItems:"center", marginBlock:screenWidth<=600?"10px":"15px"}}>
            <Typography>Don't have an account?</Typography><Button sx={{padding:screenWidth<=900 ?"10px": "15px",":hover":{backgroundColor:"white", color:"blue"}}} onClick={() => navigate("/signup")}>Sign up</Button>

              </Box>
          <Box sx={{ marginLeft: screenWidth <= 600 ? '10px' : screenWidth <= 900 ? '20px' : 'auto',paddingInline: screenWidth <= 600 ? '10px' : screenWidth <= 900 ? '20px' : 'auto',}}>
            <Typography>By signing in with an account, you agree to HealthpathFinder's Terms of Service, Privacy Policy, and Acceptable Use Policy.</Typography>
          </Box>
                  
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
    </Box>
    </Box>
  )
}

export default Login





