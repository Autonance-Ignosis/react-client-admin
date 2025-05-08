
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RequestStatusBadge from '../kvc/RequestStatusBadge';

interface Activity {
  id: string;
  user: string;
  action: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between pb-4 border-b border-rbi-border last:border-0 last:pb-0">
              <div>
                <p className="font-medium">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
              </div>
              <RequestStatusBadge status={
                activity.status === 'approved' ? 'VERIFIED' :
                activity.status === 'pending' ? 'PENDING' :
                'REJECTED'
              } />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
