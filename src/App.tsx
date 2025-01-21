import { HashRouter, Route, Routes } from "react-router-dom";
import Actions from "./views/HomePage/Actions/Actions";
import Dicas from "./views/HomePage/Dicas/index"

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Actions />} />
          <Route path="/teste" element={<Dicas />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;