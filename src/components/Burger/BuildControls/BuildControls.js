import React from "react";

import BuildControl from "./BuildControl/BuildControl";

import "./BuildControls.scss";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const BuildControls = props => (
  <div className="BuildControls">
    <p>
      Current Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]}
      />
    ))}
    <button
      type="button"
      disabled={!props.purchasable}
      onClick={props.ordered}
      className="OrderButton"
    >
      {props.isAuth ? "ORDER NOW" : "Please sign in or sign up to order"}
    </button>
  </div>
);

export default BuildControls;
