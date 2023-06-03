import React,{useState,useEffect} from 'react';
import Moment from 'react-moment';
import { AiTwotoneHeart,AiOutlineHeart,AiFillDelete,AiFillEdit} from "react-icons/ai";
import axios from 'axios';
import Cookies from "js-cookie";
import { RWebShare } from "react-web-share";
import { BsFillSendFill,BsFillChatHeartFill,BsFillChatLeftHeartFill } from "react-icons/bs";
import {baseUrl} from "../config/BaseApi";
import {toast,ToastContainer} from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import useSound from 'use-sound';
import {useSelector,useDispatch} from 'react-redux';
import {userActions} from '../Redux/userDetailSlice';
import {useNavigate} from 'react-router-dom';


export default function PostCard(props) {
    const navigate = useNavigate();
    const BlogId = useSelector((state)=>state.user.BlogId);
    const isLoading = useSelector((state)=>state.user.isLoading);
    const dispatch = useDispatch();
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
      dispatch(userActions.setBlogId({id:props.id}));
      console.log(BlogId);
    },[props.id])
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
        console.log(BlogId);
        props.openModal();
    }
  
  function openModal() {props.setIsOpen(!props.isOpen)}
  function closeModal() {props.setIsOpen(!props.isOpen)}
  return (
    <div className="CardDesign">
       <a href={`/BlogDetail/${props.id}`} style={{textDecoration:"none",color:"black"}}>
        <div className="thumbnail-img-container" >
            <img style={{height:"100%",width:"100%",borderWidth:70}} className="thumbnail-img" src={props.image?props.image:process.env.PUBLIC_URL+"logo.png"}/>
        </div>
        </a>
        <div style={{width:"100%"}}>
            <a href={`/BlogDetail/${props.id}`} style={{textDecoration:"none",color:"black"}}>
            <div style={{width:"100%",paddingLeft:5,paddingTop:4}}>
                <p style={{fontSize:18,fontWeight:"bold",textAlign:"center",fontFamily:"Alkatra"}} className="Title">{props.Title}</p>
            </div>
            <div style={{padding:5,height:50}}>
                <p className="description" style={{fontSize:13,textOverflow:"ellipsis",overflow:"hidden",fontFamily:"Josefin Sans"}}>{props.Desc}</p>
            </div>
            <div style={{width:"100%"}}>
                <div style={{padding:6,display:"flex",justifyContent:"space-between",width:"100%",alignItems:"center"}} className="PostCard-Profile">
                    {/* <p style={{fontFamily:"Alkatra"}}>Author : </p> */}
                    <div className="PostCard-Profile-img">
                    <img  src={props.AuthorImage?props.AuthorImage:process.env.PUBLIC_URL+"logo.png"} style={{height:35,width:35,borderRadius:50}}/>
                    </div>
                    <div className="PostCard-Profile-Name" >
                      <p style={{color:"violet",fontFamily:"Delicious Handrawn",marginTop:12}}>{props.Author}</p>
                      <p style={{fontFamily:"Delicious Handrawnm",marginTop:-18}}><Moment format="YYYY/MM/DD HH:mm">{props.createdAt}</Moment></p>
                    </div>
                </div>
                {/* <div style={{marginTop:-30,padding:6,display:"flex",justifyContent:"space-between",width:"100%"}}>  
                </div> */}
            </div>
            </a>
                {!props.MyBlog?
                <div style={{width:"40%"}} className="d-flex flex-row-reverse p-1   align-items-center justify-content-between mr-2">
                    <BsFillChatLeftHeartFill size={25} onClick={()=> {
                        props.setCommentId(props.id)
                        // props.FetchAllComment(props.CommentId)
                        openModal()

                    }} />
                    <RWebShare data={{url:`https://blog-full-stack-website-frontend.vercel.app/BlogDetail/${props.id}`,title: "Blogger's World Share Link"}} writeText={`${window.location.href}/${props.id}`} onClick={() => console.log("shared successfully!")}>
                        <BsFillSendFill size={25}/>
                    </RWebShare>
                    {liked?<AiTwotoneHeart onClick={()=>{ToggleLike()}} size={35}  color="red"/>:<AiOutlineHeart onClick={()=>{ToggleLike()}} size={35}  color="black"/>}
                    
                </div>:<div style={{width:"40%"}} className="d-flex flex-row-reverse p-1   align-items-center justify-content-between mr-2">
                    <RWebShare data={{text:"Blogger's World Share",url:`${window.location.href}/+${props.id}`,title: "Blogger's World Share Link"}} writeText={`${window.location.href}/+${props.id}`} onClick={() => console.log("shared successfully!")}>
                    <BsFillSendFill size={25}/>
                    </RWebShare>
                    <a href={`/Edit-Post/${props.id}`}>
                    <AiFillEdit  color="blue" size={25}/>
                    </a>
                    <AiFillDelete onClick={()=>{DeletePost(props.id)}} color="red" size={25} />
                </div>}
            {/* </div> */}
        </div>
        {isLoading?<ToastContainer/>:null}
        <hr className="hr2"/>
    </div>
  )
}

