import { useEffect,useState } from "react"
import { Carousel } from 'antd';

function PurchasedItems({items, setPurchased, purchased}){
const [itemList, setItemList] = useState([]);

const handleCLose = () =>{
    setPurchased(!purchased)
  }

useEffect(()=>{
    const mappedItems = items.map((item, index) => {
        return (
          <div className="contentStyle" key={index}>
            <img src={item.image} alt="" />
            <p>{item.itemName}</p>
            <p style={{marginBottom:"20px"}}>${item.price}</p>
          </div>
        );
      });
      setItemList(mappedItems);
},[items])

 
    return(
        <div className="purchased">
            <h1 style={{backgroundColor:"#add8e663", textAlign:"center"}}>You Purchased . . .</h1>
            <Carousel autoplay>
                {itemList}
            </Carousel>
            <button onClick={handleCLose} >
                OK
            </button>
        </div>
    )
}

export default PurchasedItems