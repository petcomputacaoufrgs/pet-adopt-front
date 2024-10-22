import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Example from "./pages/Example";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Example />} />
          <Route path="/teste" element={<Example />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;