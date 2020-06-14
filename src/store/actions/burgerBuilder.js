import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initializeIngredients = () => dispatch => {
  axios
    .get("https://my-burger-builder-57e53.firebaseio.com/ingredients.json")
    .then(response => {
      dispatch(setIngredients(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(fetchIngredientsFailed());
    });
};
