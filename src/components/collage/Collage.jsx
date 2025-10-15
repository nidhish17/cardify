import Cell from "./Cell.jsx";
import CollageSetup from "./CollageSetup.jsx";
import {calcCellSize, locateCell, normalizeInputs, toPixiCoords} from "../../services/collageHelpers.js";
import useCollageStore from "../../stores/collageStore.js";
import {Application} from "@pixi/react";
import {useCallback, useEffect, useRef, useState} from "react";
import useCanvasImageDrop from "./hooks/useCanvasImageDrop.jsx";

function Collage() {

    const appRef = useRef(null);

    // you would get these from the template based on the selected one!
    const numRows = 3;
    const numCols = 3;
    const {spacing, canvasSize, cellRadius, collageBgColor} = useCollageStore();
    const {width: canvasW, height: canvasH} = canvasSize;

    const roundRadius = normalizeInputs(cellRadius, canvasW, canvasH, numRows, numCols);
    const normalizedSpacing = normalizeInputs(spacing, canvasW, canvasH, numRows, numCols);

    // this is same as passing spacing: spacing, canvasW: canvasW,...
    const [cellW, cellH] = calcCellSize({spacing: normalizedSpacing, canvasW, canvasH, numRows, numCols});

    // const cells = useMemo(() => new Array(numCols*numRows), []);
    const [cells, setCells] = useState(() => (
        createCells({
            numRows, numCols,
            normalizedSpacing,
            canvasW, canvasH
        })
    ));

    useEffect(() => {
        setCells((cells) => (
            updateCells(cells, {
                numRows, numCols,
                normalizedSpacing,
                canvasW, canvasH
            })
        ))
    }, [canvasW, canvasH, spacing, normalizedSpacing]);


    const handleImageDrop = useCallback((droppedCell, imgDropData) => {
        setCells((cells) => {
            return cells.map((cell) => {
                if (cell.index === droppedCell.index) {
                    return {...cell, image: imgDropData};
                }
                return cell;
            });
        });
    }, [])

    // handle canvas drag and drop images
    const {hoveredCellId} = useCanvasImageDrop({
        appRef,
        cells,
        onImgDrop: handleImageDrop
    });


    return (

        <CollageSetup appRef={appRef}>
            <Application width={canvasW} height={canvasH} backgroundColor={collageBgColor} antialias ref={appRef}>
                {cells.map((cell) => (
                    <Cell
                        key={cell.index}
                        x={cell.x} y={cell.y}
                        width={cell.width} height={cell.height}
                        radius={roundRadius}
                        cellId={cell.index}
                        hoveredCellId={hoveredCellId}
                        image={cell.image}
                    />
                ))}
            </Application>
        </CollageSetup>

    );
}

export default Collage;


const createCells = function ({numRows, numCols, normalizedSpacing, canvasW, canvasH}) {
    const cells = [];

    const [cellW, cellH] = calcCellSize({spacing: normalizedSpacing, canvasW, canvasH, numRows, numCols});
    // console.log("Creating cells haiyaaa!");
    let cellX = 0;
    let cellY = 0;

    for (let row=0; row<numRows; row++) {
        cellY += normalizedSpacing;
        for (let col=0; col<numCols; col++) {
            cellX += normalizedSpacing;
            const index = numCols*row + col;
            cells[index] = {
                index,
                x: cellX, y: cellY,
                endX: cellX+cellW, endY: cellY+cellH,
                width: cellW, height: cellH,
                image: null
            };
            cellX += cellW;
        }
        cellY += cellH;
        cellX = 0;
    }


    return cells;
}

const updateCells = function (cells, {numRows, numCols, normalizedSpacing, canvasW, canvasH}) {
    const updatedCells = [];

    const [cellW, cellH] = calcCellSize({spacing: normalizedSpacing, canvasW, canvasH, numRows, numCols});
    // console.log("Updating cells haiyaaa!");
    let cellX = 0;
    let cellY = 0;

    for (let row=0; row<numRows; row++) {
        cellY += normalizedSpacing;
        for (let col=0; col<numCols; col++) {
            cellX += normalizedSpacing;
            const index = numCols*row + col;
            updatedCells[index] = {
                ...cells[index],
                x: cellX, y: cellY,
                endX: cellX+cellW, endY: cellY+cellH,
                width: cellW, height: cellH,
            };
            cellX += cellW;
        }
        cellY += cellH;
        cellX = 0;
    }

    return updatedCells;
}


/*

*/

