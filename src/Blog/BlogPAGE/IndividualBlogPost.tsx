import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db, Auth } from '../../Auth/Auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Typography } from '@mui/material';
import LikePage from '../Analytic/LikePage';

const IndividualBlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [blogPost, setBlogPost] = useState<any | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [user] = useAuthState(Auth);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (postId) {
        const docRef = doc(db, "blogs", postId);
        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            setBlogPost({ ...snapshot.data(), id: snapshot.id });
            setLoading(false);
        });

        return () => unsubscribe();
    }
}, [postId]);


  const handleBookmark = async () => {
    if (!postId || !blogPost) return;

    try {
      const postRef = doc(db, 'bookmarks', postId);
      if (bookmarked) {
        await deleteDoc(postRef);
      } else {
        await setDoc(postRef, { ...blogPost, bookmarked: true });
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };
  const title={
    fontSize: screenWidth <= 900  ? "22px" :"24px",
    fontWeight:"600",
    lineHeight: "170%",
    letterSpacing:".06rem",
    marginBottom:screenWidth <= 900  ? "20px" :"30px",
    color:"blue"
  
  }

  return (
    <div style={{height:"auto",minHeight:"1000px", width:screenWidth<=600?"100%": screenWidth <= 900 ? "500px" : screenWidth <= 1200 ? "950px" : "1200px", marginInline: "auto",
    paddingInline:screenWidth<=600?"10px": screenWidth <= 900 ? "15px" : screenWidth <= 1200 ? "18px" : "25px"
    }}>

      <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <Typography sx={title}  >BLOGCHAT</Typography>
        <button onClick={handleBookmark} style={{
          padding:screenWidth<1000?".6rem":"1rem", backgroundColor:"lightblue",
          borderRadius:screenWidth<900?"0.5rem":".8rem", border:"none", cursor:"pointer"
        }}>{bookmarked ? 'Remove from Bookmark' : 'Add to Bookmark'}</button>
      </Box>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          blogPost && (
            <>
            <Box sx={{fontFamily:"DANS SANS", fontSize:screenWidth<=900 ?"18px":"21px", fontWeight:"600"}}> Author: {blogPost?.Createdby.toUpperCase()}</Box>
              <Box sx={{fontFamily:"DANS SANS"}}> Posted on: {blogPost?.CreatedAt?.toDate().toDateString()}</Box>
              <Box sx={{width:screenWidth<=400?"250px":screenWidth<=600?"330px":screenWidth<900?"360px":"500px", height:screenWidth<=400?"200px":screenWidth<=600?"300px":screenWidth<900?"360px":"500px"
                 , border:"1.5px solid #e8e8ea", marginBlock:screenWidth<900?".5rem": screenWidth<=1200? ".65rem":"0.8rem", marginInline:screenWidth<=600?"10px":"20px"}}>

              <img src={blogPost?.coverImageUrl} alt={blogPost?.title} style={{ width: "100%", height:"100%", objectFit:"cover" }} />
              </Box>
              <Typography sx={{fontFamily:"DANS SANS"}}>{blogPost?.content}</Typography>
              <Box sx={{ display: 'flex', justifyContent: "flex-end", marginTop:screenWidth<1000?"0.6rem":"1rem", marginRight:".8rem"}}>
              {user && <LikePage postId={postId || ""} likes={blogPost?.likes} />}
              <Typography sx={{fontFamily:"DANS SANS"}}>{blogPost?.likes?.length}</Typography>

              </Box>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default IndividualBlogPost;
