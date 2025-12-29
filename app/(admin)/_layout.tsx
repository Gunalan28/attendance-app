import { Tabs } from 'expo-router';
import { Home, Users, Building, FileBarChart, Settings } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

export default function AdminLayout() {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 70,
                    paddingBottom: 12,
                    paddingTop: 12,
                    backgroundColor: isDark ? '#1F2937' : 'white', // gray-800 vs white
                    borderTopWidth: 0,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                },
                tabBarActiveTintColor: isDark ? '#60A5FA' : '#2563EB', // blue-400 vs blue-600
                tabBarInactiveTintColor: isDark ? '#9CA3AF' : '#9CA3AF', // gray-400
                tabBarLabelStyle: {
                    fontWeight: '600',
                    fontSize: 10,
                }
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={24} strokeWidth={2.5} />
                }}
            />
            <Tabs.Screen
                name="departments"
                options={{
                    title: 'Departments',
                    tabBarIcon: ({ color, size }) => <Building color={color} size={24} strokeWidth={2.5} />
                }}
            />
            <Tabs.Screen
                name="students/index"
                options={{
                    title: 'Students',
                    tabBarIcon: ({ color, size }) => <Users color={color} size={24} strokeWidth={2.5} />
                }}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    tabBarIcon: ({ color, size }) => <FileBarChart color={color} size={24} strokeWidth={2.5} />
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }) => <Settings color={color} size={24} strokeWidth={2.5} />
                }}
            />
            {/* Hidden Screens */}
            <Tabs.Screen name="students/add" options={{ href: null }} />
            <Tabs.Screen name="students/[id]" options={{ href: null }} />
            <Tabs.Screen name="faculty/index" options={{ href: null }} />
        </Tabs>
    );
}
