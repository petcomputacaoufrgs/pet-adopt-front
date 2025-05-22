import { HashRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomePage";
import LoginView from "./views/Login";
import SignupView from "./views/SignUp"

// import AnimalFilter from "./views/FindAnimals/AnimalFilter";


function App() {  



  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;