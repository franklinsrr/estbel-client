'use client';

import { FC, useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getStatusColor } from '@/constants/mock/birthday';
import { httpBirthdayClient } from '@/http/dashboardHome/httpBirthdayClient';
import { IMember } from '@/interfaces/member';
import { Clipboard } from '@/lib/clipboard';

/**
 * BirthdayPerson is an interface that represents a birthday person.
 */

/**
 * BirthdayCard is a component that displays a birthday card.
 * @returns {React.FC<BirthdayCard>} BirthdayCard component
 */
export const BirthdayCard: FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [birthdayPeople, setBirthdayPeople] = useState<IMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getStatusLabel = (status: IMember['memberStatus']['name']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  useEffect(() => {
    const fetchBirthdayPeople = async () => {
      try {
        setIsLoading(true);
        const birthdayPeople = await httpBirthdayClient.getBirthday();
        setBirthdayPeople(birthdayPeople);
      } catch (error) {
        console.error('Error fetching birthday people:', error);
        toast.error('Error al cargar los cumpleaños');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBirthdayPeople();
  }, []);

  const copyToClipboard = async (person: IMember) => {
    const dataText = `Nombre: ${person.firstName} ${person.lastName}
Teléfono: ${person.phone}
Estado: ${getStatusLabel(person.memberStatus.name)}
Fecha de cumpleaños: ${person.birthdate}`;

    await Clipboard.copyToClipboard(dataText);
    setCopiedId(person.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const BirthdaySkeleton = () => (
    <div className="space-y-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 border-b"
        >
          <div className="flex-1">
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cumpleaños</CardTitle>
        <CardDescription>
          Personas que cumplen años hoy - Click para copiar
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[289px] overflow-y-auto">
        {isLoading ? (
          <BirthdaySkeleton />
        ) : (
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
                    <h4 className="font-medium text-gray-900">
                      {person.firstName} {person.lastName}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{person.phone}</p>
                  </div>
                  <div className="ml-4 flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        person.memberStatus.name
                      )}`}
                    >
                      {getStatusLabel(person.memberStatus.name)}
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
        )}
      </CardContent>
    </Card>
  );
};
