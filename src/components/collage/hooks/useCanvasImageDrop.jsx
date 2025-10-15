import {useCallback, useEffect, useState} from "react";
import {toPixiCoords, locateCell} from "../../../services/collageHelpers.js";


const useCanvasImageDrop = function ({appRef, cells, onImgDrop}) {
    const [hoveredCellId, setHoveredCellId] = useState(null);

    const handleCanvasDrop = useCallback((e) => {
        e.preventDefault();
        const {clientX, clientY} = e;
        const imgDropData = e.dataTransfer.getData("text/plain");
        // console.log(imgDropData);
        setHoveredCellId(null);

        const [x, y] = toPixiCoords({appRef, clientX, clientY});
        const droppedCell = locateCell(x, y, cells);
        if (droppedCell) {
            onImgDrop(droppedCell, imgDropData);
        }
    }, [appRef, cells, onImgDrop])


    const handleCanvasDragOver = useCallback((e) => {
        e.preventDefault();
        const {clientX, clientY} = e;
        const [x, y] = toPixiCoords({appRef, clientX, clientY});
        const hoveredCell = locateCell(x, y, cells);
        if (hoveredCell) {
            setHoveredCellId(hoveredCell.index);
        }
        // console.log(x, y);
    }, [appRef, cells])

    const handleCanvasDragLeave = useCallback((e) => {
        setHoveredCellId(null);
    }, [])

    const handleCanvasDragEnd = useCallback(() => {
        setHoveredCellId(null);
    }, [])

    useEffect(() => {
        const canvas = appRef?.current?.getCanvas();
        if (!canvas) return;
        // console.log(canvas, "application");

        canvas.addEventListener("drop", handleCanvasDrop);
        canvas.addEventListener("dragover", handleCanvasDragOver);
        canvas.addEventListener("dragleave", handleCanvasDragLeave);
        document.addEventListener("dragend", handleCanvasDragEnd);

        return () => {
            canvas.removeEventListener("drop", handleCanvasDrop);
            canvas.removeEventListener("dragover", handleCanvasDragOver);
            canvas.removeEventListener("dragleave", handleCanvasDragLeave);
            document.removeEventListener("dragend", handleCanvasDragEnd);
        }

    }, [handleCanvasDrop, handleCanvasDragOver, handleCanvasDragLeave, handleCanvasDragEnd, appRef]);


    return {hoveredCellId}
}

export default useCanvasImageDrop;