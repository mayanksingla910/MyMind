import ListItem from "./ListItem";
import SidebarItem from "./SidebarItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateList from "./CreateList";

export default function ListsSection({
  scrollRef,
  listItems,
  activeListIndex,
  setActiveListIndex,
  activeIndex,
  setActiveIndex,
  addList,
  setAddList,
  maxHeight,
}) {
  function openAddList() {
    setAddList(true);
    setActiveIndex(null);
    setActiveListIndex(null);
  }

  return (
    <div className="ml-1 flex flex-col" style={{ maxHeight: maxHeight || "auto" }}>
      <p className="text-xs font-bold text-neutral-600 mb-2">LISTS</p>

      <div ref={scrollRef} className="overflow-y-auto pr-1 custom-scrollbar" style={{ maxHeight: maxHeight || "auto" }}>
        {listItems.map((list, index) => (
          <ListItem
            key={list.id}
            name={list.name}
            color={list.color}
            active={activeListIndex === index}
            onClick={() => {
              setActiveListIndex(index);
              setActiveIndex(null);
            }}
          />
        ))}
      </div>

      <SidebarItem icon={faPlus} label="New List" onClick={openAddList} />
      {addList && <CreateList setAddList={setAddList} />}
    </div>
  );
}
