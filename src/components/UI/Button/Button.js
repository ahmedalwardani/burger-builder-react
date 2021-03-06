import React from "react";

import "./Button.scss";

const Button = props => (
  <button
    disabled={props.disabled}
    className={["Button", props.btnType].join(" ")}
    type="button"
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default Button;
