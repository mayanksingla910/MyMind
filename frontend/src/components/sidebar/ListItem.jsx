import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AnimatedRippleButton from "../ui/animatedRippleButton";
import axios from "axios";

export default function ListItem({ list, onClick, active, onDeleteList, onEditList }) {
  const deleteList = async (e) => {

    try {
      await axios.delete(`http://localhost:3000/api/lists/${list.id}`);
      if (onDeleteList) onDeleteList(list.id);
    } catch (error) {
      console.error("Error deleting list", error);
    }
  };

  return (
    <li
      onClick={onClick}
      className={`flex items-center p-2 my-1 rounded-lg cursor-pointer group
        ${active ? "bg-gray-200" : ""}
        hover:bg-gray-200`}
    >
      <div className="w-4 h-4 rounded mr-3" style={{ background: list.color }} />
      <span
        className={`${
          active
            ? "font-bold text-neutral-600"
            : "font-medium text-neutral-700 group-hover:font-semibold"
        }`}
      >
        {list.name}
      </span>
      <div className="ml-auto flex invisible group-hover:visible ease-in-out space-x-2">
        <AnimatedRippleButton onClick={() => onEditList(list)}>
          <FontAwesomeIcon icon={faPen} className="text-neutral-500 w-4 h-4" />
        </AnimatedRippleButton>
        <AnimatedRippleButton onClick={deleteList}>
          <FontAwesomeIcon icon={faTrash} className="text-neutral-500 w-4 h-4" />
        </AnimatedRippleButton>
      </div>
    </li>
  );
}
