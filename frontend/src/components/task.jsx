import { useState } from "react";
import CustomeCheckbox from "./ui/checkbox";

export default function Task(task) {

    const [checked, setChecked] = useState(false);

    return (
        <div className=" flex items-center p-3 mb-2 rounded-lg bg-gray-50 hover:shadow-md transition-shadow cursor-pointer">
            <CustomeCheckbox 
            id="accept-terms"
            checked={checked}
            onChange={() => setChecked(!checked)}/>
            <p className="ml-1 text-xl">{task.task.title}</p>
             
        </div>
    )
}