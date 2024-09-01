import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  // To calculate the total amount for all items in the cart, I had to iterate through the cart array,
  //  multiplying the cost of each item by its quantity and summing these values.

  const calculateTotalAmount = () => {
    return cart
      .reduce(
        (total, item) => total + item.cost * item.quantity,
        0 // This function uses the reduce method to accumulate the total cost of all items in the cart.
        // parseFloat(item.cost.slice(1)) removes the dollar sign and converts the string cost to a float.
      )
      
  };

  //The handleContinueShopping function is used to trigger any desired behavior when the user clicks the "Continue Shopping" button. This could involve navigating back to the product listing page, for example.
  const handleContinueShopping = (e) => {
    e.preventDefault(); // This method prevents the default button behavior and calls the onContinueShopping callback passed from the parent component.
    onContinueShopping();
  };

  const handleIncrement = (items) => {
    dispatch(updateQuantity(items));
  };

  const handleDecrement = (items) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(items));
    } else {
      handleRemove(items);
    }
  };

  const handleRemove = (items) => {
    dispatch(removeItem(items))
  };

  // Calculate total cost based on quantity for an item
  // This function calculates the cost for a single item and multiplies it by the quantity,
  // then formats it to two decimal points.
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
