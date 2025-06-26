export interface IMember {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  birthdate: string;
  email: string;
  country: string;
  city: string;
  location: string;
  zone: string;
  address: string;
  howTheyArrived: string;
  isBaptized: boolean;
  baptizedAt: string;
  baptizedChurch: string;
  civilStatus: string;
  weddingAt: string | null;
  firstVisitAt: string;
  createdAt: string;
  updatedAt: string;
  memberStatus: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}
