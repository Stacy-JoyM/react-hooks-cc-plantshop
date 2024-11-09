import React, {useState} from "react";

function PlantCard({plant, setEditing}) {
  //Store inStock state as boolean
  const [inStock, setInStock] = useState(true)

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <div class="buttons">
        <button className= {inStock ? "primary" : "secondary"}
                onClick={()=>setInStock((inStock)=>!inStock)} >

          {inStock ? "In Stock" : "Out of Stock"} 

        </button>
        <button onClick={()=>setEditing(plant)}> Edit Plant</button>
      </div>
    </li>
  );
}

export default PlantCard;
