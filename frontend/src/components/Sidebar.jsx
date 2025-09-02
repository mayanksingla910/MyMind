import axios from "axios";
import { use, useEffect, useState } from "react";
import { faAnglesRight, faListCheck, faNoteSticky, faPlus, faRightFromBracket, faSliders } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarItem from "./ui/SidebarItem";
import ToggleSidebar from "./ui/ToggleSidebar";
import ListItem from "./ui/ListItem";
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
  const [listItems, setListItems] = useState([]);
  const [activeListIndex, setActiveListIndex] = useState(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    
    axios.get("http://localhost:3000/api/lists")
      .then(response => setListItems(response.data))
      .catch(error => console.error("Error fetching lists", error));
  }, [addList]);

  return (
    <>
      <div className={`fixed flex flex-col top-5 bottom-5 left-5 p-4 w-80 bg-gray-100 rounded-xl transform transition-transform duration-500 ${
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
                onClick={() => {
                  setActiveIndex(index);
                  setActiveListIndex(null);
                }
                }
              />
            ))}
          </ul>
        </div>
        <div className="border-t border-neutral-200 my-4"></div>
        <div className="ml-1">
          <p className="text-xs font-bold text-neutral-600 mb-2">LISTS</p>
          <ul ></ul>
          <div>
            {listItems.map((list, index) => (
              <ListItem
                key={index}
                name={list.name}
                color={list.color}
                active={activeListIndex === index}
                onClick={() => {setActiveListIndex(index); setActiveIndex(null);}}
              />
            ))}
            <SidebarItem icon={faPlus} label="New List" onClick={() => setAddList(true)} />
            {addList && (
              <CreateList setAddList={setAddList} />
              )}
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 w-auto" > 
            <FontAwesomeIcon icon={faSliders} className={`text-neutral-600 mr-2`} />
            <p className="font-semibold text-neutral-700">Settings</p>
          </div>
          <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 w-auto" > 
            <FontAwesomeIcon icon={faRightFromBracket} className={`text-neutral-600 mr-2`} />
            <p className="font-semibold text-neutral-700">Sign out</p>
          </div>
        </div>
      </div>
    </>
  )
}


    