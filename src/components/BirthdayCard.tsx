'use client';

import { FC, useState } from 'react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { birthdayPeople, getStatusColor } from '@/constants/mock/birthday';

/**
 * BirthdayPerson is an interface that represents a birthday person.
 */
export interface BirthdayPerson {
  id: string;
  name: string;
  phone: string;
  status: 'bautizado' | 'miembro' | 'visitante';
  birthDate: string;
}

/**
 * BirthdayCard is a component that displays a birthday card.
 * @returns {React.FC<BirthdayCard>} BirthdayCard component
 */
export const BirthdayCard: FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getStatusLabel = (status: BirthdayPerson['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const copyToClipboard = async (person: BirthdayPerson) => {
    const dataText = `Nombre: ${person.name}
Teléfono: ${person.phone}
Estado: ${getStatusLabel(person.status)}
Fecha de cumpleaños: ${person.birthDate}`;

    try {
      await navigator.clipboard.writeText(dataText);
      setCopiedId(person.id);
      // Clean feedback after 2 seconds
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (err) {
      toast.error('Error while copying to clipboard');
      console.error('Error al copiar al portapapeles:', err);
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = dataText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopiedId(person.id);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumpleaños</CardTitle>
        <CardDescription>
          Personas que cumplen años hoy - Click para copiar
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[289px] overflow-y-auto">
        <div className="space-y-2">
          {birthdayPeople.length > 0 ? (
            birthdayPeople.map(person => (
              <div
                key={person.id}
                onClick={() => copyToClipboard(person)}
                className={`flex items-center justify-between p-2 border-b transition-all cursor-pointer ${
                  copiedId === person.id
                    ? 'bg-green-50 border-green-200 shadow-md'
                    : 'hover:bg-transparent hover:shadow-xs'
                }`}
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{person.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{person.phone}</p>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      person.status
                    )}`}
                  >
                    {getStatusLabel(person.status)}
                  </span>
                  {copiedId === person.id && (
                    <span className="text-xs text-green-600 font-medium">
                      ¡Copiado!
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay cumpleaños próximos</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
