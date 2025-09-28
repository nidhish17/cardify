import {createPortal} from "react-dom";
import {Loader} from "lucide-react";

function FullScreenLoader({message="Loading"}) {
    return createPortal(
        <div className="absolute inset-0 bg-primary-800/50 flex flex-col items-center justify-center z-30">
            <Loader size={50} className="animate-spin opacity-100" />
            <p className="font-semibold text-xl">{message}</p>
        </div>,
        document.body
    );
}

export default FullScreenLoader;

/*

*/

