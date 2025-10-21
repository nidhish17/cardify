import {useRef, useState} from "react";
import {HardDriveUpload, BookmarkX} from "lucide-react";
import resizeImage from "../../utils/imageResizer.js";
import {sanitizeFilename} from "../../utils/helpers.js";
import FullScreenLoader from "../FullScreenLoader.jsx";
import {imageDB} from "../../services/ImageDB.js";
import {useLiveQuery} from "dexie-react-hooks";

function ImageManager() {
    const fileInputRef = useRef(null);
    const images = useLiveQuery(() => imageDB.images.toArray());

    const [loadingImages, setLoadingImages] = useState(false);

    const handleUploadClick = function () {
        fileInputRef?.current.click();
    }

    const handleUploads = async function (e) {
        try {
            setLoadingImages(true);
            const imageFiles = e.target.files;
            for (const file of imageFiles) {
                const imgName = file.name;
                const thumbImg = await resizeImage(file);
                // save the base64 image to indexed db
                await imageDB.images.add({
                    name: sanitizeFilename(imgName),
                    mime: file.type,
                    base64Img: thumbImg,
                    originalFile: file
                });
            }
        } catch (err) {
            console.log("an error occurred, ", err);
        } finally {
            setLoadingImages(false);
        }

    }

    const handleImageDragStart = function (e, originalFile) {
        // console.log(e.target);
        const imageBlob = URL.createObjectURL(originalFile);
        e.dataTransfer.setData("text/plain", imageBlob);
    }

    const handleDeleteImg = async function (id) {
        await imageDB.images.delete(id);
    }

    return (
        <div className="flex flex-col gap-y-6">
            <button onClick={handleUploadClick} className="cursor-pointer px-3.5 py-1.5 rounded text-center bg-teal-500 hover:bg-teal-600 text-black flex items-center gap-x-2 justify-center">Upload <span><HardDriveUpload size={20} /></span></button>
            <input onChange={handleUploads} ref={fileInputRef} type="file" accept="image/jpeg, image/jpg, image/png, image/webp" multiple hidden />

            {images?.length === 0 && <p className="font-semibold text-center">Add some images.</p>}
            <div className="grid grid-cols-2 gap-3">
                {images?.map((image) => {
                    return (
                        <figure key={image.id} onDragStart={(e) => handleImageDragStart(e, image.originalFile)} className="relative rounded w-full h-25 group">
                            <img src={image.base64Img} alt={image.name} className="object-cover size-full rounded-xl" />
                            <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-b from-primary-500/10 to-primary-500/60 rounded opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                                <button className="pointer-events-auto">
                                    <BookmarkX onClick={() => handleDeleteImg(image.id)} size={20} className="text-primary-100" data-tooltip-id="collage-tooltip" data-tooltip-content="Remove from image manager" />
                                </button>
                            </div>
                        </figure>
                    )
                })}
            </div>

            {loadingImages && (
                <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                    <FullScreenLoader message={"Loading Images!"} />
                </div>
            )}

        </div>
    );
}

export default ImageManager;

/*

*/

