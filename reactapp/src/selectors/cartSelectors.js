// selectors/cartSelectors.js
import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectDeliveryAddress = createSelector(
  [selectCart],
  (cart) => cart.deliveryAddress
);

export const selectPaymentMethod = createSelector(
  [selectCart],
  (cart) => cart.paymentMethod
);
