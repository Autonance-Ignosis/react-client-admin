
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h4 className="text-2xl font-bold">{value}</h4>
            {change && (
              <p className={`text-sm mt-2 flex items-center ${isPositive ? 'text-rbi-success' : 'text-rbi-danger'}`}>
                <span className={`mr-1 ${isPositive ? '↑' : '↓'}`}>
                  {isPositive ? '↑' : '↓'}
                </span>
                {change}
              </p>
            )}
          </div>
          <div className="bg-secondary p-3 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
