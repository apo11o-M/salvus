import React from "react";

function FilterType(props) {
  return (
    <div>
      <div key="post">
        <input type="checkbox" id="post" value="post" onChange={props.handleClick} />
        <label>Post</label>
      </div>
      <div key="comment">
        <input type="checkbox" id="comment" value="comment" onChange={props.handleClick} />
        <label>Comment</label>
      </div>
    </div>
  );
}
export default FilterType;