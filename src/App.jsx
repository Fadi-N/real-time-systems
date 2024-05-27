import './App.css'
import ModbusCrc from "./components/ModbusCrc.jsx";
import CanCrc from "./components/CanCrc.jsx";
import Ieee754 from "./components/Ieee754.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    return(
        <>
            {/*<ModbusCrc/>*/}
            {/*<CanCrc/>*/}
            <Ieee754/>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </>
    )
}

export default App
