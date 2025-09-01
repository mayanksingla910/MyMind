import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tasks from './pages/Tasks'
import './App.css'

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
        </Router>
    )
}

export default App
