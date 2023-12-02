import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Card from "./components/Card";
import Cart from "./pages/Cart";
import { tools, toys, food, clothes } from "./data";
import mamazon from "./assets/mamazon.png";
import PurchasedItems from "./pages/PurchasedItems";

function App() {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [purchased, setPurchased] = useState(false);

  const viewCart = useRef();
  const shop = useRef();

 
  const getItems = useCallback(() => {
    const mappedItems = data.map((item, index) => {
      return (
        <div key={index}>
          <Card
            image={item.image}
            itemName={item.itemName}
            price={item.price}
            setItems={setItems}
            items={items}
          ></Card>
        </div>
      );
    });
    setItemsToDisplay(mappedItems);
  }, [data, items]);

  useEffect(() => {
    if (purchased) {
      viewCart.current.className="cart slideOut";
    }

    getItems();
  }, [data, getItems, purchased]);

  return (
    <div className="App">
      {/* navbar */}
      <div className="navbar">
        <div className="navbar-top">
          <p
            onClick={() => {
              setData([]);
            }}
            style={{ fontWeight: "bold", cursor: "pointer" }}
          >
            Mamazon
          </p>
          <input
            type="text"
            placeholder="Search"
          ></input>
          <div
            style={{
              margin: "10px 20px",
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-start",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: "12px", margin: 0 }}>signed in as</p>
            <p style={{ fontSize: "18px", margin: 0, fontWeight: "bold" }}>
              Guest
            </p>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (viewCart.current.className==="cart") {
                viewCart.current.className = "cart slideIn";
              } else if(viewCart.current.className === "cart slideIn") {
                viewCart.current.className = "cart slideOut";
              }else{
                viewCart.current.className = "cart slideIn"
              }
            }}
            className="cartLogo"
          >
            <p>{Object.keys(items).length}</p>
          </div>
        </div>
        <div className="navbar-bottom">
          <p
            onClick={() => {
              setData(tools);
            }}
          >
            Tools
          </p>
          <p
            onClick={() => {
              setData(food);
            }}
          >
            Food
          </p>
          <p
            onClick={() => {
              setData(toys);
            }}
          >
            Toys
          </p>
          <p
            onClick={() => {
              setData(clothes);
            }}
          >
            clothes
          </p>
        </div>
      </div>

      {/* body */}
      {data.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px",
          }}
        >
          <img alt="logo" src={mamazon}></img>
        </div>
      ) : (
        <div
          ref={shop}
          className={"shop-items" + (purchased ? " shop-items-purchsed" : "")}
        >
          {itemsToDisplay}
        </div>
      )}
      {/* cart */}
      <Cart
        viewCart={viewCart}
        items={items}
        purchased={purchased}
        setPurchased={setPurchased}
        setItems={setItems}
      ></Cart>

      {/* check out */}
      {purchased ? (
        <PurchasedItems
          items={items}
          setPurchased={setPurchased}
          purchased={purchased}
        ></PurchasedItems>
      ) : null}
    </div>
  );
}

export default App;
