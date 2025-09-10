import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ListsContext } from "../../context/listContext";
import { Button } from "../ui/Button";

export default function AddTask({ onAddTask }) {
  const { listItems } = useContext(ListsContext);
  const [expanded, setExpanded] = useState(false);
  const formRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    listId: "",
  });

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createTask = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/tasks", form);
      setForm({ title: "", description: "", dueDate: "", listId: "" });
      setExpanded(false);
      if (onAddTask) onAddTask(res.data);
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <form
      className={`mt-4 p-3 flex flex-col border rounded-lg border-gray-300 gap-3 w-full 
                  ${expanded ? "p-4" : "p-3"}`}
      onSubmit={(e) => {
        e.preventDefault();
        createTask();
      }}
    >
      {!expanded && (
        <div className="ml-2 flex items-center text-lg text-neutral-500 font-medium cursor-text" onClick={() => setExpanded(true)}>
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <span className="w-full">Add a new task...</span>
        </div>
      )}
      {expanded && (
        <div ref={formRef} className="flex flex-col gap-3">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="bg-inherit p-2 pl-4 border border-neutral-200 rounded-lg focus:outline-none text-neutral-600 text-lg"
            value={form.title}
            onChange={handleChange}
            required
            autoFocus
          />
          <textarea
            name="description"
            placeholder="Description"
            className="bg-inherit p-2 pl-4 border border-neutral-200 rounded-lg focus:outline-none text-neutral-600 text-lg resize-y max-h-72 min-h-40"
            value={form.description}
            onChange={handleChange}
          />
          <div className="grid grid-cols-2 gap-4 w-1/2 p-4">
            <label className="flex flex-col text-neutral-600 w-full text-sm">
              List
              <select
                name="listId"
                value={form.listId}
                onChange={handleChange}
                className="mt-1 p-2 rounded-lg border border-neutral-200 text-neutral-600 cursor-pointer w-full focus:outline-none"
              >
                <option value="">Select List</option>
                {listItems.map((list) => (
                  <option key={list.id} value={list.id}>
                    {list.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col text-neutral-600 text-sm">
              Due Date
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="mt-1 p-2 rounded-lg border border-neutral-200 text-neutral-600 w-full focus:outline-none"
              />
            </label>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-1/2"
              onClick={() => {
                setExpanded(false);
                setForm({ title: "", description: "", dueDate: "", listId: "" });
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="w-1/2"
              disabled={!form.title.trim()}
            >
              Add Task
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
