import React from "react";
import parse from "html-react-parser";

class ImgCard extends React.Component {
  render() {
    return (
      <div className="main-column-card-post main-column-card-post-image">
        <h5>{this.props.post.data.subreddit_name_prefixed}</h5>
        <h3>{parse(this.props.post.data.title)}</h3>
        <Gallery post={this.props.post} />
        <div>
            Upvotes: {this.props.post.data.ups}, Ratio: {this.props.post.data.upvote_ratio} 
            <br />
            Comments: {this.props.post.data.num_comments}
        </div>
      </div>
    );
  }
}

function Gallery(props) {
  // Check if the post has multiple images (gallery)
  if (props.post.data.is_gallery) {
    if (props.post.data.gallery_data.items.length === 2) {
      const imgID0 = props.post.data.gallery_data.items[0].media_id;
      const imgID1 = props.post.data.gallery_data.items[1].media_id;
      return (
        <div className="card-img-div-outer">
          <div className="gallery-2-img-div">
            <img
              className={"gallery-2-img " + (props.post.data.over_18 ? "nsfw-media-medium" : null)}
              src={parse(props.post.data.media_metadata[imgID0].p[props.post.data.media_metadata[imgID0].p.length - 1].u)}
              alt={props.post.data.title}
            />
            <img 
              className={"gallery-2-img " + (props.post.data.over_18 ? "nsfw-media-medium" : null)}
              src={parse(props.post.data.media_metadata[imgID1].p[props.post.data.media_metadata[imgID1].p.length - 1].u)}
              alt={props.post.data.title}
            />
          </div>
          <span className="img-counter-badge">{props.post.data.gallery_data.items.length} Images</span>          
        </div>
      );
    } else {
      const imgID0 = props.post.data.gallery_data.items[0].media_id;
      const imgID1 = props.post.data.gallery_data.items[1].media_id;
      const imgID2 = props.post.data.gallery_data.items[2].media_id;
      return (
        <div className="card-img-div-outer">
          <div className="gallery-3-img-div">
            <table>
              <tbody>
                <tr>
                  <td rowSpan={2} width="60%">
                    <img 
                      className={"gallery-3-img-1 " + (props.post.data.over_18 ? "nsfw-media-medium" : null)} 
                      src={parse(props.post.data.media_metadata[imgID0].p[props.post.data.media_metadata[imgID0].p.length - 1].u)}
                      alt={props.post.data.title}
                    />
                  </td>
                  <td width="40%">
                    <img 
                      className={"gallery-3-img-2 " + (props.post.data.over_18 ? "nsfw-media-medium" : null)}
                      src={parse(props.post.data.media_metadata[imgID1].p[props.post.data.media_metadata[imgID1].p.length - 1].u)}
                      alt={props.post.data.title}
                    />
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <img 
                      className={"gallery-3-img-2 " + (props.post.data.over_18 ? "nsfw-media-medium" : null)}
                      src={parse(props.post.data.media_metadata[imgID2].p[props.post.data.media_metadata[imgID2].p.length - 1].u)}
                      alt={props.post.data.title}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <span className="img-counter-badge">{props.post.data.gallery_data.items.length} Images</span>          
        </div>
      );
    }
  } else {
    return (
      <div style={{overflow: "hidden"}}>
        <div className={"card-img-div-outer " + (props.post.data.over_18 ? "nsfw-media-strong" : null)}>
          <div className="card-img-div">
              <img 
                className={"card-img"} 
                src={props.post.data.url} 
                alt={props.post.data.title}
              />  
          </div>
        </div>
      </div>
    );
  }
}

export default ImgCard;