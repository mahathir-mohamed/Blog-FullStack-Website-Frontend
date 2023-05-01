import React,{useState,useEffect} from 'react';

import Modal from 'react-modal';
import {useSelector,useDispatch} from 'react-redux';
import {fetchPost} from '../Redux/userDetailSlice';  


export default function AlertModal(props) {
    const BlogId = useSelector((state)=>state.user.BlogId);
    const dispatch = useDispatch();
    // useEffect(()=>{
    //   console.log(BlogId);
    // },[BlogId])
    const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
let subtitle;
   function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        {/* <button onClick={props.closeModal}>close</button> */}
        <div>Are you sure you want to delete it ?</div>
        <div style={{display:"flex",justifyContent: "space-around"}}>
          <button onClick={()=>{
              dispatch(fetchPost(BlogId));
              props.closeModal();
              setTimeout(() => {
                 window.location.reload();
              }, 3000);
             
          }} className="btn btn-danger mt-5">Yes</button>
          <button onClick={props.closeModal} className="btn btn-primary mt-5">No</button>
        </div>
      </Modal>
    </div>

  )
}
