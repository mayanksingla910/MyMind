import { useState, useEffect } from "react";
import CustomCheckbox from "./ui/checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import AnimatedRippleButton from "./ui/animatedRippleButton";

export default function Task({ task, onStarToggle }) {
  // Local starred state to reflect immediate UI changes
  const [isStarred, setIsStarred] = useState(task.starred);

  // Sync local state if task prop changes (e.g., updated from parent)
  useEffect(() => {
    setIsStarred(task.starred);
  }, [task.starred]);

  const formattedDueDate = task.dueAt
    ? new Date(task.dueAt).toLocaleDateString("en-GB")
    : "";

  // Handle star toggling with optimistic UI update
  const changeStarred = async () => {
    const newStarred = !isStarred;
    setIsStarred(newStarred); // Optimistically update UI

    try {
      await axios.put(`http://localhost:3000/api/tasks/${task.id}`, {
        starred: newStarred,
      });
      if (onStarToggle) onStarToggle(task.id, newStarred); // Inform parent
    } catch (error) {
      console.error("Error marking task starred", error);
      setIsStarred(!newStarred); // Revert on error
    }
  };

  return (
    <div className="items-center p-3 mb-2 rounded-lg bg-gray-50 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex justify-between">
        <div className="flex flex-1 items-center">
          <CustomCheckbox checked={task.completed} onChange={() => {}} />
          <p className="ml-3 text-xl">{task.title}</p>
        </div>
        <div className="flex items-center mr-4">
          <AnimatedRippleButton onClick={changeStarred} >
            <FontAwesomeIcon
              icon={isStarred ? solidStar : regularStar}
              className={`h-4 w-4 cursor-pointer ${isStarred ? "text-yellow-500 " : "text-neutral-600"}`}
              title={isStarred ? "Unstar task" : "Star task"}
            />
          </AnimatedRippleButton>
        </div>
      </div>

      <div className="flex items-center text-sm ml-9 text-neutral-600">
        {formattedDueDate && <p className="mt-2 mb-1">{formattedDueDate}</p>}
        {task.listId && <p className="ml-8 mt-2 mb-1">{task.listId}</p>}
      </div>
    </div>
  );
}
