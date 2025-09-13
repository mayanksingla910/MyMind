import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import SidebarHeader from "./sidebarHeader";
import TasksSection from "./taskSection";
import ListsSection from "./listsSection";
import SettingsSection from "./SettingSection";
import { ListsContext } from "../../context/listContext";

export default function Sidebar({ open, setOpen, setIsSidebarHovered }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [addList, setAddList] = useState(false);
  const {listItems, setListItems} = useContext(ListsContext);
  const [activeListIndex, setActiveListIndex] = useState([]);

  const scrollRef = useRef(null);
  const settingsRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(null);

  useEffect(() => {
    setActiveListIndex(listItems.map(list => list.id));
  }, [listItems]);


  useEffect(() => {
    function updateMaxHeight() {
      if (scrollRef.current && settingsRef.current) {
        const scrollTop = scrollRef.current.getBoundingClientRect().top;
        const settingsTop = settingsRef.current.getBoundingClientRect().top;
        const availableHeight = settingsTop - scrollTop + 10;
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
    <div className={`fixed flex flex-col top-5 bottom-5 left-5 p-4 w-72 bg-gray-100 rounded-xl transform transition-transform duration-500 ${
      open ? "translate-x-0 " : "-translate-x-full"
      } hover:translate-x-0`}
      onMouseEnter={() => setIsSidebarHovered(true)}
      onMouseLeave={() => setIsSidebarHovered(false)}
    >
      
      <SidebarHeader open={open} setOpen={setOpen} />
      <div className="overflow-auto custom-scrollbar">
        <TasksSection
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <div className="border-b border-neutral-200 my-3" />
        <ListsSection
          scrollRef={scrollRef}
          listItems={listItems}
          setListItems={setListItems}
          activeListIndex={activeListIndex}
          setActiveListIndex={setActiveListIndex}
          addList={addList}
          setAddList={setAddList}
          maxHeight={maxHeight}
        />
      </div>
      <div className="border-b border-neutral-200 my-2" />
      <SettingsSection
        settingsRef={settingsRef}
        setActiveIndex={setActiveIndex}
        setActiveListIndex={setActiveListIndex}
      />
    </div>
  );
}
