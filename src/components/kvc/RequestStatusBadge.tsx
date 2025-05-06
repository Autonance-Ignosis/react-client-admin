
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface RequestStatusBadgeProps {
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
  className?: string;
}

const RequestStatusBadge: React.FC<RequestStatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-rbi-success/20 text-rbi-success border-rbi-success/30';
      case 'PENDING':
        return 'bg-rbi-pending/20 text-rbi-pending border-rbi-pending/30';
      case 'REJECTED':
        return 'bg-rbi-danger/20 text-rbi-danger border-rbi-danger/30';
      default:
        return '';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'VERIFIED':
        return 'VERIFIED';
      case 'PENDING':
        return 'PENDING';
      case 'REJECTED':
        return 'REJECTED';
      default:
        return '';
    }
  };

  return (
    <Badge variant="outline" className={cn(getStatusStyles(), className)}>
      {getStatusText()}
    </Badge>
  );
};

export default RequestStatusBadge;
