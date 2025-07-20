import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomePage";
import LoginView from "./views/Login";
import SignupView from "./views/SignUp"
import ManageAnimals from "./views/ManageAnimals";
import ManageNgo from "./views/ManageNgo";
import ManageNgoProfile from "./views/ManageNgoProfile";
import ValidateNgoProfile from "./views/ValidateNgoProfile";

function App() {  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/manageAnimals" element={<ManageAnimals />}></Route>
          <Route path="/manageNgo" element={<ManageNgo />}></Route>
          <Route path="/manageNgoProfile" element={<ManageNgoProfile />}></Route>
          <Route path="/validateNgoProfile" element={<ValidateNgoProfile />}></Route>
          {/* <Route path="/selectorButton" element={<  AnimalFilter />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;