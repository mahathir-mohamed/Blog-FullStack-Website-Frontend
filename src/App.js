import logo from './logo.svg';
import React,{useEffect,useState} from 'react'
import './App.css';
import Home from '../src/Components/Home Component/Home';
import Auth from '../src/Components/Auth Component/Auth';
import axios from 'axios';
import Cookies from 'js-cookie';
import {baseUrl} from "./config/BaseApi";

function App() {
  const [loggedIn,setLoggedIn]=useState();
  useEffect(()=>{
    var token = Cookies.get('Token');
    if(token){
      TokenVerify(token);
    }else{
      Cookies.remove('Token');
       setLoggedIn(false);
    }
  },[])
  function TokenVerify(token){
     axios.post(`${baseUrl}/auth/check-user`,{Token:token}).then((res)=>{
      if(res.data.msg=="Succesfully Verified"){
         setLoggedIn(true);
        //  window.location.reload();
      }else{
        Cookies.remove('Token');
        Cookies.remove('user_id');
        setLoggedIn(false);
      }
    }).catch((err)=>{console.log(err)});
  }
  return (
    <div>
      {loggedIn?<Home/>:<Auth/>}
    </div>
  );
}

export default App;
 