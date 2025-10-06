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