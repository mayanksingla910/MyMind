import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'
import './App.css'
import Upcoming from './pages/Upcoming'

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className={`flex-1 transition-margin duration-300 ${sidebarOpen ? "ml-[19rem] " : "ml-10"} p-6 overflow-auto`}>
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Upcoming />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

