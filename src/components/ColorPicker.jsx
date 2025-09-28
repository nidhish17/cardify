import {defaultBgColors} from "../services/collageHelpers.js";
import useCollageStore from "../stores/collageStore.js";
import {useRef} from "react";


function ColorPicker() {

    const {collageBgColor, setCollageBgColor} = useCollageStore();
    const colorRef = useRef(null);

    const handleColorSelector = () => {
        if (!colorRef?.current) return;
        colorRef.current.click();
    }

    return (
        // background color of collage
        <div className="space-y-2">
            <h6 className="font-medium text-primary-100 capitalize">Background Color</h6>
            <div className="*:size-8 grid grid-cols-5 gap-2">
                <input type="color" hidden ref={colorRef} value={collageBgColor} onChange={(e) => setCollageBgColor(e.target.value)} />
                <button
                    onClick={handleColorSelector}
                    style={{backgroundColor: collageBgColor}}
                    className="relative after:content-[''] after:absolute after:bg-black/90 after:size-3 after:right-0.5 after:bottom-0.5 after:rounded after:[clip-path:polygon(100%_0,100%_100%,0_100%)]"
                ></button>
                {defaultBgColors.map((color, i) => (
                    <button
                        key={`${color}-${i}`}
                        onClick={() => setCollageBgColor(color)}
                        style={{backgroundColor: color}}
                        className={`${collageBgColor === color && "ring-2 ring-blue-600"}`}
                    >
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ColorPicker;

/*

*/

