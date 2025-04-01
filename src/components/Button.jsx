import React from "react";

function Button({ btnClass, btnClick, btnText }) {
  return (
    <button
      className={`py-2 px-4 w-20 h-10 rounded-xl hover:brightness-95 active:scale-95 cursor-pointer ${btnClass}`}
      onClick={btnClick}
    >
      {btnText}
    </button>
  );
}

export default Button;
