import ImageManager from "./ImageManager.jsx";
import Templates from "./Templates.jsx";
import CustomizeCollage from "./CustomizeCollage.jsx";

function SidebarContent({pageType="imageManager"}) {
    if (pageType === "imageManager") return <ImageManager />;
    if (pageType === "customizeCollage") return <CustomizeCollage />;
    if (pageType === "templates") return <Templates />;
}

export default SidebarContent;

/*

*/

