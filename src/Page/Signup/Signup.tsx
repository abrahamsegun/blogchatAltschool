import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import {  Typography, Button, Divider, TextField, Box, InputAdornment, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RegisterPic from '../../assets/Photo/womanwriting.jpg';
import { createUserWithEmailAndPassword, UserCredential, updateProfile } from 'firebase/auth';
import { collection, setDoc, getDocs,doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Auth, db } from '../../Auth/Auth';
import { useStore } from '../../ZustandStore/StoreZusatnd';
import { v4 as uuidv4 } from "uuid"
declare module 'firebase/auth' {
  interface User {
    updateProfile(profile: { displayName?: string | null; photoURL?: string | null }): Promise<void>;
  }
}
import { UserAuth } from '../../Auth/Context';

const Signup: React.FC = () => {
  const { User, setFirstName, setLastName, setEmail, setPassword, setConfirmPassword, setHasAdminPower, setIsReader, setDocId } = useStore();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [wrongName1, setWrongName1] = useState<boolean>(false);
  const [wrongName2, setWrongName2] = useState<boolean>(false);
  const [wrongNameEM, setWrongNameEM] = useState<boolean>(false);
  const [inputStyle, setInputStyle] = useState<{ [key: string]: string }>({
    backgroundColor: 'white',
    color: 'black'
  });
  const [showPassword, setShowPassword] = useState(false);
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


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleNameValidation = (name: string, setWrongName: (value: boolean) => void) => {
    if (name.trim().length <= 2) {
      setWrongName(true);
      setInputStyle({
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid red',
      });
    } else {
      setWrongName(false);
      setInputStyle({
        backgroundColor: 'white',
        color: 'black',

      });
    }
  };

  const handleFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    handleNameValidation(e.target.value.toUpperCase(), setWrongName1);
    setFirstName(e.target.value.toUpperCase());
  };

  

  const handleIsreader = (e: SelectChangeEvent) => {
    if (e.target.value === "Reader") {
      setIsReader("Reader");
      setHasAdminPower(User.HasAdminPower);
    }
    if (e.target.value === "Writer") {
      setIsReader("Writer");
      setHasAdminPower(!User.HasAdminPower);
    }
  };

  const handleLastName = (e: ChangeEvent<HTMLInputElement>) => {
    handleNameValidation(e.target.value, setWrongName2);
    setLastName(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setWrongPassword(true)
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitSignup = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const firstNameTrimmed = User.FirstName.trim();
    const lastNameTrimmed = User.LastName.trim();

    if (firstNameTrimmed.length <= 2) {
      handleNameValidation(firstNameTrimmed, setWrongName1);
      return;
    }

    if (lastNameTrimmed.length <= 2) {
      handleNameValidation(lastNameTrimmed, setWrongName2);
      return;
    }

    const emailTrimmed = User.Email.trim();
    if (emailTrimmed.length <= 2) {
      setWrongNameEM(true);
      setInputStyle({
        ...inputStyle,
        border: '2px solid red',
      });
      return;
    } else {
      setWrongNameEM(false);
      setInputStyle({
        backgroundColor: 'white',
        color: 'black',
      });
    }

    if (User.FirstName === '' || User.LastName === '' || User.password === '' || User.Email === '') {
      alert('You need to enter the right info for the missing field');
      return;
    }

    if (!User.confirmPassword || User.password !== User.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!validatePassword(User.password)) {
      setWrongPassword(true);
      return;
    }

    const signIn = async () => {
      try {
        if (!User.Email || !User.FirstName) {
          console.error('Error signing in: Email or name is missing.');
          return;
        }

        const userCredential: UserCredential = await createUserWithEmailAndPassword(Auth, User.Email, User.password);
        const user = userCredential.user;

        if (user) {
          setFirstName('');
          setLastName('');
          setConfirmPassword('');
          setPassword('');
          setEmail('');
          

          await updateProfile(user, {
            displayName: `${User.FirstName.toUpperCase()} ${User.LastName.toUpperCase()}`,
          });


         
          try {
            // Create custom ID
            const customId = `${uuidv4()}`;
          
            // Create data object for the document
            const docData = {
              Firstname: User.FirstName,
              Lastname: User.LastName,
              Email: User.Email,
              Password: User.password,
              Isreader: User.IsReader,
              HasAminPower: User.HasAdminPower
            };
          
            await setDoc(doc(collection(db, 'usersInfo'), customId), docData);
                    
            // const fetchedDoc = await getDoc(doc(collection(db, 'usersInfo'), customId));
            setDocId(customId)
          
            const querySnapshot = await getDocs(collection(db, 'usersInfo'));
            if (!querySnapshot.empty) {
              querySnapshot.forEach(() => {
              });
            }
          } catch (error: any) {
            console.error('Error adding document: ', error.message);
          }
        }
        navigate("/login");
      } catch (error: any) {
        console.error('Error signing in:', error.message);
        console.error('Error adding document: ', error.message);
      }

    }
    signIn();
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignin();
     

    } catch (error: any) {
      // Handle any errors that occur during sign-in
      alert('Error signing in with Google: ' + error.message);
    }
  };

  useEffect(()=>{
 if(user!== null){

  navigate("/dashboard")
 }
  }, [user])
 
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handlelogin=()=>{
    navigate("/login")
  }

  const Registermain = {
    minHeight: '100vh',
    marginInline: screenWidth <= 1200 ? '20px' : 'auto',
    backgroundColor: '#F8FAFC',
  };

  const Boxnav = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: {
      xs: '100%',
      md: '80%',
    },
    marginInline: 'auto',
    height: '8vh',
  };

  const Title = {
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
    border:"none",
    backgroundColor:"#543ee0",
    marginBlock:screenWidth <= 600 ?"17px":screenWidth <= 1000 ?"20px":"22px"
  }
  const LoginLinkContainer={
    FontFamily:"DM SANS",
    fontSize: screenWidth <= 900 ? "16px" : "20px"
  }

  return (
    <Box sx={{ backgroundColor: 'rgb(248, 250, 252)',}}>
       
      <Box>
        <Box sx={Registermain} maxWidth="xl">
          <Box
            style={{
              backgroundColor: 'rgb(248, 250, 252)',
              minHeight: '100vh',
              width: '100%',
            }}
          >
            <Box>
              <Box sx={Boxnav}>
                <Typography sx={Title} onClick={() => navigate('/')}>
                BLOGCHAT
                </Typography>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: { sm: '25px', md: '35px' }, alignItems: 'center' }}></Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4%', mt: '2rem',    marginLeft: screenWidth <= 600 ? '10px' : screenWidth <= 900 ? '20px' : 'auto',paddingInline: screenWidth <= 600 ? '10px' : screenWidth <= 900 ? '20px' : 'auto', }}>
              <Box sx={{ display: screenWidth >= 1200 ? 'block' : 'none', width: '55%' }}>
                <img src={RegisterPic} alt="healthcare pics" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Box sx={{ width: screenWidth >= 1000 ? '40%' : screenWidth >= 600 ? '80%' : '100%' }}>
                <Box>
                  <Box  sx={{ paddingBlock: '1rem' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: { xs: '15px', sm: '18px', md: '20px', lg: '22px' } }}>Sign up in with</Typography>

                    <Box sx={{ textAlign: 'center', color: '#9EA0A5', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: { xs: '15px, sm:20px', md: '25px' } }}>
                      <Button onClick={handleGoogleSignIn} sx={{ fontSize: { xs: '15px', sm: '17px', md: '19px', lg: '22px' } }}>
                        <GoogleIcon></GoogleIcon>
                        <Typography sx={{ paddingLeft: '.3rem' }}>Google</Typography>
                      </Button>
                      <Divider orientation="vertical" variant="middle" flexItem></Divider>
                      <Button sx={{ fontSize: { xs: '15px', sm: '17px', md: '19px', lg: '22px' } }}>
                        <EmailIcon></EmailIcon>
                        <Typography sx={{ paddingLeft: '.3rem' }}>Email</Typography>
                      </Button>
                    </Box>

                    <Typography sx={{ textAlign: 'center', fontSize: { xs: '15px', sm: '18px', md: '20px', lg: '22px' } }}>or</Typography>
                    <Box>
                      <Box>
                        <Typography>Fisrt Name</Typography>
                        <TextField
                          placeholder="Fisrt Name "
                          fullWidth
                          margin="normal"
                          name="username"
                          onChange={handleFirstName}
                          value={User.FirstName}
                          type="text"
                          required
                          inputProps={{ style: inputStyle }}
                        />
                      </Box>
                      <Box> {wrongName1 && <Typography color="error">Invalid name. Please enter at least 2 characters.</Typography>}</Box>
                      <Box>
                        <Typography>Last Name</Typography>
                        <TextField
                          placeholder="Last Name"
                          fullWidth
                          margin="normal"
                          name="username"
                          value={User.LastName}
                          onChange={handleLastName}
                          required
                          inputProps={{ style: inputStyle }}
                        />
                      </Box>
                      <Box> {wrongName2 && <Typography color="error">Invalid name. Please enter at least 2 characters.</Typography>}</Box>
                      <Box></Box>
                      <Box>
                        <Typography>Writer/Reader</Typography>
                        <FormControl fullWidth  sx={{height:"56px"}}>
                         <InputLabel id="demo-simple-select-label" sx={{}}>select</InputLabel>
                                  <Select
                                  sx={{height:"56px"}}
                                  placeholder='select'
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={User.IsReader}
                              label="Age"
                              onChange={handleIsreader}>
                            <MenuItem value={"Reader"}>Reader</MenuItem>
                           <MenuItem value={"Writer"}>Writer</MenuItem>
                                 </Select>
                            </FormControl>
                      </Box>
                      <Box>
                        <Typography>Email</Typography>
                        <TextField
                          placeholder="Enter your email "
                          fullWidth
                          margin="normal"
                          name="username"
                          onChange={handleEmail}
                          required
                          value={User.Email}
                          inputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                        />
                        <Box> {wrongNameEM && <Typography color="error">Invalid name. Please enter at least 2 characters.</Typography>}</Box>
                      </Box>
                      <Box>
                        <Typography>Password</Typography>
                        <TextField
                          placeholder="Enter your password "
                          fullWidth
                          margin="normal"
                          name="passwword"
                          onChange={handlePassword}
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={User.password}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                              </InputAdornment>
                            ),
                            style: { backgroundColor: 'white', color: 'black' },
                          }}
                        />
                      </Box>
                      <Box sx={{ display: wrongPassword === true ? 'block' : 'none' }}>
                        Kindly note that the password must contain at least one
                        <li>Be at least 8 characters long.</li>
                        <li>Contain at least one uppercase letter.</li>
                        <li>Contain at least one lowercase letter.</li>
                        <li>Contain at least one digit (number).</li>
                      </Box>
                      <Box>
                        <Typography>Confirm Password</Typography>
                        <TextField
                          placeholder="Re-enter your password "
                          fullWidth
                          margin="normal"
                          name="passwword"
                          onChange={handleConfirmPassword}
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={User.confirmPassword}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility}>
                                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                              </InputAdornment>
                            ),
                            style: { backgroundColor: 'white', color: 'black' },
                          }}
                        />
                      </Box>
                    </Box>

                    <button onClick={handleSubmitSignup} style={RegBtn}>Register</button>
                    <Box sx={LoginLinkContainer}>
                      <p style={{marginBottom:screenWidth <= 900 ?"10px": "18px"}}>Already have an account? <span onClick={handlelogin} style={{color:"blue"}}>Log in</span> </p>
                      <Typography sx={{marginBottom:screenWidth <= 900 ?"10px": "18px"}}>
                        By signing in with an account, you agree to HealthpathFinder's Terms of Service, Privacy Policy and Acceptable Use Policy.
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
  
      
    </Box>
  );
};

export default Signup;
