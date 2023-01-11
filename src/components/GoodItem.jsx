import React from "react";

function GoodItem(props) {
  const { id, name, description, price, full_background, addToBasket } = props;

  return (
    <div class="card">
      <div class="card-image">
        <img src={full_background} alt={name} />
      </div>
      <div class="card-content">
        <span class="card-title">{name}</span>
        <p>{description}</p>
      </div>
      <div class="card-action">
        <button
          className="waves-effect waves-light btn"
          onClick={() => {
            addToBasket({ id, name, price });
          }}
        >
          КУПИТЬ
        </button>
        <span className="right">{price}</span>
      </div>
    </div>
  );
}

export default GoodItem;
