export function calcCellSize ({spacing, canvasW, canvasH, numRows, numCols}) {
    const availableW = (canvasW - ((numRows + 1) * spacing)) / numRows;
    const availableH = (canvasH - ((numCols + 1) * spacing)) / numCols;

    return [availableW, availableH];
}

export function normalizeInputs(value, canvasW, canvasH, numRows, numCols) {
    const baseCellWidth = canvasW / numRows;
    const baseCellHeight = canvasH / numCols;
    return Math.round((value / 100) * Math.max(baseCellWidth, baseCellHeight) * 0.25);
}

export const defaultBgColors = [
    "#fff",
    "#c3320a",
    "#444",
    "#000000",
    "#F270DD",
    "#E99F06",
    "#F8E71D",
    "#00ff80",
    "#0080ff"
]

export const toPixiCoords = function ({appRef, clientX, clientY}) {
    const canvas = appRef.current.getCanvas();
    const app = appRef.current.getApplication();
    if (!canvas || !app) return [0, 0];
    const rect = canvas.getBoundingClientRect();
    // these are the canvas positions relative to the canvas
    // this will only log when the drag over is on the canvas!
    // the top most value of canvasX and canvasY is (0, 0) and the bottom most is the scaled version which will be different according to the screen sizes of the client!
    const canvasX = clientX - rect.left;
    const canvasY = clientY - rect.top;
    // get the intrinsic width and height of the canvas!
    // this is the actual width and height of the canvas ie actual pixels drawn on the canvas not the css scaled version!
    const {width: intrinsicCanvasWidth, height: intrinsicCanvasHeight} = app.renderer;

    // these are the actual hover positions on the canvas. ie where exactly is the user hovering over the canvas
    // it'll work regardless of the scaling applied because we are multiplying with the scale!
    // here rect.width and rect.height are the width and height that the canvas is scaled down/up based on the client's screen res!
    // this would range from 0,0 to (1451,2105) or what the canvas width and height has been set! so now it is easier to check with the cell positions as they match!
    const x = canvasX * (intrinsicCanvasWidth / rect.width);
    const y = canvasY * (intrinsicCanvasHeight / rect.height);

    return [x, y];
}

export const locateCell = function (x, y, cells) {
    for (const cell of cells) {
        if ((x > cell.x && x < cell.endX) &&
        (y > cell.y && y < cell.endY)) {
            console.log(`You are looking at the cell ${cell.index + 1}!`);
            return cell;
        }
    }
    return null;
}

// calculates the image position in the cell!
export const calculateImagePosition = function ({currentPosition, spritePosition, initialPointerPosition, width, height, spriteW, spriteH}) {

    const {curX, curY} = currentPosition;
    const {initX, initY} = initialPointerPosition;
    const {spriteX, spriteY} = spritePosition;

    const isDimensionChange = curX === undefined || initX === undefined;

    let newX, newY;

    if (isDimensionChange) {
        // Just use current sprite position
        newX = spriteX;
        newY = spriteY;
    } else {
        const dx = curX - initX;
        const dy = curY - initY;
        // new sprite x and y position!
        newX = spriteX + dx;
        newY = spriteY + dy;
    }

    const minX = Math.min(0, width-spriteW);
    const maxX = Math.max(0, width-spriteW);

    const minY = Math.min(0, height - spriteH);
    const maxY = Math.max(0, height - spriteH);

    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));

    return {newX, newY};
}

