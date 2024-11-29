import { HashRouter, Route, Routes } from "react-router-dom";
import Actions from "./views/HomePage/Actions/Actions";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Actions />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;