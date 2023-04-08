import logo from './logo.svg';
import React,{useEffect,useState} from 'react'
import './App.css';
import Home from './Components/Home';
import Auth from './Components/Auth';
import axios from 'axios';
// import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

function App() {
  // const [cookies, setCookie,removeCookie] = useCookies(['Token']);
  const [loggedIn,setLoggedIn]=useState(false);
  useEffect(()=>{
    var token = Cookies.get('Token');
    // console.log(token);
    if(token){
      TokenVerify(token);
    }else{
      Cookies.remove('Token');
       setLoggedIn(false);
    }
  },[])
  async function TokenVerify(token){
    await axios.post("http://192.168.1.12:8000/auth/check-user",{Token:token}).then((res)=>{
      // console.log(res);
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
       {/* <Auth/> */}
    </div>
  );
}

export default App;
 