import React , {useState, useEffect} from "react";
import { v4 as uuid } from "uuid";

function NewPlantForm({addPlant, plantToEdit, updatePlant, setEditing}) {

  //State that updates form with new plant
  const [formData, setFormData] = useState({
    name:"",
    image:"",
    price:""
  })
  //function that sets formData the values from input
  function handleChange(event){
    const {name, value} = event.target

    setFormData({
      ...formData , 
      [name]:value
    })
    
  }
  // useEffect to track if plantToEdit has value and then store that value in form (if true)
  useEffect(() => {
      if(plantToEdit){
        // Set form data with the values from the plant to be edited
        setFormData({
          name: plantToEdit.name,
          image: plantToEdit.image,
          price: parseFloat(plantToEdit.price)
        })
      }
  }, [plantToEdit]);


  function handleSubmit(event){
    event.preventDefault()
    // if plantToEdit has value then create an updated plant with values from form submitted
    if(plantToEdit){
      // Update existing plant (PATCH request)
      const updatedPlant = {
        ...plantToEdit,
        name: formData.name,
        image: formData.image,
        price: parseFloat(formData.price),
      };
      // Save changes to server by creating a PATCH request 
      fetch(`http://localhost:6001/plants/${updatedPlant.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlant), //sets updatedPlant to server 
      })
        .then((res) => res.json()) // Get updated pizza from server
        .then((updatedPlant) => updatePlant(updatedPlant))//reset plant list with new updated plant

        //Clear form values when done
        resetForm()
    }
    else {   //Chain an else when there is no plantToEdit , to add new PLant instead
      //Get values of newPLant from form
      const newPlant = {
          id : uuid(),
          name: formData.name,
          image: formData.image,
          price: parseFloat(formData.price)
      }
      //Save the changes to the server using a POST rewuest
      fetch(' http://localhost:6001/plants', {
        method: 'POST',
        body: JSON.stringify(newPlant),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((data) => addPlant(data));// set plant list with new plant 

      //Clear form values when done
      resetForm()
      setEditing(null)
    }
  }
  // Helper function to reset form values
  function resetForm() {
    setFormData({
      name: "",
      image: "",
      price: ""
    });
  }


  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}> 
        <input type="text" 
               name="name" 
               placeholder="Plant name" 
               value={formData.name} 
               onChange={handleChange}/>

        <input type="text" 
               name="image" 
               placeholder="Image URL" 
               value={formData.image} 
               onChange={handleChange}/>

        <input type="number" 
               name="price" 
               step="0.01" 
               placeholder="Price" 
               value={formData.price} 
               onChange={handleChange}/>

        <button type="submit" >Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
