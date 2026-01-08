import { Tabs, router } from 'expo-router';
import { Home, Users, UserCheck, FileBarChart, Settings } from 'lucide-react-native';
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
                name="students/index"
                listeners={{
                    tabPress: (e) => {
                        // Prevent default action (restoring history)
                        e.preventDefault();
                        // Navigate freshly to the tab route with cleared params
                        router.navigate({ pathname: '/(admin)/students', params: { status: '', year: '', refresh: Date.now().toString() } });
                    },
                }}
                options={{
                    title: 'Students',
                    unmountOnBlur: true,
                    tabBarIcon: ({ color, size }: { color: string, size: number }) => <Users color={color} size={size} strokeWidth={2.5} />
                } as any}
            />
            <Tabs.Screen
                name="faculty/index"
                listeners={{
                    tabPress: (e) => {
                        e.preventDefault();
                        router.navigate({ pathname: '/(admin)/faculty', params: { status: '', refresh: Date.now().toString() } });
                    },
                }}
                options={{
                    title: 'Faculty',
                    unmountOnBlur: true,
                    tabBarIcon: ({ color, size }: { color: string, size: number }) => <UserCheck color={color} size={size} strokeWidth={2.5} />
                } as any}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    tabBarIcon: ({ color, size }: { color: string, size: number }) => <FileBarChart color={color} size={size} strokeWidth={2.5} />
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, size }: { color: string, size: number }) => <Settings color={color} size={size} strokeWidth={2.5} />
                }}
            />
            {/* Hidden Screens */}
            <Tabs.Screen name="students/add" options={{ href: null, title: 'Add Student' }} />
            <Tabs.Screen name="students/[id]" options={{ href: null }} />
            <Tabs.Screen name="faculty/add" options={{ href: null, title: 'Add Faculty' }} />
            <Tabs.Screen name="faculty/attendance" options={{ href: null, title: 'Mark Attendance' }} />
            <Tabs.Screen name="departments" options={{ href: null }} />
        </Tabs>
    );
}
