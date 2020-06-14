import React, { Component } from "react";

import Button from "../../UI/Button/Button";

import Aux from "../../../HOC/Aux/Aux";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredient).map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {this.props.ingredient[igKey]}
      </li>
    ));
    return (
      <Aux>
        <h3>Your order</h3>
        <p>Nice choice! Your ingredients are:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: ${this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
