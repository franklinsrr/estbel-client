import { Skeleton } from '../skeleton';

/**
 * BirthdaySkeleton is a component that displays a skeleton of the BirthdayCard component.
 * @returns {React.FC<BirthdaySkeleton>} BirthdaySkeleton component
 */
export const BirthdaySkeleton = () => (
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
