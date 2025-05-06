
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

// Define mock session and user types to match what we had before
interface MockSession {
  user: {
    id: string;
    user_metadata: {
      full_name: string;
      avatar_url: string;
    };
    email: string;
  }
}

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  role: string | null;
  avatar_url?: string | null;
}

interface AuthContextType {
  user: UserProfile | null;
  session: MockSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock storage keys
const USER_STORAGE_KEY = 'dummy_auth_user';
const SESSION_STORAGE_KEY = 'dummy_auth_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<MockSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const loadAuthState = () => {
      try {
        setIsLoading(true);
        
        // Get stored values
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);
        
        if (storedUser && storedSession) {
          setUser(JSON.parse(storedUser));
          setSession(JSON.parse(storedSession));
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  // Mock Google login function
  const login = async () => {
    try {
      setIsLoading(true);
      
      // Simulate a network request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create dummy session and user
      const mockUserId = 'user_' + Math.random().toString(36).substring(2, 15);
      const mockSession: MockSession = {
        user: {
          id: mockUserId,
          user_metadata: {
            full_name: 'Admin User',
            avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + mockUserId
          },
          email: 'admin@example.com'
        }
      };
      
      const mockUser: UserProfile = {
        id: mockUserId,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + mockUserId
      };
      
      // Store in localStorage
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(mockSession));
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      
      // Update state
      setSession(mockSession);
      setUser(mockUser);
      
      toast.success("Successfully logged in as Admin");
      navigate('/');
    } catch (error) {
      console.error('Error logging in with dummy Google:', error);
      toast.error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Simulate a network request delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear localStorage
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(SESSION_STORAGE_KEY);
      
      // Clear state
      setUser(null);
      setSession(null);
      
      toast.success("Successfully logged out");
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error("Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user && user.role === 'admin',
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
