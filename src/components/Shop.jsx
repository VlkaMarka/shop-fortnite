import React, { useEffect, useState } from "react";
import GoodsList from "./GoodsList";
import { API_URL, API_KEY } from "../config";
import Preloader from "./Preloader";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";

function Shop(props) {
  const [goods, setGoods] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setIsBasketShow] = useState(false);
  const [alertName, setAlertName] = useState("");

  useEffect(() => {
    fetchData(API_KEY, API_URL);
  }, []);

  const fetchData = (KEY, URL) => {
    fetch(URL, {
      headers: {
        Authorization: KEY,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          result.featured && setGoods(result.featured);
        },
        (error) => {
          setIsLoaded(true);
          console.error(error);
        }
      );
  };

  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
    setAlertName(item.name);
  };

  const removeFromBasket = (id) => {
    const newOrder = order.filter((el) => {
      return el.id !== id;
    });
    setOrder(newOrder);
  };

  const actionCart = (typeAction, id) => {
    let filterOrder = order.filter((i) => {
      if (i.id === id) {
        if (typeAction === "decrement") {
          if (i.quantity < 2) {
            return removeFromBasket(id);
          } else {
            i.quantity -= 1;
          }
        } else {
          i.quantity += 1;
        }
      }
      return [...order];
    });
    setOrder(filterOrder);
  };

  const handleBasketShow = () => {
    setIsBasketShow(!isBasketShow);
  };

  const closeAlert = () => {
    setAlertName("");
  };

  return (
    <main className="container content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {isLoaded ? (
        <GoodsList goods={goods} addToBasket={addToBasket} />
      ) : (
        <Preloader />
      )}
      {isBasketShow && (
        <BasketList
          order={order}
          handleBasketShow={handleBasketShow}
          removeFromBasket={removeFromBasket}
          actionCart={actionCart}
        />
      )}
      {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
    </main>
  );
}

export default Shop;
