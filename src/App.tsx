import { createBrowserRouter, Outlet, RouterProvider, useNavigation } from "react-router-dom";
import { PUBLIC_PATHS } from "./constants/routes";
import HomeView from "./views/HomePage";
import LoginView from "./views/Login";
import SignupView from "./views/SignUp"
import ManageAnimals from "./views/ManageAnimals";
import ManageNgo from "./views/ManageNgo";
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
import { keyframes, styled } from "styled-components";
import { editAnimalLoader } from "./views/EditAnimal/editAnimalLoader";
import ScrollToTop from "./components/ScrollToTop";
import Spinner from "./components/Spinner";


// Barra de progresso global
const loadAnim = keyframes`
  0% { width: 0; left: 0; }
  50% { width: 50%; left: 0; }
  100% { width: 100%; left: 100%; }
`;

const GlobalProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: #FF6B00;
  z-index: 9999;
  width: 100%;
  animation: ${loadAnim} 1.5s infinite linear;
`;


const RootLayout = () => {

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="App">

      {/* Para toda a aplicação ter acesso ao contexto de Toasts */}
      <ToastProvider>

        {/* Componente para rolar para o topo em mudanças de rota */}
        <ScrollToTop /> 

        {/* Mostra a barra só quando o router estiver navegando */}
        {isLoading && <GlobalProgressBar />}

        <Header
          color="#FFF6E8"
          Logo={logo}
        />

        {/* Aqui é onde o conteúdo das rotas é renderizado */}
        <Outlet /> 

      </ToastProvider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    hydrateFallbackElement: <Spinner fullScreen={true} />, // Mostra um spinner enquanto o layout é carregado
    id: "root",
    loader: async () => {
      const userData = localStorage.getItem("user");

      const user = userData ? JSON.parse(userData) : null;


      if (!user) {
        return { user: null}; // Usuário não logado, não precisa carregar nada
      }

      try {
        const newUser = await userService.getById(user.id);

        console.log("Novo usuário carregado no root loader:", newUser);

        if (!newUser || !newUser.data) {
          localStorage.removeItem("user");
          throw new Response("Unauthorized", { status: 401 });
        }
        return { user: newUser.data };
      } catch (err) {
        localStorage.removeItem("user");
        throw new Response("Unauthorized", { status: 401 });
      }
    },

    children: [

      // ROTAS PÚBLICAS
      { path: PUBLIC_PATHS.HOME, element: <HomeView /> },
      { path: PUBLIC_PATHS.SEARCH_ANIMALS, element: <ManageAnimals allowEdit={false} />,
        loader: createPaginatedLoader({
          isPublic: true,
          // Lista todos os filtros que a URL suporta
          filterKeys: ["name", "species", "age", "size", "color", "city", "state", "sex"],
  
          fetchData: (filters) => {
            return petService.getPage(filters);
          }}),

        action: createCrudAction({
          deleteFn: (id) => petService.delete(id)
        })
     },
    
      { path: PUBLIC_PATHS.PET_PROFILE, element: <PetProfile />, loader: petProfileLoader },

      { path: PUBLIC_PATHS.NGO_PROFILE, element: <NgoProfile />, 
        loader: async ({ params } ) => {
          const ngoId = params.id;
          if(!ngoId) throw new Error("ID da ONG não fornecido");

          console.log("Loader NGO Profile for ID:", ngoId);
          const isApprovedResponse = await ngoService.isApproved(ngoId);
      
          const userStr = localStorage.getItem("user");
          const user = userStr ? JSON.parse(userStr) : null;

          // Se não foi aprovado e user não é admin, bloqueia acesso
           if(!isApprovedResponse.data.approved) {
             if (!user || user.role !== "ADMIN") {
               throw new Response("ONG not found", { status: 403 });
             }
          }

          let ngoResponse;


          if(user && (user.role === "ADMIN" || user.ngoId === ngoId))
            ngoResponse = await ngoService.getByIdWithDetails(ngoId);
          else
            ngoResponse = await ngoService.getById(ngoId);

          console.log("NGO Response:", ngoResponse);
          const ngo = ngoResponse.data;

          console.log("Loaded NGO Data:", ngo);
          if(!ngo) throw new Response("ONG Not Found", { status: 404 });
          return { ngo: ngo, isApproved: isApprovedResponse.data.approved};
        },

        action: createCrudAction({
          deleteFn: (id) => ngoService.delete(id),
          approveFn: (id) => ngoService.approve(id)
        })

       },
      
      { path: PUBLIC_PATHS.LIST_NGOS, element: <ManageNgo />,
        loader: createPaginatedLoader({
          isPublic: true,
          fetchData: (filters) => {
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
          fetchData: (filters) => {
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
          // Adiciona automaticamente o ngoId do usuário aos filtros
          filterByNgo: true,
          // Redireciona para a home em caso de acesso proibido
          forbiddenRedirect: '/',
  
          fetchData: (filters) => {
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
        ),

        action: async ({ request }) => {

          const data = await request.json();
          const intent = data.intent;

          try{
              if (intent === "update") {
                await userService.update(data.id, { name: data.name });
                
                console.log("Dados atualizados com sucesso!");
                
                return { success: true, message: "Dados atualizados com sucesso!" };
              }
          }

            catch(err: any) {
              const errorMessage = err.response?.data?.message || "Erro ao atualizar dados";
              return { success: false, error: errorMessage };
            }   
      }
    },

      // ROTAS DE EDIÇÃO
      {
        path: "/createAnimal",
        element: (
          <ProtectedRoute allowedRoles={['ALL']} key={"createAnimal"}>
            <EditAnimalWrapper />
          </ProtectedRoute>
        ),

        loader: editAnimalLoader
      },

      {
        path: "/editAnimal/:id",
        element: (
          <ProtectedRoute allowedRoles={['ALL']} key={window.location.pathname}>
            <EditAnimalWrapper />
          </ProtectedRoute>
        ),

        loader: editAnimalLoader
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