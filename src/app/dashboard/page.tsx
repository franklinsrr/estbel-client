import Navbar from '@components/navbat';
import CardStats from '@components/CardStats';
import { cardStatsMock } from '@/constants/mock/card';
import { AttendentHistoryChart } from '@/components/charts/AttendentHistoryChart';
import { BirthdayCard } from '@/components/ui/BirthdayCard';
import { Separator } from '@components/ui/Separator';
import { RecentEventsTable } from '@/components/ui/RecentEventsTable';

/**
 * Dashboard is a page that displays a dashboard with a navbar and a grid of card stats.
 * @returns {React.FC<Dashboard>} Dashboard component
 */
export default function Dashboard() {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-4 mt-10 px-10">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cardStatsMock.map(card => (
            <CardStats key={card.id} {...card} />
          ))}
        </section>
        <div className="flex items-center justify-center relative">
          <Separator className="my-4 bg-gray-100 w-full" />
          <p className="text-xl text-gray-800 absolute top-0 left-0 bg-white px-2">
            Histórico de asistencia
          </p>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AttendentHistoryChart className="col-span-1 md:col-span-2 lg:col-span-2" />
          <BirthdayCard />
        </section>
        <section>
          <RecentEventsTable />
        </section>
      </div>
    </div>
  );
}
