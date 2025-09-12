import SidebarItem from "./sidebarItem";
import { faSliders, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SettingsSection({ settingsRef, setActiveIndex, setActiveListIndex }) {
  return (
    <div ref={settingsRef} className="mt-auto bg-inherit sticky">
      <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 group " onClick={() => {setActiveIndex(false); setActiveListIndex(false);}}>
        <FontAwesomeIcon icon={faSliders} className="text-neutral-600 mr-3" />
        <p className="font-medium text-neutral-700 group-hover:font-semibold">Settings</p>
      </div>
      <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 group">
        <FontAwesomeIcon icon={faRightFromBracket} className="text-neutral-600 mr-3" />
        <p className="font-medium text-neutral-700 group-hover:font-semibold">Sign out</p>
      </div>
    </div>
  );
}
