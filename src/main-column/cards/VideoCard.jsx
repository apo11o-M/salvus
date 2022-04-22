import React from "react";

class VideoCard extends React.Component {
  render() {
    return (
      <div className="main-column-card-post main-column-card-post-video">
        <h5>{this.props.post.subreddit_name_prefixed}</h5>
        <h3>{this.props.post.title}(VIDEO)</h3>
      </div>
    );
  }
}

export default VideoCard;