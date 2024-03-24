import React from 'react'
import { Routes, Route } from "react-router-dom";
import { LandingPage, Login,Signup , Blog, IndividualBlogPost, DisplayDashborad, Account, NotFound} from '../Default';
import BookMarked from '../Page/Dash/Book/BookMarked';
import Comment from '../Blog/Analytic/Comment';
import ProtectedRoute from '../Auth/ProtectedRoute';



const Root:React.FC = () => {
  return (
    <div>
        <Routes>
              <Route path='/' element={<LandingPage />}></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path='/dashboard' element={<ProtectedRoute><DisplayDashborad /></ProtectedRoute>}></Route>
              <Route path="admin/blog" element={<Blog />}></Route>
              <Route path="bookmarks" element={<BookMarked></BookMarked>} />
              <Route path="/blogs/:postId" element={<IndividualBlogPost />} />
              <Route path="/comments/:postId" element={<Comment></Comment>} />
              <Route path='/accountupdate' element={<Account></Account>}></Route>
              <Route path='*' element={<NotFound></NotFound>} ></Route>
       </Routes>
    </div>
  )
}

export default Root
