import React, {useState, useEffect} from "react";
import Header from "./Header";
import PlantPage from "./PlantPage";

//Main Component
function App() {
  //State that holds lists of plants
  const [plants, setPlants] = useState([])
  const [plantToEdit , setEditing] = useState(null)
  
  //Fetch plants from the server when components first render
  useEffect(()=> {
      fetch('https://my-json-server.typicode.com/Stacy-JoyM/react-hooks-cc-plantshop/plants')
      .then((response) => response.json())
      .then((data) => setPlants(data)) //Store data in pizza state
      .catch((error) => console.error('Fetch error:', error)); // catch error for debugging 
  }, []);
   
  //function thats add plants to plantList
  function addPlant(newPlant){
    setPlants((prevPlants) => [...prevPlants, newPlant]);

  }
  
  //function that updates plant 
  function updatePlant(updatedPlant){
    //Sets plants with updated plant within plant array
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant: plant
      )
    );
  }
  
  return (
    <div className="app">
      <Header />
      <PlantPage plants={plants} 
                 addPlant={addPlant} 
                 updatePlant={updatePlant}
                 plantToEdit={plantToEdit}
                 setEditing={setEditing}/>
    </div>
  );
}

export default App;
