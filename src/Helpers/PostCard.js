import React,{useState,useEffect} from 'react';
import Moment from 'react-moment';
import { AiTwotoneHeart,AiOutlineHeart,AiFillDelete,AiFillEdit } from "react-icons/ai";
import axios from 'axios';
import Cookies from "js-cookie";
import { RWebShare } from "react-web-share";
import { BsFillSendFill,BsFillChatHeartFill,BsFillChatLeftHeartFill } from "react-icons/bs";
import {baseUrl} from "../config/BaseApi";
import {toast,ToastContainer} from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useSound from 'use-sound';    


export default function PostCard(props) {
    const likeSound = process.env.PUBLIC_URL + 'like-sound.mp3';
    const [play] = useSound(likeSound);
    const [Author,setAuthor]=useState();
    const[liked,setLiked]=useState(false);
    const user = Cookies.get('user_id');
    
    useEffect(()=>{
       if(user){
       setAuthor(user.replace(/"|'/g, ''));
    } 
    },[Author])
    useEffect(()=>{
        if(props.likes && props.favourite)
        {
            isBlogFavLiked();
        }else if(props.likes){
          isBlogLiked()
        } 
    },[props.likes])

    function isBlogLiked(){
        if (props.likes.filter(e => e.BlogId === props.id).length > 0) {
            setLiked(true);
        }
    }
    function isBlogFavLiked(){
        if (props.likes.filter(e => e.BlogId._id === props.id).length > 0) {
            setLiked(true);
        }
    }
    function ToggleLike(){
       play();
       setLiked(!liked);
       if(!liked){
          Blogliked()
       }
       if(liked){
         BlogUnliked()
       }
    }

    function Blogliked(){
        axios.put(`${baseUrl}/likes/${Author}`,{blog_id:props.id}).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)});
    }
    function BlogUnliked(){
        console.log("unliked"+props.id)
        axios.put(`${baseUrl}/Removelikes/${Author}`,{blog_id:props.id}).then((res)=>{console.log(res.data)}).catch((err)=>{console.log(err)})
    }
    function DeletePost(id){
    props.openModal();
    if(props.DeleteItem){
           axios.post(`${baseUrl}/delete/${id}`,{id:Author}).then((res)=>{console.log(res.data);
        if(res.status===200){
           toast.success(res.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
        }else{
            toast.info(res.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
        }
    }).catch((err)=>{
          toast.error("Please try again sometines later",{position:toast.POSITION.BOTTOM_CENTER});
       })
    }
    props.setDeleteItem(false);
    }
  
  return (
    <div className="CardDesign">
       <a href={`/BlogDetail/${props.id}`} style={{textDecoration:"none",color:"black"}}>
        <div className="thumbnail-img" >
            <img style={{height:"100%",width:"100%",borderWidth:70}} src={props.image}/>
        </div>
        </a>
        <div style={{width:"100%"}}>
            <a href={`/BlogDetail/${props.id}`} style={{textDecoration:"none",color:"black"}}>
            <div style={{width:"100%",paddingLeft:5,paddingTop:4}}>
                <p style={{fontSize:18,fontWeight:"bold",textAlign:"center",fontFamily:"Alkatra"}} className="Title">{props.Title}</p>
            </div>
            <div style={{padding:5}}>
                <p className="description" style={{fontSize:13,textOverflow:"ellipsis",overflow:"hidden",fontFamily:"Josefin Sans"}}>{props.Desc}</p>
            </div>
            <div style={{width:"100%"}}>
                <div style={{padding:6,display:"flex",justifyContent:"space-between",width:"100%"}}>
                    <p style={{fontFamily:"Alkatra"}}>Author : </p>
                    <p style={{color:"violet",fontFamily:"Delicious Handrawn"}}>{props.Author}</p>
                </div>
                <div style={{marginTop:-30,padding:6,display:"flex",justifyContent:"space-between",width:"100%"}}>
                    <p style={{fontFamily:"Alkatra"}}>Published At : </p>
                    <p style={{fontFamily:"Delicious Handrawn"}}><Moment format="YYYY/MM/DD HH:mm">{props.createdAt}</Moment></p>
                </div>
            </div>
            </a>
                {!props.MyBlog?
                <div style={{width:"40%"}} className="d-flex flex-row-reverse p-1   align-items-center justify-content-between mr-2">
                    <BsFillChatLeftHeartFill size={25} />
                    <RWebShare data={{text:"Blogger's World Share",url: "http://localhost:3000",title: "Blogger's World Share Link"}} writeText="http://localhost:3000" onClick={() => console.log("shared successfully!")}>
                        <BsFillSendFill size={25}/>
                    </RWebShare>
                    {liked?<AiTwotoneHeart onClick={()=>{ToggleLike()}} size={35}  color="red"/>:<AiOutlineHeart onClick={()=>{ToggleLike()}} size={35}  color="black"/>}
                    
                </div>:<div style={{width:"40%"}} className="d-flex flex-row-reverse p-1   align-items-center justify-content-between mr-2">
                    <RWebShare data={{text:"Blogger's World Share",url: "http://localhost:3000",title: "Blogger's World Share Link"}} writeText="http://localhost:3000" onClick={() => console.log("shared successfully!")}>
                    <BsFillSendFill size={25}/>
                    </RWebShare>
                    <AiFillEdit color="blue" size={25}/>
                    <AiFillDelete onClick={()=>{DeletePost(props.id)}} color="red" size={25} />
                </div>}
            {/* </div> */}
        </div>
        <ToastContainer/>
    </div>
  )
}

