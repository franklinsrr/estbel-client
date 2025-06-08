export interface RecentEvent {
  id: string;
  name: string;
  type:
    | 'Culto de Oración'
    | 'Escuela Dominical'
    | 'Culto Dominical'
    | 'Reunión de Jóvenes'
    | 'Estudio Bíblico';
  startDate: Date;
  endDate: Date;
  members: number;
  visitors: number;
  baptized: number;
  children: number;
  offerings: number; // Ofrendas en moneda local
  totalAttendance: number;
  location: string;
  minister: string; // Pastor o ministro a cargo
  notes?: string;
}

export interface RecentEventsTableProps {
  events?: RecentEvent[];
  isLoading?: boolean;
}
