'use client';

import { FC, useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Calendar, Users, MapPin } from 'lucide-react';
import { formatDate, formatTime } from '@/constants/mock/tables';
import { getEventListClient } from '@/http/dashboardHome/httpEventListClient';
import { IEvent } from '@/interfaces/events';

// Helper function to convert string dates to Date objects
const convertToDate = (dateString: string | Date): Date => {
  return typeof dateString === 'string' ? new Date(dateString) : dateString;
};

// Function to get consistent colors for event names
const getEventNameColor = (eventName: string): string => {
  const colors = [
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-green-100 text-green-800 border-green-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-orange-100 text-orange-800 border-orange-200',
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
  ];

  // Create a simple hash of the event name to ensure consistency
  let hash = 0;
  for (let i = 0; i < eventName.length; i++) {
    const char = eventName.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return colors[Math.abs(hash) % colors.length];
};

// Function to truncate text
const truncateText = (text: string, maxLength: number = 60): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * RecentEventsTable is a component that displays a table of recent events.
 * It includes information about prayer services, Sunday school and other events.
 * @param {RecentEventsTableProps} props - Props of the component
 * @returns {React.FC<RecentEventsTableProps>} RecentEventsTable component
 */
export const RecentEventsTable: FC = () => {
  const [events, setEvents] = useState<IEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await getEventListClient();
      setEvents(response);
      setIsLoading(false);
    };
    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Eventos Recientes</CardTitle>
          <CardDescription>Cargando eventos...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Eventos Recientes
        </CardTitle>
        <CardDescription>
          Registro de actividades de la iglesia: cultos, escuela dominical y
          reuniones especiales
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evento</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead className="text-center">Asistencias</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.events.map(event => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border w-fit ${getEventNameColor(event.name)}`}
                    >
                      {event.name}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {event.description && event.description.length > 60 ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-muted-foreground cursor-help">
                          {truncateText(event.description)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>{event.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {event.description || 'Sin descripción'}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">
                      {formatDate(convertToDate(event.startTime))}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{formatTime(convertToDate(event.startTime))}</div>
                    <div>{formatTime(convertToDate(event.endTime))}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-3 w-3 text-blue-500" />
                    <span className="font-medium">
                      {event.attendances?.length || 0}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={event.isActive ? 'default' : 'secondary'}>
                    {event.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {events?.events.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay eventos recientes para mostrar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
