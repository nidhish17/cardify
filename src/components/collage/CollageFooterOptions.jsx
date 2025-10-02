import {useEffect, useRef, useState} from "react";
import {Maximize, CircleMinus, CirclePlus, Expand, Minimize, Percent} from "lucide-react";
import {getFullScreenElement} from "../../utils/helpers.js";


const CollageFooterOptions = function ({canvasW, canvasH, fitToScreen, canvasScale, handleCanvasZoom}) {
    // implement fullscreen
    const [fullScreen, setFullScreen] = useState(false);
    const [zoom, setZoom] = useState(`${canvasScale}`);
    // console.log(zoom, "vs", canvasScale);
    const rangeInputRef = useRef(null);

    useEffect(() => {
        setZoom(`${Math.round(canvasScale*100)}`);
        const min = parseFloat(rangeInputRef?.current.min);
        const max = parseFloat(rangeInputRef?.current.max);
        const el = rangeInputRef?.current;
        const sliderProgress = ((canvasScale - min) / (max - min)) * 100;
        el.style.background = `linear-gradient(to right, #fff ${sliderProgress}%, var(--color-primary-500) ${sliderProgress}%`;
    }, [canvasScale]);

    const handleZoomBlur = (e) => {
        if (!e.target.value) {
            setZoom(`${canvasScale*100}`);
            return;
        }
        let value = Number(e.target.value) / 100;
        if (value < 0.1) {
            value = 0.1;
        } else if (value > 1.5) {
            value = 1.5
        }
        handleCanvasZoom(value);
        setZoom(`${Math.round(value*100)}`);
    }

    const handleRangeInput = (e) => {
        const value = Number(e.target.value);
        handleCanvasZoom(value);
        setZoom(`${Math.round(value*100)}`);
    }

    const handleZoomBtns = (type) => {
        if (type === "decrement") {
            let scaleValue = canvasScale - 0.015;
            if (scaleValue < 0.1) {
                scaleValue = 0.1;
            }
            handleCanvasZoom(scaleValue);
        } else if (type === "increment") {
            let scaleValue = canvasScale + 0.015;
            if (scaleValue > 1.5) {
                scaleValue = 1.5;
            }
            handleCanvasZoom(scaleValue);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleZoomBlur(e);
        }
    }

    const handleFullScreen = async () => {
        if (!getFullScreenElement()) {
            await document.documentElement.requestFullscreen();
            setFullScreen(true);
            fitToScreen();
        } else {
            await document.exitFullscreen();
            setFullScreen(false);
            fitToScreen();
        }
    }

    return (
        <div className="bg-primary-800 px-4 py-2 z-20 border-t border-t-primary-500 flex items-center justify-between">
            <div className="">
                <p className="font-semibold">{canvasW} <span className="text-xs">X</span> {canvasH}</p>
            </div>

            <div className="flex items-center justify-center gap-x-3">
                <button onClick={fitToScreen} className="" data-tooltip-id="collage-tooltip"
                        data-tooltip-content="Fit collage to screen">
                    <Maximize size={25}/>
                </button>

                <button onClick={() => handleCanvasZoom(1)} className="" data-tooltip-id="collage-tooltip" data-tooltip-content="Show 100%">
                    1:1
                </button>

                <div className="flex items-center justify-center gap-x-3">
                    <button onClick={() => handleZoomBtns("decrement")} className="">
                        <CircleMinus/>
                    </button>

                    <input type="range"
                           ref={rangeInputRef}
                           min={0.1} max={1.5} step={0.01}
                           onChange={handleRangeInput}
                           value={canvasScale}
                           className=""
                    />

                    <button onClick={() => handleZoomBtns("increment")} className="">
                        <CirclePlus/>
                    </button>

                    <div className="flex items-center gap-x-1 pr-1 py-0.5 ring ring-primary-500 focus-within:ring-teal-800/80 focus-within:ring-2 rounded transition-all duration-300">
                        <input onKeyPress={handleKeyPress} value={zoom} onChange={(e) => setZoom(e.target.value)} onBlur={handleZoomBlur} className="text-center text-sm text-primary-100 outline-none w-12" />
                        <Percent size={15} className="text-primary-400" />
                    </div>
                </div>
            </div>

            <div className="">
                <button onClick={handleFullScreen} className="">
                    {fullScreen ? <Minimize/> : <Expand/>}
                </button>
            </div>

        </div>
    )
}

export default CollageFooterOptions;