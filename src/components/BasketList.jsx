import React from "react";
import BasketItem from "./BasketItem";

function BasketList(props) {
  const {
    order = [],
    handleBasketShow = Function.prototype,
    removeFromBasket = Function.prototype,
    actionCart = Function.prototype,
  } = props;
  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);

  return (
    <ul className="collection basket_list">
      <li className="collection-item active">
        Корзина
        <span className="secondary-content" onClick={handleBasketShow}>
          <i className="material-icons">close</i>
        </span>
      </li>
      {order.length ? (
        order.map((item) => (
          <BasketItem
            key={item.id}
            removeFromBasket={removeFromBasket}
            actionCart={actionCart}
            {...item}
          />
        ))
      ) : (
        <li className="collection-item">Корзина пуста</li>
      )}
      <li className="collection-item active">
        Общая стоимость: {totalPrice} руб
      </li>
      <li className="collection-item">
        <button className="btn-small">Оформить</button>
      </li>
    </ul>
  );
}

export default BasketList;
