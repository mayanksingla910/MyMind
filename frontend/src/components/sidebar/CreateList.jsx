import { useState } from "react";
import axios from "axios";
import { Button } from "../ui/Button";
import { backend_URL } from "../../lib/urlUtil";

const COLORS = [
  "#FF6B6B", "#DA77F2", "#9775FA", "#5C7CFA", "#66D9E8", "#8CE99A", "#FFD43B", "#FF922B",
];

export default function CreateList({ setAddList }) {
  const [listName, setListName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[2]);

  async function createList() {
    try {
      await axios.post(`${backend_URL}/lists`, { name: listName, color: selectedColor });
      setListName("");
      setAddList(false);
    } catch (error) {
      console.error("Error creating list", error);
    }
  }

  return (
    <div className=" bg-gray-100 p-4 rounded-lg border border-neutral-300 w-full max-w-md hover:shadow-md focus-within:shadow-md transition-shadow duration-200">
      <div className="flex items-center mb-4 p-2 border border-neutral-200 rounded ">
        <div className="w-5 h-5 rounded bg-[selectedColor] mr-2" style={{ background: selectedColor }} />
        <input
          value={listName}
          onChange={e => setListName(e.target.value)}
          className="flex-1 bg-transparent text-sm font-medium outline-none placeholder-neutral-500 caret-neutral-500"
          placeholder="List Name"
          maxLength={30}
          minLength={1}
          autoFocus
        />
      </div>
      <div className="flex gap-2 justify-between mb-4 px-1">
        {COLORS.map((color, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedColor(color)}
            className={`w-4 h-4 m-0.5 rounded cursor-pointer transition duration-150 
               ${selectedColor === color ? "scale-125" : ""}`}
            style={{ background: color }}
          />
        ))}
      </div>
      <div className="flex gap-2 ">
        <Button className="w-1/2" disabled={!listName} onClick={(createList)}>Add</Button>
        <Button
          className="w-1/2"
          variant="outline"
          onClick={() => setAddList(false)}
        >Cancel</Button>
      </div>
    </div>
  );
}
