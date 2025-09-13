import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ListsContext } from "../../context/listContext";
import { Button } from "../ui/Button";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "./select";
import { backend_URL } from "../../lib/urlUtil";

export default function AddTask({ onAddTask }) {
  const { listItems } = useContext(ListsContext);
  const [expanded, setExpanded] = useState(false);
  const formRef = useRef(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueAt: "",
    listId: "",
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && formRef.current.contains(event.target)) return;
      if (event.target.closest('')) return;
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
      const res = await axios.post(`${backend_URL}/tasks`, form);
      setForm({ title: "", description: "", dueAt: "", listId: "" });
      setExpanded(false);
      if (onAddTask) onAddTask(res.data);
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <form
      className={`mt-4 p-3 flex flex-col border rounded-lg border-gray-300 gap-3 w-full cursor-text 
                  ${expanded ? "p-4" : "p-3"}`}
                   onClick={() => setExpanded(true)}
      onSubmit={(e) => {
        e.preventDefault();
        createTask();
      }}
    >
      {!expanded && (
        <div className="pl-2 flex items-center text-lg text-neutral-500 font-medium cursor-text">
          <FontAwesomeIcon icon={faPlus} className="mr-2 cursor-pointer" />
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
              <Select 
                value={form.listId || ""} 
                onValueChange={(val) => setForm(prev => ({ ...prev, listId: val }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select List" />
                </SelectTrigger>
                <SelectContent className=" bg-white">
                  <SelectItem value="none">
                    Select List
                  </SelectItem>
                  {listItems.map(list => (
                    <SelectItem key={list.id} value={list.id.toString()}>
                      {list.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
            <label className="flex flex-col text-neutral-600 text-sm">
              Due Date
              <input
                type="date"
                name="dueAt"
                value={form.dueAt}
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
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
                setForm({ title: "", description: "", dueAt: "", listId: "" });
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
