import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ListsContext = createContext([]);

export function ListsProvider({ children }) {
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/lists")
    .then(res => setListItems(res.data))
    .catch(err => console.error("Error fetching lists:", err));
  }, []);

  return (
    <ListsContext.Provider value={{ listItems, setListItems }}>
      {children}
    </ListsContext.Provider>
  );
}
