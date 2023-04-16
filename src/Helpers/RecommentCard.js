import React from 'react'

export default function RecommentCard(props) {
  return (
    <div className="ReccomentCard">
        <div className="ReccomentImage">
          <img height="100%" width="100%" src={props.Image?props.Image:"logo.png"}/>
        </div>
        <div className="ReccomentDetail">
            <div>
                <p className="Reccoment_Title">{props.Title?props.Title:"unknown Title"}</p>
                <p className="description">{props.Description?props.Description:"Unknown description"}</p>
            </div>
        </div>
    </div>
  )
}
