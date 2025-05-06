
import React, { useState } from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, UserPlus } from 'lucide-react';

// Mock users data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2025-05-02 14:30',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Reviewer',
    status: 'Active',
    lastLogin: '2025-05-01 09:15',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    role: 'Reviewer',
    status: 'Inactive',
    lastLogin: '2025-04-28 16:45',
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.w@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2025-05-02 10:20',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'Viewer',
    status: 'Active',
    lastLogin: '2025-05-01 11:05',
  },
  {
    id: '6',
    name: 'Sarah Davis',
    email: 'sarah.d@example.com',
    role: 'Reviewer',
    status: 'Active',
    lastLogin: '2025-04-30 15:40',
  },
  {
    id: '7',
    name: 'David Miller',
    email: 'david.m@example.com',
    role: 'Viewer',
    status: 'Inactive',
    lastLogin: '2025-04-25 09:30',
  },
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage system users and their permissions</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>A list of all users in the system</CardDescription>
          </div>
          <Button className="bg-rbi-accent hover:bg-rbi-accent/80">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 max-w-sm"
              />
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Email</TableHead>
                  <TableHead className="font-medium">Role</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Last Login</TableHead>
                  <TableHead className="text-right font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'Admin' ? 'secondary' : 'outline'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Active' ? 'default' : 'outline'} className={user.status === 'Active' ? 'bg-rbi-success' : 'text-muted-foreground'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          {user.status === 'Active' ? (
                            <DropdownMenuItem className="text-rbi-danger">Deactivate</DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem className="text-rbi-success">Activate</DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
