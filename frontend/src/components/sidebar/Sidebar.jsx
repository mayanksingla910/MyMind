import { useEffect, useRef, useState } from "react";
import axios from "axios";
import SidebarHeader from "./SidebarHeader";
import TasksSection from "./TaskSection";
import ListsSection from "./ListsSection";
import SettingsSection from "./SettingSection";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [addList, setAddList] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [activeListIndex, setActiveListIndex] = useState(null);

  const scrollRef = useRef(null);
  const settingsRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(null);

  useEffect(() => {
    function updateMaxHeight() {
      if (scrollRef.current && settingsRef.current) {
        const scrollTop = scrollRef.current.getBoundingClientRect().top;
        const settingsTop = settingsRef.current.getBoundingClientRect().top;
        const availableHeight = settingsTop - scrollTop + 20;
        setMaxHeight(availableHeight);
      }
    }

    function handleResize() {
      if (window.innerWidth < 1024) {
        setOpen(false);
      } else {
        setOpen(true);
      }
      updateMaxHeight();
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
    <div className={`fixed flex flex-col top-5 bottom-5 left-5 p-4 w-80 bg-gray-100 rounded-xl transform transition-transform duration-500 ${
      open ? "translate-x-0" : "-translate-x-full"
      } hover:translate-x-0`}>
      
      <SidebarHeader open={open} setOpen={setOpen} />

      <TasksSection
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        setActiveListIndex={setActiveListIndex}
      />

      <ListsSection
        scrollRef={scrollRef}
        listItems={listItems}
        activeListIndex={activeListIndex}
        setActiveListIndex={setActiveListIndex}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        addList={addList}
        setAddList={setAddList}
        maxHeight={maxHeight}
      />

      <SettingsSection
        settingsRef={settingsRef}
        setActiveIndex={setActiveIndex}
        setActiveListIndex={setActiveListIndex}
      />
    </div>
  );
}
