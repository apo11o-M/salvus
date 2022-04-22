import React from "react";

function FilterMedia(props) {
  return (
    <div>
      <div key="image">
        <input type="checkbox" id="image" value="image" onChange={props.handleClick} />
        <label>Image</label>
      </div>
      <div key="video">
        <input type="checkbox" id="video" value="video" onChange={props.handleClick} />
        <label>Video</label>
      </div>
      <div key="text">
        <input type="checkbox" id="text" value="text" onChange={props.handleClick} />
        <label>Text</label>
      </div>
    </div>
  )
}
export default FilterMedia;