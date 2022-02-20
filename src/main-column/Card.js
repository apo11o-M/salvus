import React from "react";
import ImgCard from './cards/ImgCard';
import VideoCard from './cards/VideoCard';
import TextCard from './cards/TextCard';
import CommentCard from './cards/CommentCard';
import '../App.css';

class Card extends React.Component {
  render() {
    if (this.props.post.constructor.name === "Submission") {
      if (this.props.post.post_hint === "image" || this.props.post.gallery_data != null) {
        // Pure image post
        return (
          <ImgCard 
            post={this.props.post}
          />
        );
      } else if (this.props.post.is_video) {
        // Pure video post
        return (
          <VideoCard 
            post={this.props.post}
          />
        );
      } else {
        return (
          <TextCard 
            post={this.props.post}
          />
        );
      }
    } else {
      // Pure comment post
      return (
        <CommentCard 
          post={this.props.post}
        />
      )
    }

  }
}

export default Card;
