import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  className,
  iconClassName,
}) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h4 className="text-3xl font-bold">{value}</h4>
            {change && (
              <div
                className={`flex items-center text-sm font-medium mt-1 ${
                  isPositive ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 mr-1 animate-pulse" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1 animate-pulse" />
                )}
                <span>{change}</span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "p-3 rounded-full flex items-center justify-center",
              isPositive
                ? "bg-emerald-100 text-emerald-600"
                : "bg-rose-100 text-rose-600",
              iconClassName
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
