import React,{useState,useEffect} from 'react';
import { AiOutlineMail,AiFillLock,AiTwotoneEyeInvisible,AiTwotoneEye} from "react-icons/ai";
import axios from 'axios';
import Cookies from 'js-cookie';
import {baseUrl} from "../../config/BaseApi";

export default function Login() {
    const[Email,setEmail]=useState();
    const[Password,setPassword]=useState();
    const[Visible,setVisible]=useState(false);
    // const [Loading,setLoading]=useState(false);

    const SwitchVisible = () => setVisible(!Visible)
    const formData = new FormData();

     useEffect(()=>{
       formData.append("Email",Email);
       formData.append("Password",Password);
    },[Email,Password])

    async function LoginUser(){
      if(Email && Password){
        await axios.post(`${baseUrl}/auth/auth-account`,{Email,Password}).then((res)=>{
          console.log(res.data);
          Cookies.set('Token',res.data.Token,{expires:7});
          Cookies.set('user_id',JSON.stringify(res.data.docs._id),{expires:7})
          window.location.reload();
        }).catch((err)=>{console.log(err)})
      }
    }
   
     
  return (
    <div className="login-container">
        <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <form autoComplete="off">
           <div className="login-box">
               <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                 <img width="200px" src={process.env.PUBLIC_URL+"logo.png"} style={{borderRadius:50}}/>
                  <h3 style={{marginTop:15,color:"white"}}>Login</h3>
                 
               </div>
               <div className="login-input">
                  <div className="Input-container">
                    <AiOutlineMail style={{marginLeft:2}} size={20} color="white"/>
                    <input type="text" style={{backgroundColor:"transparent",width:"80%",marginLeft:20,borderStyle:"none",color:"white"}} placeholder="Email" value={Email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  </div>
                  <div className="Input-container">
                     <AiFillLock size={20} color="white"/>
                    <input type={Visible?"text":"password"} style={{borderWidth:0,backgroundColor:"transparent",width:"70%",marginLeft:10,color:"white"}} value={Password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    {!Visible?<AiTwotoneEye onClick={()=>{SwitchVisible()}} size={20} color="white"/>:<AiTwotoneEyeInvisible onClick={()=>{SwitchVisible()}} size={20} color="white"/>}
                  </div>
                  <div style={{color:"white"}}>
                    Are you new? <a href="/Create-Account" style={{width:70,textDecoration:"none",color:"violet"}}>Create Account</a>
                  </div>
               </div>
                  <div style={{position:"relative",width:"60%",marginTop:20}}>
                    <input type="button" className="btn btn-primary" value="Login" style={{width:"100%"}} onClick={()=>{LoginUser()}}/>
                  </div>
           </div>
           </form>
        </div>
    </div>
  )
}
