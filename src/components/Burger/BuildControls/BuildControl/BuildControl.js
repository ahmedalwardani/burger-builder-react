import React from "react";

import "./BuildControl.scss";

const BuildControl = props => (
  <div className="BuildControl">
    <div className="Label">{props.label}</div>
    <button
      disabled={props.disabled}
      onClick={props.removed}
      type="button"
      className="Less"
    >
      Remove
    </button>
    <button onClick={props.added} type="button" className="More">
      Add
    </button>
  </div>
);

export default BuildControl;
