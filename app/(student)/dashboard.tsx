import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Clock, MapPin, Check, X, PieChart } from 'lucide-react-native';
import { useStudentTheme } from '../../components/context/StudentContext';

export default function StudentDashboard() {
    const { isDark } = useStudentTheme();

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <ScrollView className="px-5 pt-4" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' }} // Alex Johnson avatar
                            className="w-12 h-12 rounded-full mr-3 border-2 border-white dark:border-gray-700"
                        />
                        <View>
                            <Text className="text-gray-500 dark:text-gray-400 text-xs font-medium">Good Morning,</Text>
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">Alex Johnson</Text>
                        </View>
                    </View>
                    <TouchableOpacity className="bg-white dark:bg-gray-800 p-2.5 rounded-full shadow-sm">
                        <Bell size={22} color={isDark ? "#E5E7EB" : "#1F2937"} />
                        <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800" />
                    </TouchableOpacity>
                </View>

                {/* Overall Attendance Card */}
                <View className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm mb-6">
                    <View className="flex-row justify-between items-start mb-2">
                        <View>
                            <Text className="text-gray-500 dark:text-gray-400 font-medium mb-1">Overall Attendance</Text>
                            <View className="flex-row items-center">
                                <Text className="text-5xl font-bold text-blue-600 dark:text-blue-400 mr-3">85%</Text>
                                <View className="bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-md">
                                    <Text className="text-green-700 dark:text-green-400 font-bold text-xs">↗ 2%</Text>
                                </View>
                            </View>
                        </View>
                        <View className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 items-center justify-center">
                            <PieChart size={24} color={isDark ? "#60A5FA" : "#2563EB"} />
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold">Attendance Goal</Text>
                        <Text className="text-gray-900 dark:text-white text-xs font-bold">Target: 75%</Text>
                    </View>
                    <View className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full mb-3 overflow-hidden">
                        <View className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" style={{ width: '85%' }} />
                    </View>
                    <Text className="text-gray-400 dark:text-gray-500 text-xs">You are doing great! Keep it up to maintain your eligibility.</Text>
                </View>

                {/* Up Next */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">Up Next</Text>
                    <TouchableOpacity>
                        <Text className="text-blue-600 dark:text-blue-400 font-bold text-sm">View Full Schedule</Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm mb-8 flex-row justify-between overflow-hidden">
                    <View className="flex-1 pr-4">
                        <View className="bg-blue-50 dark:bg-blue-900/30 self-start px-2 py-1 rounded text-xs mb-3">
                            <Text className="text-blue-600 dark:text-blue-400 font-bold text-[10px] uppercase tracking-wide">ONGOING</Text>
                        </View>
                        <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight">Computer Science 101</Text>
                        <View className="mb-4 space-y-2">
                            <View className="flex-row items-center">
                                <Clock size={14} color="#9CA3AF" />
                                <Text className="text-gray-500 dark:text-gray-400 text-xs font-medium ml-2">10:00 AM - 11:30 AM</Text>
                            </View>
                            <View className="flex-row items-center">
                                <MapPin size={14} color="#9CA3AF" />
                                <Text className="text-gray-500 dark:text-gray-400 text-xs font-medium ml-2">Room 3B</Text>
                            </View>
                        </View>
                        <TouchableOpacity className="bg-blue-600 dark:bg-blue-500 py-3 rounded-xl items-center shadow-blue-200 dark:shadow-none shadow-md">
                            <Text className="text-white font-bold">Check In</Text>
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&q=80' }} // Coding image
                        className="w-24 rounded-xl h-full bg-gray-200 dark:bg-gray-700"
                        resizeMode="cover"
                    />
                </View>

                {/* Recent Activity */}
                <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</Text>

                <View className="mb-8 space-y-4">
                    {/* Item 1 */}
                    <View className="flex-row items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                        <View className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-4">
                            <Check size={18} color={isDark ? "#4ADE80" : "#16A34A"} strokeWidth={3} />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900 dark:text-white text-base">Linear Algebra</Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-xs">Today, 09:00 AM</Text>
                        </View>
                        <View className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                            <Text className="text-green-700 dark:text-green-400 font-bold text-xs">Present</Text>
                        </View>
                    </View>

                    {/* Item 2 */}
                    <View className="flex-row items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                        <View className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mr-4">
                            <X size={18} color={isDark ? "#EF4444" : "#DC2626"} strokeWidth={3} />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900 dark:text-white text-base">History of Art</Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-xs">Yesterday, 02:00 PM</Text>
                        </View>
                        <View className="bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                            <Text className="text-red-700 dark:text-red-400 font-bold text-xs">Absent</Text>
                        </View>
                    </View>

                    {/* Item 3 */}
                    <View className="flex-row items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                        <View className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-4">
                            <Check size={18} color={isDark ? "#4ADE80" : "#16A34A"} strokeWidth={3} />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-gray-900 dark:text-white text-base">Physics Lab</Text>
                            <Text className="text-gray-500 dark:text-gray-400 text-xs">Mon, 11:00 AM</Text>
                        </View>
                        <View className="bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                            <Text className="text-green-700 dark:text-green-400 font-bold text-xs">Present</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
