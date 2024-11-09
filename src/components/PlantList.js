import React from "react";
import PlantCard from "./PlantCard";

function PlantList({plants, search, setEditing}) {
//Filter plant list according to search value and display accordingly
  const plantsDisplay = plants
  .filter((plant)=> plant.name.toLowerCase().includes(search.toLowerCase()))
  .map((plant)=> (
    <PlantCard plant={plant} key={plant.id} setEditing={setEditing}/> )) //map to get Plant component

  return (
    <ul className="cards">
      {plantsDisplay}
    </ul>
  );
}

export default PlantList;
