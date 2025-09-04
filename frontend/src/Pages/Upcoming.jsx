import { useState, useEffect } from "react";
import axios from "axios";
import Task from "../components/task";
import AddTask from "../components/ui/AddTask";

export default function Upcoming() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function getTasks() {
            try {
                await axios.get('http://localhost:3000/api/tasks?completed:false')
                .then(res => setTasks(res.data))
                .catch(err => console.error('Error fetching tasks:', err));
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        getTasks();
    }, []);

    return (
        <div className=" mt-1 ">
            <p className="text-neutral-700 font-bold text-4xl">Upcoming</p>
            <AddTask />
            <div className=" mt-3 p-4 rounded-lg border bg-gray-50 border-neutral-200">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
                {tasks.length === 0 && <p className="text-neutral-500">No upcoming tasks.</p>}
            </div>
        </div>
    )
}