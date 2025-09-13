import { useState, useEffect, useContext } from "react";
import CustomCheckbox from "./checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { faCalendarXmark, faChevronRight, faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import AnimatedRippleButton from "./animatedRippleButton";
import { ListsContext } from "../../context/listContext";
import { backend_URL } from "../../lib/urlUtil";

export default function Task({ task, onStarToggle, onCheckToggle, onClick, setEditEnable }) {
  const [isStarred, setIsStarred] = useState(task.starred);
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const {listItems, setListItems} = useContext(ListsContext)
  const [iconHovered, setIconHovered] = useState(false);

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
      await axios.put(`${backend_URL}/tasks/${task.id}`, {
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
      await axios.put(`${backend_URL}/tasks/${task.id}`,{
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
        <div className={`flex items-center mr-4 group-hover:visible ${isStarred? "visible": "invisible"}`}>
          <AnimatedRippleButton onClick={changeStarred} >
            <FontAwesomeIcon
              icon={isStarred ? solidStar : regularStar}
              className={`h-4 w-4 cursor-pointer ${isStarred ? "text-yellow-500 " : "text-neutral-600"}`}
              title={isStarred ? "Unstar task" : "Star task"}
            />
          </AnimatedRippleButton>
          <div
            className=" ml-3 w-12 h-6 flex items-center select-none visible"
            onMouseEnter={() => setIconHovered(true)}
            onMouseLeave={() => setIconHovered(false)}
            onClick={e => { e.stopPropagation(); onClick && onClick(); }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`   transition-all duration-200 
                ${iconHovered ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
            />
            <span
              className={` -translate-x-5 text-neutral-500 text-sm px-2 py-0.5 rounded font-semibold border border-neutral-300 transition-all duration-200
                ${iconHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"}
              `}
              onClick={() => setEditEnable(true)}
            >
              Edit
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center text-sm font-medium ml-10 text-neutral-500">
        {formattedDueDate && 
          <div className="flex items-center mt-2 mb-1">
            <FontAwesomeIcon icon={faCalendarXmark} className="mr-2 text-lg" />
            <p className="">{formattedDueDate}</p>
          </div>}
        {(formattedDueDate && task.listId) && <div className="h-7 w-0.5 rounded-xl bg-neutral-300 mt-1 my-auto mx-4" /> }
        {task.listId && 
          <div className="flex items-center mt-2 mb-1">
            <div className="w-4 h-4 rounded mr-2" style={{ background: currentList.color }} />
            <p className="">{currentList.name}</p>
          </div>}
      </div>
    </div>
  );
}
