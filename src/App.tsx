import { HashRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomePage";
import LoginView from "./views/Login";
import SignupView from "./views/SignUp"
import ManageAnimals from "./views/ManageAnimals";
import ManageNGOs from "./views/ManageNGOs";

// import AnimalFilter from "./views/FindAnimals/AnimalFilter";


function App() {  



  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/manageAnimals" element={<ManageAnimals />}></Route>
          <Route path="/manageNgo" element={<ManageNGOs />}></Route>
          {/* <Route path="/selectorButton" element={<  AnimalFilter />}/> */}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;