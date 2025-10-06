import {X, ChevronUp, ChevronDown} from "lucide-react";
import useCollageStore from "../stores/collageStore.js";
import {useEffect, useRef, useState} from "react";

function CanvasResolution() {
    // setCanvasSize({width: 1451, height: 2105}); -> arg should be an object
    const {canvasSize, changeCanvasH, changeCanvasW, flipOrientation, triggerFitToScreen} = useCollageStore();
    const {width, height} = canvasSize;

    const [orientation, setOrientation] = useState(() => (width > height ? "landscape" : "portrait"));
    const adjustWidthRef = useRef({isDragging: false, startY: null, dimension: ""})

    useEffect(() => {
        if (width > height) {
            setOrientation("landscape");
        } else {
            setOrientation("portrait");
        }
    }, [width, height]);


    const handlePortraitBtn = async function () {
        await flipOrientation("portrait");
        setOrientation("portrait");
        triggerFitToScreen()
    }

    const handleLandscapeBtn = async function () {
        await flipOrientation("landscape");
        setOrientation("landscape");
        triggerFitToScreen();
    }

    // const drag handlers

    const handleResizeCanvas = function (e, dimension) {
        const startPosition = e.clientY;
        adjustWidthRef.current = {...adjustWidthRef.current, isDragging: true, startY: startPosition, dimension};
        document.body.classList.add("cursor-row-resize");
        document.getElementById("customize-collage").classList.add("select-none");
        console.log("drag started!");

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseMove = function (e) {
        const resizeRef = adjustWidthRef?.current;
        if (!resizeRef) return;

        const {startY, isDragging, dimension} = resizeRef;

        if (isDragging) {
            const currentY = e.clientY
            const direction = currentY - startY;
            // console.log(direction);
            if (direction > 0) {
                // reduct the size
                if (dimension === "width") {
                    changeCanvasW("decrementW");
                } else if (dimension === "height") {
                    changeCanvasH("decrementH");
                }
            } else if (direction < 0) {
                // increase the size
                if (dimension === "width") {
                    changeCanvasW("incrementW");
                } else if (dimension === "height") {
                    changeCanvasH("incrementH");
                }
            }

            adjustWidthRef.current.startY = currentY;
        }

    }

    const handleMouseUp = function () {
        adjustWidthRef.current = {isDragging: false, ...adjustWidthRef.current};
        document.body.classList.remove("cursor-row-resize");
        document.getElementById("customize-collage").classList.remove("select-none");
        console.log("mouse Up")
        triggerFitToScreen();

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }

    return (
        <div className="space-y-3">

            {/*orientation container*/}
            <div className="rounded flex gap-x-0.5">
                <button
                    onClick={handlePortraitBtn}
                    className={`${orientation === "portrait" ? "bg-rose-500/40 ring-rose-400" : "bg-primary-700 hover:bg-primary-500 ring-primary-400"} px-3 py-1.5 ring rounded-r-none basis-full font-normal text-sm`}>
                    Portrait
                </button>
                <button
                    onClick={handleLandscapeBtn}
                    className={`${orientation === "landscape" ? "bg-rose-500/40 ring-rose-400" : "bg-primary-700 hover:bg-primary-500 ring-primary-400"} px-3 py-1.5 ring rounded-l-none basis-full font-normal text-sm`}>
                    Landscape
                </button>
            </div>

            {/*canvas width and height input container*/}
            <div className="flex justify-between items-center gap-x-1">

                <div className="basis-1/2 space-y-2">
                    <p className="">Width</p>
                    <div className="flex ring ring-primary-500 focus-within:ring-teal-800/80 focus-within:ring-2 rounded transition-all duration-300">
                        <input
                            id="canvasWidth"
                            type="number"
                            min={512} max={4000}
                            value={width}
                            className="basis-full outline-none px-3 py-0.5 w-full" />

                        <div onMouseDown={(e) => handleResizeCanvas(e, "width")} className="basis-1/2 border-l border-l-primary-500 flex flex-col justify-evenly items-center cursor-row-resize *:cursor-row-resize">
                            <button onClick={() => changeCanvasW("incrementW")} id="incrementW" className=""><ChevronUp size={14} /></button>
                            <hr className="text-primary-500 w-full"/>
                            <button onClick={() => changeCanvasW("decrementW")} id="decrementW" className=""><ChevronDown size={14} /></button>
                        </div>
                    </div>
                </div>

                <X className="self-end text-primary-400" />

                <div className="basis-1/2 space-y-2">
                    <p className="">Height</p>
                    <div className="flex ring ring-primary-500 focus-within:ring-teal-800/80 focus-within:ring-2 rounded transition-all duration-300">
                        <input
                            id="canvasHeight"
                            type="number"
                            min={512} max={4000}
                            value={height}
                            className="basis-full outline-none px-3 py-0.5 w-full" />

                        <div onMouseDown={(e) => handleResizeCanvas(e, "height")} className="basis-1/2 border-l border-l-primary-500 flex flex-col justify-evenly items-center cursor-row-resize *:cursor-row-resize">
                            <button onClick={() => changeCanvasH("incrementH")} id="incrementH" className=""><ChevronUp size={14} /></button>
                            <hr className="text-primary-500 w-full"/>
                            <button onClick={() => changeCanvasH("decrementH")} id="decrementH" className=""><ChevronDown size={14} /></button>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default CanvasResolution;

/*

*/

