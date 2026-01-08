import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'expo-router';

// Define User Shape based on Backend response
type User = {
    id: number;
    name: string;
    email: string;
    role: 'student' | 'faculty' | 'admin';
    profile_image: string;
} | null;

type AuthContextType = {
    user: User;
    login: (userData: User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const router = useRouter();

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        // Navigate to login
        router.replace('/(auth)/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
