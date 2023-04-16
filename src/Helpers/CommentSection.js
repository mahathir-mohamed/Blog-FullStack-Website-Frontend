import React from 'react'

export default function CommentSection(props) {
  return (
    <div style={{display:"flex",width:"100%",marginTop:-30,marginBottom:50}} className="userComment">
        <img src={props.Image} style={{width:35,height:35,borderRadius:50}}/>
        <div style={{width:"85%"}}>
            <p style={{fontSize:13,color:"grey"}}>{props.Author}</p>
            <p>{props.Comment}</p>
        </div>
    </div>
  )
}
