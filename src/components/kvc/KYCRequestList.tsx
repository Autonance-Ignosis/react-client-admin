import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Filter, Search, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import RequestStatusBadge from "./RequestStatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface IKVCRequest {
  id: string;
  userId: string;
  panNumber: string;
  aadhaarNumber: string;
  panFileUrl: string;
  aadhaarFileUrl: string;
  remarks: string;
  status: "VERIFIED" | "PENDING" | "REJECTED";
}

interface KVCRequestListProps {
  requests: IKVCRequest[];
}

const KVCRequestList: React.FC<KVCRequestListProps> = ({ requests }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStatus, setFilteredStatus] = useState<string[]>([]);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.panNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.aadhaarNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.userId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filteredStatus.length === 0 ||
      filteredStatus.includes(request.status.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  const viewRequest = (id: string) => {
    navigate(`/kvc-detail/${id}`);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="font-medium">Request ID</TableHead>
                <TableHead className="font-medium">Remarks</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="text-right font-medium">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.remarks}</TableCell>
                    <TableCell>
                      <RequestStatusBadge status={request.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewRequest(request.userId)}
                      >
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No KVC requests match your filter criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default KVCRequestList;
