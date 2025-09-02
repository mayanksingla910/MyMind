import { useState } from "react";
import { YellowButton } from "./Button";

export default function CreateList({setAddList }) {
    return (
        <div className="mt-2">
            <input/>
            <YellowButton className="">Add</YellowButton>
            <YellowButton 
                className=""
                onClick={() => setAddList(false)}
            >Cancel</YellowButton>
        </div>
    )
}