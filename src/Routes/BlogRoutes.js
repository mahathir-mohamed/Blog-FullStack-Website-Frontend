import React,{Component} from 'react';
import {Link,Routes,Route,BrowserRouter} from 'react-router-dom';
import AddPost from '../Components/BlogComponents/AddPost';
import AllPost from '../Components/BlogComponents/AllPost';
import FavouriteBlogs from '../Components/BlogComponents/FavouriteBlogs';
import MyBlogs from '../Components/BlogComponents/MyBlogs';
import BlogDetailsPage from '../Components/BlogComponents/BlogDetailspage';
import UpdateProfile from '../Components/UpdateProfile Component/UpdateProfile';

export default function BlogRoutes() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPost/>}/>
        <Route path="/Create-Post" element={<AddPost/>}/>
        <Route path="/favourite-post" element={<FavouriteBlogs/>}/>
        <Route path="/My-Post" element={<MyBlogs/>}/>
        <Route path="/BlogDetail/:BlogId" element={<BlogDetailsPage/>}/>
        <Route path="/Update-Profile/:id" element={<UpdateProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}
