import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Filter, CheckCircle, XCircle, Clock } from 'lucide-react-native';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useStudentTheme } from '../../components/context/StudentContext';
import { useAuth } from '../../components/context/AuthContext';
import { api } from '../../services/api';

const DEMO_STUDENT_ID = 3;

export default function StudentHistory() {
    const { isDark } = useStudentTheme();
    const { user } = useAuth();
    const studentId = user?.id || DEMO_STUDENT_ID;

    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadHistory = async () => {
        try {
            const data = await api.getStudentHistory(studentId);
            setAttendanceHistory(data);
        } catch (error) {
            console.error(error);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadHistory().finally(() => setRefreshing(false));
    }, [studentId]);

    useEffect(() => {
        loadHistory();
    }, [studentId]);

    // Calculate dynamic stats
    const stats = useMemo(() => {
        let present = 0, absent = 0, late = 0;
        attendanceHistory.forEach(record => {
            if (record.status === 'Present') present++;
            else if (record.status === 'Absent') absent++;
            else if (record.status === 'Late') late++;
        });
        const total = attendanceHistory.length;
        const rate = total > 0 ? Math.round((present / total) * 100) : 0;
        return [
            { label: 'Present', value: present, color: '#16A34A', bg: 'bg-green-100', darkBg: 'bg-green-900/30', darkText: '#4ADE80' },
            { label: 'Absent', value: absent, color: '#DC2626', bg: 'bg-red-100', darkBg: 'bg-red-900/30', darkText: '#F87171' },
            { label: 'Late', value: late, color: '#D97706', bg: 'bg-orange-100', darkBg: 'bg-orange-900/30', darkText: '#FBBF24' },
            { label: 'Rate', value: `${rate}%`, color: '#2563EB', bg: 'bg-blue-100', darkBg: 'bg-blue-900/30', darkText: '#60A5FA' },
        ];
    }, [attendanceHistory]);


    const getStatusInfo = (status) => {
        switch (status) {
            case 'Present': return { icon: CheckCircle, color: '#16A34A', bg: 'bg-green-50', text: 'text-green-700', darkColor: '#4ADE80', darkBg: 'bg-green-900/20', darkText: 'text-green-400' };
            case 'Absent': return { icon: XCircle, color: '#DC2626', bg: 'bg-red-50', text: 'text-red-700', darkColor: '#F87171', darkBg: 'bg-red-900/20', darkText: 'text-red-400' };
            case 'Late': return { icon: Clock, color: '#D97706', bg: 'bg-orange-50', text: 'text-orange-700', darkColor: '#FBBF24', darkBg: 'bg-orange-900/20', darkText: 'text-orange-400' };
            default: return { icon: CheckCircle, color: '#9CA3AF', bg: 'bg-gray-50', text: 'text-gray-700', darkColor: '#D1D5DB', darkBg: 'bg-gray-800', darkText: 'text-gray-400' };
        }
    };

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <View className={`px-5 py-4 flex-row justify-between items-center ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Attendance History</Text>
                <TouchableOpacity className={`p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <Filter size={20} color={isDark ? "#E5E7EB" : "#374151"} />
                </TouchableOpacity>
            </View>

            <ScrollView
                className="flex-1 px-5 pt-6"
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {/* Stats Cards */}
                <View className="flex-row justify-between mb-8 flex-wrap gap-y-3">
                    {stats.map((stat, index) => (
                        <View key={index} className={`w-[48%] p-4 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                            <View className={`w-8 h-8 rounded-lg items-center justify-center mb-3 ${isDark ? stat.darkBg : stat.bg}`}>
                                <Text className="font-bold text-xs" style={{ color: isDark ? stat.darkText : stat.color }}>
                                    {String(stat.label).charAt(0)}
                                </Text>
                            </View>
                            <Text className={`text-2xl font-bold mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</Text>
                            <Text className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* List Header */}
                <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Records</Text>

                {/* History List */}
                <View className="pb-8">
                    {attendanceHistory.length === 0 ? (
                        <View className="items-center py-10">
                            <Text className={`text-gray-400 ${isDark ? 'dark:text-gray-500' : ''}`}>No records found.</Text>
                        </View>
                    ) : (
                        attendanceHistory.map((item, index) => {
                            const statusInfo = getStatusInfo(item.status);
                            const StatusIcon = statusInfo.icon;
                            const dateObj = new Date(item.date);

                            return (
                                <View key={index} className={`flex-row items-center p-4 rounded-2xl mb-3 shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                                    <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                                        <Text className={`text-center font-bold text-xs ${isDark ? 'text-gray-300' : 'text-blue-600'}`}>
                                            {dateObj.getDate()}
                                        </Text>
                                        <Text className={`text-[10px] uppercase font-bold ${isDark ? 'text-gray-500' : 'text-blue-400'}`}>
                                            {dateObj.toLocaleDateString(undefined, { month: 'short' })}
                                        </Text>
                                    </View>

                                    <View className="flex-1">
                                        <Text className={`font-bold text-base mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.course_name}</Text>
                                        <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.code}</Text>
                                    </View>

                                    <View className={`px-3 py-1.5 rounded-xl flex-row items-center ${isDark ? statusInfo.darkBg : statusInfo.bg}`}>
                                        <StatusIcon size={12} color={isDark ? statusInfo.darkColor : statusInfo.color} strokeWidth={3} />
                                        <Text className={`font-bold text-xs ml-1.5 ${isDark ? statusInfo.darkText : statusInfo.text}`}>
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
