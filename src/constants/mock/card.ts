import { CardStatsProps } from '@/components/CardStats';

interface CardStatsMock extends CardStatsProps {
  id: number;
}

export const cardStatsMock: CardStatsMock[] = [
  {
    id: 1,
    title: 'Total de asistencia semanal',
    value: '1,250.10',
    percentage: '+12.5%',
    description: 'estadisticas semanal',
    longDescription: 'Tendencias al alza este mes',
  },
  {
    id: 2,
    title: 'Asistencia escuela dominical',
    value: '1,000.00',
    percentage: '-12.5%',
    description: 'estadisticas semanal',
    longDescription: 'Tendencias al alza este mes',
  },
  {
    id: 3,
    title: 'Total de asistencia Culto de oración',
    value: '1,500.23',
    percentage: '12.5%',
    description: 'estadisticas semanal',
    longDescription: 'Tendencias al alza este mes',
  },
];
