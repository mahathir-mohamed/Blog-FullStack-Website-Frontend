import React,{useState,useEffect,useRef} from 'react';
import PostCard from '../../Helpers/PostCard';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import AOS from 'aos';
import Cookies from 'js-cookie';
import {baseUrl} from "../../config/BaseApi";
import {useSelector} from 'react-redux';
import {toast,ToastContainer} from 'react-toastify';
import { AiOutlineArrowRight,AiOutlineArrowLeft } from "react-icons/ai";

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
   const [likes,setlikes]=useState();
   const [Page,setPage] = useState(1);
   const [Limit,setLimit] = useState(6);
   const userData = useSelector((state)=>state.user.userDetail);
   const PrevIndex = useRef(1);
   const[length,setLength]=useState()
   const user = Cookies.get("user_id").replace(/"|'/g, '');
    useEffect(()=>{
        fetchPosts();
<<<<<<< HEAD
        // AOS.init();
    },[user,Page]);
=======
        AOS.init();
        // console.log(PrevIndex.current);
    },[Page]);
    useEffect(()=>{
      calculateMaxpage();
    },[length,Limit])
    function calculateMaxpage(){
       const MaxPage = Math.ceil(length/Limit);
       setmaxPage(MaxPage);
    }
>>>>>>> 11ade5082b3380e4ad268e1669bad91a921f3055
    useEffect(()=>{
      setlikes(userData.likes)
    },[userData]);

  function fetchPosts(){
    axios.get(`${baseUrl}/all-post?page=${Page}&limit=${Limit}`).then((response)=>{
      if(response.status==200){
            setLoading(false);
            setBlog(response.data.result);
            setLength(response.data.TotalLength);
          }
      }).catch((error)=>{console.log(error)})
  }

  return (
    <Container className="test">
        <div className="d-flex justify-content-center" style={{width:"100%",padding:20}}>
            <h1  style={{textAlign:"center"}}>Trending Blog Posts</h1>
        </div>
        <div className="PostCard">
          {Blog?Blog.map((item,index)=>{
            return(
              
              <PostCard data-aos="fade-up" mobile={innerWidth>=700?true:false}   key={index} Title={item.Title} id={item._id} Desc={item.Description} Author={item.Author.Username} AuthorImage={item.Author.Image[0].url}  createdAt={item.createdAt} image={item.Image[0].url} likes={likes}/>
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
        {Blog?
        <div className="d-flex justify-content-around w-100" style={{marginBottom:20}}>
          <div className="btn btn-primary" style={{display:"flex",flexDirection:"row",alignItems:"center",width:100,justifyContent:"space-around"}} onClick={()=>{
            // console.log("prev"+Page);
            if(Page>1){
               setPage((Page)=>Page-1);
              //  fetchPosts();
            }else{
              toast.info("This is end of the page",{position:toast.POSITION.BOTTOM_CENTER})
            }
            }} >
            <AiOutlineArrowLeft/>
            <div>
              Back
            </div>
            </div>
            <div className="btn btn-primary" style={{display:"flex",flexDirection:"row",alignItems:"center",width:100,justifyContent:"space-around"}} onClick={()=>{
            if(Page<length){
              setPage((Page)=>Page+1);
              // console.log("next"+length,Page);
            }else{
              // console.log(length);
              toast.info("No more pages left",{position:toast.POSITION.BOTTOM_CENTER})
            }
            }}   >
            <div>
              Next
            </div>
             <AiOutlineArrowRight/>
            </div>
        </div>:null}
        <ToastContainer/>
    </Container>
  )
}


