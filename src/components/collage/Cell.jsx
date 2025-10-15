import {extend} from "@pixi/react";
import {Container, Graphics, Rectangle, Sprite, Texture} from "pixi.js";
import {useCallback, useEffect, useRef, useState} from "react";
import {calculateImagePosition} from "../../services/collageHelpers.js";


extend({
    Graphics,
    Container,
    Sprite,
    Rectangle
});


function Cell({x, y, width, height, radius=10, cellId, hoveredCellId, image: imgBlob}) {

    const {texture} = useImageTexture(imgBlob);

    const spriteRef = useRef(null);
    const maskRef = useRef(null);
    const containerRef = useRef(null);
    const skeletonCellRef = useRef(null);

    useEffect(() => {
        // const texture = textureRef.current;
        if (maskRef.current && spriteRef.current && texture) {
            spriteRef.current.mask = maskRef.current;

            const scale = Math.max(width / texture.width, height / texture.height);
            spriteRef.current.scale.set(scale);

            const {newX, newY} = calculateImagePosition({
                currentPosition: {},
                initialPointerPosition: {},
                spritePosition: {
                    spriteX: spriteRef.current.position.x,
                    spriteY: spriteRef.current.position.y
                },
                width, height,
                spriteW: spriteRef.current.width,
                spriteH: spriteRef.current.height
            })

            spriteRef.current.position.set(newX, newY);
            console.log("recalculating scale of the image!");
        }
    }, [width, height, imgBlob, texture]);


    const drawMask = useCallback((graphics) => {
        const sprite = spriteRef.current;
        if (!sprite) return;

        graphics.clear();
        graphics.roundRect(0, 0, width, height, radius).fill("#555");

    }, [height, radius, width]);

    const drawSkeleton = useCallback((graphics) => {
        graphics.clear();
        const isHovered = cellId === hoveredCellId;
        const skeletonCell = graphics.roundRect(0, 0, width, height, radius);
        skeletonCell.fill(isHovered ? "#B6771D" : "#444");
    }, [cellId, height, hoveredCellId, radius, width]);

    const spriteDragRef = useRef({isDragging: false, initialSpritePos: {}, initialPointerPosition: {}});

    const handleSpritePointerDown = function (e) {
        const container = containerRef.current;
        if (!container) return;

        spriteDragRef.current.isDragging = true;
        const initialPointerPosition = e.getLocalPosition(container);
        spriteDragRef.current.initialPointerPosition = initialPointerPosition;
        spriteDragRef.current.initialSpritePos = spriteRef.current.position.clone();
        // console.log(initialSpritePosition, "initial sprite position!");
    }

    const handleSpritePointerUp = function (e) {
        spriteDragRef.current.isDragging = false;
    }
    const handleSpritePointerOut = function () {
        spriteDragRef.current.isDragging = false;
    }

    const handleSpritePointerMove = function (e) {
        if (!containerRef.current) return;
        const {isDragging, initialSpritePos, initialPointerPosition} = spriteDragRef.current;

        if (isDragging) {
            const {x: curX, y: curY} = e.getLocalPosition(containerRef.current);
            const {x: initX, y: initY} = initialPointerPosition;
            const {x: spriteX, y: spriteY} = initialSpritePos;
            const spriteW = spriteRef.current.width;
            const spriteH = spriteRef.current.height;
            const {newX, newY} = calculateImagePosition({
                currentPosition: {curX, curY},
                initialPointerPosition: {initX, initY},
                spritePosition: {spriteX, spriteY},
                width, height,
                spriteW, spriteH
            });

            spriteRef.current.position.set(newX, newY);
        }
    }


    return (
        <pixiContainer x={x} y={y} visible ref={containerRef}>
            {!imgBlob ? (
                <pixiGraphics
                    ref={skeletonCellRef}
                    draw={drawSkeleton}
                    eventMode={"static"}
                    cursor={"pointer"}
                />
            ) : (
                <>
                    <pixiGraphics ref={maskRef} draw={drawMask} />
                    <pixiSprite
                        x={0} y={0}
                        ref={spriteRef}
                        texture={texture}
                        eventMode={"dynamic"}
                        cursor="all-scroll"
                        onPointerDown={handleSpritePointerDown}
                        onPointerUp={handleSpritePointerUp}
                        onPointerMove={handleSpritePointerMove}
                        onPointerOut={handleSpritePointerOut}
                    />
                </>
            )}
        </pixiContainer>
    );
}

export default Cell;


const useImageTexture = function (imgBlob) {
    const [texture, setTexture] = useState(Texture.EMPTY);

    useEffect(() => {
        if (!imgBlob) return;

        const image = new Image();

        image.src = imgBlob
        image.onload = () => {
            const res = Texture.from(image);
            setTexture(res);
        }

        return () => {
            // console.log("running cleanup from texture creation useEffect()");
            if (image) {
                try {
                    image.onload = null;
                    image.onerror = null;
                    image.src = "";
                    // console.log("successfully destroyed!");
                } catch (err) {
                    console.log(err);
                }
            }

            // URL.revokeObjectURL(imgBlob);
        }
    }, [imgBlob]);

    // ✅ Cleanup on unmount
    // useEffect(() => {
    //     console.log("clean up running!");
    //     return () => {
    //         if (textureRef.current && textureRef.current !== Texture.EMPTY) {
    //             console.log("Component unmounting - destroying texture");
    //             textureRef.current.destroy(true);
    //         }
    //     };
    // }, []);

    return {texture};
}




/*

*/

