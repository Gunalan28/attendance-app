import { View, Text, ScrollView, Image, TouchableOpacity, RefreshControl, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, TrendingUp, Clock, MapPin, ChevronRight, AlertCircle, FileText, Activity } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback, useEffect } from 'react';
import { useStudentTheme } from '../../components/context/StudentContext';
import { useAuth } from '../../components/context/AuthContext';
import { api } from '../../services/api';

const { width } = Dimensions.get('window');

// Fallback ID for dev if context is lost on reload (Alex Johnson)
const DEMO_STUDENT_ID = 3;

export default function StudentDashboard() {
    const router = useRouter();
    const { isDark } = useStudentTheme();
    const { user } = useAuth();

    // Safety check - use signed-in ID or fallback
    const studentId = user?.id || DEMO_STUDENT_ID;

    const [refreshing, setRefreshing] = useState(false);
    const [stats, setStats] = useState({ present_count: 0, absent_count: 0, late_count: 0, total_classes: 0, percentage: 0 });
    const [upcoming, setUpcoming] = useState([]);
    const [loading, setLoading] = useState(true);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData().finally(() => setRefreshing(false));
    }, [studentId]);

    const loadData = async () => {
        try {
            const [statsData, upcomingData] = await Promise.all([
                api.getStudentStats(studentId),
                api.getStudentUpcoming(studentId)
            ]);
            setStats(statsData);
            setUpcoming(upcomingData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [studentId]);

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {/* Header */}
                <View className={`px-5 py-4 flex-row justify-between items-center ${isDark ? 'bg-gray-800' : 'bg-white'} mb-2`}>
                    <View className="flex-row items-center space-x-3">
                        <View className="relative">
                            <Image
                                source={{ uri: user?.profile_image || 'https://avatar.iran.liara.run/public/34' }}
                                className="w-12 h-12 rounded-full border-2 border-blue-500"
                            />
                            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </View>
                        <View>
                            <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Welcome back,</Text>
                            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'Student'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <Bell size={24} color={isDark ? '#E5E7EB' : '#374151'} />
                        <View className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                    </TouchableOpacity>
                </View>

                {/* Overall Attendance Card */}
                <View className="px-5 mb-6">
                    <View className="bg-blue-600 rounded-3xl p-6 shadow-lg shadow-blue-200">
                        <View className="flex-row justify-between items-start mb-4">
                            <View>
                                <Text className="text-blue-100 font-medium mb-1">Overall Attendance</Text>
                                <Text className="text-4xl font-bold text-white">{stats.percentage}%</Text>
                            </View>
                            <View className="bg-white/20 p-2 rounded-lg">
                                <TrendingUp size={24} color="white" />
                            </View>
                        </View>
                        <View className="flex-row space-x-4">
                            <View className="bg-white/10 px-3 py-2 rounded-xl flex-1">
                                <Text className="text-blue-50 text-xs mb-1">Present</Text>
                                <Text className="text-white font-bold text-lg">{stats.present_count}</Text>
                            </View>
                            <View className="bg-white/10 px-3 py-2 rounded-xl flex-1">
                                <Text className="text-blue-50 text-xs mb-1">Absent</Text>
                                <Text className="text-white font-bold text-lg">{stats.absent_count}</Text>
                            </View>
                            <View className="bg-white/10 px-3 py-2 rounded-xl flex-1">
                                <Text className="text-blue-50 text-xs mb-1">Total</Text>
                                <Text className="text-white font-bold text-lg">{stats.total_classes}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Up Next Section */}
                <View className="px-5 mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Up Next</Text>
                        <TouchableOpacity
                            onPress={() => router.push('/(student)/timetable')}
                            className="flex-row items-center"
                        >
                            <Text className="text-blue-600 font-medium mr-1">See all</Text>
                            <ChevronRight size={16} color="#2563EB" />
                        </TouchableOpacity>
                    </View>

                    {upcoming.length === 0 ? (
                        <View className={`p-6 rounded-2xl items-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                            <Text className={`text-gray-400 ${isDark ? 'dark:text-gray-500' : ''}`}>No more classes today</Text>
                        </View>
                    ) : (
                        <View>
                            {upcoming.map((cls, index) => (
                                <View key={index} className={`p-4 rounded-2xl border mb-3 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                                    <View className="flex-row justify-between items-start mb-3">
                                        <View className="bg-orange-100 px-3 py-1 rounded-lg self-start">
                                            <Text className="text-orange-700 font-bold text-xs">{cls.code}</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Clock size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
                                            <Text className={`text-xs ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {cls.start_time.substring(0, 5)} - {cls.end_time.substring(0, 5)}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                        {cls.course_name}
                                    </Text>
                                    <View className="flex-row items-center justify-between mt-2">
                                        <View className="flex-row items-center">
                                            <MapPin size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
                                            <Text className={`text-xs ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{cls.location}</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            {cls.instructor_image ? (
                                                <Image source={{ uri: cls.instructor_image }} className="w-5 h-5 rounded-full mr-2" />
                                            ) : <View className="w-5 h-5 rounded-full bg-gray-300 mr-2" />}
                                            <Text className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{cls.instructor_name}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
