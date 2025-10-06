import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Application, extend} from "@pixi/react";
import {Sprite, Graphics} from "pixi.js";
import CollageFooterOptions from "./CollageFooterOptions.jsx";
import useCollageStore from "../../stores/collageStore.js";


extend({
    Sprite,
    Graphics
});

function CollageSetup({children}) {
    const appRef = useRef(null);
    const wrapperRef = useRef(null);

    const {canvasSize, collageBgColor, setFitToScreen} = useCollageStore();
    const {width: canvasW, height: canvasH} = canvasSize;

    // canvas scale 1 means just the pure canvas size set by the user! eg: 800x600
    // canvas shown will also be 800x600 on the user's screen when canvasScale=1;
    const [canvasScale, setCanvasScale] = useState(1.0);

    const resizeCanvas = useCallback((scale) => {
        // resize canvas sets the css width and css height of the canvas;
        // canvas is scaled down or scaled up by the css width and height to fit the screen!
        // NOTE:- the scaling up/down is done by the css styl width and height it does not affect the canvas' resolution, canvas resolution stays the same
        const canvas = appRef.current?.getCanvas();
        canvas.style.width = `${canvasW * scale}px`;
        canvas.style.height = `${canvasH * scale}px`;
    }, [canvasH, canvasW])

    const handleCanvasZoom = useCallback((scale) => {
        setCanvasScale(() => {
            resizeCanvas(scale);
            return scale;
        });
    }, [resizeCanvas])

    const fitToScreen = useCallback(() => {
        // here we calculate the scale required to resize the canvas according to the available space
        // here we subtract the padding/spacing and then calculate the available width and height for the canvas to fit in
        // to calculate the scaleX we divide the available width by canvas width and same for scaleY
        // here we need the canvas width and height to always fit into the container. ie act as object-fit: contain; or object-contain
        // so we choose the min value from the scaleX and scaleY. if we choose the max value then it would become object-cover and one dimension will overflow.
        const padding = 50;
        const container = wrapperRef?.current;
        const {clientWidth, clientHeight} = container;
        const availableW = clientWidth - (padding);
        const availableH = clientHeight - (padding);
        const scaleX = availableW / canvasW;
        const scaleY = availableH / canvasH;
        const scale = Math.min(scaleX, scaleY);
        handleCanvasZoom(scale);
    }, [canvasH, canvasW, handleCanvasZoom])


    useEffect(() => {
        resizeCanvas(canvasScale);
        if (!appRef) return;
        const app = appRef?.current?.getApplication();
        if (!app) return;
        const {renderer} = app;
        renderer.resize(canvasW, canvasH);

        // eslint-disable-next-line
    }, [canvasW, canvasH]);

    // call fit to screen only once when component renders
    useLayoutEffect(() => {
        fitToScreen();

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setFitToScreen((fitToScreen));

        return () => setFitToScreen(null);
    }, [fitToScreen, setFitToScreen]);

    useEffect(() => {
        const app = appRef?.current?.getApplication();
        if (!app) return;

        const bg = app.renderer.background.color;
        bg.setValue(collageBgColor);
    }, [collageBgColor]);


    return (
            <main id="collage-container" className="relative col-[2_/_3] row-[2_/_2] flex flex-col justify-between overflow-hidden">
                <div ref={wrapperRef}
                     className="basis-full grid place-items-center overflow-y-scroll">
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
    You shouldn't be drawing new cells everytime that won't work when an image sprite is added, u need to create it once and the update it always
    that way I think it'll fix the jitter or jumps in the cells when the width and height are adjusted!
*/

