
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Analyzer from "./components/Analyzer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/analyze" element={<Analyzer />} />
      </Routes>
    </Router>
  );
}

export default App;
