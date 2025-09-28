import {Images, LayoutTemplate, Settings2, X as Close} from "lucide-react";
import {useState} from "react";
import SidebarContent from "./SidebarContent.jsx";



function Sidebar() {
    const [contentOpen, setContentOpen] = useState(true);
    const [navPage, setNavPage] = useState("imageManager");

    function handleFeatureClick (pageType) {
        setNavPage(pageType);
        setContentOpen(true);
    }

    function handleCloseContent () {
        setContentOpen(false);
        setNavPage("");
    }

    return (
        <aside className="h-scree max-wxs flex col-[1_/_2] row-[2_/_2]">
            <SideNav>
                <button className={`${navPage === "imageManager" ? "text-white" : "text-primary-400"}`} onClick={() => handleFeatureClick("imageManager")} data-tooltip-id="collage-tooltip" data-tooltip-content="Images Manager">
                    <Images size={25} />
                </button>
                <button className={`${navPage === "customizeCollage" ? "text-white" : "text-primary-400"}`} onClick={() => handleFeatureClick("customizeCollage")} data-tooltip-id="collage-tooltip" data-tooltip-content="Customize">
                    <Settings2 size={25} />
                </button>
                <button className={`${navPage === "templates" ? "text-white" : "text-primary-400"}`} onClick={() => handleFeatureClick("templates")} data-tooltip-id="collage-tooltip" data-tooltip-content="Templates">
                    <LayoutTemplate size={25} />
                </button>
            </SideNav>

            {/*collage settings, Image manager, templates*/}
            {/*${contentOpen ? "scale-x-100" : "scale-x-0 opacity-0"} side bar is always open! */}
            <div className={`w-full bg-primary-800 border-r-primary-500/70 border-r py-4 px-4 space-y-4 origin-left transition-all overflow-x-hidden duration-200`}>
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <h5 className="capitalize">{navPage === "imageManager" ? "Image Manager" : navPage === "customizeCollage" ? "customize Collage" : navPage === "templates" && "Templates"}</h5>
                        {/*<button onClick={handleCloseContent} className="cursor-pointer self-end"><Close size={25} className="text-primary-500" /></button> enable closing sidebar*/}
                    </div>
                    <hr className="text-primary-500/80 w-full"/>
                </div>
                <SidebarContent pageType={navPage} />
            </div>


        </aside>
    );
}

export default Sidebar;


const SideNav = function ({children}) {
    return (
        <div className={`h-full border-r w-fit border-r-primary-500/70 shadow shadow-primary-900 px-5 py-4 transition-all duration-200`}>
            <div className="flex flex-col gap-y-4 *:hover:text-white *:duration-200 *:transition-all *:cursor-pointer">
                {children}
            </div>
        </div>
    )
}

/*

*/

