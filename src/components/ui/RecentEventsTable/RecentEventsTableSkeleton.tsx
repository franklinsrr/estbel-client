import { Skeleton } from '@/components/ui/skeleton';
import { TableRow } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table';

export const RecentEventsTableSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-6 w-32 rounded-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-48" />
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-1">
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-4 w-20" />
      </div>
    </TableCell>
    <TableCell>
      <div className="space-y-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </TableCell>
    <TableCell className="text-center">
      <div className="flex items-center justify-center gap-1">
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-4 w-6" />
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-1">
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-4 w-24" />
      </div>
    </TableCell>
    <TableCell>
      <Skeleton className="h-5 w-16 rounded-full" />
    </TableCell>
  </TableRow>
);
