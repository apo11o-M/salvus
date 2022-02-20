import React from "react";

function FilterNSFW(props) {
  return (
    <div>
      <div key="nsfwTrue">
        <input type="checkbox" id="nsfwTrue" value="nsfwTrue" onChange={props.handleClick} />
        <label>NSFW</label>
      </div>
      <div key="nsfwFalse">
      <input type="checkbox" id="nsfwFalse" value="nsfwFalse" onChange={props.handleClick} />
        <label>Not NSFW</label>
      </div>
    </div>
  );
}

export default FilterNSFW;