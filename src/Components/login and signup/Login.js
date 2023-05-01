import React,{useState,useEffect} from 'react';
import { AiOutlineMail,AiFillLock,AiTwotoneEyeInvisible,AiTwotoneEye} from "react-icons/ai";
import axios from 'axios';
import Cookies from 'js-cookie';
import {baseUrl} from "../../config/BaseApi";
import PacmanLoader from "react-spinners/ClipLoader";
import {toast,ToastContainer} from 'react-toastify';

export default function Login() {
   const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};
    const[Email,setEmail]=useState();
    const[Password,setPassword]=useState();
    const[Visible,setVisible]=useState(false);
    const [Loading,setLoading]=useState(false);

    const SwitchVisible = () => setVisible(!Visible)
    const formData = new FormData();

     useEffect(()=>{
       formData.append("Email",Email);
       formData.append("Password",Password);
    },[Email,Password])

    async function LoginUser(){
      setLoading(true);
      if(Email && Password){
        await axios.post(`${baseUrl}/auth/auth-account`,{Email,Password}).then((res)=>{
          console.log(res.data);
          if(res.status === 200 && res.data.msg=="User Found"){
             setLoading(false);
             toast.success(res.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
             setTimeout(function(){
               window.location.reload();
             },1000)
          }else{
            setLoading(false);
            toast.info(res.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
          }
          Cookies.set('Token',res.data.Token,{expires:7});
          Cookies.set('user_id',JSON.stringify(res.data.docs._id),{expires:7})
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
            <div className="my-5 d-flex align-items-center justify-content-center w-100">
        {Loading?<div style={{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}><div className=" w-50"><PacmanLoader
        loading={Loading}
        cssOverride={override}
        size={28}
        aria-label="Loading Spinner"/></div>
        <input type="button" className="btn my-2 btn-danger w-50" onClick={()=>{setLoading(false)}} value="cancel"/></div>
       :<input type="button" style={{width:"100%"}} value="Login" onClick={()=>{LoginUser()}} className="btn btn-primary w-50"/>}
        </div>
           </div>
           </form>
        </div>
         <ToastContainer/>
    </div>
  )
}
