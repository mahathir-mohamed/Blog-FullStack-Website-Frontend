import React,{useState} from 'react';

import Modal from 'react-modal';


export default function AlertModal(props) {
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
          <button onClick={()=>{props.setDeleteItem(true);props.closeModal()}} className="btn btn-danger mt-5">Yes</button>
          <button onClick={props.closeModal} className="btn btn-primary mt-5">No</button>
        </div>
      </Modal>
    </div>

  )
}
