import { petService, ngoService } from "../../services"; // Seus serviços
import { imageHelper } from "../../services/helpers/imageHelper"; // Seu helper
import DogForCard from "../../assets/HomePageCardDog.png"; // Seu fallback

// Função auxiliar de checagem de imagem (fora do componente/loader para limpeza)
const validateImages = async (photos: string[]): Promise<string[]> => {
    if (!photos || photos.length === 0) return [];

    const checkSingleImage = (photoPath: string): Promise<string> => {
        return new Promise((resolve) => {
            // Verifica se roda no browser antes de usar new Image()
            if (typeof window === 'undefined') { 
                resolve(imageHelper.getFullImageUrl(photoPath)); 
                return;
            }

            const fullUrl = imageHelper.getFullImageUrl(photoPath);
            const img = new Image();
            
            img.onload = () => resolve(fullUrl);
            img.onerror = () => resolve(DogForCard);
            img.src = fullUrl;
        });
    };

    const promises = photos.map(photo => checkSingleImage(photo));
    return Promise.all(promises);
};

// --- O LOADER PRINCIPAL ---
export const petProfileLoader = async ({ params }: any) => {
    const petId = params.id;

    if (!petId) throw new Error("ID do pet não fornecido");

    try {
        // 1. Busca o Pet (Primeiro passo obrigatório)
        const petResponse = await petService.getById(petId);
        const pet = petResponse.data;

        // Se não achar o pet, pode redirecionar ou lançar erro 404
        if (!pet) throw new Response("Pet Not Found", { status: 404 });

        // 2. Prepara as requisições dependentes (ONG e Imagens) para rodarem AO MESMO TEMPO
        
        // Promise da ONG (só busca se tiver ngoId)
        const ngoPromise = pet.ngoId 
            ? ngoService.getById(pet.ngoId).then(res => res.data).catch(() => null) 
            : Promise.resolve(null);

        // Promise das Imagens
        const imagesPromise = validateImages(pet.photos);

        // 3. Aguarda ambas terminarem (Paralelismo = Performance)
        const [ngo, finalImages] = await Promise.all([ngoPromise, imagesPromise]);

        // 4. Retorna tudo pronto para o componente
        return { 
            pet, 
            ngo, 
            finalImages 
        };

    } catch (error) {
        console.error("Erro no loader do perfil:", error);
        throw error; // Deixa o ErrorBoundary lidar com isso
    }
};