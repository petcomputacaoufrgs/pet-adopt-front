export interface NGO {
  _id?: string; // Campo alternativo para compatibilidade com MongoDB
  name: string;
  description?: string;
  email: string;
  phone?: string;
  document?: string;
  city?: string;
  state?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  x?: string
  adoptionForm: string;
  sponsorshipForm?: string;
  temporaryHomeForm?: string;
  claimForm?: string;
}


  