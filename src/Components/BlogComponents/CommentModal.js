import React,{useState,useEffect} from 'react';

import Modal from 'react-modal';
import axios from 'axios';
import {baseUrl} from '../../config/BaseApi';
import CommentSection from '../../Helpers/CommentSection';
// import {useSelector,useDispatch} from 'react-redux';
// import {fetchPost} from '../Redux/userDetailSlice';  



export default function CommentModal(props) {
    const[size,setSize]=useState();
  
    const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight:'-50%',
    height:560,
    width:320,
    transform: 'translate(-50%, -50%)',
    backgroundColor:"#e6e6ff",
    borderRadius:20
  },
};
 const EmptyCommentsCustomStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight:'-50%',
    height:300,
    width:320,
    transform: 'translate(-50%, -50%)',
  },
};
useEffect(()=>{
  console.log(props.comments)
},[props.comments,size])

let subtitle;
   function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        // onAfterOpen={afterOpenModal}
        
        ariaHideApp={false}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {props.isHaveComment==true?props.Comments.map((item,index)=>{
          return (
            <div style={{width:"100%",alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",marginTop:20}}>
              <CommentSection key={index} Image={item.CommentId.User.Image[0].url}  Author={item.CommentId.User.Username} Comment={item.CommentId.Comment}/>
              </div>
        )}):<div style={{width:"100%",alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",height:"80%",marginTop:20}}>No Comments Yet</div>}
       
      </Modal>
    </div>

  )
}
