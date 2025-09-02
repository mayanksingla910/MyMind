import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListItem({ icon, label, onClick, active }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center p-2 my-1 rounded-lg cursor-pointer group hover:bg-gray-200`}
    >
      <FontAwesomeIcon 
        icon={icon} 
        className={`mr-3 text-neutral-600`} 
      />
      <span
        className={`font-semibold text-neutral-700 group-hover:font-bold`}
      >
        {label}
      </span>
    </li>
  );
}
