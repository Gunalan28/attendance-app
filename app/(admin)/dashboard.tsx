import { View, Text, ScrollView, TouchableOpacity, Image, Platform, Dimensions, RefreshControl, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { Users, BookOpen, UserCheck, TrendingUp, Bell, Calendar, ChevronRight, MoreVertical, Filter } from 'lucide-react-native';
import { useState, useCallback, useEffect } from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

import { useAuth } from '../../components/context/AuthContext';
import { api } from '../../services/api';
import AnimatedAlert from '../../components/common/AnimatedAlert';
import SortModal from '../../components/common/SortModal';
import { EducationLoader } from '../../components/common/EducationLoader';

const { width } = Dimensions.get('window');

// Interface for stats to handle type safety
interface Stats {
    students: { total: number; present: number; absent: number };
    faculty: { total: number; present: number; absent: number };
    courses: number;
    department: string;

}

export default function AdminDashboard() {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            router.replace('/(auth)/login');
        }
    }, [user]);

    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    // Filter State
    const [yearFilter, setYearFilter] = useState<number | null>(null);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    // Default stats state
    const [stats, setStats] = useState<Stats>({
        students: { total: 0, present: 0, absent: 0 },
        faculty: { total: 0, present: 0, absent: 0 },
        courses: 0,
        department: '',

    });
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Alert State
    const [alertConfig, setAlertConfig] = useState<{ visible: boolean; title: string; message: string; type?: 'warning' | 'success' | 'error' }>({
        visible: false,
        title: '',
        message: '',
        type: 'warning'
    });

    const loadStats = async (year: number | null = yearFilter) => {
        try {
            const data = await api.getAdminStats(year);
            setStats(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadStats().finally(() => setRefreshing(false));
    }, [yearFilter]);

    useFocusEffect(
        useCallback(() => {
            loadStats(yearFilter);
        }, [yearFilter])
    );

    const showAlert = (title: string, message: string) => {
        setAlertConfig({ visible: true, title, message });
    };

    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const handleStudentStatPress = (type: 'total' | 'present' | 'absent') => {
        if (type === 'total') {
            router.push({ pathname: '/(admin)/students', params: { status: '', year: yearFilter || '' } });
            return;
        }

        const count = type === 'present' ? stats.students.present : stats.students.absent;
        if (count === 0) {
            showAlert(
                `No Students ${type === 'present' ? 'Present' : 'Absent'}`,
                `There are currently zero students marked as ${type === 'present' ? 'present' : 'absent'} ${yearFilter ? `in ${getOrdinal(yearFilter)} Year` : 'today'}.`
            );
        } else {
            router.push({
                pathname: '/(admin)/students',
                params: {
                    status: type === 'present' ? 'Present' : 'Absent',
                    year: yearFilter || ''
                }
            });
        }
    };

    const handleFacultyStatPress = (type: 'total' | 'present' | 'absent') => {
        if (type === 'total') {
            router.push({ pathname: '/(admin)/faculty', params: { status: '', year: '' } });
            return;
        }

        const count = type === 'present' ? stats.faculty.present : stats.faculty.absent;
        if (count === 0) {
            showAlert(
                `No Faculty ${type === 'present' ? 'Present' : 'Absent'}`,
                `There are currently zero faculty members marked as ${type === 'present' ? 'present' : 'absent'} today.`
            );
        } else {
            router.push({ pathname: '/(admin)/faculty', params: { status: type === 'present' ? 'Present' : 'Absent' } });
        }
    };



    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 justify-center items-center">
                <View className="items-center gap-4">
                    <ActivityIndicator size="large" color="#3B82F6" />
                    <Text className="text-gray-500 font-medium">Loading Dashboard...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <View className="px-5 py-4 flex-row justify-between items-center bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <View className="flex-row items-center">
                    <Image
                        source={{ uri: user?.profile_image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' }}
                        className="w-10 h-10 rounded-full border-2 border-gray-100 dark:border-gray-600 mr-3"
                    />
                    <View>
                        <Text className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Head of Department</Text>
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">{user?.name || 'Admin User'}</Text>
                        {stats.department ? (
                            <Text className="text-xs font-medium text-blue-600 dark:text-blue-400">{stats.department}</Text>
                        ) : null}
                    </View>
                </View>

            </View>

            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View className="p-5 space-y-6">

                    {/* Section 1: Students Overview */}
                    <View className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-gray-900 dark:text-white">Students Overview</Text>
                            <TouchableOpacity
                                onPress={() => setFilterModalVisible(true)}
                                className="flex-row items-center bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full"
                            >
                                <Text className="text-xs font-semibold text-gray-700 dark:text-gray-300 mr-2">
                                    {yearFilter ? `${getOrdinal(yearFilter)} Year` : 'All Years'}
                                </Text>
                                <Filter size={12} color={isDark ? "#D1D5DB" : "#374151"} />
                            </TouchableOpacity>
                        </View>

                        <SortModal
                            visible={filterModalVisible}
                            onClose={() => setFilterModalVisible(false)}
                            title="Filter by Year"
                            options={[
                                { label: 'All Years', value: 'all' },
                                { label: '1st Year', value: '1' },
                                { label: '2nd Year', value: '2' },
                                { label: '3rd Year', value: '3' },
                                { label: '4th Year', value: '4' }
                            ]}
                            selectedOption={yearFilter ? yearFilter.toString() : 'all'}
                            onSelect={(val) => {
                                setYearFilter(val === 'all' ? null : Number(val));
                                setFilterModalVisible(false);
                            }}
                        />

                        {/* Total Students Main Card */}
                        <TouchableOpacity
                            onPress={() => handleStudentStatPress('total')}
                            className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-2xl mb-4 border border-blue-100 dark:border-blue-800 flex-row justify-between items-center"
                        >
                            <View>
                                <Text className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.students.total}</Text>
                                <Text className="text-xs font-medium text-blue-600 dark:text-blue-300">Total Students</Text>
                            </View>
                            <View className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full items-center justify-center">
                                <Users size={20} color="#1E40AF" />
                            </View>
                        </TouchableOpacity>

                        {/* Present / Absent Split */}
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                onPress={() => handleStudentStatPress('present')}
                                className="w-[48%] bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-100 dark:border-green-800"
                            >
                                <Text className="text-xs font-medium text-green-600 dark:text-green-300 mb-1">Present</Text>
                                <Text className="text-xl font-bold text-green-700 dark:text-green-100">{stats.students.present}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleStudentStatPress('absent')}
                                className="w-[48%] bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-800"
                            >
                                <Text className="text-xs font-medium text-red-600 dark:text-red-300 mb-1">Absent</Text>
                                <Text className="text-xl font-bold text-red-700 dark:text-red-100">{stats.students.absent}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Section 2: Faculty Overview */}
                    <View className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm mb-6">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-gray-900 dark:text-white">Faculty Overview</Text>
                            <TouchableOpacity
                                onPress={() => router.push('/(admin)/faculty/attendance')}
                                className="bg-blue-600 px-3 py-1.5 rounded-full flex-row items-center"
                            >
                                <Text className="text-white text-xs font-semibold mr-1">Mark Attendance</Text>
                                <UserCheck size={12} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Total Faculty Main Card */}
                        <TouchableOpacity
                            onPress={() => handleFacultyStatPress('total')}
                            className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-2xl mb-4 border border-purple-100 dark:border-purple-800 flex-row justify-between items-center"
                        >
                            <View>
                                <Text className="text-3xl font-bold text-purple-900 dark:text-purple-100">{stats.faculty.total}</Text>
                                <Text className="text-xs font-medium text-purple-600 dark:text-purple-300">Total Faculty</Text>
                            </View>
                            <View className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full items-center justify-center">
                                <UserCheck size={20} color="#6B21A8" />
                            </View>
                        </TouchableOpacity>

                        {/* Present / Absent Split */}
                        <View className="flex-row justify-between">
                            <TouchableOpacity
                                onPress={() => handleFacultyStatPress('present')}
                                className="w-[48%] bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-100 dark:border-green-800"
                            >
                                <Text className="text-xs font-medium text-green-600 dark:text-green-300 mb-1">Present</Text>
                                <Text className="text-xl font-bold text-green-700 dark:text-green-100">{stats.faculty.present}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleFacultyStatPress('absent')}
                                className="w-[48%] bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-800"
                            >
                                <Text className="text-xs font-medium text-red-600 dark:text-red-300 mb-1">Absent</Text>
                                <Text className="text-xl font-bold text-red-700 dark:text-red-100">{stats.faculty.absent}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                </View>
            </ScrollView>

            <AnimatedAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
            />
            <EducationLoader visible={refreshing} message="Refreshing..." />
        </SafeAreaView>
    );
}
