import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarItem({ icon, label, onClick, active }) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center p-2 my-1 rounded-lg cursor-pointer group
        ${active ? "bg-gray-200" : ""}
        hover:bg-gray-200`}
    >
      <FontAwesomeIcon 
        icon={icon} 
        className={`mr-3 ${active ? "text-neutral-700" : "text-neutral-600"}`} 
      />
      <span
        className={`${
          active ? "font-bold text-neutral-700" : "font-medium text-neutral-600 group-hover:font-semibold"
        }`}
      >
        {label}
      </span>
    </li>
  );
}
