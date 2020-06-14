import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

import axios from "../../axios-orders";
import Aux from "../../HOC/Aux/Aux";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitializeIngredients();
  }

  handlePurchasing = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  handlePurchaseCancel = () => {
    this.setState({ purchasing: false });
  };

  handlePurchaseContinue = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  /* eslint-disable */
  
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }
    /* eslint-enable */

  render() {
    const disabledIngredients = { ...this.props.ings };
    /* eslint-disable */
    for (const disabledIngredient in disabledIngredients) {
      disabledIngredients[disabledIngredient] = disabledIngredients[disabledIngredient] <= 0
    }
    /* eslint-enable */

    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledIngredients}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.handlePurchasing}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.handlePurchaseCancel}
          purchaseContinued={this.handlePurchaseContinue}
          ingredient={this.props.ings}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.handlePurchaseCancel}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
  onInitializeIngredients: () => dispatch(actions.initializeIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
