import React,{useState,useEffect} from 'react';
import { AiOutlineMail,AiFillLock,AiOutlineUser,AiTwotoneEyeInvisible,AiTwotoneEye } from "react-icons/ai";
import axios from 'axios';
import {baseUrl} from "../../config/BaseApi";

export default function SignIn() {
    const[Email,setEmail]=useState();
    const[Password,setPassword]=useState();
    const[Username,setUsername]=useState();
    const [Image,setImage]=useState();
    const[Visible,setVisible]=useState(false);

    const SwitchVisible = () => setVisible(!Visible)
    const formData = new FormData();

    useEffect(()=>{
        formData.append("Email",Email);
        formData.append("Password",Password);
        formData.append("Username",Username);
    },[Email,Password,Username]);

  
    const FileHandling = (e:changeEvent<HTMLInputElement>)=>{
       for(let i = 0; i < e.target.files.length; i++) {
         formData.append('Image',e.target.files[i])
         }   
    }

    function CreateUser(){
      console.log(formData);
      axios.post(`${baseUrl}/auth/create-account`,formData).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
         setEmail('');
         setPassword('');
         setUsername('');
         setImage("");
     
    }
     
  return (
    <div className="Signin-container">
        <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <form autoComplete="off">
           <div className="Sign-box">
               <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                 <img width="200px" src={process.env.PUBLIC_URL+"logo.png"} style={{borderRadius:50}}/>
                  <h3 style={{marginTop:15,color:"white"}}>Create Account</h3>
               </div>

               <div className="login-input">
                  <div className="Input-container">
                    <AiOutlineUser style={{marginLeft:2}} size={20} color="white"/>
                    <input type="text" style={{backgroundColor:"transparent",width:"80%",marginLeft:20,borderStyle:"none",color:"white"}} placeholder="Username" value={Username} onChange={(e)=>{setUsername(e.target.value)}}/>
                  </div>
                  <div className="Input-container">
                    <AiOutlineMail style={{marginLeft:2}} size={20} color="white"/>
                    <input type="email" style={{backgroundColor:"transparent",width:"80%",marginLeft:20,borderStyle:"none",placeholderColor:"white",color:"white"}} placeholder="Email" value={Email} onChange={(e)=>{setEmail(e.target.value)}}/>
                  </div>
                  <div className="Input-container">
                    <AiFillLock size={20} color="white"/>
                    <input type={Visible?"text":"password"} style={{borderWidth:0,backgroundColor:"transparent",width:"70%",marginLeft:10,color:"white"}} value={Password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    {!Visible?<AiTwotoneEye onClick={()=>{SwitchVisible()}} size={20} color="white"/>:<AiTwotoneEyeInvisible onClick={()=>{SwitchVisible()}} size={20} color="white"/>}
                  </div>
                  <div className="file-box">
                     <label className="file-label" for="files" >Upload Profile</label>
                     <input type="file" id="files" className="file-input" onChange={(e)=>{
                      FileHandling(e);
                      // setImage(e.target.files[0].name)
                      }}/>
                      {/* <input type="file" onChange={(e)=>{FileHandling(e)}}/> */}
                     {Image}
                  </div>
                  <div style={{color:"white"}}> 
                    Already have an account? <a href="/" style={{width:70}}>Login</a>
                  </div>
               </div>
                  <div style={{position:"relative",width:"60%",marginTop:20}}>
                    <input type="button" className="btn btn-primary" value="Create Account" style={{width:"100%"}} onClick={()=>{CreateUser()}}/>
                  </div>
           </div>
           </form>
        </div>
    </div>
  )
}
