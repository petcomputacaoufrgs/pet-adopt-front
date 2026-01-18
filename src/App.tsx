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
import ApproveNGOMembers from "./views/ApproveNGOMembers";
import PublicRoute from "./components/PublicRoute";
import EditAnimalWrapper from "./views/EditAnimal/EditAnimalWrapper";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import { ToastProvider } from "./contexts/ToastContext";
import NgoProfile from "./views/NGOProfile";

function App() {  

  return (
    <div className="App">
      <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<HomeView />} />
          <Route path="/searchAnimals" element={<ManageAnimals allowEdit={false}/>} />
          <Route path="/petProfile/:id" element={<PetProfile />} />
          <Route path="/NGOProfile/:id" element={<NgoProfile />} />
          <Route path="/listNGOs" element={<ManageNgo />} />

          {/* Rotas públicas - Apenas para não autenticados */}
          <Route 
            path="/login" 
            element={<PublicRoute><LoginView /></PublicRoute>}
          />
          <Route
            path="/signup"
            element={<PublicRoute><SignupView /></PublicRoute>}
          />
          <Route path="/forgotPassword" 
          element={<PublicRoute> <ForgotPassword/> </PublicRoute> } 
          />
          <Route path="/resetPassword" 
          element={<PublicRoute> <ResetPassword/> </PublicRoute> } 
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
            path="/manageNgoMembers" 
            element={
              <ProtectedRoute allowedRoles={['NGO_ADMIN']}>
                <ManageNGOMembers />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/approveNgoMembers" 
            element={
              <ProtectedRoute allowedRoles={['NGO_ADMIN']}>
                <ApproveNGOMembers />
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
            path="/editAnimal/:id" 
            element={
              <ProtectedRoute allowedRoles={['ALL']}>
                <EditAnimalWrapper/>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/manageInfo/:id" 
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
                <EditAnimal/>
              </ProtectedRoute>
            } 
          />
          
        </Routes>
      </BrowserRouter>
      </ToastProvider>
    </div>
  );
}

export default App;