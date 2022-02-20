import React from "react";

class ImgCard extends React.Component {
  render() {
    return (
      <div className="main-column-card-post main-column-card-post-image">
        <h5>{this.props.post.subreddit_name_prefixed}</h5>
        <h3>{this.props.post.title}</h3>
        <div className="card-img-div-outer">
          <div className="card-img-div">
            <img 
              className={"card-img " + (this.props.post.over_18 ? "nsfw-media" : null)} 
              src={this.props.post.url} 
              alt={this.props.post.title}
            />
          </div>
        </div>
        <div>
          <span>
            Bruh Moment and comment section
          </span>
        </div>
      </div>
    );
  }
}

export default ImgCard;