import { useLoaderData } from "react-router-dom";
import AnimalFormPage from "./index";
import type { Animal } from "./types";

interface LoaderData {
  animalData?: Animal;
  user: any;
}

export default function AnimalFormWrapper() {
  const { animalData, user } = useLoaderData() as LoaderData;

  return <AnimalFormPage animalData={animalData} user={user} />;
}