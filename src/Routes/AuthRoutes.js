import React from 'react';
import {Link,Routes,Route,BrowserRouter} from 'react-router-dom';
import Login from '../Components/Login';
import Signup from '../Components/Signup';

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
