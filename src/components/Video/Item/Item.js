/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './Item.css';

const Item = (props) => {
  return(
    <li className="list" onClick={() => props.onVideoClicked(props.video)}>
      <div className="oneItem">
        <div className="images">
          <img src={props.video.snippet.thumbnails.medium.url}/>
        </div>
        <div className="info">
          <h5>{props.video.snippet.title}</h5>
        </div>
    </div>
    </li>
  )
}

export default Item
