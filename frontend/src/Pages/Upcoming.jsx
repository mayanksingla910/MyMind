import { useState, useEffect } from "react";
import axios from "axios";
import Task from "../components/ui/task";
import AddTask from "../components/ui/AddTask";
import EditTask from "../components/ui/editTask";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";

export default function Upcoming() {
  const [tasks, setTasks] = useState([]);
  const [isEditTask, setIsEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editEnable, setEditEnable] = useState(false);
  const [priceRange, setPriceRange] = useState("name");

  useEffect(() => {
    async function getTasks() {
      try {
        const res = await axios.get('http://localhost:3000/api/tasks?completed=false');
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    getTasks();
  }, []);

  const handleStarToggle = (taskId, isStarred) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, starred: isStarred } : task
      )
    );
  };

  const handleCheckToggle =(taskId, isCompleted) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? {...task, completed: isCompleted} :task
      )
    );
  };
  
  const handleAddTask =(task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleEditTask =(form) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === form.id ? form : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="">
      <div className={`mt-1 ${isEditTask? "mr-[25rem]": ""}`}>
        <p className="text-neutral-700 mb-8 font-bold text-4xl">Upcoming</p>
        <AddTask onAddtask={handleAddTask} className="col-span-5"/>
        <div>
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-25">$0 - $25</SelectItem>
                  <SelectItem value="25-50">$25 - $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100">$100+</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
        <div className="mt-3 p-4 rounded-lg border bg-gray-50 border-neutral-200">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Task key={task.id} task={task} onStarToggle={handleStarToggle} onClick={() => {setSelectedTask(task); setIsEditTask(true);}} onCheckToggle={handleCheckToggle} setEditEnable={setEditEnable}/>
            ))
          ) : (
            <p className="text-neutral-500">No upcoming tasks.</p>
          )}
        </div>
      </div>
      <div className="">
        {isEditTask && <EditTask isEditTask={isEditTask} setIsEditTask={setIsEditTask} task={selectedTask} onEditTask={handleEditTask} editEnable={editEnable} setEditEnable={setEditEnable} onDeleteTask={handleDeleteTask}/>}
      </div>
    </div>
  );
}
 