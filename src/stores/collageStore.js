import {create} from "zustand/react";
import {devtools} from "zustand/middleware";


const useCollageStore = create(
    devtools(
        (setState, getState) => ({
            spacing: 10,
            collageBgColor: "#00ff80",
            canvasSize: {
                // width: 1503,
                // height: 2172,
                width: 1451,
                height: 2105,
            },
            cellRadius: 10,

            fitToScreen: null,
            setFitToScreen: (fitFunction) => setState({fitToScreen: fitFunction}),

            triggerFitToScreen: () => {
                const {fitToScreen} = getState();
                if (fitToScreen) {
                    // console.log("fit to screen available!");
                    fitToScreen();
                }
            },

            setSpacing: (newSpacing) => setState({spacing: newSpacing}),

            changeCanvasW: (actionType, step = 1) => setState((prev) => {
                if (actionType === "incrementW") {
                    return {
                        ...prev,
                        canvasSize: {...prev.canvasSize, width: Math.min(prev.canvasSize.width + step, 4000)}
                    };
                } else if (actionType === "decrementW") {
                    return {
                        ...prev,
                        canvasSize: {...prev.canvasSize, width: Math.max(prev.canvasSize.width - step, 512)}
                    };
                }
                return prev;
            }),

            changeCanvasH: (actionType, step = 1) => setState((prev) => {
                let {height: newH} = prev.canvasSize;
                if (actionType === "incrementH") {
                    newH = Math.min(newH + step, 4000);
                } else if (actionType === "decrementH") {
                    newH = Math.max(newH - step, 512);
                }
                return {...prev, canvasSize: {...prev.canvasSize, height: newH}}
            }),

            flipOrientation: (orientationType) => {
                setState((prev) => {
                    const [curW, curH] = [prev.canvasSize.width, prev.canvasSize.height];
                    if (orientationType === "portrait" && curH > curW) return prev;
                    if (orientationType === "landscape" && curW > curH) return prev;

                    // else flip it. the above lines prevent from just acting as a not operator and destroying the ui state!
                    const [newW, newH] = [curH, curW];
                    return {...prev, canvasSize: {...prev.canvasSize, width: newW, height: newH}}
                })
                return Promise.resolve();
            },

            setCellRadius: (newRadius) => setState({cellRadius: newRadius}),
            setCollageBgColor: (newColor) => setState({collageBgColor: newColor}),
        })));

export default useCollageStore;
