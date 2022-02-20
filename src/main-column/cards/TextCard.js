import React from "react";
import parse from 'html-react-parser';
import { html_substr } from "../../helpers";

class TextCard extends React.Component {
  render() {
    const content = this.props.post.selftext_html;
    if (content != null) {
      // Pure text post
      const maxLength = 800
      const str = html_substr(content, maxLength);
      return (
        <div className="main-column-card-post main-column-card-post-text">
          <h5>{this.props.post.subreddit_name_prefixed}</h5>
          <h3>{this.props.post.title}</h3>
          <div>
            {parse(str)}
          </div>
        </div>
      );
    } else {
      // Text post link to article
      return (
        <div className="main-column-card-post main-column-card-post-textlink">
          <h5>{this.props.post.subreddit_name_prefixed}</h5>
          <h3>{this.props.post.title}</h3>
          <div>
            {this.props.post.url}
          </div>
        </div>
      );
    }
  }
}

export default TextCard;
