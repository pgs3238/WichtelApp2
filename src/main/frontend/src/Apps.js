import logo from './logo.svg';
import './Apps.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

 function Apps () {
    return (
        <>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/'/>
                </Routes>
            </Router>

        </>
    );
}

export default Apps;