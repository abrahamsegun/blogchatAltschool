import { deleteDoc, doc } from "firebase/firestore";
import React,{useEffect, useState} from "react";
import { db, storage } from "../Auth/Auth";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { Typography } from "@mui/material";

interface DeleteProps {
  postId: string;
  imageUrl: string;
}

const Delete: React.FC<DeleteProps> = ({ postId, imageUrl }) => {
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
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteDoc(doc(db, "blogs", postId));
        toast("Blogs deleted successfully", { type: "success" });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting Blogs", { type: "error" });
        console.log(error);
      }
    }
  };
  return (
    <div style={{width:"50px", height:"50px", backgroundColor:"white"}}>
      <Typography
        onClick={handleDelete}
        style={{ cursor: "pointer", color:"red"}}
        sx={{fontSize:screenWidth<=600?"12px":screenWidth<=900?"14px":screenWidth<1200?"16px":"17px", fontWeight:"600"}}>
          Delete
      </Typography>
    </div>
  );
}

export default Delete;
