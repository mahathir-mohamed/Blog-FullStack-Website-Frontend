import React from 'react';
import {Link,Routes,Route,BrowserRouter} from 'react-router-dom';
import Login from '../Components/login and signup/Login';
import Signup from '../Components/login and signup/Signup';

export default function BlogRoutes() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Create-Account" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}
