import {Link} from "react-router-dom";
import {COLLAGE_APP} from "../utils/urlPaths.js";

function Landing() {
    return (
        <div className="">
            landing page!
            <Link to={COLLAGE_APP}>create a collage -&rarr;</Link>
        </div>
    );
}

export default Landing;

/*

*/

