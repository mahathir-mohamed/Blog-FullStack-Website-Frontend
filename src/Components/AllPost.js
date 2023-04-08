import React,{useState,useEffect} from 'react';
import PostCard from '../Helpers/PostCard';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import AOS from 'aos';
import Cookies from 'js-cookie';

export default function AllPost() {
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
   const [Author,setAuthor]=useState();
   const [likes,setlikes]=useState();

   const user = Cookies.get("user_id");
    useEffect(()=>{
        axios.get('http://192.168.1.12:8000/all-post').then((response)=>{
          setBlog(response.data);
          if(Blog){
            setLoading(false);
          }
        }).catch((error)=>{console.log(error)})
        AOS.init();
    },[]);
    useEffect(()=>{
       if(user){
        setAuthor(user.replace(/"|'/g, ''))
       } 
       FetchUser();
       console.log(likes);
    },[Author]);

    useEffect(()=>{
      setlikes(likes);
      console.log(likes)
    },[likes])
     function isBlogLiked(value){
      //  if(likes.includes(value._id)){
      //   console.log(value._id);
      //  }
    }
    async function FetchUser(){
        await axios.get(`http://192.168.1.12:8000/auth/FindUser/${Author}`).then((res)=>{
          console.log(res.data)
          setlikes(res.data.result.likes)
        }).catch((err)=>{console.log(err)});
    }
  return (
    <Container className="test">
        <div className="d-flex justify-content-center" style={{width:"100%",padding:20}}>
            <h1  style={{textAlign:"center"}}>Trending Blog Posts</h1>
        </div>
        <div className="PostCard">
          {Blog?Blog.map((item,index)=>{
            return(
              <PostCard data-aos="fade-up" mobile={innerWidth>=700?true:false}   key={index} Title={item.Title} id={item._id} Desc={item.Description} Author={item.Author} createdAt={item.createdAt} image={item.Image[0].url} likes={likes}/>
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
