import React from "react";
import GoodItem from "./GoodItem";

function GoodsList(props) {
  const { goods, addToBasket } = props;

  if (!goods.length) {
    return <h3>Nothing cards</h3>;
  } else {
    return (
      <div className="goods">
        {goods.map((good) => (
          <GoodItem key={goods.id} addToBasket={addToBasket} {...good} />
        ))}
      </div>
    );
  }
}

export default GoodsList;
