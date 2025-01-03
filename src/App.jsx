import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './pages/Home'
import NewRequest from './pages/NewRequest'

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-request" element={<NewRequest />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
