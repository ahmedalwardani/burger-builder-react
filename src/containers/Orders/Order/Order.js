import React from "react";

import "./Order.scss";

const Order = props => {
  const ingredients = [];

  /* eslint-disable */
  for (const ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }
  /* eslint-enable */

  const ingredientOutput = ingredients.map(ig => (
    <span
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px"
      }}
      key={ig.name}
    >
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className="Order">
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>${Number(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
