import { useState } from 'react';
import gopher from './assets/images/dancing-gopher.gif';
import './App.css';
import { Greet } from "../wailsjs/go/main/App";
import Pomo from './pages/Pomo';
import Diary from './pages/Diary';
import Settings from './pages/Settings';
import { Routes, Route, Link, HashRouter } from "react-router-dom";

function App() {
    const [resultText, setResultText] = useState("Welcome! Let's get started!");
    const [clearContent, setClearContent] = useState(false); // State to track whether content should be cleared

    function greet() {
        Greet(name).then(setResultText);
    }

    // Function to handle link click and clear content
    const handleLinkClick = () => {
        setClearContent(true);
    };

    return (
        <HashRouter basename='/'>
            <div id="App">
                <div className="navbar">
                    <ul><Link to={"/"} onClick={() => setClearContent(false)}>Home</Link></ul>
                    <ul><Link to={"/settings"} onClick={handleLinkClick}>Settings</Link></ul>
                </div>
                {!clearContent && (
                    <div>
                        <img src={gopher} id="gopher" alt="dancing gopher" />
                        <h1 className="title">PomoGoro</h1>
                        <div id="result" className="result">{resultText}</div>
                        <div id="main-buttons" className="main-buttons">
                            <Link to="/diary" className='diary-btn' onClick={handleLinkClick}>Diary</Link>
                            <Link to="/pomo" className='start-btn' onClick={handleLinkClick}>Start</Link>
                        </div>
                    </div>
                )}
                <Routes>
                    <Route path='/pomo' element={<Pomo />} />
                    <Route path='/diary' element={<Diary />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
                {clearContent}
            </div>
        </HashRouter>
    )
}

export default App;
