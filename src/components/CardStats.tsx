import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface CardStatsProps {
  title: string;
  value: string;
  percentage: string;
  description: string;
  longDescription: string;
}

const CardStats: React.FC<CardStatsProps> = ({
  title,
  value,
  percentage,
  description,
  longDescription,
}) => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        <CardAction>
          <Badge
            variant={
              percentage.includes('+') || percentage.includes('-')
                ? 'default'
                : 'destructive'
            }
          >
            {percentage.includes('+') ? <TrendingUp /> : <TrendingDown />}
            {percentage}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {description}
          {percentage.includes('+') && <TrendingUp className="size-4" />}
          {percentage.includes('-') && <TrendingDown className="size-4" />}
        </div>
        <div className="text-muted-foreground">{longDescription}</div>
      </CardFooter>
    </Card>
  );
};

export default CardStats;
