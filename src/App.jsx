import './App.css'
import CanCrc from "./components/CanCrc.jsx";
import {Toaster} from "react-hot-toast";



const App = () => {
    return(
        <>
            {/*<ModbusCrc/>*/}
            <CanCrc/>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </>
    )
}

export default App
