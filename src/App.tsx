import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PUBLIC_PATHS } from "./constants/routes";
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
          <Route path={PUBLIC_PATHS.HOME} element={<HomeView />} />
          <Route path={PUBLIC_PATHS.SEARCH_ANIMALS} element={<ManageAnimals allowEdit={false}/>} />
          <Route path={PUBLIC_PATHS.PET_PROFILE} element={<PetProfile />} />
          <Route path={PUBLIC_PATHS.NGO_PROFILE} element={<NgoProfile />} />
          <Route path={PUBLIC_PATHS.LIST_NGOS} element={<ManageNgo />} />

          {/* Rotas públicas - Apenas para não autenticados */}
          <Route 
            path={PUBLIC_PATHS.LOGIN} 
            element={<PublicRoute><LoginView /></PublicRoute>}
          />
          <Route
            path={PUBLIC_PATHS.SIGNUP}
            element={<PublicRoute><SignupView /></PublicRoute>}
          />
          <Route path={PUBLIC_PATHS.FORGOT_PASSWORD} 
          element={<PublicRoute> <ForgotPassword/> </PublicRoute> } 
          />
          <Route path={PUBLIC_PATHS.RESET_PASSWORD} 
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