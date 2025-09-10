import { useState, useEffect, useContext } from "react";
import CustomCheckbox from "./checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faCalendarXmark, faChevronRight, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import AnimatedRippleButton from "./animatedRippleButton";
import { ListsContext } from "../../context/listContext";

export default function Task({ task, onStarToggle, onCheckToggle, onClick }) {
  const [isStarred, setIsStarred] = useState(task.starred);
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const {listItems, setListItems} = useContext(ListsContext)

  useEffect(() => {
    setIsStarred(task.starred);
    setIsCompleted(task.completed);
  }, [task]);

  const currentList = listItems.find(list => list.id === task.listId);

  const formattedDueDate = task.dueAt
    ? new Date(task.dueAt).toLocaleDateString("en-GB")
    : "";

  const changeStarred = async () => {
    const newStarred = !isStarred;
    setIsStarred(newStarred); 

    try {
      await axios.put(`http://localhost:3000/api/tasks/${task.id}`, {
        starred: newStarred,
      });
      if (onStarToggle) onStarToggle(task.id, newStarred);
    } catch (error) {
      console.error("Error marking task starred", error);
      setIsStarred(!newStarred); 
    }
  };

  const updateCompleted = async () => {
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);

    try{
      await axios.put(`http://localhost:3000/api/tasks/${task.id}`,{
        completed: newCompleted,
      });
      if(onCheckToggle) onCheckToggle(task.id, newCompleted);
    }catch (error){
      console.error("Error marking task completed", error);
      setIsCompleted(!newCompleted);
    }
    
  }

  return (
    <div className="items-center p-3 mb-2 rounded-lg hover:shadow-md transition-all cursor-pointer group" onClick={onClick}>
      <div className="flex justify-between">
        <div className="flex flex-1 items-center">
          <div onClick={e => e.stopPropagation()}>
            <CustomCheckbox checked={task.completed} onChange={updateCompleted}/>
          </div>
          <p className="ml-5 text-xl group-hover:font-semibold text-neutral-600">{task.title}</p>
        </div>
        <div className="flex items-center mr-4">
          <AnimatedRippleButton onClick={changeStarred} >
            <FontAwesomeIcon
              icon={isStarred ? solidStar : regularStar}
              className={`h-4 w-4 cursor-pointer ${isStarred ? "text-yellow-500 " : "text-neutral-600"}`}
              title={isStarred ? "Unstar task" : "Star task"}
            />
          </AnimatedRippleButton>
            <FontAwesomeIcon 
              icon={faChevronRight}
              className="cursor-pointer text-neutral-600 ml-3"
            />
        </div>
      </div>

      <div className="flex items-center text-sm font-medium ml-10 text-neutral-500">
        {formattedDueDate && 
          <div className="flex items-center mt-2 mb-1 mr-5">
            <FontAwesomeIcon icon={faCalendarXmark} className="mr-2 text-lg" />
            <p className="">{formattedDueDate}</p>
          </div>}
        {task.listId && 
          <div className="flex items-center mt-2 mb-1">
            <div className="w-4 h-4 rounded mr-2" style={{ background: currentList.color }} />
            <p className="">{currentList.name}</p>
          </div>}
      </div>
    </div>
  );
}
