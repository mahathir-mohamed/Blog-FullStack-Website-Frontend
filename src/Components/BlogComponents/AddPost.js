import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import PacmanLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';
import {baseUrl} from "../../config/BaseApi";


export default function AddPost(){
    const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};
    const[Title,setTitle] = useState("");
    const [Loading, setLoading] = useState(false);
    const [color, setColor] = useState("#ffffff");
    const[Description,setDescription] = useState("");
    const [Author,setAuthor] = useState("");
    const formData=new FormData();
    const [BlogId,setBlogId] = useState("");
    function FileHandling(e:changeEvent<HTMLInputElement>){
    if(e.target.files){
        formData.append('Image',e.target.files[0]);
     }
  }

  useEffect(()=>{
    const user = Cookies.get('user_id');
       setAuthor(user.replace(/"|'/g, ''))  
       console.log(Author); 
    
  },[]);
  // useEffect(()=>{
  //    setAuthor(Author)
  // },[user])
  useEffect(()=>{
    formData.append("Title",Title)
    formData.append("Description",Description);
    formData.append("Author",Author);
  },[Title,Description,Author])

    async function UploadData(){
        setTitle("");
        setDescription("");
        if(Title && Description){
          console.log(Author)
          setLoading(true);
          await axios.post(`${baseUrl}/create-blog/${Author}`,formData).then((response)=>{
            if(response.status === 200){
               console.log(response.data)
              //  setBlogId(response.data.id);
              AppendBlog(response.data.id);
               toast.success(response.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
               setLoading(false);
            }else{
               toast.info(response.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
               setLoading(false); 
            }
        }).catch((err)=>console.log(err));
        console.log(formData);
        }else{
           toast.info("Please Write Something on title and description to create new post",{position:toast.POSITION.BOTTOM_CENTER});
        }
        
    }

    async function AppendBlog(id){
        if(id && Author){
          await axios.post(`${baseUrl}/auth/AddBlog/${Author}`,{blog_id:id}).then(
            (res)=>{
                if(res.status === 200){
                  toast.success(res.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
                }{
                   toast.info(res.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
                } 
            }
            ).catch((err)=>console.log(err))
        }else{
          toast.info("Blog is not added successfully",{position:toast.POSITION.BOTTOM_CENTER});
        }
    }
  return (
    <div>
    <div className="d-flex justify-content-center align-item-center my-5" >
        <form>
            <div>
                <h2>Create Your Amazing Blog</h2>
            </div>
            <div className="my-2">
                <input style={{width:"100%",padding:5}}   onChange={(e)=>{setTitle(e.target.value)}} type="text" value={Title} placeholder="Enter the title for your blog"/>
            </div>
            <div className="my-2">
                <textarea name="title" style={{width:"100%",padding:10}} value={Description} rows="8" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Type your magical words here..."/>
            </div>
            <div className="my-2">
                <input type="file" multiple onChange={(e)=>{FileHandling(e)}} style={{width:"100%"}}/>
            </div>
            <div className="my-5">
        {Loading?<div><div className="btn btn-outline-primary w-100"><PacmanLoader
        loading={Loading}
        cssOverride={override}
        size={28}
        aria-label="Loading Spinner"/></div>
        <input type="button" className="btn my-2 btn-outline-danger w-100" onClick={()=>{setLoading(false)}} value="cancel"/></div>
       :<input type="button" style={{width:"100%"}} value="Add Post" onClick={()=>{UploadData()}} className="btn btn-outline-primary"/>}
            </div>
        </form>
    </div>
     <ToastContainer/>
    </div>
  )
}
