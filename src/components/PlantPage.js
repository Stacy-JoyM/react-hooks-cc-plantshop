import React, {useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
//Component that is parent to Search, Plant Form and Plant List
function PlantPage({plants , addPlant, updatePlant, plantToEdit, setEditing}) {

  //State that will store input values from search
  const [search , setSearch] = useState("")


  return (
    <main>
      <NewPlantForm addPlant={addPlant} 
                    updatePlant={updatePlant} 
                    plantToEdit={plantToEdit}
                    setEditing={setEditing} />
      <Search search={search} setSearch={setSearch}/>
      <PlantList plants={plants} 
                 search={search} 
                 setEditing={setEditing}/>
    </main>
  );
}

export default PlantPage;
