import React from "react";
import parse from 'html-react-parser';
import { html_substr } from "../../helpers";

class CommentCard extends React.Component {
  render() {
    const content = this.props.post.body_html;
    const maxLength = 600;
    const str = html_substr(content, maxLength);
    return (
      <div className="main-column-card-comment">
        <h5>{this.props.post.author.name}</h5>
        <p>{parse(str)}</p>
      </div>
    );
  }
}

export default CommentCard;