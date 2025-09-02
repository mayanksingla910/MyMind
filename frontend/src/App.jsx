import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Tasks from './pages/Upcoming'
import './App.css'

function App() {
    return(
        <Router>
            <Sidebar />
            <Routes>
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
        </Router>
    )
}

export default App
