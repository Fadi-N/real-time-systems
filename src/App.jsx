import './App.css'
import ModbusCrc from "./components/ModbusCrc.jsx";
import {Toaster} from "react-hot-toast";

import CanCrc from "./components/CanCrc.jsx";
import Ieee754 from "./components/Ieee754.jsx";

const App = () => {
    return(
        <>
            <ModbusCrc/>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />

            {/*<CanCrc/>*/}
            <Ieee754/>
        </>
    )
}

export default App
