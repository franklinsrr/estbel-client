import Navbar from '@components/navbat';
import CardStats from '@components/CardStats';
import { cardStatsMock } from '@/constants/mock/card';
import { ChartAreaInteractive } from '@/components/charts/AttendentHistoryChart';

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
        <section>
          <ChartAreaInteractive />
        </section>
      </div>
    </div>
  );
}
