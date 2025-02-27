import { HashRouter, Route, Routes } from "react-router-dom";
import Actions from "./views/HomePage/Actions";
import Dicas from "./views/HomePage/Dicas/index"
import HomeView from "./views/HomePage";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/teste" element={<Dicas />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;