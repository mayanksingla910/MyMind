import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddTask() {
  const [expanded, setExpanded] = useState(false);
  const formRef = useRef(null);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "", starred: false, listId: null });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setExpanded(false);
      }
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
      className={`mt-4 flex flex-col border w-full rounded-lg border-gray-300 gap-3 focus-within:shadow-md transition-shadow duration-200 ${
        expanded ? "p-4" : "p-2"
      }`}
    >
      {!expanded && (
        <div className="ml-2 flex items-center text-lg text-neutral-500 font-semibold" onClick={() => setExpanded(true)}>
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
            className="focus:outline-none flex-1 text-neutral-500 rounded-lg text-lg p-2 pl-4 border border-neutral-200"
            onChange={handleChange}
            required
            autoFocus
            value={form.title}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="focus:outline-none flex-1 p-2 pl-4 rounded-lg border text-neutral-500 text-lg border-neutral-200"
            value={form.description}
            onChange={handleChange}
          />
          <input 
            name="dueDate"
            type="date"
            className="focus:outline-none p-2 pl-4 w-fit rounded-lg text-neutral-500 text-lg border border-neutral-200 cursor-text"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
      )}
    </form>
  );
}
