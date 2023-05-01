import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import PacmanLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie';
import {baseUrl} from "../../config/BaseApi";
import {useParams} from 'react-router-dom';



export default function EditPost(){

    const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};
    const id = useParams();
    const[Title,setTitle] = useState("");
    const [Loading, setLoading] = useState(false);
    const [color, setColor] = useState("#ffffff");
    const[Description,setDescription] = useState("");
    const [Author,setAuthor] = useState("");
    const [Image,setImage] = useState("");
    const formData=new FormData();
    const [BlogId,setBlogId] = useState("");
    const  PreviewImage = useRef("");

    useEffect(()=>{
      PreviewImage.current.src = Image;
    },[Image]);

    useEffect(()=>{
          fetchPost()
    },[])



  const FileHandling = (e)=>{
     PreviewImage.current.src = URL.createObjectURL(e.target.files[0])
    for(let i=0;i<e.target.files.length;i++){
      formData.append("Image",e.target.files[i]);
    }
  }

  useEffect(()=>{
    formData.append("Title",Title)
    formData.append("Description",Description);
    formData.append("Author",Author);
  },[Title,Description,Author])

  const fetchPost = async ()=>{
    console.log(`${baseUrl}/FindPost/${id.id}`);
     await axios.get(`${baseUrl}/FindPost/${id.id}`).then((res)=>{
        console.log(res);
        if(res.status === 200){
            setTitle(res.data.result.Title);
            setDescription(res.data.result.Description);
            setImage(res.data.result.Image[0].url)
        }
     }).catch((err)=>{console.log(err)});
  }

    async function UploadData(){
        if(Title && Description){
          console.log(Author)
          setLoading(true);
          await axios.put(`${baseUrl}/EditPost/${id.id}`,formData).then((response)=>{
            if(response.status === 200){
               console.log(response.data)
              //  setBlogId(response.data.id);
               toast.success(response.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
               setLoading(false);
            }else{
               toast.info(response.data.msg,{position:toast.POSITION.BOTTOM_CENTER});
               setLoading(false); 
            }
        }).catch((err)=>console.log(err));
        // console.log(formData);
        }else{
           toast.info("Please Write Something on title and description to create new post",{position:toast.POSITION.BOTTOM_CENTER});
        }
        
    }
  return (
    <div className="AddPostContainer d-flex flex-column justify-content-center align-items-center">
    <div className="d-flex flex-column justify-content-center align-item-center my-5 Post-Container w-75" >
            <div>
                <h2 style={{color:"white"}}>Edit Your Amazing Blog</h2>
            </div>
            <div className="my-2">
                <input type="text" placeholder="Enter Your Title" id="input" className="Title" style={{width:"100%",padding:5}}  onChange={(e)=>{setTitle(e.target.value)}}  value={Title} />
            </div>
            <div className="my-2">
                <textarea placeholder="Type your magical words here..." name="title" style={{width:"100%",padding:10}} value={Description} rows="8" onChange={(e)=>{setDescription(e.target.value)}} />
            </div>
            {/* <div className="my-2">
                <input type="file" multiple onChange={(e)=>{FileHandling(e)}} style={{width:"100%"}}/>
            </div> */}
             <div className="w-100 d-flex justify-content-between">
                    <div>
                     <label className="file-label bg-primary" for="files" >Change Cover Picture</label>
                      <input   type="file" id="files" className="file-input" 
                      onChange={(e)=>{FileHandling(e)}}/>
                      </div>
                      <div>
                    {Image!=null?<img ref={PreviewImage}  style={{width:50,height:50}}/>:null}
                    
                      </div>
                   </div> 
      <div className="my-5 d-flex align-items-center justify-content-center">
        {Loading?<div style={{width:"100%",display:'flex',alignItems: 'center',justifyContent:'center',flexDirection:'column'}}><div className="w-100"><PacmanLoader
        loading={Loading}
        cssOverride={override}
        size={28}
        aria-label="Loading Spinner"/></div>
        <input type="button" className="btn my-2 btn-danger w-50" onClick={()=>{setLoading(false)}} value="cancel"/></div>
       :<input type="button" style={{width:"100%"}} value="Update Post" onClick={()=>{UploadData()}} className="btn btn-primary w-50"/>}
        </div>
        
    </div>
     <ToastContainer/>
    </div>
  )
}
