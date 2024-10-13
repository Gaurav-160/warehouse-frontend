/* eslint-disable no-unused-expressions */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GodownContext = createContext();

export default GodownContext;

export const GodownProvider = ({ children }) => {
  const [godowns, setGodowns] = useState([]); // To hold the godowns data
  const [items, setItems] = useState([]); // To hold the items data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [selectedItem, setSelectedItem] = useState(null); // State variable for selected item

  const navigate = useNavigate();

  const baseUrl = "https://warehouse24.pythonanywhere.com";

  const fetchGodowns = async () => {
    try {
      const response = await fetch(`${baseUrl}/warehouse/godowns/`); // Adjust this URL as necessary
      const data = await response.json();
      setGodowns(data); // Assuming the response is an array of godowns
      //   console.log("godowns data: ");
      //   console.log(godowns);
      //   console.log(data);
    } catch (error) {
      console.error("Error fetching godowns:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`${baseUrl}/warehouse/items/`); // Adjust this URL as necessary
      const data = await response.json();
      setItems(data); // Assuming the response is an array of items
      //   console.log("items data: ")
      //   console.log(items)
      //   console.log(data)
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const selectItem = (item) => {
    setSelectedItem(item); // Set the selected item
  };

  const clearSelectedItem = () => {
    setSelectedItem(null); // Clear the selected item
  };

  const addGodown = async (newGodown) => {
    try {
      const response = await fetch("http://localhost:8000/warehouse/godowns/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGodown),
      });

      if (response.status === 201) {
        const addedGodown = await response.json();
        setGodowns((prevGodowns) => [...prevGodowns, addedGodown]);
        navigate("/godowns"); // Redirect or handle after adding
      } else {
        console.error("Failed to add godown:", response.status);
        alert("Something went wrong while adding the godown.");
      }
    } catch (error) {
      console.error("Error adding godown:", error);
    }
  };

  const deleteGodown = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/warehouse/godowns/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 204) {
        setGodowns((prevGodowns) =>
          prevGodowns.filter((godown) => godown.id !== id)
        );
      } else {
        console.error("Failed to delete godown:", response.status);
        alert("Something went wrong while deleting the godown.");
      }
    } catch (error) {
      console.error("Error deleting godown:", error);
    }
  };

  const contextData = {
    godowns,
    items,
    selectedItem,
    selectItem,
    clearSelectedItem,
    addGodown,
    deleteGodown,
    fetchGodowns,
    fetchItems,
  };

  useEffect(() => {
    fetchGodowns(); // Fetch godowns when the component mounts
    fetchItems(); // Fetch items when the component mounts
    setLoading(false);
  }, []);

  return (
    <GodownContext.Provider value={contextData}>
      {loading ? null : children}
    </GodownContext.Provider>
  );
};
