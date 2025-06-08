import { FC } from 'react';
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
import { RecentEventsTableProps } from '@/interfaces/events';
import { Calendar, Users, UserCheck, Baby, MapPin } from 'lucide-react';
import { sampleEvents } from '@/constants/mock/tables';
import {
  getEventTypeColor,
  formatDate,
  formatTime,
} from '@/constants/mock/tables';

/**
 * RecentEventsTable is a component that displays a table of recent events.
 * It includes information about prayer services, Sunday school and other events.
 * @param {RecentEventsTableProps} props - Props of the component
 * @returns {React.FC<RecentEventsTableProps>} RecentEventsTable component
 */
export const RecentEventsTable: FC<RecentEventsTableProps> = ({
  events = sampleEvents,
  isLoading = false,
}) => {
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
              <TableHead>Tipo</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead className="text-center">Miembros</TableHead>
              <TableHead className="text-center">Visitantes</TableHead>
              <TableHead className="text-center">Bautizados</TableHead>
              <TableHead className="text-center">Niños</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Ministro</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map(event => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{event.name}</span>
                    {event.notes && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {event.notes}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getEventTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">
                      {formatDate(event.startDate)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{formatTime(event.startDate)}</div>
                    <div>{formatTime(event.endDate)}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-3 w-3 text-blue-500" />
                    <span className="font-medium">{event.members}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <UserCheck className="h-3 w-3 text-green-500" />
                    <span className="font-medium">{event.visitors}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-purple-500">⛪</span>
                    <span className="font-medium">{event.baptized}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Baby className="h-3 w-3 text-orange-500" />
                    <span className="font-medium">{event.children}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {event.totalAttendance}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{event.minister}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {events.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay eventos recientes para mostrar</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
