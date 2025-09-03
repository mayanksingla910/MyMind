import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

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
          active ? "font-bold text-neutral-700" : "font-semibold text-neutral-700 group-hover:font-bold"
        }`}
      >
        {name}
      </span>
      <div className="ml-auto flex space-x-2">
        <FontAwesomeIcon
          onClick={(e) => {
            e.stopPropagation();
            onClick("edit");}}
          icon={faPen}
          className={` text-neutral-600 w-3.5 h-3.5 mr-1 invisible group-hover:visible transition-transform duration-300 hover:scale-125`}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className={` text-neutral-600 w-3.5 h-3.5 invisible group-hover:visible transition-transform duration-300 hover:scale-125 `}
        />
      </div>
    </li>
  );
}
