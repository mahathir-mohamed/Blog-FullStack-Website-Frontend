import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Moment from 'react-moment';
import ClipLoader from "react-spinners/ClipLoader";
import RecommentCard from '../../Helpers/RecommentCard';
import CommentSection from '../../Helpers/CommentSection';
import Cookies from 'js-cookie';
import {baseUrl} from "../../config/BaseApi";

export default function BlogDetailspage() {
   const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  marginTop:200,
  alignSelf: "center",
};
    const {BlogId} = useParams();
    const [Image,setImage]=useState();
    const [ThumbnailImage,setThumbnailImage]=useState();
    const [Author,setAuthor]=useState();
    const [Loading,setLoading]=useState(true);
    const [Title,setTitle]=useState();
    const [Description,setDescription]=useState();
    const [Time,setTime]=useState();
    const [Username,setUsername]=useState();
    const [Comments,setComments]=useState([]);
    const [Comment,setComment]=useState();
    const [ImgUrl,setImgUrl]=useState();
    const [Adminname,setAdminname]=useState();
    const [UserId,setUserId]=useState();
    const [Recomment,setRecomment]=useState([]);
    const [AuthorId,setAuthorId]=useState();
    const user = Cookies.get("user_id").replace(/"|'/g, '');
    useEffect(()=>{
        FetchPost();
        FetchAllComment();
    },[])

    useEffect(()=>{
      if(AuthorId){
       ReccomentedBlog(AuthorId) 
      }
    },[AuthorId])
    useEffect(()=>{
       setComments(Comments);
       FindUser();  
    },[Comments])
    function FetchPost(){
      axios.get(`${baseUrl}/Findpost/${BlogId}`).then((res)=>{
        console.log(res.data.result.Author._id)
        if(res.status===200){
            setTitle(res.data.result.Title);
            setAuthor(res.data.result.Author);
            setAuthorId(res.data.result.Author._id)
            setDescription(res.data.result.Description);
            setImage(res.data.result.Author.Image[0].url);
            setTime(res.data.result.createdAt);
            setThumbnailImage(res.data.result.Image[0].url);
            setUsername(res.data.result.Author.Username)
            setLoading(false);
        }else{
          setLoading(true);
        }
      }).catch((err)=>{console.log(err)})
    }

    function FetchAllComment(){
      axios.get(`${baseUrl}/Comment/AllComments/${BlogId}`).then((res)=>{
        //  console.log(res.data);
        if(res.status === 200){
          setComments(res.data.result);
        }
      }).catch((err)=>{console.log(err)})
    }

    function AddComment(){
      FindUser()
      const data={
        Comment:Comment,
        User:user
      }
      // console.log(data);
      // console.log(BlogId);
      if(Comment && Adminname && ImgUrl){
         axios.post(`${baseUrl}/Comment/AddComment/${BlogId}`, data).then((res)=>{
        console.log(res.data);
        if(res.status===200){
          //  console.log(res.data);
           setComment("");
        }
      }).catch((err)=>{console.log(err)})
      }
    }
  function FindUser(){
    axios.get(`${baseUrl}/auth/FindUser/${user}`).then((res)=>{
              if(res.status===200){
                // console.log(res.data.result)
                 setImgUrl(res.data.result.Image[0].url);
                 setAdminname(res.data.result.Username);
              }
              // console.log(res.data);
            }).catch((err)=>console.log(err))
  }
  function ReccomentedBlog(authorid){
    axios.get(`${baseUrl}/RecommentPost/${BlogId}`,authorid).then((res)=>{
      console.log(res.data);
      if(res.status===200){
        setRecomment(res.data.result)
      }
    }).catch((err)=>{console.log(err)})
  }
   
  return (
    <Container>
         {!Loading?<div className="DetailMainContainer">
          <div className="DetailScreen">
                <div style={{display:"flex",justifyContent: "center",alignItems: "center"}}>
                 <h2>{Title}</h2>
              </div>
              <div style={{display:"flex",width:180,alignItems:"center",justifyContent:"space-between"}}>
                 <img style={{height:35,width:35,borderRadius:50,marginBottom:10}} src={Image}/>
                 <div>
                 <p style={{marginTop:10,marginBottom:-1,color:"violet"}}>{Username}</p>
                  <p style={{fontFamily:"Delicious Handrawn"}}><Moment format="YYYY/MM/DD HH:mm">{Time}</Moment></p>
                 </div>
              </div>
              <div style={{display:"flex",justifyContent: "center",alignItems: "center"}}>
                 <img className="BlogThumbnail" src={ThumbnailImage}/>
              </div>
              <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems: "center"}}>
                 <p className="Description">{Description}</p>
              </div>
              <div className="CommentSection">
                <h4>Comments</h4>
                <div className="CommentTextBox">
                  <img src={ImgUrl} style={{width:35,marginTop:-35,height:35,borderRadius:50}}/>
                  <div style={{width:"90%"}}>
                  <textarea style={{width:"90%"}}placeholder="Share your thoughts here" value={Comment} onChange={(e)=>{setComment(e.target.value)}}></textarea>
                  <input className="btn btn-primary" type="button" onClick={()=>{AddComment()}}value="Add comment"/>
                  </div>
                </div>
                {Comments.map((item,index)=>{
                  return(
                     <CommentSection key={index} Image={item.CommentId.User.Image[0].url}  Author={item.CommentId.User.Username} Comment={item.CommentId.Comment}/>
                  )
                })}
              </div>
            </div>
            <div className="RecommandScreen">
              <h5>Reccomented Blogs</h5>
              <div style={{display:"flex",justifyContent:"space-evenly"}}> <p>More from</p><p style={{color:"violet"}}>{Username}</p></div>
              <div>
                 <RecommentCard Title={Title} Image={ThumbnailImage} Description={Description}/>
              </div>
              <div>
              <h5 style={{color:"blue",marginTop:20}}>People also viewed</h5>
               {Recomment.map((item,index)=>{
                  return(
                    <div>
                     <RecommentCard Title={item.Title} Image={item.Image[0].url} Description={item.Description} id={item._id}/>
                     </div>
                  )
                })}
              
              </div>
            </div>
         </div>:<ClipLoader
        color="blue"
        loading={Loading}
        cssOverride={override}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"/>}
    </Container>
  )
}
