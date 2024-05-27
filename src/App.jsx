import './App.css';
import ModbusCrc from "./components/ModbusCrc.jsx";
import CanCrc from "./components/CanCrc.jsx";
import Ieee754 from "./components/Ieee754.jsx";
import {Toaster} from "react-hot-toast";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";

const App = () => {
    return (
        <Router>
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<ModbusCrc/>}/>
                    <Route path="/modbuscrc" element={<ModbusCrc/>}/>
                    <Route path="/cancrc" element={<CanCrc/>}/>
                    <Route path="/ieee754" element={<Ieee754/>}/>
                </Routes>
            </div>
            <Toaster
                position="bottom-left"
                reverseOrder={false}
            />
        </Router>
    );
}

export default App;
