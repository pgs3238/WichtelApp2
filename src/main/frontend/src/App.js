import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Snowfall}  from 'react-snowfall';

 function App () {
    return (
        <>
            <Snowfall/>
            <Router>
                <Navbar/>
                <Routes>
                    <Route path='/'/>
                </Routes>
            </Router>

        </>
    );
}

export default App;