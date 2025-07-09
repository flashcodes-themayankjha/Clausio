
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Analyzer from "./components/Analyzer";
import Navbar from "./components/Navbar";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/analyze" element={<Analyzer />} />
         <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
