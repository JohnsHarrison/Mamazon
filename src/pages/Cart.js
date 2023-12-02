import { useCallback, useEffect, useState} from "react";

function Cart({viewCart, items, setItems,setPurchased, purchased}) {
  const [itemList, setItemList] = useState([]);
  const [total, setTotal] = useState(0);

  const getTotal = useCallback(() => {
    let sum = 0;
    items.forEach((item) => {
      sum = sum + parseFloat(item.price);
    });
    setTotal(sum.toFixed(2));
  }, [items]);

  const purchaseItems = () =>{
    setPurchased(!purchased)
  }

  const handleDelete = useCallback(
    (indexToDelete) => {
      const updatedList = items.filter((item, index) => {
        if (index !== indexToDelete) {
          return item;
        }
        return null;
      });
      setItems(updatedList);
    },
    [items, setItems]
  );

  useEffect(() => {
    const mappedItems = items.map((item, index) => {
      return (
        <div className="cart-card" key={index}>
          <img src={item.image} alt="" />
          <p>{item.itemName}</p>
          <p>${item.price}</p>
          <button
            onClick={() => {
              handleDelete(index);
            }}
          >
            Delete
          </button>
        </div>
      );
    });
    setItemList(mappedItems);
    getTotal();
  }, [items, getTotal, handleDelete]);

  return (
    <div ref={viewCart} className="cart">
      {
        total > 0  ? <p>Total: ${total}</p> : <p>Your cart is empty</p>
      }
      
      {itemList}
      {
        itemList.length === 0 ? null : <button style={{margin:"0px 10px"}} onClick={()=>{purchaseItems()}}>Check Out</button>
      }
    </div>
  );
}

export default Cart;
