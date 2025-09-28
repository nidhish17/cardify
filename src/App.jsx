import {BrowserRouter, Route, Routes} from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import CollageLayout from "./pages/CollageLayout.jsx";
import {COLLAGE_APP} from "./utils/urlPaths.js";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing />} />
                <Route path={COLLAGE_APP} element={<CollageLayout />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

/*

*/

