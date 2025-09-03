import SidebarItem from "./SidebarItem";
import { faAnglesRight, faListCheck, faNoteSticky } from "@fortawesome/free-solid-svg-icons";

const items = [
  { icon: faAnglesRight, label: "Upcoming" },
  { icon: faListCheck, label: "Completed" },
  { icon: faNoteSticky, label: "Sticky Wall" },
];

export default function TasksSection({ activeIndex, setActiveIndex, setActiveListIndex }) {
  return (
    <div className="ml-1 mb-2">
      <p className="text-xs font-bold text-neutral-600">TASKS</p>
      <ul>
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            active={activeIndex === index}
            onClick={() => {
              setActiveIndex(index);
              setActiveListIndex(null);
            }}
          />
        ))}
      </ul>
    </div>
  );
}
