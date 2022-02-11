import React from "react";

function FilterSubs(props) {
  return (
    <div>
      {props.subList?.map((s, index) => (
        <div key={s}>
          <input type="checkbox" id={s} value={s} onChange={props.handleClick} />
          <label>{s}</label>
        </div>
      ))}
    </div>
  );
}

// function FilterSubs(props) {
//   const [checkedState, setCheckedState] = React.useState(
//     new Array(props.subs.length).fill(false)
//   );
//   const handleOnChange = (position) => {
//     const updatedCheckedState = checkedState.map((item, index) => 
//       index === position ? !item : item
//     );
//     setCheckedState(updatedCheckedState);
//   }
//   return (
//     <div>
//       {props.subs.map((s, index) => (
//         <div key={s}> 
//           <input
//             type="checkbox"
//             id={s}
//             value={s}
//             checked={checkedState[index]}
//             onChange={() => handleOnChange(index)}
//           />
//           <label>{s}</label>          
//         </div>
//       ))}
//     </div>
//   );
// }

export default FilterSubs;