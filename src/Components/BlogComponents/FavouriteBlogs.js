import React,{useState,useEffect} from 'react';
import PostCard from '../../Helpers/PostCard';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import AOS from 'aos';
import Cookies from 'js-cookie';
import {baseUrl} from "../../config/BaseApi";

export default function FavouriteBlogs() {
  const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  marginTop:200,
  alignSelf: "center",
  // borderColor: "red",
};
   const {innerWidth,innerHeight}=window;
   const [Blog,setBlog]=useState();
   const [loading,setLoading]=useState(true);
   const [Author,setAuthor]=useState("");
   const [likes,setlikes]=useState([]);

   const user = Cookies.get("user_id");
    useEffect(()=>{
       if(user){
        setAuthor(user.replace(/"|'/g, ''))
       } 
    },[user])
  
    useEffect(()=>{
      if(Author){
        FetchLikes();
      }
    },[Author])

    useEffect(()=>{ 
      setlikes(likes);
    },[likes])

    async function FetchLikes(){
       console.log(Author);
        await axios.post(`${baseUrl}/Favourite`,{user_id:Author}).then((res)=>{
          console.log(res.data)
          if(res.status===200){
            setlikes(res.data.result);
            setLoading(false);
          }else{
            setLoading(true)
          }
        }).catch((err)=>{console.log(err)});
    }
  return (
    <Container className="test">
        <div className="d-flex justify-content-center" style={{width:"100%",padding:20}}>
            <h1  style={{textAlign:"center"}}>Favourite Blog Posts</h1>
        </div>  
        <div className="PostCard">
          {likes?likes.map((item,index)=>{
            return(
              <PostCard key={index} data-aos="fade-up" mobile={innerWidth>=700?true:false} Title={item.BlogId.Title} id={item.BlogId._id} Desc={item.BlogId.Description} AuthorImage={item.BlogId.Author.Image[0].url} Author={item.BlogId.Author.Username} createdAt={item.BlogId.createdAt} image={item.BlogId.Image[0].url} favourite={true} likes={likes}/>
            )
          }):<ClipLoader
        color="blue"
        loading={loading}
        cssOverride={override}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />}

      {/* <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}><lottie-player src="https://assets10.lottiefiles.com/private_files/lf30_e3pteeho.json"  background="transparent"  speed="1" style={{width:300,height:300}}  loop  autoplay></lottie-player></div> */}
         
            
        </div>
    </Container>
  )
}

// const PostCard = {

// }
