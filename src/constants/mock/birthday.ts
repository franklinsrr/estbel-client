import { BirthdayPerson } from '@/components/BirthdayCard';

/**
 * birthdayPeople is an array of birthday people.
 */
export const birthdayPeople: BirthdayPerson[] = [
  {
    id: '1',
    name: 'María González',
    phone: '+58 412-123-4567',
    status: 'miembro',
    birthDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Juan Pérez',
    phone: '+58 424-987-6543',
    status: 'bautizado',
    birthDate: '2024-01-16',
  },
  {
    id: '3',
    name: 'Ana Rodríguez',
    phone: '+58 416-555-0123',
    status: 'visitante',
    birthDate: '2024-01-17',
  },
  {
    id: '4',
    name: 'Ana Rodríguez',
    phone: '+58 416-555-0123',
    status: 'visitante',
    birthDate: '2024-01-17',
  },
  {
    id: '5',
    name: 'Ana Rodríguez',
    phone: '+58 416-555-0123',
    status: 'visitante',
    birthDate: '2024-01-17',
  },
  {
    id: '6',
    name: 'Ana Rodríguez',
    phone: '+58 416-555-0123',
    status: 'visitante',
    birthDate: '2024-01-17',
  },
  {
    id: '7',
    name: 'Ana Rodríguez',
    phone: '+58 416-555-0123',
    status: 'visitante',
    birthDate: '2024-01-17',
  },
];

/**
 * getStatusColor is a function that returns the color of the status of a birthday person.
 * @param {BirthdayPerson['status']} status - The status of the birthday person.
 * @returns {string} The color of the status of the birthday person.
 */
export const getStatusColor = (status: BirthdayPerson['status']) => {
  switch (status) {
    case 'miembro':
      return 'text-green-600 bg-green-100';
    case 'bautizado':
      return 'text-blue-600 bg-blue-100';
    case 'visitante':
      return 'text-orange-600 bg-orange-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};
