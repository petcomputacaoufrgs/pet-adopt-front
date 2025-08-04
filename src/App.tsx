import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomePage";
import LoginView from "./views/Login";
import SignupView from "./views/SignUp"
import ManageAnimals from "./views/ManageAnimals";
import ManageNgo from "./views/ManageNgo";
import ManageNgoProfile from "./views/ManageNgoProfile";
import ValidateNgoProfile from "./views/ValidateNgoProfile";
import EditAnimal from "./views/EditAnimal";
import ApproveNGO from "./views/ApproveNGO";
import ManageInfo from "./views/ManageInfo";

function App() {  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/manageNgo" element={<ManageNgo />}></Route>
          <Route path="/manageNgoProfile" element={<ManageNgoProfile />}></Route>
          <Route path="/validateNgoProfile" element={<ValidateNgoProfile />}></Route>
          <Route path="/approveNgo" element={<ApproveNGO />}></Route>
          <Route path="/manageAnimals" element={<ManageAnimals allowEdit={true}/>}></Route>
          <Route path="/searchAnimals" element={<ManageAnimals allowEdit={false}/>}></Route>
          <Route path="/editAnimal" element={<EditAnimal animalData={true}/>}></Route>
          <Route path="/createAnimal" element={<EditAnimal animalData={false}/>}></Route>
          <Route path="/manageInfo" element={< ManageInfo/>}></Route>
          {/* <Route path="/selectorButton" element={<  AnimalFilter />}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;