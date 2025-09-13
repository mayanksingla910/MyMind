import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { ListsContext } from "../../context/listContext";
import ToggleSidebar from "./ToggleSidebar";
import { Button } from "../ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import AnimatedRippleButton from "./animatedRippleButton";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "./select";
import { backend_URL } from "../../lib/urlUtil";

export default function EditTask({ isEditTask, setIsEditTask, task, onEditTask, editEnable, setEditEnable, onDeleteTask }) {
  const { listItems } = useContext(ListsContext);
  const formRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    listId: "",
    dueDate: "",
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && formRef.current.contains(event.target)) return;
      if (event.target.closest('.radix-<<r1rn>>')) return;
      setIsEditTask(false);
    }
    if (isEditTask) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditTask]);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        listId: task.listId || "",
        dueDate: task.dueAt ? task.dueAt.split("T")[0] : "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${backend_URL}/tasks/${task.id}`, {
        title: form.title,
        description: form.description,
        listId: form.listId,
        dueAt: form.dueDate,
      });

      if (onEditTask) onEditTask(res.data);
      setIsEditTask(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    setEditEnable(false);
    if (!editEnable) {
      setIsEditTask(false);
      await deleteTask();
    }
  }

  const deleteTask = async (e) => {
    try{
      await axios.delete(`${backend_URL}/tasks/${task.id}`);
      if(onDeleteTask) onDeleteTask(task.id);
    }catch(error){
      console.error("Error deleting task", error);
    }
  }
  

  if (!isEditTask || !task) return null;

  return (
    <div ref={formRef} className="fixed flex flex-col bottom-5 top-5 right-5 bg-gray-100 rounded-xl w-96 p-5 transition-all hover:shadow-lg focus-within:shadow-md z-50">
      <div className="flex justify-between mb-6">
        <p className="text-xl font-bold text-neutral-700">Edit Task</p>
        <div className="flex items-center">
          <AnimatedRippleButton onClick={() => setEditEnable(!editEnable)}>
            <FontAwesomeIcon icon={faPen} className="text-neutral-500 "/>
          </AnimatedRippleButton>
          <ToggleSidebar open={isEditTask} setOpen={setIsEditTask} onClick={() => setEditEnable(false)}/>
        </div>
      </div>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
          className="bg-inherit p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 focus:shadow-md transition-all text-neutral-600 w-full"
          required
          disabled={!editEnable}
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          disabled={!editEnable}
          className="bg-inherit p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 focus:shadow-md transition-all text-neutral-600 w-full max-h-72 min-h-40 resize-y"
        />
        <div className="grid grid-cols-3 items-center gap-4 w-3/4">
          <label className="flex flex-col col-span-1 text-neutral-600 text-sm">List</label>
          <div className="col-span-2 ">
          <Select 
            value={form.listId || ""} 
            onValueChange={(val) => setForm(prev => ({ ...prev, listId: val }))}
            disabled={!editEnable}
            className="">
            <SelectTrigger>
              <SelectValue placeholder="Select List" />
            </SelectTrigger>
            <SelectContent className="bg-gray-100">
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
          </div>
          <label className="flex flex-col col-span-1 text-neutral-600 text-sm">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            disabled={!editEnable}
            className="bg-inherit col-span-2 mt-1 p-2 rounded-lg border border-neutral-200 focus:outline-none focus:border-gray-400 focus:shadow-md transition-all text-neutral-600 w-full"
          />
        </div>
        <div className="flex space-x-3 mt-auto pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleDelete}
          >
            {editEnable? "Cancel": "Delete"}
          </Button>
          <Button type="submit" className="flex-1" disabled={!form.title.trim() || !editEnable}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
