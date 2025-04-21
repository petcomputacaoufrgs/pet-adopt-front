import { HashRouter, Route, Routes } from "react-router-dom";
import Actions from "./views/HomePage/About/About";


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