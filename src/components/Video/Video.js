import React from 'react';
import './Video.css'

const Video = (props) => {
  if (!props.video) {
    return(
      <div className="video col-md-8" style={{backgroundColor:"blue"}}>
        読み込み中
      </div>

    )

    // className="embed-responsive-item"
  }
    const videoURL = 'https://www.youtube.com/embed/' + props.video.id.videoId;
    return(
    <div className="Video">
        <div className="Player">
          <div className="embed-responsive embed-responsive-16by9" >
          <iframe
          className="embed-responsive-item"
          src={videoURL}
          title="selectedVideo"
          />
          </div>
      </div>
      <div className="info">
        <h2>{props.video.snippet.title}</h2>
        <details>
          <summary>詳細</summary>
          <p>{props.video.snippet.description}</p>
        </details>
      </div>
    </div>
    )
}

export default Video;
{/* <div className="root">
  <div className="video" > */}
