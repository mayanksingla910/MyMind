import SidebarItem from "./SidebarItem";
import { faSliders, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SettingsSection({ settingsRef, setActiveIndex, setActiveListIndex }) {
  return (
    <div ref={settingsRef} className="mt-auto sticky bottom-5">
      <SidebarItem
        icon={faSliders}
        label="Settings"
        onClick={() => {
          setActiveIndex(false);
          setActiveListIndex(false);
        }}
      />
      <div className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-200 w-auto group">
        <FontAwesomeIcon icon={faRightFromBracket} className="text-neutral-600 mr-3" />
        <p className="font-semibold text-neutral-700 group-hover:font-bold">Sign out</p>
      </div>
    </div>
  );
}
