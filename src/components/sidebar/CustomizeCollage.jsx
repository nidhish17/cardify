import useCollageStore from "../../stores/collageStore.js";
import RangeInput from "../RangeInput.jsx";
import {useRef} from "react";
import ColorPicker from "../ColorPicker.jsx";
import CanvasResolution from "../CanvasResolution.jsx";


function CustomizeCollage() {

    const {spacing, canvasSize, setSpacing, cellRadius, setCellRadius: setCellRadiusStore} = useCollageStore();
    const {width: canvasW, height: canvasH} = canvasSize;
    const colorRef = useRef(null);

    // set zustand store spacing (global spacing state) on input focus out!
    const setSpacingInput = (inputVal) => {
        let value = Number(inputVal);
        if (value > 100) {
            value = 100;
        } else if (value < 0) {
            value = 0;
        }
        value = Math.round(value);
        setSpacing(value);
    }

    // set zustand spacing on range input change~!
    const setSpacingRange = (value) => {
        const spacingVal = Number(value);
        // const normalizedValue = normalizeInputs(spacingVal, canvasW, canvasH, 3, 3);
        setSpacing(spacingVal);
    }

    const setCellRadius = (value) => {
        const radius = Number(value);
        setCellRadiusStore(radius)
    }

    const setCellRadiusInput = (inputValue) => {
        let value = Number(inputValue);
        if (value > 100) {
            value = 100;
        } else if (value < 0) {
            value = 0;
        }
        setCellRadiusStore(value);
    }

    return (
        <div id="customize-collage" className="flex flex-col gap-y-8 text-primary-100">
            <ColorPicker />
            <div className="space-y-3">
                <RangeInput label="spacing" rangeVal={spacing} setRangeVal={setSpacingRange} min={0} max={100} onInputFocusout={setSpacingInput} />
                <RangeInput label="Roundess" rangeVal={cellRadius} setRangeVal={setCellRadius} min={0} max={100} onInputFocusout={setCellRadiusInput} />
            </div>
            <CanvasResolution />
        </div>
    );
}

export default CustomizeCollage;



/*

*/

