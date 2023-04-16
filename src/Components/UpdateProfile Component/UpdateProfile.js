import React,{useState,useEffect,useRef} from 'react';
import { AiOutlineMail,AiFillLock,AiOutlineUser,AiTwotoneEyeInvisible,AiTwotoneEye } from "react-icons/ai";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from "../../config/BaseApi";

export default function UpdateProfile() {
    const {id}=useParams();
    const[Email,setEmail]=useState();
    const[Password,setPassword]=useState();
    const[Username,setUsername]=useState();
    const [Image,setImage]=useState("");
    const[Visible,setVisible]=useState(false);
    const  PreviewImage = useRef("");
    const SwitchVisible = () => setVisible(!Visible)
    const formdata = new FormData();
    function FileHandling(e:changeEvent<HTMLInputElement>){
    // setImage(URL.createObjectURL(e.target.files[0]))
    // PreviewImage.current.src = URL.createObjectURL(e.target.files[0])
    // console.log(PreviewImage)
    if(e.target.files){
        formdata.append('Image',e.target.files[0]);
     }
    console.log(e.target.files[0])
  }

    // useEffect(()=>{
    //   PreviewImage.current.src = Image;
    // },[Image]);

    useEffect(()=>{
        formdata.append("Email",Email);
        formdata.append("Username",Username);
    },[Email,Username]);

    useEffect(()=>{
      FetchUser();
      // console.log(id);
    },[])

   function FetchUser(){
           axios.get(`${baseUrl}/auth/FindUser/${id}`).then(
            (res)=>{
            //   console.log(res.data.result);
            //   setId(res.data.result._id)
              setUsername(res.data.result.Username);
              setEmail(res.data.result.Email);
              setImage(res.data.result.Image[0].url)
            }
            ).catch((err)=>console.log(err))
        }

    function UpdateUser(){
      console.log(formdata);
      axios.post(`${baseUrl}/auth/Update-Profile/${id}`,formdata,{headers:{'content-type':'multipart/form-data'}}).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
        //  window.location.reload();
    }
     
  return (
    <div className="Signin-container">
        <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
          <form autoComplete="off">
           <div className="Sign-box">
               <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
                 <img width="200px" src="https://res.cloudinary.com/doiff4svr/image/upload/v1681197573/Images/logo_up3wdp.png" style={{borderRadius:50}}/>
                  <h3 style={{marginTop:15,color:"white"}}>Update Account</h3>
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
                  {/* <div className="Input-container">
                    <AiFillLock size={20} color="white"/>
                    <input type={Visible?"text":"password"} style={{borderWidth:0,backgroundColor:"transparent",width:"70%",marginLeft:10,color:"white"}} value={Password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    {!Visible?<AiTwotoneEye onClick={()=>{SwitchVisible()}} size={20} color="white"/>:<AiTwotoneEyeInvisible onClick={()=>{SwitchVisible()}} size={20} color="white"/>}
                  </div> */}
                  <div className="file-box">
                    <div>
                     <label className="file-label" for="files" >Change Profile Image</label>
                      <input   type="file" id="files" className="file-input" 
                      onChange={(e)=>{FileHandling(e)}}/>
                      </div>
                      <div>
                     <img src={Image}  style={{width:35,borderRadius:50,height:35}}/>
                      </div>
                   </div> 
               </div>
                  <div style={{position:"relative",width:"60%",marginTop:20}}>
                    <input type="button" className="btn btn-primary" value="Update Profile" style={{width:"100%"}} onClick={()=>{UpdateUser()}}/>
                  </div>
           </div>
           </form>
        </div>
    </div>
  )
}
