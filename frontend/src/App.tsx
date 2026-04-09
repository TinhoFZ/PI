import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/pages/Landing';
import MapPage from './components/pages/MapPage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App