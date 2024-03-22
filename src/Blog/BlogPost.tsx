import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

interface BlogPostProps {
  content: any;
}


const BlogPost: React.FC<BlogPostProps> = ({ content }) => {
  const navigate = useNavigate();
  const HANDLEADMIN=()=>{
    navigate("admin/blog")
  }
  return (
    <div className="markdown-preview">
      <button onClick={HANDLEADMIN}>Go BACK</button>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPost;
