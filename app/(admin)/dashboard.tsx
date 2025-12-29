import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Users, Building, Plus, FileText, ArrowUpRight, GraduationCap, ClipboardCheck } from 'lucide-react-native';
import Card from '../../components/common/Card';
import { useRouter } from 'expo-router';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useColorScheme } from 'nativewind';

const { width } = Dimensions.get('window');

export default function AdminDashboard() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row justify-between items-center py-4 mb-2">
                    <View>
                        <Text className="text-blue-600 dark:text-blue-400 font-bold text-[10px] tracking-widest uppercase mb-1">ADMIN PORTAL</Text>
                        <Text className="text-3xl font-extrabold text-gray-900 dark:text-white">Dashboard</Text>
                    </View>
                    <TouchableOpacity className="relative p-2">
                        <Bell size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
                        <View className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-900" />
                    </TouchableOpacity>
                </View>

                {/* Main Stats Card */}
                <TouchableOpacity
                    className="mb-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-[24px] overflow-hidden p-5"
                    onPress={() => router.push('/(admin)/students')}
                >
                    <View className="absolute right-[-20] top-[-20] w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-50" />
                    <View className="flex-row justify-between items-start mb-6">
                        <View className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl items-center justify-center">
                            <GraduationCap size={24} color="#2563EB" />
                        </View>
                        <View className="bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full flex-row items-center border border-green-100 dark:border-green-800">
                            <ArrowUpRight size={14} color="#16A34A" />
                            <Text className="text-green-700 dark:text-green-400 font-bold text-xs ml-1">12%</Text>
                        </View>
                    </View>
                    <Text className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1">Total Students</Text>
                    <Text className="text-4xl font-extrabold text-gray-900 dark:text-white">1,250</Text>
                </TouchableOpacity>

                {/* Secondary Grid */}
                <View className="flex-row gap-4 mb-4">
                    <Card className="flex-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-[24px] p-5 relative overflow-hidden">
                        <View className="absolute right-[-10] top-[-10] w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-full opacity-50" />
                        <View className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-xl items-center justify-center mb-4">
                            <Users size={20} color="#9333EA" />
                        </View>
                        <Text className="text-gray-500 dark:text-gray-400 font-medium text-xs mb-1">Staffs</Text>
                        <Text className="text-2xl font-bold text-gray-900 dark:text-white">85</Text>
                    </Card>
                    <TouchableOpacity
                        className="flex-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-[24px] p-5 relative overflow-hidden"
                        onPress={() => router.push('/(admin)/departments')}
                    >
                        <View className="absolute right-[-10] top-[-10] w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-full opacity-50" />
                        <View className="w-10 h-10 bg-orange-50 dark:bg-orange-900/30 rounded-xl items-center justify-center mb-4">
                            <Building size={20} color="#EA580C" />
                        </View>
                        <Text className="text-gray-500 dark:text-gray-400 font-medium text-xs mb-1">Departments</Text>
                        <Text className="text-2xl font-bold text-gray-900 dark:text-white">15</Text>
                    </TouchableOpacity>
                </View>

                {/* Status Card */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-[24px] p-5 mb-8 relative overflow-hidden">
                    <View className="absolute right-[-20] top-[-20] w-32 h-32 bg-teal-50 dark:bg-teal-900/20 rounded-full opacity-50" />
                    <View className="flex-row justify-between items-start mb-2">
                        <View className="w-12 h-12 bg-teal-50 dark:bg-teal-900/30 rounded-2xl items-center justify-center mb-4">
                            <ClipboardCheck size={24} color="#0D9488" />
                        </View>
                        <View className="bg-teal-50 dark:bg-teal-900/20 px-2.5 py-1 rounded-full border border-teal-100 dark:border-teal-800">
                            <Text className="text-teal-700 dark:text-teal-400 font-bold text-xs">Today</Text>
                        </View>
                    </View>
                    <Text className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-2">Attendance Status</Text>
                    <View className="flex-row gap-6">
                        <View>
                            <Text className="text-2xl font-extrabold text-gray-900 dark:text-white">1,120</Text>
                            <Text className="text-xs font-bold text-green-600 dark:text-green-400">Present</Text>
                        </View>
                        <View>
                            <Text className="text-2xl font-extrabold text-gray-900 dark:text-white">130</Text>
                            <Text className="text-xs font-bold text-red-500 dark:text-red-400">Absent</Text>
                        </View>
                    </View>
                </Card>

                {/* Quick Actions */}
                <Text className="text-gray-400 dark:text-gray-500 font-bold text-xs mb-4 tracking-widest uppercase ml-1">QUICK ACTIONS</Text>
                <View className="flex-row gap-4 mb-8">
                    <TouchableOpacity
                        className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-700 items-start"
                        onPress={() => router.push('/(admin)/students/add')}
                    >
                        <View className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center mb-3">
                            <Plus size={20} color="white" />
                        </View>
                        <Text className="font-bold text-gray-900 dark:text-white text-base">Add Student</Text>
                        <Text className="text-gray-400 dark:text-gray-500 text-xs mt-1">Update roster</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-700 items-start">
                        <View className="w-10 h-10 bg-gray-900 dark:bg-gray-700 rounded-full items-center justify-center mb-3">
                            <FileText size={20} color="white" />
                        </View>
                        <Text className="font-bold text-gray-900 dark:text-white text-base">Edit Curriculum</Text>
                        <Text className="text-gray-400 dark:text-gray-500 text-xs mt-1">Manage courses</Text>
                    </TouchableOpacity>
                </View>

                {/* Attendance Chart Card */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-[24px] p-5 mb-8">
                    <View className="flex-row justify-between items-start mb-6">
                        <View>
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">Attendance</Text>
                            <Text className="text-gray-400 dark:text-gray-500 text-xs mt-1">Weekly Overview</Text>
                        </View>
                        <TouchableOpacity
                            className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full flex-row items-center border border-blue-100 dark:border-blue-800"
                            onPress={() => router.push('/(admin)/reports')}
                        >
                            <Text className="text-blue-600 dark:text-blue-400 text-[10px] font-bold mr-1">Full Report</Text>
                            <ArrowUpRight size={10} color="#2563EB" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center mb-6">
                        <Text className="text-4xl font-extrabold text-gray-900 dark:text-white">95%</Text>
                        <View className="ml-3 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full flex-row items-center border border-green-100 dark:border-green-800">
                            <ArrowUpRight size={14} color="#16A34A" />
                            <Text className="text-green-700 dark:text-green-400 font-bold text-xs ml-1">2.5%</Text>
                        </View>
                    </View>

                    {/* SVG Chart */}
                    <View className="h-32 w-full mb-4">
                        <Svg height="100%" width="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <Defs>
                                <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                                    <Stop offset="0" stopColor={isDark ? "#3B82F6" : "#111827"} stopOpacity="1" />
                                    <Stop offset="0.5" stopColor={isDark ? "#3B82F6" : "#111827"} stopOpacity="0.8" />
                                    <Stop offset="1" stopColor={isDark ? "#3B82F6" : "#111827"} stopOpacity="0" />
                                </LinearGradient>
                            </Defs>
                            {/* Smooth Layout (Mocked Path) */}
                            <Path
                                d="M0,25 C10,20 20,40 30,15 C40,5 50,30 60,20 C70,10 80,35 90,5 L100,10 L100,40 L0,40 Z"
                                fill="url(#grad)"
                            />
                            <Path
                                d="M0,25 C10,20 20,40 30,15 C40,5 50,30 60,20 C70,10 80,35 90,5 L100,10"
                                stroke="#3B82F6"
                                strokeWidth="0.5"
                                fill="none"
                            />
                        </Svg>
                    </View>

                    <View className="flex-row justify-between px-2">
                        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => (
                            <Text key={day} className="text-[10px] font-bold text-gray-300 dark:text-gray-600">
                                {day}
                            </Text>
                        ))}
                    </View>
                </Card>

                <View className="h-20" />
            </ScrollView>
        </SafeAreaView>
    );
}
