import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomePage";
import LoginView from "./views/Login";
import SignupView from "./views/SignUp"
import ManageNgoView from "./views/ManageNgo";
import ManageAnimalsView from "./views/ManageAnimals"

// import AnimalFilter from "./views/FindAnimals/AnimalFilter";


function App() {  



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/manageNgo" element={<ManageNgoView/>} />
          <Route path="/manageAnimals" element={<ManageAnimalsView/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;