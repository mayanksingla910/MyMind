import { useState, useEffect } from "react";
import axios from "axios";
import Task from "../components/ui/task";
import AddTask from "../components/ui/AddTask";
import EditTask from "../components/ui/editTask";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";

import { isToday, isTomorrow, isThisWeek, isThisMonth } from "../lib/dateUtils";
import { backend_URL } from "../lib/urlUtil";

export default function Upcoming() {
  const [tasks, setTasks] = useState([]);
  const [isEditTask, setIsEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editEnable, setEditEnable] = useState(false);
  const [starredTasks, setStarredTasks] = useState("All");
  const [futureTasks, setFutureTasks] = useState("All");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      try {
        const res = await axios.get(`${backend_URL}/tasks?completed=false`);
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
    getTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(filterTasks());
  }, [tasks, starredTasks, futureTasks]);

  const handleStarToggle = (taskId, isStarred) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, starred: isStarred } : task
      )
    );
  };

  const handleCheckToggle = (taskId, isCompleted) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: isCompleted } : task
      )
    );
  };

  const handleAddTask = (task) => {
    setTasks(prevTasks => [task, ...prevTasks]);
  };

  const handleEditTask = (form) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === form.id ? form : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    if (starredTasks !== "All") {
      filtered = filtered.filter(task => {
        if (starredTasks === "Starred") return task.starred === true;
        if (starredTasks === "Unstarred") return task.starred === false;
        return true;
      });
    }

    if (futureTasks !== "All") {
      filtered = filtered.filter(task => {
        if (!task.dueAt) return false;
        const dueDate = new Date(task.dueAt);

        switch (futureTasks) {
          case "Today": return isToday(dueDate);
          case "Tomorrow": return isTomorrow(dueDate);
          case "This Week": return isThisWeek(dueDate);
          case "This Month": return isThisMonth(dueDate);
          default: return true;
        }
      });
    }

    return filtered;
  };


  return (
    <div className="">
      <div className={`mt-1 ${isEditTask ? "mr-[25rem]" : ""}`}>
        <p className="text-neutral-700 mb-8 font-bold text-4xl">Upcoming</p>
        <AddTask onAddTask={handleAddTask} className="col-span-5" />
        <div>
          <div className="flex justify-end ml-auto w-1/2 my-4 gap-3">

            <Select value={starredTasks} onValueChange={setStarredTasks} className="bg-white">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Starred">Starred</SelectItem>
                <SelectItem value="Unstarred">Unstarred</SelectItem>
              </SelectContent>
            </Select>

            <Select value={futureTasks} onValueChange={setFutureTasks} className="bg-white">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </div>
        <div className="mt-3 p-4 rounded-lg border bg-gray-50 border-neutral-200">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onStarToggle={handleStarToggle}
                onClick={() => { setSelectedTask(task); setIsEditTask(true); }}
                onCheckToggle={handleCheckToggle}
                setEditEnable={setEditEnable}
              />
            ))
          ) : (
            <p className="text-neutral-500">No upcoming tasks.</p>
          )}
        </div>
      </div>
      <div className="">
        {isEditTask && (
          <EditTask
            isEditTask={isEditTask}
            setIsEditTask={setIsEditTask}
            task={selectedTask}
            onEditTask={handleEditTask}
            editEnable={editEnable}
            setEditEnable={setEditEnable}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}
