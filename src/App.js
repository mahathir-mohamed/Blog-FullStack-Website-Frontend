import logo from './logo.svg';
import React,{useEffect,useState} from 'react'
import './App.css';
import Home from '../src/Components/Home Component/Home';
import Auth from '../src/Components/Auth Component/Auth';
import axios from 'axios';
import Cookies from 'js-cookie';
import {baseUrl} from "./config/BaseApi";
import {userActions}   from './Redux/userDetailSlice';
import {useSelector,useDispatch} from 'react-redux';


function App() {
  const [loggedIn,setLoggedIn]=useState();
  const userData = useSelector((state)=>state.user.userDetail)
  const status = useSelector((state)=>state.user.success)
  const[UserData,setUserData]=useState();
  const dispatch = useDispatch();
  const [Success,setSuccess]=useState(false); 
  const userId = Cookies.get('user_id')

  const id = userId?Cookies.get('user_id').replace(/"|'/g, ''):null;
  useEffect(()=>{
    var token = Cookies.get('Token');
    if(token){
      TokenVerify(token);
    }else{
      Cookies.remove('Token');
       setLoggedIn(false);
    }
  },[])
  useEffect(()=>{
      FetchUser();
  },[])

  useEffect(()=>{
    if(Success){
        loadUserData()
    }
  },[Success])


  function loadUserData(){
    console.log("loaded");
      dispatch(userActions.AdduserDetails({userData:UserData}));
      // console.log(userData);
  }

    async function FetchUser(){
           await axios.get(`${baseUrl}/auth/FindUser/${id}`).then(
            (res)=>{
              if(res.status===200){
                setSuccess(true);
              }
                setUserData(res.data.result);
                console.log("got it")
            }
            ).catch((err)=>console.log(err))
        }
  function TokenVerify(token){
     axios.post(`${baseUrl}/auth/check-user`,{Token:token}).then((res)=>{
      if(res.data.msg=="Succesfully Verified"){
         setLoggedIn(true);
        //  window.location.reload();
      }else{
        Cookies.remove('Token');
        Cookies.remove('user_id');
        setLoggedIn(false);
      }
    }).catch((err)=>{console.log(err)});
  }
  return (
    <div>
      {loggedIn?<Home/>:<Auth/>}
    </div>
  );
}

export default App;
 