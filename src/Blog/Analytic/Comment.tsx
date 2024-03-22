import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import ClearIcon from "@mui/icons-material/Clear";
import { Auth, db } from "../../Auth/Auth";
import { Box, Paper, Typography } from "@mui/material";

const CommentPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [currentlyLoggedinUser] = useAuthState(Auth);
  const commentRef = doc(db, "blogs", postId ?? "");
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    setComments([]); 
    const docRef = doc(db, "blogs", postId ?? "");
    setIsLoading(true);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        setComments(data.comments || []);
      } else {
        setError("Data is undefined");
      }
      setIsLoading(false);
    }, (err) => {
      setError(err.message);
      setIsLoading(false);
    });
    return unsubscribe;
  }, [postId]);

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };


  const handleAddComment = async () => {
    if (!comment) return;
    try {
      await updateDoc(commentRef, {
        comments: arrayUnion({
          user: currentlyLoggedinUser?.uid,
          userName: currentlyLoggedinUser?.displayName,
          comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      });
      setComment("");
    } catch (err:any) {
      setError("Failed to add comment: " + err.message);
    }
  };
  const titleStyle = {
    fontSize: screenWidth <= 900 ? "22px" : "26px",
    fontWeight: "600",
    lineHeight: "170%",
    letterSpacing: ".06rem",
    fontFamily:"DM Sans",
    color: "blue",
    marginLeft:screenWidth<=900?"10px":"20px",
    marginBottom: screenWidth <= 900 ? "15px" : "30px",
  };

  const handleDeleteComment = async (commentData: any) => {
    try {
      await updateDoc(commentRef, {
        comments: arrayRemove(commentData),
      });
    } catch (err:any) {
      setError("Failed to delete comment: " + err.message);
    }
  };

  return (
    <div
    style={{
      maxWidth:"1440px",
      marginInline:"auto",
      width:screenWidth<=900?"100%":"70%"
    }}    
    >
      <Box>
      <Typography sx={titleStyle}>BLOGCHAT</Typography>
      </Box>
      {isLoading && <p>Loading comments...</p>}
      {error && <p>Error: {error}</p>}
      {comments.length === 0 && <Typography
      sx={{
      textAlign:"center"
      }}
      >No comments yet. Be the first to add one!</Typography>}
      {comments.map(({ commentId, user, comment, userName, createdAt }: any) => (
        <div key={commentId}
        style={{
          width:screenWidth<=600?"100%":screenWidth<=1200 ?"500px":"700px",
          paddingLeft:screenWidth<=900?"20px":"40px",
        }}
        >
          <Paper
          sx={{
            border:"1px solid green",
            marginBottom:"1rem",
            position:"relative"
          }}
          elevation={1}
          >

          <Box 
          sx={{
            padding:"1rem",

           }}>
            <Box
              sx={{fontFamily:"DM Sans", fontSize:screenWidth<=900?"18px":"21px",
               minHeight:"50px", marginBottom:"0.5rem", borderBottom:".1rem solid lightgreen"
            
            }}
            >
            {comment}

            </Box>
            <Box>
              {userName}

            </Box>
            
          </Box>
          <div style={{
                  position:"absolute",
                  top:screenWidth<=900?"3px":"6px",
                  right:screenWidth<=900?"3px":"6px"
          }}>
            {user === currentlyLoggedinUser?.uid && (
              <ClearIcon
                className="fa fa-times"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteComment({ commentId, user, comment, userName, createdAt })}
              />
            )}
          </div>

          </Paper>
        </div>
      ))}
      {currentlyLoggedinUser && (
        <Box 
          sx={{
            display:"flex",
            flexDirection:'column',
            gap:screenWidth<=600?"20px":screenWidth<=1200?"30px":"35px"
          }}
        >
          <Box
          sx={{
            width:'100%',
            paddingLeft:screenWidth<=900?"20px":"40px",
            marginInline:"auto"
          }}
          >
          <input
            type="text"
            value={comment}
            style={{
              marginTop:"1rem",
              width:screenWidth<=600?"80%":screenWidth<=900?"70%%":"700px",
              height:"70px",
              padding:"5px",
              fontSize: screenWidth<=600?"16px":screenWidth<=1200?"19px":"22px"
              
             
               
            }}
            onChange={handleChangeComment}
            placeholder="Add a comment"
          />
          </Box>
          <Box
          sx={{
            paddingLeft:screenWidth<=600?"20px":"40px",
          }}
          >
         <button className="btn btn-primary" type="button"
          style={{
            width:screenWidth<=600?"150px":"200px",
            fontSize:screenWidth<=600?"16px":"18px",
            padding:screenWidth<600?"10px":screenWidth<600?"15px":"20px",
            color:"white", backgroundColor:"green"
          }}
         onClick={handleAddComment}>
            Submit
          </button>
          </Box>

        </Box>
      )}
    </div>
  );
};

export default CommentPage;
