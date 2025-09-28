import {useEffect, useRef, useState} from "react";
import {Application, extend} from "@pixi/react";
import {Sprite, Graphics} from "pixi.js";
import CollageFooterOptions from "./CollageFooterOptions.jsx";
import useCollageStore from "../../stores/collageStore.js";
import {Color} from "pixi.js";

extend({
    Sprite,
    Graphics
});

function CollageSetup({children}) {
    const appRef = useRef(null);
    const wrapperRef = useRef(null);

    const {canvasSize, collageBgColor} = useCollageStore();
    const {width: canvasW, height: canvasH} = canvasSize;

    const [canvasScale, setCanvasScale] = useState(1.0);

    useEffect(() => {
        fitToScreen();
        // window.addEventListener("resize", handleResize);
        // return () => window.removeEventListener("resize", handleResize);
    }, [canvasW, canvasH]);



    useEffect(() => {
        const app = appRef?.current?.getApplication();
        if (!app) return;

        const bg = app.renderer.background.color;
        bg.setValue(collageBgColor);
    }, [collageBgColor]);

    const fitToScreen = () => {
        const container = wrapperRef?.current;
        const {clientWidth, clientHeight} = container;
        const availableW = clientWidth - 100;
        const availableH = clientHeight - 100;
        const scaleX = availableW / canvasW;
        const scaleY = availableH / canvasH;
        const scale = Math.min(scaleX, scaleY);
        handleCanvasZoom(scale);
    }

    const resizeCanvas = (scale) => {
        const canvas = appRef?.current.getCanvas();
        canvas.style.width = `${canvasW * scale}px`;
        canvas.style.height = `${canvasH * scale}px`;
    }

    const handleCanvasZoom = (scale) => {
        setCanvasScale((prev) => {
            resizeCanvas(scale);
            return scale;
        });
    }

    return (
            <main id="collage-container"
                  className="relative border border-blue-700 col-[2_/_3] row-[2_/_2] flex flex-col justify-between overflow-hidden">
                <div ref={wrapperRef}
                     className="basis-full border border-orange-600 flex items-start justify-start overflow-y-scroll">
                    <Application
                        width={canvasW} height={canvasH}
                        backgroundColor={collageBgColor}
                        antialias
                        ref={appRef}

                    >
                        {children}
                    </Application>
                </div>

                <CollageFooterOptions
                    canvasW={canvasW} canvasH={canvasH}
                    fitToScreen={fitToScreen}
                    canvasScale={canvasScale}
                    handleCanvasZoom={handleCanvasZoom}
                />
            </main>
    );
}

export default CollageSetup;

/*

*/

