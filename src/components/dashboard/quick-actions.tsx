import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { quickActions } from '@/lib/mock-data';

export function QuickActionsGrid() {
  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">Accesos Rápidos</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Link href={action.href} key={action.id} className="group">
            <Card className="h-full transition-all duration-200 group-hover:border-primary group-hover:shadow-lg group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <action.icon className="mb-4 h-10 w-10 text-primary" />
                <CardTitle className="mb-1 text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
