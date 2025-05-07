import { HashRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomePage";
import LoginView from "./views/Login";
import SignupView from "./views/SignUp"
import SearchBar from "./components/SearchBar";
import RadioButton from "./components/RadioButton";
import { useState } from "react";
import RadioGroup from "./components/RadioGroup";

function App() {  
  const [value, setValue] = useState<string>("");

  const options = [{label: "Cachorro", value: "Cachorro"}, {label: "Gato", value: "Gato"}, {label: "Outros", value: "Outros"}];


  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/radio" element={<RadioGroup  fontSize="18px" title="Espécie" required={true} options={options} selectedValue={value} name={"Animais"} onChange={setValue}/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;