import React from 'react';
import './Video.css'

const Video = (props) => {
  //読み込み中の処理
  if (!props.video) {
    return(
        <div className="loader-wrap">
          <div className="loader">Loading...</div>
        </div>
    )
  }
  // 読み込み完了後の処理
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
