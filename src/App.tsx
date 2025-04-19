import { HashRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomePage";
import SearchBar from "./components/OngSelectionDropDown";
import Dicas from "./views/HomePage/4Dicas";
import DropDownCell from "./components/DropDownCell";
import DropdownButton from "./components/ButtonDropDown";
import BasicInput from "./components/BasicInput";
import { useState } from "react";


function App() {
  const [value, setValue] = useState('');
  
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/teste" element={<SearchBar title="Países" required={true} placeholder="Encontre o país" width="500px" fontSize="20px" options={["Brasil", "Burkina Faso", "EUA", "China", "Argentina", "Bolívia", "Brasil mas a segunda versão"]} />} />
          <Route path="/teste-input" element={<BasicInput title="Países" required={true} placeholder="Encontre o país" $width="500px" $fontSize="20px" value={value} onChange={(e) => setValue(e.target.value)}/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;