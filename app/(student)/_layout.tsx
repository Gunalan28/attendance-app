import { Tabs } from 'expo-router';
import { Home, Layout, History, User } from 'lucide-react-native';
import { StudentThemeProvider, useStudentTheme } from '../../components/context/StudentContext';

function StudentTabs() {
    const { isDark } = useStudentTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
                    borderTopColor: isDark ? '#374151' : '#E5E7EB',
                },
                tabBarActiveTintColor: '#2563EB',
                tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#9CA3AF',
                tabBarLabelStyle: { fontSize: 12, fontWeight: '500', marginBottom: 5 },
                tabBarIconStyle: { marginBottom: -5 }
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="timetable"
                options={{
                    title: 'Time Table',
                    tabBarIcon: ({ color, size }) => <Layout color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color, size }) => <History color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />
                }}
            />
        </Tabs>
    );
}

export default function StudentLayout() {
    return (
        <StudentThemeProvider>
            <StudentTabs />
        </StudentThemeProvider>
    );
}
