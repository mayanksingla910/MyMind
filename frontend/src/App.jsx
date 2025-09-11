import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/sidebar/sidebar'
import './App.css'
import Upcoming from './pages/Upcoming'
import List from '@mui/material/List'
import { ListsProvider } from './context/listContext'

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  return (
    <div className="flex h-">
      <ListsProvider>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} setIsSidebarHovered={setIsSidebarHovered} />
      <main className={`flex-1 transition-margin duration-300 ${(sidebarOpen || isSidebarHovered )? "ml-[19rem] " : "ml-10"} p-6 overflow-auto`}>
        {children}
      </main>
      </ListsProvider>
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

