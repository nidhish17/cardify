import Resizer from "react-image-file-resizer";

export const resizeImage = function (imgFile) {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            imgFile,
            200, 200,
            "JPG", 80,
            0, (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });
}

export default resizeImage;
