import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ExpirationMonitor } from '@/components/dashboard/expiration-monitor';
import { QuickActionsGrid } from '@/components/dashboard/quick-actions';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <ExpirationMonitor />
        <QuickActionsGrid />
      </div>
    </DashboardLayout>
  );
}
