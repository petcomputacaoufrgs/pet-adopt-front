import { HashRouter, Route, Routes } from "react-router-dom";
import Actions from "./views/HomePage/HomePage";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Actions />} />
          <Route path="/teste" element={<Actions />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;