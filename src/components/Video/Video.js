import React from 'react';
import './Video.css'

const Video = (props) => {
  if (!props.video) {
    return(
        <div className="loader-wrap">
          <div className="loader">Loading...</div>
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
      </div>
    </div>
    )
}

export default Video;
{/* <div className="root">
  <div className="video" > */}
