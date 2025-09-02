import { useState } from "react";
import SidebarItem from "./ui/SidebarItem";
import ToggleSidebar from "./ui/ToggleSidebar";
import ListItem from "./ui/ListItem";
import { faAnglesRight, faListCheck, faNoteSticky, faPlus } from "@fortawesome/free-solid-svg-icons"
import CreateList from "./ui/CreateList";


const items = [
  { icon: faAnglesRight, label: "Upcoming" },
  { icon: faListCheck, label: "Completed" },
  { icon: faNoteSticky, label: "Sticky Wall" },
]


export default function Sidebar() {

  const [open, setOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [addList, setAddList] = useState(false);

  return (
    <>
      <div className={`fixed top-5 bottom-5 left-5 p-4 w-80 bg-gray-100 rounded-xl transform transition-transform duration-500 ${
            open ? "translate-x-0" : "-translate-x-full" } hover:translate-x-0`}>
        <div className="flex justify-between mb-8">
          <p className="text-xl font-bold text-neutral-700" >Menu</p>
          <ToggleSidebar open={open} setOpen={setOpen} />
        </div>
        <div className="ml-1">
          <p className="text-xs font-bold text-neutral-600 mb-2">TASKS</p>
          <ul >
            {items.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                active= {activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </ul>
        </div>
        <div className="border-t border-neutral-200 my-4"></div>
        <div className="ml-1">
          <p className="text-xs font-bold text-neutral-600 mb-2">LISTS</p>
          <ul ></ul>
          <div>
            <ListItem icon={faPlus} label="New List" onClick={() => setAddList(true)} />
            {addList && (
              <CreateList setAddList={setAddList} />
              )}
          </div>
        </div>
      </div>
    </>
  )
}


    