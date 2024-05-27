import './App.css'
import ModbusCrc from "./components/ModbusCrc.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    return(
        <>
            <ModbusCrc/>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </>
    )
}

export default App
