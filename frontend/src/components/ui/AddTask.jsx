import { useContext, useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {Button} from "./Button";
import DatePicker from "./DatePicker";
import { ListsContext } from "../../context/listContext";
import { ca } from "date-fns/locale";

export default function AddTask() {
  const [expanded, setExpanded] = useState(false);
  const {listItems} = useContext(ListsContext);
  const formRef = useRef(null);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "", listId: null });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function createTask() {
    try{
      console.log("Creating task:", form);
      await axios.post("http://localhost:3000/api/tasks", form);
      setForm({ title: "", description: "", dueDate: "", listId: null });
      setExpanded(false);
    }catch(error){
      console.error("Error creating task", error);
    }
    console.log("Task created:", form);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && formRef.current.contains(event.target)) return;
      if (event.target.closest('.MuiDateCalendar-root')) return;
      setExpanded(false);
    }
    if (expanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [expanded]);

  return (
    <form
      className={`mt-4 flex p-3 flex-col border w-full rounded-lg border-gray-300 gap-3 focus-within:shadow-md transition-shadow duration-200 ${
        expanded ? "p-4" : "p-3"
      }`}
    >
      {!expanded && (
        <div className="ml-2 flex items-center text-lg text-neutral-500 font-medium" onClick={() => setExpanded(true)}>
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span className="cursor-text w-full">Add a new task...</span>
        </div>
      )}
      {expanded && (
        <div ref={formRef} className="flex flex-col gap-3">
          <input
            name="title"
            type="text"
            placeholder={"Title"}
            className="focus:outline-none flex-1 text-neutral-600 rounded-lg text-lg p-2 pl-4 border border-neutral-200"
            onChange={handleChange}
            required
            autoFocus
            value={form.title}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="focus:outline-none flex-1 p-2 pl-4 rounded-lg border text-neutral-600 text-lg border-neutral-200"
            value={form.description}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 w-1/2 gap-4 p-4">
            <div className="col-span-2 flex items-center mb-2">
              <label className="text-neutral-600 w-1/3" htmlFor="listId">List</label>
              <select
                id="listId"
                name="listId"
                className="focus:outline-none p-2 rounded-lg border text-neutral-600 text-lg w-2/3 cursor-pointer border-neutral-200"
                value={form.listId || ""}
                onChange={handleChange}
              >
                <option value="">
                  Select List
                </option>
                {listItems.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 flex items-center mt-2">
              <label className="text-neutral-600 w-1/3" htmlFor="dueDate">Due date</label>
              <input
                id="dueDate"
                type="date"
                name="dueDate"
                className="focus:outline-none p-2 rounded-lg border text-neutral-600 text-lg w-2/3 cursor-text border-neutral-200"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              className="w-1/2"
              variant="outline" 
              size="lg"
              onClick={() => {setExpanded(false); setForm({ title: "", description: "", dueDate: "", listId: null });}} >
              Cancel
            </Button>
            <Button 
              className="w-1/2" 
              size="lg"
              disabled={!form.title.trim()}
              onClick={(e) => {
                createTask();
                e.preventDefault();}} >
              Add Task    
            </Button>
            
          </div>
        </div>
      )}
    </form>
  );
}
