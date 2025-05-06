
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, BarChart2, Users, FileText, Settings, Bell, ChevronDown, Menu, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from '../theme/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <BarChart2 size={20} /> },
    { name: 'KVC Requests', path: '/kvc-requests', icon: <FileText size={20} /> },
    { name: 'Users', path: '/users', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Sidebar */}
      <div 
        className={`bg-card shadow-md overflow-y-auto transition-all duration-300 ease-in-out
                   ${isSidebarOpen ? 'w-64' : 'w-0 md:w-16'} 
                   fixed md:sticky top-0 bottom-0 left-0 z-40 h-screen`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className={`bg-gradient-header py-4 px-4 ${isSidebarOpen ? 'text-center' : 'items-center justify-center'}`}>
            <h2 className={`text-white font-bold text-xl whitespace-nowrap ${!isSidebarOpen && 'md:hidden'}`}>RBI Admin Portal</h2>
            {!isSidebarOpen && <h2 className="text-white font-bold text-xl hidden md:block">RBI</h2>}
          </div>
          
          {/* Navigation */}
          <nav className="py-6 flex-grow">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors
                              ${location.pathname === item.path
                                ? 'bg-accent text-accent-foreground'
                                : 'text-foreground hover:bg-muted'
                              }
                              ${!isSidebarOpen ? 'justify-center md:justify-center' : 'justify-start'}`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isSidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className={`flex ${isSidebarOpen ? 'items-center justify-between' : 'justify-center'}`}>
              <div className={`flex items-center ${!isSidebarOpen && 'hidden md:hidden'}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{user?.name?.substring(0, 2) || 'AD'}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">{user?.name || 'Admin User'}</p>
                </div>
              </div>
              {isSidebarOpen && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden" 
                  onClick={toggleSidebar}
                >
                  <ChevronDown size={18} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${!isSidebarOpen ? 'md:ml-16' : 'md:ml-0'}`}>
        {/* Top Header */}
        <header className="bg-card shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar} 
                className="mr-4"
              >
                <Menu size={20} />
              </Button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{user?.name?.substring(0, 2) || 'AD'}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user?.name?.split(' ')[0] || 'Admin'}</span>
                    <ChevronDown className="ml-2" size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
