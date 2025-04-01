import React from "react";

function Card(props) {
  return (
    <div
      value={props.name}
      className="place-items-center p-4 bg-white rounded-xl cursor-pointer drop-shadow-md hover:brightness-95 active:scale-95"
      onClick={props.handleClick}
    >
      <h2>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</h2>
      <img src={props.sprite} alt={props.name} />
    </div>
  );
}

export default Card;
