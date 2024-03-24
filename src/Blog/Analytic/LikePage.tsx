import React, { useState } from 'react';
import { db, Auth } from "../../Auth/Auth";
import {  arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    likes: string[]; 
    postId: string; 
}

const LikePage: React.FC<Props> = ({ postId, likes }) => {
    const [presentUser] = useAuthState(Auth) || [null];
    const likesRef = doc(db, "blogs", postId);
    const initialIsLiked = presentUser ? likes?.includes(presentUser.uid) : false;
    const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLike = () => {
        setLoading(true);
        const updatedLikes = arrayUnion(presentUser?.uid);
        updateDoc(likesRef, { likes: updatedLikes })
            .then(() => {
                setIsLiked(!isLiked); // Toggle like status optimistically

            })
            .catch((error) => {
                console.error("Error updating like:", error);
            })
            .finally(() => {
                setLoading(false);
            });
        
    };

    return (
        <div onClick={handleLike}>
            <FavoriteIcon
                sx={{
                    cursor: "pointer",
                    color: isLiked ? "red" : "inherit" 
                }}
            />
            {loading && <span>Loading...</span>} 
        </div>
    );
};

export default LikePage;
