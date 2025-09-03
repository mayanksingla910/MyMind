import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    </li>
  );
}
