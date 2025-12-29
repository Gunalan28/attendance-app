import { Tabs } from 'expo-router';
import { useFacultyTheme, FacultyThemeProvider } from '../../components/context/FacultyContext';
import { LayoutGrid, Users, User, Calendar, BarChart } from 'lucide-react-native';

function FacultyTabs() {
    const { isDark } = useFacultyTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                    backgroundColor: isDark ? '#111827' : '#FFFFFF',
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
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="students/index"
                options={{
                    title: 'Students',
                    tabBarIcon: ({ color, size }) => <Users color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="timetable"
                options={{
                    title: 'Time Table',
                    tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    tabBarIcon: ({ color, size }) => <BarChart color={color} size={size} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />
                }}
            />
            <Tabs.Screen name="attendance/[id]" options={{ href: null, tabBarStyle: { display: 'none' } }} />
            <Tabs.Screen name="courses/index" options={{ href: null }} />
            <Tabs.Screen name="courses/[id]" options={{ href: null }} />
            <Tabs.Screen name="students/[id]" options={{ href: null, tabBarStyle: { display: 'none' } }} />
        </Tabs>
    );
}

export default function FacultyLayout() {
    return (
        <FacultyThemeProvider>
            <FacultyTabs />
        </FacultyThemeProvider>
    );
}
