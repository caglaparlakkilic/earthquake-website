import "./App.css";
import Map from "./components/Map/map";
import List from "./components/List/list";
import Home from "./components/Home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
