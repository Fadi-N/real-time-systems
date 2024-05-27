import './App.css'
import ModbusCrc from "./components/ModbusCrc.jsx";
import CanCrc from "./components/CanCrc.jsx";

import CanCrc from "./components/CanCrc.jsx";
import Ieee754 from "./components/Ieee754.jsx";


const App = () => {
    return(
        <>
            {/*<ModbusCrc/>*/}
            {/*<CanCrc/>*/}
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
            <CanCrc/>
        </>
    )
}

export default App
