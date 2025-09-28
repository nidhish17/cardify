import {create} from "zustand/react";
import {devtools} from "zustand/middleware";
import {normalizeInputs} from "../services/collageHelpers.js";


const useCollageStore = create(
    devtools(
        (setState, getState) => ({
            spacing: 0,
            collageBgColor: "#fff",
            canvasSize: {
                // width: 128,
                // height: 128,
                width: 1451,
                height: 2105,
            },
            cellRadius: 0,

            setSpacing: (newSpacing) => setState({spacing: newSpacing}),

            // newSize should be a type of object!
            setCanvasSize: (newSize) => setState({canvasSize: newSize}),
            setCellRadius: (newRadius) => setState({cellRadius: newRadius}),
            setCollageBgColor: (newColor) => setState({collageBgColor: newColor}),
        })));

export default useCollageStore;
