import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"; 
import { db, Auth } from '../../Auth/Auth'; 
import { Box, Paper, Typography } from '@mui/material';
import { useAuthState } from "react-firebase-hooks/auth";
import Delete from "../../ActionPage/Delete"
import LikePage from '../Analytic/LikePage';
import { Link } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment';

const BlogPage: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [presentUser] = useAuthState(Auth);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
      const blogsRef = collection(db, "blogs");
      const q = query(blogsRef, orderBy("CreatedAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogPosts(posts);
        setFilteredPosts(posts.slice(0, 10)); // Display only the first ten posts initially
      });
    };
    fetchPosts();
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
    if (!searchQuery.trim()) {
      setFilteredPosts(blogPosts.slice(0, 10)); // Reset to show the first ten posts
      return;
    }

    const filtered = blogPosts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const Main = {
    width: screenWidth <= 900 ? "100%" : screenWidth <= 1200 ? "700px" : "1076px",
    marginInline: "auto",
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

  return (
    <div style={Main}>
      <h1>Blog Posts</h1>
      {/* Search input */}
      <input
        style={{width:"50%", padding:"5px", height:screenWidth<=900?"30px":"35px", marginBottom:"1rem", fontSize:screenWidth<=600?"17px":screenWidth<=1200?"19px":"21px"}}
        placeholder='Search...'
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleSearch}
      />
      {/* Display posts */}
      {filteredPosts.map(({ id, title, content, CreatedAt, userId, likes, comment, coverImageUrl, Createdby }) => (
        <Box key={id} className="header" sx={{minHeight:screenWidth<=900?"500px":"600px"}}>
          <Paper elevation={1}>
            <Link to={`/blogs/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ padding: "1rem", marginBottom: '20px', cursor: 'pointer' }}>
                  <Box sx={headstyle}>
                    <Box>
                  {presentUser && presentUser.uid === userId && <Delete postId={id} imageUrl={coverImageUrl}/>}
                    </Box>
                  <Box sx={createdgroup}>
                <Typography sx={{
                  fontWeight:"600", letterSpacing:".2rem", fontFamily:"DM Sans"
                }}>{Createdby}</Typography>
                <Typography sx={{fontFamily:"DM Sans"}}>{CreatedAt?.toDate().toDateString()}</Typography>
                  </Box>
                  </Box>
                <Typography 
                sx={
                  {fontWeight:"600", letterSpacing:".1rem", fontFamily:"DM Sans", fontSize:screenWidth<=900?"17px" :"20px"}
                }>Tittle: {title.toUpperCase()}</Typography>
                <Box sx={{width:screenWidth<=400?"200px":screenWidth<=600?"300px":screenWidth<900?"360px":"500px", height:screenWidth<=400?"200px":screenWidth<=600?"300px":screenWidth<900?"360px":"500px"
                 , border:"1.5px solid #e8e8ea"}}>
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
             <Link to={`/comments/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CommentIcon />

              <Typography 
                sx={{
                  fontWeight:"600", 
                  letterSpacing:".1rem", 
                  fontFamily:"DM Sans", 
                  fontSize:screenWidth<=900?"17px" :"20px"
                }}
              >
                View Comments
              </Typography>
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
 
 export default BlogPage;
 
