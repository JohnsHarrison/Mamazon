function Card({image,itemName,price,setItems,items}){

function handleSubmit(){
    setItems([...items,{
        image:image,
        itemName:itemName,
        price:price 
    }])
}

    return(
        <div className="card">
            <img alt="item"src={image}/>
            <p>{itemName}</p>
            <p>${price}</p>
            <button onClick={handleSubmit}>Add to cart</button>
        </div>
    )
}

export default Card