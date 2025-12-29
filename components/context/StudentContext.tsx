import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useColorScheme } from 'nativewind';

type StudentThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
};

const StudentThemeContext = createContext<StudentThemeContextType | undefined>(undefined);

export function StudentThemeProvider({ children }: { children: ReactNode }) {
    const { setColorScheme } = useColorScheme();
    const [isDark, setIsDark] = useState(false); // Default to light for student initially

    // On mount, enforce student preference (default light) to ensure isolation from Faculty settings
    useEffect(() => {
        setColorScheme(isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    return (
        <StudentThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </StudentThemeContext.Provider>
    );
}

export function useStudentTheme() {
    const context = useContext(StudentThemeContext);
    if (context === undefined) {
        throw new Error('useStudentTheme must be used within a StudentThemeProvider');
    }
    return context;
}
