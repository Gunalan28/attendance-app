import { View, Text, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useStudentTheme } from '../../components/context/StudentContext';
import { useAuth } from '../../components/context/AuthContext';
import { api } from '../../services/api';

// Fallback ID
const DEMO_STUDENT_ID = 3;

export default function StudentTimeTable() {
    const { isDark } = useStudentTheme();
    const { user } = useAuth();
    const studentId = user?.id || DEMO_STUDENT_ID;

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [fullTimetable, setFullTimetable] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);

    const loadTimetable = async () => {
        try {
            const data = await api.getStudentTimetable(studentId);
            setFullTimetable(data);
        } catch (error) {
            console.error(error);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadTimetable().finally(() => setRefreshing(false));
    }, [studentId]);

    useEffect(() => {
        loadTimetable();
    }, [studentId]);

    // Generate week dates (Sun-Sat) or dynamic week logic...
    // For simplicity, sticking to previous week logic but purely for display.
    const weekDates = useMemo(() => {
        const dates = [];
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            dates.push(date);
        }
        return dates;
    }, []);

    // Filter classes for selected day
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const todaysClasses = useMemo(() => {
        return fullTimetable.filter(item => item.day_of_week === dayName);
    }, [fullTimetable, dayName]);


    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <View className={`px-5 py-4 ${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Timetable</Text>
                <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{selectedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</Text>
            </View>

            {/* Date Strip */}
            <View className={`py-4 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm mb-1`}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
                    {weekDates.map((date, index) => {
                        const isSelected = date.toDateString() === selectedDate.toDateString();
                        const isToday = date.toDateString() === new Date().toDateString();

                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedDate(date)}
                                className={`items-center justify-center w-14 h-20 rounded-2xl ${isSelected ? 'bg-blue-600 shadow-lg shadow-blue-200' : (isDark ? 'bg-gray-700' : 'bg-white border border-gray-100')}`}
                            >
                                <Text className={`text-xs mb-1 font-medium ${isSelected ? 'text-blue-100' : (isDark ? 'text-gray-400' : 'text-gray-400')}`}>
                                    {date.toLocaleDateString(undefined, { weekday: 'short' })}
                                </Text>
                                <Text className={`text-lg font-bold ${isSelected ? 'text-white' : (isDark ? (isToday ? 'text-blue-400' : 'text-white') : (isToday ? 'text-blue-600' : 'text-gray-900'))}`}>
                                    {date.getDate()}
                                </Text>
                                {isToday && <View className={`w-1 h-1 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-blue-600'}`} />}
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>

            <ScrollView
                ref={scrollViewRef}
                className="flex-1 px-5 pt-4"
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {todaysClasses.length === 0 ? (
                    <View className="items-center justify-center py-20">
                        <Text className={`text-gray-400 ${isDark ? 'dark:text-gray-500' : ''}`}>No classes scheduled for {dayName}</Text>
                    </View>
                ) : (
                    <View className="pb-10 space-y-4">
                        {todaysClasses.map((item, index) => {
                            // Dynamic Color generation/selection can remain if needed, or simplified
                            const cardColors = index % 2 === 0
                                ? { bg: isDark ? 'bg-blue-900/20' : 'bg-blue-50', border: isDark ? 'border-blue-900/50' : 'border-blue-100', text: isDark ? 'text-blue-400' : 'text-blue-700', icon: isDark ? '#60A5FA' : '#2563EB' }
                                : { bg: isDark ? 'bg-purple-900/20' : 'bg-purple-50', border: isDark ? 'border-purple-900/50' : 'border-purple-100', text: isDark ? 'text-purple-400' : 'text-purple-700', icon: isDark ? '#A78BFA' : '#7C3AED' };

                            return (
                                <View key={index} className="flex-row">
                                    <View className="w-16 items-center pt-2 mr-3">
                                        <Text className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.start_time.substring(0, 5)}</Text>
                                        <View className={`w-0.5 flex-1 my-2 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
                                    </View>

                                    <View className={`flex-1 p-5 rounded-2xl border ${cardColors.bg} ${cardColors.border}`}>
                                        <View className="flex-row justify-between mb-2">
                                            <Text className={`text-xs font-bold uppercase tracking-wider ${cardColors.text}`}>{item.code}</Text>
                                            <Clock size={14} color={cardColors.icon} />
                                        </View>
                                        <Text className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.course_name}</Text>
                                        <Text className={`text-xs mb-3 font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>by {item.instructor_name || 'Staff'}</Text>

                                        <View className="flex-row items-center">
                                            <MapPin size={14} color={isDark ? '#9CA3AF' : '#6B7280'} />
                                            <Text className={`text-xs ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.location}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
