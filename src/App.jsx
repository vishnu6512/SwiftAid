import { Routes, Route } from 'react-router-dom'
import './App.css'
import BasicExample from './Components/Navbar'
import Home from './pages/Home'
import Footer from './Components/Footer'
import NewRequest from './pages/NewRequest'
function App() {
  
  return (
    <>
      {/* Navbar */}
      <BasicExample/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/newrequest" element={<NewRequest/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
