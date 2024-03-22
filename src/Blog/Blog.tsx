import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { collection, setDoc, doc, Timestamp } from 'firebase/firestore';
import { db, Auth } from '../Auth/Auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import ReactQuill from 'react-quill';
import { storage } from '../Auth/Auth'
import 'react-quill/dist/quill.snow.css';
import { useStore } from '../ZustandStore/StoreZusatnd';
import Modal from '../Modal.tsx/Modal';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import "./Blog.css"
// import BlogPost from './BlogPost';

interface MainDashboardProps {
  text?: string | number;
}

const MainAdminBoard: React.FC<MainDashboardProps> = () => {
  const [presentUser] = useAuthState(Auth);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const { User: { HasAdminPower } } = useStore();
  const navigate = useNavigate();

 const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cover, setCover] = useState<File | null>(null);

  useEffect(() => {
    setIsModalOpen(true); 
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const ModalOpening = () => {
    setIsModalOpen(true);
  }

  const handleMarkdownChange = (content: string) => {
    setMarkdownContent(content);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCoverImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCover(e.target.files[0]);
    }
  };

  const goBack = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const strippedContent = markdownContent.replace(/(<([^>]+)>)/gi, '');
  
    if (!presentUser) {
      alert('User is not authenticated.');
      return;
    }
  
    if (!cover) {
      alert('Please select an image.');
      return;
    }
    if(title===""){
    alert("You must inclue a title to you blog")
    return;
    }
  
    setLoading(true);
  
    const storageRef = ref(storage, `images/${Date.now()}${cover.name}`);
  
    const uploadImage = uploadBytesResumable(storageRef, cover);
  
    uploadImage.on(
      "state_changed",
      (snapshot) => {
        Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {
        console.error('Error uploading image:', err);
        alert('An error occurred while uploading the cover image. Please try again.');
        setLoading(false);
      },
      async () => {
        try {
          const coverImageUrl = await getDownloadURL(uploadImage.snapshot.ref);
  
          const blogsCollection = collection(db, 'blogs');
  
          // Generate a unique document ID
          const docRef = doc(blogsCollection);
  
          const blogData = {
            title,
            HasAdminPower,
            content: strippedContent,
            CreatedAt: Timestamp.now().toDate(),
            Createdby: presentUser.displayName,
            userId: presentUser.uid,
            coverImageUrl, 
            likes: [],
            comment: []
          };
  
          // Set document with generated ID
          await setDoc(docRef, blogData);
  
          setTitle('');
          setMarkdownContent('');
          setCover(null); // Reset cover image state
        } catch (error) {
          console.error('Error adding blog:', error);
          alert('An error occurred while uploading the cover image. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    );
  };
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const titleStyle = {
    fontSize: screenWidth <= 900 ? "22px" : "24px",
    fontWeight: "600",
    lineHeight: "170%",
    letterSpacing: ".06rem",
    color: "blue",
    marginBottom: screenWidth <= 900 ? "15px" : "30px",
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingInline: screenWidth <= 600 ? "5px" : screenWidth < 900 ? "8px" : "10px" }}>
        <Typography sx={titleStyle}>BLOGCHAT</Typography>
        <Typography sx={{ fontWeight: "500", color: "black", lineHeight: "130%", letterSpacing: ".06rem", marginBottom: screenWidth <= 900 ? "15px" : "30px" }}>Welcome,</Typography>
      </Box>

      {!presentUser ? (
        <div>
          <h2>
            <Link to="/login">Login to create an article</Link>
          </h2>
          Don't have an account? <Link to="/signup">Signup</Link>
        </div>
      ) : (
        <>
          <div style={{ position: "relative" }}>
            <Modal isModalOpen={isModalOpen} setisModalOpen={setIsModalOpen}>
              <Box sx={{ width: "90%", marginInline: "auto", marginBlock: "1rem" }}>
                <Typography sx={{ color: "blue", fontSize: screenWidth <= 600 ? "13px" : screenWidth <= 900 ? "17px" : "20px", marginBottom: ".5rem" }}>Welcome to BlogPost</Typography>
                <Typography sx={{ fontSize: screenWidth <= 600 ? "15px" : "17px", marginBottom: "0.5rem", fontFamily: "sans serif" }}>Here are few details to using our editor</Typography>
                <Box>
                  <Typography sx={{ fontSize: screenWidth <= 600 ? "15px" : "17px", marginBottom: "0.5rem", fontFamily: "DM SANS" }}>1. B is for Bold, I is italic, U is Underline,</Typography>
                  <Typography sx={{ fontSize: screenWidth <= 600 ? "15px" : "17px", marginBottom: "0.5rem", fontFamily: "DM SANS" }}>2. You must include a title</Typography>
                  <Typography sx={{ fontSize: screenWidth <= 600 ? "15px" : "17px", marginBottom: "0.5rem", fontFamily: "DM SANS" }}>3. You have to add an image to display when writing a blog</Typography>
                  <Typography sx={{ fontSize: screenWidth <= 600 ? "15px" : "17px", marginBottom: "0.5rem", fontFamily: "DM SANS" }}>4. You can change your text type and text properties                 using the Normal, text color, and sans-serif</Typography>
                </Box>
              </Box>
            </Modal>
            <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" , gap:"20px" }}>
              <Typography
                style={{
                  width: "50%",
                  maxWidth: "400px",
                  height: "40px",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "blue",
                  border:"none",
                  textAlign:"center",
                  borderRadius: screenWidth <= 1000 ? "10px" : "20px",
                  ...(screenWidth <= 1000 && {
                    padding: screenWidth <= 1000 ? "3px" : "5px",
                    paddingBlock:screenWidth <= 500 ? "5px" : "7px"
                  }),
                  ...(!(screenWidth <= 1000) && {
                    padding: "10px",
                  }), // Add padding to the normal state
                  transition: "padding 0.3s", // Smooth transition for the padding change
                }}
                onClick={ModalOpening}
              >
                How do I write my blog?
              </Typography>
              <p style={{ fontSize: screenWidth <= 1000 ? "17px" : "22px", fontWeight: "bold", fontFamily: "DM SANS", marginRight: "1rem", textAlign:"right" }}>{presentUser.displayName?.toUpperCase()}</p>
            </Box>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', width: "100%", padding: screenWidth <= 900 ? ".5rem" : "1rem", backgroundColor: "lightblue", marginTop: screenWidth <= 1000 ? "1rem" : "1.7rem", }}>
              <label htmlFor="title" style={{ fontSize: screenWidth <= 600 ? "24px" : screenWidth <= 900 ? "27px" : "32px" }}>Project Name:
                <input type="text" id="title" value={title} onChange={handleTitleChange} style={{ width: "100%", fontSize: screenWidth <= 900 ? "22px" : "27px" }} />
              </label>

            </div>
            <div style={{ height: screenWidth <= 1000 ? "50px" : "70px", display: "flex", alignItems: "center", padding: screenWidth <= 900 ? ".5rem" : "1rem", }}>
              <input type="file" name="coverimg" accept="image/*" onChange={handleCoverImgChange} />
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <ReactQuill
                value={markdownContent}
                theme="snow"
                onChange={handleMarkdownChange}
                formats={{
                  formats: [
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link',
                  ]
                } as any}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction
                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean']
                  ]
                }}
              />
            </div>

            <div style={{ marginBlock: screenWidth <= 600 ? "20px" : screenWidth <= 900 ? "25px " : "30px", display: "flex", gap: "2rem" }}>
              <button type="submit" style={{ fontSize: screenWidth <= 600 ? "18px" : screenWidth <= 900 ? "22px" : "26px", padding: screenWidth <= 600 ? "10px" : screenWidth <= 900 ? "15px" : "20px", width: screenWidth <= 600 ? "160px" : screenWidth <= 1000 ? "200px" : "250px" }}>Submit Blog</button>
              <button onClick={goBack} style={{ fontSize: screenWidth <= 600 ? "18px" : screenWidth <= 900 ? "22px" : "26px", padding: screenWidth <= 600 ? "10px" : screenWidth <= 900 ? "15px" : "20px", width: screenWidth <= 600 ? "160px" : screenWidth <= 1000 ? "200px" : "250px" }}>Go back</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default MainAdminBoard;

