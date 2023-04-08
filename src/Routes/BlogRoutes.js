import React,{Component} from 'react';
import {Link,Routes,Route,BrowserRouter} from 'react-router-dom';
import AddPost from '../Components/AddPost';
import AllPost from '../Components/AllPost';
import FavouriteBlogs from '../Components/FavouriteBlogs';

export default function BlogRoutes() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPost/>}/>
        <Route path="/Create-Post" element={<AddPost/>}/>
        <Route path="/favourite-post" element={<FavouriteBlogs/>}/>
        {/* <Route path="*" element={<AllPost/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}
