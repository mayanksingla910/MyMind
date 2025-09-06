import { useState, useEffect } from "react";
import axios from "axios";
import Task from "../components/task";
import AddTask from "../components/ui/AddTask";

export default function Upcoming() {
  const [tasks, setTasks] = useState([]);

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

  // Handler to update task starred flag locally on star toggle
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
  }

  return (
    <div className="mt-1">
      <p className="text-neutral-700 font-bold text-4xl">Upcoming</p>
      <AddTask />
      <div className="mt-3 p-4 rounded-lg border bg-gray-50 border-neutral-200">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task key={task.id} task={task} onStarToggle={handleStarToggle} onCheckToggle={handleCheckToggle}/>
          ))
        ) : (
          <p className="text-neutral-500">No upcoming tasks.</p>
        )}
      </div>
    </div>
  );
}
