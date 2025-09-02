import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './App.css'
import Upcoming from './pages/Upcoming'

function App() {
    return(
        <Router>
            <Sidebar />
            <Routes>
                <Route path="/tasks" element={<Upcoming />} />
            </Routes>
        </Router>
    )
}

export default App
