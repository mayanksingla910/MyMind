import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AnimatedRippleButton from "../ui/animatedRippleButton";
import Icon from "@mui/material/Icon";

export default function ListItem({ color, name, onClick, active }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center p-2 my-1 rounded-lg cursor-pointer group
        ${active ? "bg-gray-200" : ""}
        hover:bg-gray-200`}
    >
      <div className="w-4 h-4 rounded mr-3" style={{background:color}} />
      <span
        className={`${
          active ? "font-bold text-neutral-600" : "font-medium text-neutral-700 group-hover:font-semibold"
        }`}
      >
        {name}
      </span>
      <div className="ml-auto flex invisible group-hover:visible space-x-2">
        <AnimatedRippleButton onClick={(e) => {e.stopPropagation(); onClick("edit")}}>
          <FontAwesomeIcon icon={faPen} className="text-neutral-500 w-4 h-4" />
        </AnimatedRippleButton>
        <AnimatedRippleButton onClick={(e) => {e.stopPropagation(); onClick("edit")}}>
          <FontAwesomeIcon icon={faTrash} className="text-neutral-500 w-4 h-4" />
        </AnimatedRippleButton>
        
      </div>
    </li>
  );
}
