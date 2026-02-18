export interface IManageAnimals {
    allowEdit: boolean;
}

export type ModalAction = { tipo: "success" | "error"; petId: string } | null;