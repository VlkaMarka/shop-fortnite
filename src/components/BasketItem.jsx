import React from "react";

function BasketItem(props) {
  const {
    id,
    name,
    price,
    quantity,
    removeFromBasket = Function.prototype,
    actionCart = Function.prototype,
  } = props;
  return (
    <li className="collection-item">
      {name}{" "}
      <i
        className="cart-action"
        onClick={() => {
          actionCart("decrement", id);
        }}
      >
        -
      </i>{" "}
      {quantity}
      <i
        className="cart-action"
        onClick={() => {
          actionCart("increment", id);
        }}
      >
        +
      </i>{" "}
      = {quantity * price}
      <span
        className="secondary-content"
        onClick={() => {
          removeFromBasket(id);
        }}
      >
        <i className="material-icons">close</i>
      </span>
    </li>
  );
}

export default BasketItem;
