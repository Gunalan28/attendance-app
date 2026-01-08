import { View, Text, FlatList, TouchableOpacity, ScrollView, Image, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoreVertical, Search, ChevronRight, SlidersHorizontal } from 'lucide-react-native';
import { useState, useEffect, useCallback } from 'react';
import Input from '../../../components/common/Input';
import { useFacultyTheme } from '../../../components/context/FacultyContext';
import { useAuth } from '../../../components/context/AuthContext';
import { api } from '../../../services/api';

const DEMO_FACULTY_ID = 2;

export default function StudentList() {
    const router = useRouter();
    const { isDark } = useFacultyTheme();
    const { user } = useAuth();
    const facultyId = user?.id || DEMO_FACULTY_ID;

    const [students, setStudents] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    const loadStudents = async () => {
        try {
            const data = await api.getAllFacultyStudents(facultyId);
            // Process data to match UI needs (calculate percentage)
            const processed = data.map((s: any) => {
                const percentage = s.total_attendance > 0 ? Math.round((s.present_count / s.total_attendance) * 100) : 0;
                return {
                    ...s,
                    attendance: percentage,
                    initials: s.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
                    // Mock online status/last seen as backend doesn't track live socket status yet
                    status: Math.random() > 0.5 ? 'online' : 'offline',
                    lastSeen: 'Recently',
                    warning: percentage < 75
                };
            });
            setStudents(processed);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadStudents().finally(() => setRefreshing(false));
    }, [facultyId]);

    useEffect(() => {
        loadStudents();
    }, [facultyId]);

    const filteredStudents = students.filter((s: any) => {
        return s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <View className={`px-5 py-4 flex-row justify-between items-center border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="mr-4">
                        <ArrowLeft size={24} color={isDark ? "white" : "black"} />
                    </TouchableOpacity>
                    <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Student List</Text>
                </View>
                <TouchableOpacity className={`p-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <MoreVertical size={20} color={isDark ? "white" : "black"} />
                </TouchableOpacity>
            </View>

            <View className="flex-1 px-5 pt-4">
                {/* Search Bar */}
                <View className="mb-6">
                    <Input
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholder="Search students..."
                        leftIcon={<Search size={20} color="#9CA3AF" />}
                        className={isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white'}
                        placeholderTextColor={isDark ? '#9CA3AF' : undefined}
                        isDark={isDark}
                    />
                </View>

                {/* List Header */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>All Students ({filteredStudents.length})</Text>
                    <TouchableOpacity className="flex-row items-center">
                        <SlidersHorizontal size={14} color="#3B82F6" />
                        <Text className="text-blue-600 font-bold text-xs ml-1">Sort by Name</Text>
                    </TouchableOpacity>
                </View>

                {/* Student Cards */}
                <FlatList
                    data={filteredStudents}
                    keyExtractor={item => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={
                        <View className="items-center py-10">
                            <Text className={`text-gray-400 ${isDark ? 'dark:text-gray-500' : ''}`}>No students found.</Text>
                        </View>
                    }
                    renderItem={({ item }) => (
                        <View className={`rounded-2xl p-4 mb-4 shadow-sm border ${item.warning ? 'border-yellow-200' : (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}`}>
                            <TouchableOpacity onPress={() => router.push(`/(faculty)/students/${item.id}`)} activeOpacity={0.7}>
                                {/* Top Section: Avatar & Info */}
                                <View className="flex-row items-center mb-4">
                                    <View className="mr-4 relative">
                                        {item.profile_image ? (
                                            <Image source={{ uri: item.profile_image }} className="w-12 h-12 rounded-full" />
                                        ) : (
                                            <View className={`w-12 h-12 rounded-full items-center justify-center bg-blue-100`}>
                                                <Text className={`font-bold text-lg text-blue-600`}>{item.initials}</Text>
                                            </View>
                                        )}
                                        {item.status === 'online' && (
                                            <View className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'}`} />
                                        )}
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row justify-between items-center">
                                            <View>
                                                <Text className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</Text>
                                                <Text className="text-gray-500 text-xs mt-0.5">{item.email}</Text>
                                            </View>
                                            <ChevronRight size={20} color="#D1D5DB" />
                                        </View>
                                    </View>
                                    {item.warning && (
                                        <View className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full" />
                                    )}
                                </View>

                                <View className={`h-[1px] mb-4 w-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />

                                {/* Bottom Section: Attendance */}
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center flex-1 mr-4">
                                        <Text className="text-gray-500 text-xs font-bold mr-2 w-20">Attendance:</Text>
                                        <View className={`flex-1 h-1.5 rounded-full overflow-hidden mr-3 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                            <View
                                                className={`h-full rounded-full ${item.warning ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                style={{ width: `${item.attendance}%` }}
                                            />
                                        </View>
                                        <Text className={`font-bold text-xs ${item.warning ? 'text-yellow-600' : 'text-green-600'}`}>{item.attendance}%</Text>
                                    </View>

                                    {item.warning ? (
                                        <View className="bg-yellow-50 px-2 py-1 rounded border border-yellow-100">
                                            <Text className="text-[10px] font-bold text-yellow-700">Low Attendance</Text>
                                        </View>
                                    ) : (
                                        <Text className="text-gray-400 text-[10px] font-medium">Last seen: {item.lastSeen}</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}
