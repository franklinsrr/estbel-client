'use client';

import { FC, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '@/store';
import { formatDate, formatTime } from '@/constants/mock/tables';
import { getEventNameColor } from '@/lib/format';
import { convertToDate } from '@/lib/date';
import { truncateText } from '@/lib/text';
import { RecentEventsTableSkeleton } from './RecentEventsTableSkeleton';

/**
 * RecentEventsTable is a component that displays a table of recent events.
 * It includes information about prayer services, Sunday school and other events.
 * @param {RecentEventsTableProps} props - Props of the component
 * @returns {React.FC<RecentEventsTableProps>} RecentEventsTable component
 */
export const RecentEventsTable: FC = () => {
  const { events, isLoading, getEvents } = useStore(
    useShallow(state => ({
      events: state.events,
      isLoading: state.isEventsLoading,
      getEvents: state.getEvents,
    }))
  );

  useEffect(() => {
    getEvents();
  }, [getEvents]);

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
              <TableHead className="text-center">Tasa de Asistencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Skeleton loading state
              Array.from({ length: 5 }).map((_, index) => (
                <RecentEventsTableSkeleton key={`skeleton-${index}`} />
              ))
            ) : events && events.length > 0 ? (
              // Actual data
              events.map(event => {
                const totalAttendances = event.attendances?.length || 0;
                const actualAttendances =
                  event.attendances?.filter(a => a.attended).length || 0;
                const attendanceRate =
                  totalAttendances > 0
                    ? Math.round((actualAttendances / totalAttendances) * 100)
                    : 0;

                return (
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
                    <TableCell className="text-center">
                      {totalAttendances > 0 ? (
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              attendanceRate >= 80
                                ? 'bg-green-100 text-green-800'
                                : attendanceRate >= 60
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {attendanceRate}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ({actualAttendances}/{totalAttendances})
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Sin datos
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <p>No hay eventos recientes para mostrar</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {events && events.length === 0 && !isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay eventos recientes para mostrar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
