import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from '../../../Auth/Auth'; 
import { Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LikePage from '../../../Blog/Analytic/LikePage';

const Bookmarked: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchBookmarkedPosts = async () => {
      const bookmarksRef = collection(db, "bookmarks");
      onSnapshot(bookmarksRef, (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookmarkedPosts(posts);
      });
    };
    fetchBookmarkedPosts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleSearch = () => {
    // Filter the bookmarked posts based on the search query
    const filteredPosts = bookmarkedPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBookmarkedPosts(filteredPosts);
  };
  const headstyle={
    display:"flex",
    flexDirection:"row-reverse",
    justifyContent:"space-between",
    alignItems:"center",


  }
 const createdgroup={
  display:"flex",
  flexDirection:"column",
  gap:screenWidth<900?".4rem":"0.7rem",
  marginBottom: screenWidth<900?".4rem":"0.7rem"
 }

  const Main = {
    width: screenWidth <= 900 ? "100%" : screenWidth <= 1200 ? "700px" : "1076px",
    marginInline: "auto",
  };

  return (
    <div style={Main}>
      <input
      style={{width:screenWidth<=1000?"100%":"700px", height:screenWidth<=600?"35px":screenWidth<1000?"40px":"46px",
       padding:screenWidth<=1000?"5px":"10px"   , marginTop:screenWidth<=600 ?"15px":screenWidth<=900?"18px":"24px"}}
        placeholder='Search by title...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleSearch}
      />
      {/* Display bookmarked posts */}
      {bookmarkedPosts.map(({  id, title, content, CreatedAt, likes, comment, coverImageUrl, Createdby}) => (
          <Box key={id}>
          <Paper elevation={1}>
            <Link to={`/blogs/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ padding: "1rem", marginBottom: '20px', cursor: 'pointer' }}>
                  <Box sx={headstyle}>
                    <Box>
                    </Box>
                  <Box sx={createdgroup}>
                <Typography sx={{
                  fontWeight:"600", letterSpacing:".2rem", fontFamily:"DANS SANS"
                }}>{Createdby}</Typography>
                <Typography sx={{fontFamily:"DANS SANS"}}>{CreatedAt?.toDate().toDateString()}</Typography>
                  </Box>
                  </Box>
                <Typography 
                sx={
                  {fontWeight:"600", letterSpacing:".1rem", fontFamily:"DANS SANS", fontSize:screenWidth<=900?"17px" :"20px"}
                }>Tittle: {title.toUpperCase()}</Typography>
                <Box sx={{width:screenWidth<=400?"200px":screenWidth<=600?"300px":screenWidth<900?"360px":"500px", height:screenWidth<=400?"200px":screenWidth<=600?"300px":screenWidth<900?"360px":"500px"
                 , border:"1.5px solid #e8e8ea", marginBlock:screenWidth<900?".5rem": screenWidth<=1200? ".65rem":"0.8rem", objectFit:"cover" ,
              }}>
                <img src={coverImageUrl} alt={coverImageUrl} style={{width:"100%", height:"100%"}}></img>
                </Box>
                {/* Displaying only the first 40 words */}
                <div>{content.split(' ').slice(0, 40).join(' ')}{content.split(' ').length > 40 ? '...' : ''}</div>
                <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                  <LikePage postId={id} likes={likes} />
                  <div style={{ paddingRight: "10px" }}>
                    <p>{likes?.length} likes</p>
                  </div>
                </div>
              </div>
            </Link>
              <div style={{backgroundColor:"lightgreen", height:"2rem"}}>
            {comment && comment.length > 0 && (
              <div style={{ paddingRight: "10px" }}>
                <p>{comment?.length} comments</p>
              </div>
            )}

            </div>
          </Paper>
        </Box>
      ))}
    </div>
  );
};

export default Bookmarked;

      