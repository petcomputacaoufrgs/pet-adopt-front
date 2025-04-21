import { HashRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomePage";
import SearchBar from "./components/OngSelectionDropDown";

function App() {  

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/teste" element={<SearchBar errorMessage="Senha fraca" error={true} title="Países" required={true} placeholder="Encontre o país" width="500px" fontSize="20px" options={["Brasil", "Burkina Faso", "EUA", "China", "Argentina", "Bolívia", "Brasil mas a segunda versão"]} />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;