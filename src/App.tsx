import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom";
import { PUBLIC_PATHS } from "./constants/routes";
import HomeView from "./views/HomePage";
import LoginView from "./views/Login";
import SignupView from "./views/SignUp"
import ManageAnimals from "./views/ManageAnimals";
import ManageNgo from "./views/ManageNgo";
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
import { ngoService, petService, userService } from "./services";
import Header from "./components/Header";
import logo from "./assets/HorizontalLogo.png"
import { petProfileLoader } from "./views/PetProfile/petProfileLoader";
import { createCrudAction, createPaginatedLoader } from "./services/helpers/loaderCreator";

const RootLayout = () => {
  return (
    <div className="App">
      <ToastProvider>
              <Header
        color="#FFF6E8"
        Logo={logo}
      />
        <Outlet /> 
      </ToastProvider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />, // (Opcional) Uma página de erro genérica
    children: [

      // ROTAS PÚBLICAS
      { path: PUBLIC_PATHS.HOME, element: <HomeView /> },
      { path: PUBLIC_PATHS.SEARCH_ANIMALS, element: <ManageAnimals allowEdit={false} />,
        loader: createPaginatedLoader({
          isPublic: true,
          // Lista todos os filtros que a URL suporta
          filterKeys: ["name", "species", "age", "size", "color", "city", "state", "sex"],
  
          fetchData: (filters, user) => {
            return petService.getPage(filters);
          }}),

        action: createCrudAction({
          deleteFn: (id) => petService.delete(id)
        })
     },
    
      { path: PUBLIC_PATHS.PET_PROFILE, element: <PetProfile />, loader: petProfileLoader },

      { path: PUBLIC_PATHS.NGO_PROFILE, element: <NgoProfile />, 
        loader: async ({ params} ) => {
          const ngoId = params.id;
          if(!ngoId) throw new Error("ID da ONG não fornecido");

          console.log("Loader NGO Profile for ID:", ngoId);
          const isApprovedResponse = await ngoService.isApproved(ngoId);

          if(!isApprovedResponse.data.approved) throw new Response("ONG Not Approved", { status: 403 });

          const ngoResponse = await ngoService.getById(ngoId);

          console.log("NGO Response:", ngoResponse);
          const ngo = ngoResponse.data;

          console.log("Loaded NGO Data:", ngo);
          if(!ngo) throw new Response("ONG Not Found", { status: 404 });
          return { ngo: ngo, isApproved: isApprovedResponse.data.approved};
        }
       },
      
      { path: PUBLIC_PATHS.LIST_NGOS, element: <ManageNgo />,
        loader: createPaginatedLoader({
          isPublic: true,
          fetchData: (filters, user) => {
            return ngoService.getApprovedPage(filters);
          }
        }),
        action: createCrudAction({
          deleteFn: (id) => ngoService.delete(id)
        })
      },

      { path: PUBLIC_PATHS.LOGIN, element: <PublicRoute><LoginView /></PublicRoute> },
      { path: PUBLIC_PATHS.SIGNUP, element: <PublicRoute><SignupView /></PublicRoute> },
      { path: PUBLIC_PATHS.FORGOT_PASSWORD, element: <PublicRoute><ForgotPassword/></PublicRoute> },
      { path: PUBLIC_PATHS.RESET_PASSWORD, element: <PublicRoute><ResetPassword/></PublicRoute> },


      // ROTAS PROTEGIDAS (ADMIN)
      {
        path: "/approveNgo",
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <ApproveNGO />
          </ProtectedRoute>
        ),

        loader: createPaginatedLoader({
          isPublic: true,
          fetchData: (filters, user) => {
            return ngoService.getUnapprovedPage(filters);
          }
        }),
        action: createCrudAction({
          deleteFn: (id) => ngoService.delete(id),
          approveFn: (id) => ngoService.approve(id)
        })
      },

      {
        path: "/manageNgoMembers",
        element: (
          <ProtectedRoute allowedRoles={['NGO_ADMIN']}>
            <ManageNGOMembers />
          </ProtectedRoute>
        ),

          loader: createPaginatedLoader({
          isPublic: false,
          // Lista todos os filtros que a URL suporta
          filterKeys: ["name"],
  
          fetchData: (filters, user) => {

            if(!user || !user.ngoId) {
              throw new Error("Usuário não autenticado ou sem ONG associada");
            }

            return userService.getApprovedMembersPage(user.ngoId, filters); // Certifique-se que o service suporta paginação
          }}),

        action: createCrudAction({
          deleteFn: (id) => userService.delete(id)
        })
      },

      {
        path: "/approveNgoMembers",
        element: (
          <ProtectedRoute allowedRoles={['NGO_ADMIN']}>
            <ApproveNGOMembers />
          </ProtectedRoute>
        ),

        loader: createPaginatedLoader({
          isPublic: false,
          // Lista todos os filtros que a URL suporta
          filterKeys: ["name"],
  
          fetchData: (filters, user) => {

            if(!user || !user.ngoId) {
              throw new Error("Usuário não autenticado ou sem ONG associada");
            }

            return userService.getUnapprovedMembersPage(user.ngoId, filters); // Certifique-se que o service suporta paginação
          }}),

        action: createCrudAction({
          deleteFn: (id) => userService.delete(id),
          approveFn: (id) => userService.approve(id)
        })
      },

      {
        path: "/manageAnimals",
        element: (
          <ProtectedRoute allowedRoles={['ALL']}>
            <ManageAnimals allowEdit={true} />
          </ProtectedRoute>
        ),
        loader: createPaginatedLoader({
          isPublic: false,
          // Lista todos os filtros que a URL suporta
          filterKeys: ["name", "species", "age", "size", "color", "city", "state", "sex"],
  
          fetchData: (filters, user) => {
            // Não precisamos do 'user' aqui pois é busca pública
            return petService.getPage(filters); // Certifique-se que o service suporta paginação
          }}),

        action: createCrudAction({
          deleteFn: (id) => petService.delete(id)
        })
      },

      {
        path: "/manageInfo",
        element: (
          <ProtectedRoute allowedRoles={['ALL']}>
            <ManageInfo />
          </ProtectedRoute>
        )
      },

      // ROTAS DE EDIÇÃO
      {
        path: "/createAnimal",
        element: (
          <ProtectedRoute allowedRoles={['ALL']}>
            <EditAnimal />
          </ProtectedRoute>
        )
      },

      {
        path: "/editAnimal/:id",
        element: (
          <ProtectedRoute allowedRoles={['ALL']}>
            <EditAnimalWrapper />
          </ProtectedRoute>
        )
      }
    ]
  }
]);


function App() {  

  return (
    <RouterProvider router={router} />
  );
}

export default App;