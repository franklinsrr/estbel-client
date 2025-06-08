import { RecentEvent } from '@/interfaces/events';

export const sampleEvents: RecentEvent[] = [
  {
    id: '1',
    name: 'Culto de Oración Matutino',
    type: 'Culto de Oración',
    startDate: new Date('2024-12-15T06:00:00'),
    endDate: new Date('2024-12-15T07:30:00'),
    members: 45,
    visitors: 8,
    baptized: 2,
    children: 12,
    offerings: 850.5,
    totalAttendance: 53,
    location: 'Santuario Principal',
    minister: 'Pastor Juan Rodríguez',
    notes: 'Oración especial por los enfermos',
  },
  {
    id: '2',
    name: 'Escuela Dominical - Adultos',
    type: 'Escuela Dominical',
    startDate: new Date('2024-12-14T09:00:00'),
    endDate: new Date('2024-12-14T10:00:00'),
    members: 78,
    visitors: 15,
    baptized: 0,
    children: 25,
    offerings: 1200.75,
    totalAttendance: 93,
    location: 'Aula Principal',
    minister: 'Maestro Carlos Pérez',
    notes: 'Lección sobre el amor cristiano',
  },
  {
    id: '3',
    name: 'Culto Dominical Vespertino',
    type: 'Culto Dominical',
    startDate: new Date('2024-12-14T18:00:00'),
    endDate: new Date('2024-12-14T20:00:00'),
    members: 120,
    visitors: 22,
    baptized: 3,
    children: 35,
    offerings: 2150.0,
    totalAttendance: 142,
    location: 'Santuario Principal',
    minister: 'Pastor María González',
    notes: 'Bautismo de 3 nuevos hermanos',
  },
  {
    id: '4',
    name: 'Reunión de Jóvenes',
    type: 'Reunión de Jóvenes',
    startDate: new Date('2024-12-13T19:00:00'),
    endDate: new Date('2024-12-13T21:00:00'),
    members: 35,
    visitors: 12,
    baptized: 1,
    children: 8,
    offerings: 450.25,
    totalAttendance: 47,
    location: 'Sala de Jóvenes',
    minister: 'Pastor Juvenil Ana Morales',
    notes: 'Adoración y testimonios',
  },
];

export const getEventTypeColor = (
  type: RecentEvent['type']
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (type) {
    case 'Culto de Oración':
      return 'default';
    case 'Escuela Dominical':
      return 'secondary';
    case 'Culto Dominical':
      return 'destructive';
    case 'Reunión de Jóvenes':
      return 'outline';
    default:
      return 'outline';
  }
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};
