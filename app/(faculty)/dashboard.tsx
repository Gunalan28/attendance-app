import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Calendar, Clock, MapPin, Users, BookOpen, MoreVertical, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useCallback, useEffect } from 'react';
import { useFacultyTheme } from '../../components/context/FacultyContext';
import { useAuth } from '../../components/context/AuthContext';
import { api } from '../../services/api';

const DEMO_FACULTY_ID = 2; // Sarah Wilson

export default function FacultyDashboard() {
    const router = useRouter();
    const { isDark } = useFacultyTheme();
    const { user } = useAuth();
    const facultyId = user?.id || DEMO_FACULTY_ID;

    const [refreshing, setRefreshing] = useState(false);
    const [courses, setCourses] = useState([]);
    const [timetable, setTimetable] = useState([]);

    const loadData = async () => {
        try {
            const [coursesData, timetableData] = await Promise.all([
                api.getFacultyCourses(facultyId),
                api.getFacultyTimetable(facultyId)
            ]);
            setCourses(coursesData);
            setTimetable(timetableData);
        } catch (error) {
            console.error(error);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadData().finally(() => setRefreshing(false));
    }, [facultyId]);

    useEffect(() => {
        loadData();
    }, [facultyId]);

    // Derived stats
    const totalStudents = 120; // Hardcoded or needs aggregation from course details which requires filtering
    // Let's just say we don't have total students API yet, but Courses count we have.

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {/* Header */}
                <View className={`px-5 py-4 flex-row justify-between items-center ${isDark ? 'bg-gray-800' : 'bg-white'} mb-6 shadow-sm`}>
                    <View className="flex-row items-center">
                        <Image
                            source={{ uri: user?.profile_image || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' }}
                            className="w-12 h-12 rounded-full border-2 border-purple-500 mr-3"
                        />
                        <View>
                            <Text className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Welcome back,</Text>
                            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{user?.name || 'Dr. Sarah Wilson'}</Text>
                        </View>
                    </View>
                    <TouchableOpacity className={`p-2.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <Bell size={22} color={isDark ? '#E5E7EB' : '#374151'} />
                        <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                    </TouchableOpacity>
                </View>

                {/* Quick Stats */}
                <View className="px-5 flex-row justify-between mb-8 space-x-3">
                    <View className={`flex-1 p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} shadow-sm`}>
                        <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mb-3">
                            <BookOpen size={20} color="#9333EA" />
                        </View>
                        <Text className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{courses.length}</Text>
                        <Text className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active Courses</Text>
                    </View>
                    <View className={`flex-1 p-4 rounded-2xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} shadow-sm`}>
                        <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mb-3">
                            <Users size={20} color="#2563EB" />
                        </View>
                        <Text className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>--</Text>
                        <Text className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Students</Text>
                    </View>
                </View>

                {/* Today's Schedule */}
                <View className="px-5 mb-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Today's Schedule</Text>
                        <TouchableOpacity onPress={() => router.push('/(faculty)/timetable')}>
                            <Text className="text-purple-600 font-bold text-sm">See All</Text>
                        </TouchableOpacity>
                    </View>

                    {timetable.length === 0 ? (
                        <View className={`p-8 rounded-2xl items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                            <Text className={`text-gray-400 ${isDark ? 'dark:text-gray-500' : ''}`}>No classes today</Text>
                        </View>
                    ) : (
                        timetable.slice(0, 3).map((cls, index) => (
                            <View key={index} className="flex-row mb-4">
                                <View className="w-14 pt-2 items-center mr-3">
                                    <Text className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{cls.start_time.substring(0, 5)}</Text>
                                    <Text className={`text-gray-400 text-xs`}>{cls.end_time.substring(0, 5)}</Text>
                                    <View className={`w-0.5 flex-1 mt-2 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => router.push(`/(faculty)/attendance/${cls.course_id}`)}
                                    className={`flex-1 p-4 rounded-2xl border-l-4 border-l-purple-500 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
                                >
                                    <Text className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{cls.course_name}</Text>
                                    <View className="flex-row items-center mb-3">
                                        <MapPin size={14} color="#9CA3AF" />
                                        <Text className={`text-xs ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{cls.location}</Text>
                                    </View>
                                    <View className="flex-row items-center justify-between">
                                        <View className={`bg-purple-100 px-2 py-1 rounded text-xs ${isDark ? 'bg-purple-900/30' : ''}`}>
                                            <Text className={`text-purple-700 font-bold text-[10px] ${isDark ? 'text-purple-400' : ''}`}>{cls.code}</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <TouchableOpacity className="bg-purple-600 px-3 py-1.5 rounded-lg ml-2">
                                                <Text className="text-white text-xs font-bold">Mark Attendance</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
