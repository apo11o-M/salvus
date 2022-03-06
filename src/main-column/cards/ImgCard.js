import React from "react";

class ImgCard extends React.Component {
  render() {
    return (
      <div className="main-column-card-post main-column-card-post-image">
        <h5>{this.props.post.subreddit_name_prefixed}</h5>
        <h3>{this.props.post.title}</h3>
        <Gallery post={this.props.post} />
        <div>
            Upvotes: {this.props.post.ups}, Ratio: {this.props.post.upvote_ratio} 
            <br />
            Comments: {this.props.post.num_comments}
        </div>
      </div>
    );
  }
}

function Gallery(props) {
  // Check if the post has multiple images (gallery)
  if (props.post.is_gallery) {
    if (props.post.gallery_data.items.length === 2) {
      const imgID0 = props.post.gallery_data.items[0].media_id;
      const imgID1 = props.post.gallery_data.items[1].media_id;
      return (
        <div className="card-img-div-outer">
          <div className="gallery-2-img-div">
            <img
              className={"gallery-2-img " + (props.post.over_18 ? "nsfw-media-medium" : null)}
              src={props.post.media_metadata[imgID0].p[props.post.media_metadata[imgID0].p.length - 1].u}
              alt={props.post.title}
            />
            <img 
              className={"gallery-2-img " + (props.post.over_18 ? "nsfw-media-medium" : null)}
              src={props.post.media_metadata[imgID1].p[props.post.media_metadata[imgID1].p.length - 1].u}
              alt={props.post.title}
            />
          </div>
          <span className="img-counter-badge">{props.post.gallery_data.items.length} Images</span>          
        </div>
      );
    } else {
      const imgID0 = props.post.gallery_data.items[0].media_id;
      const imgID1 = props.post.gallery_data.items[1].media_id;
      const imgID2 = props.post.gallery_data.items[2].media_id;
      return (
        <div className="card-img-div-outer">
          <div className="gallery-3-img-div">
            <table>
              <tbody>
                <tr>
                  <td rowSpan={2} width="60%">
                    <img 
                      className={"gallery-3-img-1 " + (props.post.over_18 ? "nsfw-media-medium" : null)} 
                      src={(props.post.media_metadata[imgID0].p[props.post.media_metadata[imgID0].p.length - 1].u)}
                      alt={props.post.title}
                    />
                  </td>
                  <td width="40%">
                    <img 
                      className={"gallery-3-img-2 " + (props.post.over_18 ? "nsfw-media-medium" : null)}
                      src={(props.post.media_metadata[imgID1].p[props.post.media_metadata[imgID1].p.length - 1].u)}
                      alt={props.post.title}
                    />
                  </td>
                </tr>
                <tr>
                  <td width="40%">
                    <img 
                      className={"gallery-3-img-2 " + (props.post.over_18 ? "nsfw-media-medium" : null)}
                      src={(props.post.media_metadata[imgID2].p[props.post.media_metadata[imgID2].p.length - 1].u)}
                      alt={props.post.title}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <span className="img-counter-badge">{props.post.gallery_data.items.length} Images</span>          
        </div>
      );
    }
  } else {
    return (
      <div style={{overflow: "hidden"}}>
        <div className={"card-img-div-outer " + (props.post.over_18 ? "nsfw-media-strong" : null)}>
          <div className="card-img-div">
              <img 
                className={"card-img"} 
                src={props.post.url} 
                alt={props.post.title}
              />  
          </div>
        </div>
      </div>
    );
  }
}

export default ImgCard;