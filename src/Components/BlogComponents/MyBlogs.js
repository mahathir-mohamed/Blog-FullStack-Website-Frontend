import React,{useState,useEffect} from 'react';
import PostCard from '../../Helpers/PostCard';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import AOS from 'aos';
import Cookies from 'js-cookie';
import {baseUrl} from "../../config/BaseApi";
import AlertModal from '../../Helpers/AlertModal';  

export default function MyBlogs() {
  const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  marginTop:200,
  alignSelf: "center",
  // borderColor: "red",
};
   const {innerWidth,innerHeight}=window;
   const [Blogs,setBlogs]=useState();
   const [loading,setLoading]=useState(true);
   const [Author,setAuthor]=useState("");
   const [DeleteItem,setDeleteItem]=useState(false);
//    const [likes,setlikes]=useState([]);
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {setIsOpen(!isOpen)}
  function closeModal() {setIsOpen(!isOpen)}
    useEffect(()=>{
       const user = Cookies.get("user_id");
        setAuthor(user.replace(/"|'/g, '')) 
    },[])
  
    useEffect(()=>{
      if(Author){
        FetchBlogs();
      }
    },[Author])

    useEffect(()=>{ 
      setBlogs(Blogs);
    },[Blogs])  

    async function FetchBlogs(){
      //  console.log(Author);
        await axios.get(`${baseUrl}/MyBlogs/${Author}`).then((res)=>{
          console.log(res.data)
          setBlogs(res.data.result)
        }).catch((err)=>{console.log(err)});
    }
  return (
    <Container className="test">
        <AlertModal setDeleteItem={setDeleteItem} DeleteItem={DeleteItem} closeModal={closeModal} modalIsOpen={isOpen}/>
        <div className="d-flex justify-content-center" style={{width:"100%",padding:20}}>
            <h1  style={{textAlign:"center"}}>My Blog Posts</h1>
        </div>  
        <div className="PostCard">
          {Blogs?Blogs.map((item,index)=>{
            return(
              <PostCard DeleteItem={DeleteItem} setDeleteItem={setDeleteItem} openModal={openModal} MyBlog={true} data-aos="fade-up" mobile={innerWidth>=700?true:false}   key={index} Title={item.BlogId.Title} id={item.BlogId._id} Desc={item.BlogId.Description} Author={item.BlogId.Author.Username} createdAt={item.BlogId.createdAt} image={item.BlogId.Image[0].url}  />
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
