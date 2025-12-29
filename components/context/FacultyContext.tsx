import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme } from 'nativewind';

type FacultyThemeContextType = {
    isDark: boolean;
    toggleTheme: () => void;
};

const FacultyThemeContext = createContext<FacultyThemeContextType | undefined>(undefined);

export function FacultyThemeProvider({ children }: { children: ReactNode }) {
    const { colorScheme, setColorScheme } = useColorScheme();
    const [isDark, setIsDark] = useState(colorScheme === 'dark');

    // Sync state if colorScheme changes externally
    React.useEffect(() => {
        setIsDark(colorScheme === 'dark');
    }, [colorScheme]);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        setColorScheme(newIsDark ? 'dark' : 'light');
    };

    return (
        <FacultyThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </FacultyThemeContext.Provider>
    );
}

export function useFacultyTheme() {
    const context = useContext(FacultyThemeContext);
    if (context === undefined) {
        throw new Error('useFacultyTheme must be used within a FacultyThemeProvider');
    }
    return context;
}
