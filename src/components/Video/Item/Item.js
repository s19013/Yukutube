import React from 'react';
import './Item.css';

const Item = (props) => {
  return(
    <li className="list"
      onClick={() => props.onVideoClicked(props.video)}
    >
      <div className="oneItem">
        <div className="images">
          <img
             src={props.video.snippet.thumbnails.medium.url}/>
        </div>
        <div className="info">
          <h5>{props.video.snippet.title}</h5>
        </div>
    </div>
    </li>
  )
}

export default Item
// <li className="list-group-item"
//   onClick={() => props.onVideoClicked(props.video)}
// >
//   <div className="video-list media">
//     <div className="media-left">
//       <img className="mr-3" src={props.video.snippet.thumbnails.default.url}/>
//     </div>
//   </div>
//   <div className="media-body">
//     <h5 className="media-heading">{props.video.snippet.title}</h5>
//   </div>
// </li>
