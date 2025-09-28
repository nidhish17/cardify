import Cell from "./Cell.jsx";
import CollageSetup from "./CollageSetup.jsx";
import {calcCellSize, normalizeInputs} from "../../services/collageHelpers.js";
import useCollageStore from "../../stores/collageStore.js";

function Collage() {
    // you would get these from the template based on the selected one!
    const numRows = 3;
    const numCols = 3;
    const {spacing, canvasSize, cellRadius} = useCollageStore();
    const {width: canvasW, height: canvasH} = canvasSize;

    const roundRadius = normalizeInputs(cellRadius, canvasW, canvasH, numRows, numCols);
    const normalizedSpacing = normalizeInputs(spacing, canvasW, canvasH, numRows, numCols);

    // this is same as passing spacing: spacing, canvasW: canvasW,...
    const [cellW, cellH] = calcCellSize({spacing: normalizedSpacing, canvasW, canvasH, numRows, numCols});

    const cells = new Array(numCols*numRows);

    let cellX = 0;
    let cellY = 0;

    for (let row=0; row<numRows; row++) {
        cellY += normalizedSpacing;
        for (let col=0; col<numCols; col++) {
            cellX += normalizedSpacing;
            cells[(numCols*row) + col] = {cellX, cellY};
            // console.log((row*numCols) + col, "unique index");
            cellX += cellW;
        }
        cellY += cellH;
        cellX = 0;
    }

    // console.log(cells);

    return (

        <CollageSetup>
            {cells.map((cell, i) => {
                const {cellX, cellY} = cell;
                // console.log(cellX, cellY);
                return <Cell key={i} x={cellX} y={cellY} width={cellW} height={cellH} radius={roundRadius} />
            })}
            {/*<Cell x={0} y={0} width={360} height={640} radius={30} />*/}
        </CollageSetup>

    );
}

export default Collage;

/*

*/

