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
import PetProfile from "./views/PetProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageNGOMembers from "./views/ManageNGOMembers";
import PublicRoute from "./components/PublicRoute";

function App() {  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<HomeView />} />
          <Route path="/searchAnimals" element={<ManageAnimals allowEdit={false}/>} />
          <Route path="/petProfile" element={<PetProfile />} />

          {/* Rotas públicas - Apenas para não autenticados */}
          <Route 
            path="/login" 
            element={<PublicRoute><LoginView /></PublicRoute>}
          />
          <Route
            path="/signup"
            element={<PublicRoute><SignupView /></PublicRoute>}
          />


          {/* Rotas protegidas - Apenas ADMIN */}
          <Route 
            path="/approveNgo" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ApproveNGO />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/validateNgoProfile" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ValidateNgoProfile />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/manageNgo" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <ManageNgo />
              </ProtectedRoute>
            } 
          />

          {/* Rotas protegidas - Apenas NGO_ADMIN */}
          <Route 
            path="/manageNgoProfile" 
            element={
              <ProtectedRoute allowedRoles={['NGO_ADMIN']}>
                <ManageNgoProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manageNgoMembers" 
            element={
              <ProtectedRoute allowedRoles={['NGO_ADMIN']}>
                <ManageNGOMembers />
              </ProtectedRoute>
            } 
          />

          {/* Rotas protegidas - (Qualquer usuário logado) ADMIN, NGO_ADMIN e NGO_MEMBER */}
          <Route 
            path="/manageAnimals" 
            element={
              <ProtectedRoute allowedRoles={['ALL']}>
                <ManageAnimals allowEdit={true}/>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/editAnimal" 
            element={
              <ProtectedRoute allowedRoles={['ALL']}>
                <EditAnimal animalData={true}/>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/manageInfo" 
            element={
              <ProtectedRoute allowedRoles={['ALL']}>
                <ManageInfo />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/createAnimal" 
            element={
              <ProtectedRoute allowedRoles={['ALL']}>
                <EditAnimal animalData={false}/>
              </ProtectedRoute>
            } 
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;