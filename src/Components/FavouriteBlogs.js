import React,{useState,useEffect} from 'react';
import PostCard from '../Helpers/PostCard';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import AOS from 'aos';
import Cookies from 'js-cookie';

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
      //  console.log(Author);
        await axios.post(`http://192.168.1.12:8000/Favourite`,{user_id:Author}).then((res)=>{
          console.log(res.data)
          setlikes(res.data.result)
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
              <PostCard data-aos="fade-up" mobile={innerWidth>=700?true:false}   key={index} Title={item.BlogId.Title} id={item.BlogId._id} Desc={item.BlogId.Description} Author={item.Author} createdAt={item.BlogId.createdAt} image={item.BlogId.Image[0].url} favourite={true} likes={likes}/>
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
