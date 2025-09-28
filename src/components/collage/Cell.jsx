import {extend} from "@pixi/react";
import {Container, Graphics} from "pixi.js";

extend({
    Graphics,
    Container
});


function Cell({x, y, width, height, radius=10}) {

    function drawSkeleton (graphics) {
        graphics.clear();
        const skeletonCell = graphics.roundRect(0, 0, width, height, radius);
        skeletonCell.fill("#555");
    }


    return (
        <pixiContainer x={x} y={y} width={width} height={height} visible>
            <pixiGraphics draw={drawSkeleton} />
        </pixiContainer>
    );
}

export default Cell;

/*

*/

