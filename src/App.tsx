import { HashRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomePage";

function App() {  

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;