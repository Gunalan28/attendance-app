import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, XCircle, Clock, Filter } from 'lucide-react-native';
import { useStudentTheme } from '../../components/context/StudentContext';

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const calendarDays = [
    { day: 1, type: 'inactive' }, { day: 2, type: 'inactive' }, { day: 1, type: 'present' }, { day: 2, type: 'present' }, { day: 3, type: 'present' }, { day: 4, type: 'absent' }, { day: 5, type: 'present' },
    { day: 6, type: 'present' }, { day: 7, type: 'holiday' }, { day: 8, type: 'present' }, { day: 9, type: 'present' }, { day: 10, type: 'late' }, { day: 11, type: 'present' }, { day: 12, type: 'present' },
    { day: 13, type: 'holiday' }, { day: 14, type: 'present' }, { day: 15, type: 'present' }, { day: 16, type: 'absent' }, { day: 17, type: 'present' }, { day: 18, type: 'present' }, { day: 19, type: 'present' },
    { day: 20, type: 'holiday' }, { day: 21, type: 'present' }, { day: 22, type: 'present' }, { day: 23, type: 'present' }, { day: 24, type: 'absent' }, { day: 25, type: 'present' }, { day: 26, type: 'future' },
    { day: 27, type: 'future' }, { day: 28, type: 'future' }, { day: 29, type: 'future' }, { day: 30, type: 'future' },
];

export default function StudentHistory() {
    const { isDark } = useStudentTheme();

    const stats = useMemo(() => [
        { label: 'Attendance Rate', value: '85%', color: isDark ? '#60A5FA' : '#2563EB', bg: 'bg-blue-50 dark:bg-blue-900/20', icon: CheckCircle2 },
        { label: 'Present', value: '24', color: isDark ? '#4ADE80' : '#16A34A', bg: 'bg-green-50 dark:bg-green-900/20', icon: CheckCircle2 },
        { label: 'Absent', value: '04', color: isDark ? '#EF4444' : '#DC2626', bg: 'bg-red-50 dark:bg-red-900/20', icon: XCircle },
    ], [isDark]);

    const historyData = useMemo(() => [
        { date: 'Today, 25 Sep', subject: 'Linear Algebra', status: 'Present', time: '09:00 AM - 10:30 AM', color: isDark ? '#4ADE80' : '#16A34A', textClass: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
        { date: 'Today, 25 Sep', subject: 'Computer Science', status: 'Present', time: '11:00 AM - 12:30 PM', color: isDark ? '#4ADE80' : '#16A34A', textClass: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
        { date: 'Yesterday, 24 Sep', subject: 'Data Structures', status: 'Absent', time: '02:00 PM - 03:30 PM', color: isDark ? '#EF4444' : '#DC2626', textClass: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' },
        { date: 'Yesterday, 24 Sep', subject: 'Physics Layer', status: 'Present', time: '09:00 AM - 10:30 AM', color: isDark ? '#4ADE80' : '#16A34A', textClass: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' },
        { date: 'Mon, 23 Sep', subject: 'Chemistry', status: 'Late', time: '09:15 AM - 10:30 AM', color: isDark ? '#FB923C' : '#EA580C', textClass: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    ], [isDark]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <View className="px-5 pt-4 pb-2 flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">Attendance</Text>
                <TouchableOpacity className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                    <Filter size={20} color={isDark ? "#E5E7EB" : "#374151"} />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>

                {/* Stats Cards */}
                <View className="flex-row justify-between mb-6">
                    {stats.map((item, index) => (
                        <View key={index} className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex-1 mx-1 items-center">
                            <View className={`p-2 rounded-full mb-2 ${item.bg}`}>
                                <item.icon size={16} color={item.color} />
                            </View>
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</Text>
                            <Text className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 mt-1">{item.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Calendar View */}
                <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">September 2023</Text>
                        <View className="flex-row space-x-2">
                            <TouchableOpacity className="p-1 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <ChevronLeft size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-1 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <ChevronRight size={20} color={isDark ? "#9CA3AF" : "#6B7280"} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row justify-between mb-2">
                        {days.map((day, index) => (
                            <Text key={index} className="w-8 text-center text-xs font-bold text-gray-400 dark:text-gray-500">{day}</Text>
                        ))}
                    </View>
                    <View className="flex-row flex-wrap justify-between">
                        {calendarDays.map((day, index) => (
                            <View key={index} className="w-8 h-8 items-center justify-center mb-1">
                                <View className={`w-7 h-7 rounded-full items-center justify-center 
                                    ${day.type === 'present' ? 'bg-green-100 dark:bg-green-900/30' :
                                        day.type === 'absent' ? 'bg-red-100 dark:bg-red-900/30' :
                                            day.type === 'late' ? 'bg-orange-100 dark:bg-orange-900/30' :
                                                day.type === 'holiday' ? 'bg-gray-100 dark:bg-gray-700' : 'bg-transparent'}`}>
                                    <Text className={`text-xs font-medium 
                                        ${day.type === 'present' ? 'text-green-700 dark:text-green-400' :
                                            day.type === 'absent' ? 'text-red-700 dark:text-red-400' :
                                                day.type === 'late' ? 'text-orange-700 dark:text-orange-400' :
                                                    day.type === 'holiday' ? 'text-gray-500 dark:text-gray-400' :
                                                        day.type === 'inactive' ? 'text-gray-200 dark:text-gray-600' : 'text-gray-900 dark:text-white'}`}>{day.day}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <View className="flex-row justify-center mt-3 space-x-4">
                        <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400 mr-1" /><Text className="text-[10px] text-gray-500 dark:text-gray-400">Present</Text></View>
                        <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400 mr-1" /><Text className="text-[10px] text-gray-500 dark:text-gray-400">Absent</Text></View>
                        <View className="flex-row items-center"><View className="w-2 h-2 rounded-full bg-orange-500 dark:bg-orange-400 mr-1" /><Text className="text-[10px] text-gray-500 dark:text-gray-400">Late</Text></View>
                    </View>
                </View>

                {/* Recent History */}
                <View className="pb-8">
                    <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">Recent History</Text>
                    {historyData.map((item, index) => (
                        <View key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-3 flex-row items-center">
                            <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${item.bgColor}`}>
                                {item.status === 'Present' ? <CheckCircle2 size={20} color={item.color} /> :
                                    item.status === 'Absent' ? <XCircle size={20} color={item.color} /> :
                                        <Clock size={20} color={item.color} />}
                            </View>
                            <View className="flex-1">
                                <View className="flex-row justify-between mb-1">
                                    <Text className="font-bold text-gray-900 dark:text-white">{item.subject}</Text>
                                    <Text className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.bgColor} ${item.textClass}`}>{item.status}</Text>
                                </View>
                                <View className="flex-row justify-between">
                                    <Text className="text-xs text-gray-500 dark:text-gray-400">{item.date}</Text>
                                    <Text className="text-xs text-gray-500 dark:text-gray-400">{item.time}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
