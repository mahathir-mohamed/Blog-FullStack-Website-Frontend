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
import {useSelector} from 'react-redux';


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
    const [AuthorBlogs,setAuthorBlogs]=useState([]);
    const [AuthorId,setAuthorId]=useState();
    const [WriterBlogs,setWriterBlogs]=useState();

    const userData = useSelector((state)=>state.user.userDetail)
    const user = Cookies.get("user_id").replace(/"|'/g, '');
    useEffect(()=>{
        FetchPost();
        FetchAllComment();
    },[])
      useEffect(()=>{
      if(AuthorId){
       ReccomentedBlog(AuthorId) 
        fetchAuthorBlogs();
      }
    },[AuthorId])
    useEffect(()=>{
       setComments(Comments); 
    },[Comments])

    useEffect(()=>{
       console.log(AuthorBlogs);
} ,[AuthorBlogs])

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
            const newBlogs = res.data.result.Author.Blogs.filter((blog)=>{return blog.BlogId!=BlogId});
            setAuthorBlogs(newBlogs);
        }else{
          setLoading(true);
        }
      }).catch((err)=>{console.log(err)})
    }

    async function fetchAuthorBlogs(){
      axios.get(`${baseUrl}/AuthorBlog/${AuthorId}?BlogId=${BlogId}`).then((res)=>{
        setWriterBlogs(res.data.result);
        console.log(res.data.result);
        console.log("fetched")
      }).catch((err)=>{console.log(err)});
    }
    
    async function FetchAllComment(){
      await axios.get(`${baseUrl}/Comment/AllComments/${BlogId}`).then((res)=>{
        //  console.log(res.data);
        if(res.status === 200){
          setComments(res.data.result);
        }
      }).catch((err)=>{console.log(err)})
    }
   useEffect(()=>{
    if(userData.Image){
       setImgUrl(userData.Image[0].url);
       setAdminname(userData.Username);
    }
   },[userData])
    function AddComment(){
      const data={
        Comment:Comment,
        User:user
      }
      if(Comment && Adminname && ImgUrl){
         axios.post(`${baseUrl}/Comment/AddComment/${BlogId}`, data).then((res)=>{
        console.log(res.data);
        if(res.status===200){
            setComment("");
            window.location.reload();
        }
      }).catch((err)=>{console.log(err)})
      }
    }
  function ReccomentedBlog(authorid){
    axios.get(`${baseUrl}/RecommentPost/${BlogId}`,AuthorId).then((res)=>{
      console.log(res.data);
      if(res.status===200){
        setRecomment(res.data.result);
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
                 <img className="BlogThumbnail" src={ThumbnailImage?ThumbnailImage:process.env.PUBLIC_URL+"logo.png"}/>
              </div>
              <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems: "center"}}>
                 <p className="Description">{Description}</p>
              </div>
              <div className="CommentSection">
                <h4>Comments</h4>
                <div className="CommentTextBox">
                  <div style={{width:"13%"}}>
                  <img src={ImgUrl} style={{width:35,marginTop:-35,height:35,borderRadius:50}}/>
                  </div>
                  <div style={{width:"90%"}}>
                  <textarea style={{width:"90%",borderColor:"black",borderWidth:1,padding:10}}placeholder="share your thoughts here..." value={Comment} id="commenttext" onChange={(e)=>{setComment(e.target.value)}}></textarea>
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

              {WriterBlogs?<div style={{display:"flex",justifyContent:"space-evenly"}}> <p>More from</p><p style={{color:"violet"}}>{Username}</p></div>:null}
              <div>
                {WriterBlogs?WriterBlogs.map((item,index)=>{
                  return(
                    <div >
                    <RecommentCard key={index} Title={item.BlogId.Title} Image={item.BlogId.Image[0].url} id={item.BlogId._id} Description={item.BlogId.Description}/>
                    </div>
                  )
                }):null}
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
