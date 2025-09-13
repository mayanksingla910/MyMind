import ListItem from "./ListItem";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateList from "./CreateList";
import UpdateList from "./updateList";

export default function ListsSection({
  scrollRef,
  listItems,
  setListItems,
  activeListIndex,
  setActiveListIndex,
  addList,
  setAddList,
  maxHeight,
}) {

  const [updateList, setUpdateList] = useState(false);
  const [editList, setEditList] = useState({});

  function openAddList() {
    setAddList(true);
    setUpdateList(false);
    setEditList({});
  }
  const handleDelete = (listId) => {
    setListItems(prevList => prevList.filter(list => list.id !== listId));
  };

  const handleUpdateList = (updatedList) => {
    setListItems((prevLists) =>
      prevLists.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
  };


  return (
    <div className="flex flex-col" style={{ maxHeight: maxHeight || "auto" }}>
      <p className="text-xs font-bold text-neutral-700 mb-2">LISTS</p>

      <div ref={scrollRef} className="overflow-y-auto ml-1 pr-1 custom-scrollbar min-h-20" style={{ maxHeight: maxHeight || "auto" }}>
        {listItems.map((list, index) => (
          <ListItem
            key={list.id}
            list={list}
            onDeleteList={handleDelete}
            onEditList = {(list)=> {setAddList(false); setUpdateList(true); setEditList(list)}}
            active={activeListIndex.includes(list.id)}
            onClick={() => {
              setActiveListIndex((prevLists) => 
                prevLists.includes(list.id)
                ?prevLists.filter((id) => id !== list.id)
                :[...prevLists, list.id]);
            }}
          />
        ))}
      </div>
      <div className="flex items-center p-2 ml-0 rounded-lg cursor-pointer hover:bg-gray-200 group " onClick={openAddList}>
        <FontAwesomeIcon icon={faPlus} className="text-neutral-600 mr-3" />
        <p className="font-medium text-neutral-700 group-hover:font-semibold">New List</p>
      </div>
      {(addList && !updateList) && <CreateList setAddList={setAddList} />}
      {(updateList && !addList) && <UpdateList list={editList} setUpdateList={setUpdateList} onUpdateList={handleUpdateList}/>}

    </div>
  );
}