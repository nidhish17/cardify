import Sidebar from "../components/sidebar/Sidebar.jsx";
import {Tooltip} from "react-tooltip";
import NavBar from "../components/NavBar.jsx";
import Collage from "../components/collage/Collage.jsx";


function CollageLayout() {
    return (
        <>
            <div className="cardify-app grid h-screen grid-cols-[320px_1fr] grid-rows-[60px_1fr]">
                <NavBar />
                <Sidebar />
                <Collage />
            </div>
            <Tooltip id="collage-tooltip" className="!bg-primary-600 border border-primary-500/10 font-semibold text-lg" />
        </>
    );
}

export default CollageLayout;

/*

*/

