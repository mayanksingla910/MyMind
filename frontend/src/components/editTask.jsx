import { faClose, faCross } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function EditTask(){
    return (
        <div className=" fixed flex bottom-5 top-5 right-5 bg-gray-100 rounded-xl w-96 p-5" >
            <div className="flex justify-between mb-8">
                <p className="text-xl font-bold text-neutral-700">Task:</p>
                <FontAwesomeIcon icon={faClose} />
            </div>
        </div>
    )
}