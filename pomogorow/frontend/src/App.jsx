import { useState } from 'react';
import gopher from './assets/images/dancing-gopher.gif';
import './App.css';
import Pomo from './components/Pomo';
import Diary from './components/Diary';
import Settings from './components/Settings';
import { Routes, Route, Link, HashRouter } from "react-router-dom";
import Player from './components/Player';

function App() {
    const [resultText, setResultText] = useState("Welcome! Let's get started!");
    const [clearContent, setClearContent] = useState(false); // State to track whether content should be cleared
    const [totalTimeFocused, setTotalTimeFocused] = useState(0);
    const [totalPomosCompleted, setTotalPomosCompleted] = useState(0);

    const handleLinkClick = () => {
        setClearContent(true);
        Player.playSound();
    };

    return (
        <HashRouter basename='/'>
            <div id="App">
                <div className="navbar">
                    <ul><Link to={"/"} className="home-link" onClick={() => setClearContent(false)}>Home</Link></ul>
                </div>
                {!clearContent && (
                    <div className='welcome-page'>
                        <img src={gopher} id="gopher" alt="dancing gopher" />
                        <h1 className="title">PomoGoro</h1>
                        <div id="welcome" className="welcome-text">{resultText}</div>
                        <div id="main-buttons" className="main-buttons">
                            <Link to="/diary" className='diary-btn main-button btn ' onClick={handleLinkClick}>Diary</Link>
                            <Link to="/pomo" className='start-btn main-button btn' onClick={handleLinkClick}>Start</Link>
                        </div>
                    </div>
                )}
                <Player />
                <Routes>
                    <Route path='/pomo' element={<Pomo />} />
                    <Route path='/diary' element={<Diary totalTimeFocused={totalTimeFocused} totalPomosCompleted={totalPomosCompleted} />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
                {clearContent}
            </div>
        </HashRouter>
    )
}

export default App;
