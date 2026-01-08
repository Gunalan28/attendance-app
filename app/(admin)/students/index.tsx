import { View, Text, FlatList, TouchableOpacity, ScrollView, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Plus, ArrowLeft, Trash2 } from 'lucide-react-native';
import Input from '../../../components/common/Input';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../services/api';
import SortModal from '../../../components/common/SortModal';
import { EducationLoader } from '../../../components/common/EducationLoader';
import DeleteUserModal from '../../../components/admin/DeleteUserModal';

// Define Interface
interface Student {
    id: string;
    name: string;
    year: number;
    dept: string;
    status: string;
    attendance: number;
}

export default function StudentList() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [students, setStudents] = useState<Student[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<'name' | 'year'>('name');
    const [isSorting, setIsSorting] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [filterStatus, setFilterStatus] = useState<'All' | 'Present' | 'Absent'>('All');
    const [filterYear, setFilterYear] = useState<'All' | '1' | '2' | '3' | '4'>('All');

    const loadStudents = async () => {
        try {
            const data = await api.getAdminStudents();
            setStudents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            console.log('[StudentList] Focused. Params:', JSON.stringify(params));
            loadStudents();
        }, [])
    );

    useEffect(() => {
        // Handle filter status reset
        if (params.status) {
            setFilterStatus(params.status as 'Present' | 'Absent');
        } else {
            setFilterStatus('All');
        }

        // Handle full reset if 'refresh' param changes
        if (params.refresh) {
            console.log('[StudentList] Refresh triggered, resetting all filters/sort');
            setSearchQuery('');
            setFilterStatus('All');
            setFilterYear('All');
        } else if (params.year) {
            setFilterYear(params.year.toString() as '1' | '2' | '3' | '4');
        }
    }, [params.status, params.refresh]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadStudents().finally(() => setRefreshing(false));
    }, []);

    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const handleSort = (type: 'name' | 'year') => {
        setSortModalVisible(false);
        if (sortBy === type) return;

        setIsSorting(true);
        // Simulate loading delay with EducationLoader
        setTimeout(() => {
            setSortBy(type);
            setIsSorting(false);
        }, 500);
    };

    const filteredStudents = students.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.id.includes(searchQuery);

        const matchesStatus = filterStatus === 'All'
            ? true
            : s.status === filterStatus;

        const matchesYear = filterYear === 'All'
            ? true
            : s.year === Number(filterYear);

        return matchesSearch && matchesStatus && matchesYear;
    }).sort((a, b) => {
        if (sortBy === 'year') return a.year - b.year;
        return a.name.localeCompare(b.name);
    });

    // Dynamic Title
    const getPageTitle = () => {
        if (params.status) return `${params.status} Students`;
        if (params.year) return `${getOrdinal(Number(params.year))} Year Students`;
        return 'Student List';
    };

    if (loading) {
        return (
            <View className="flex-1 bg-white dark:bg-gray-900">
                <EducationLoader visible={loading} message="Loading Students..." />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <EducationLoader visible={isSorting || refreshing} message={isSorting ? `Sorting by ${sortBy === 'year' ? 'Year' : 'Name'}...` : "Refreshing..."} />

            <SortModal
                visible={sortModalVisible}
                onClose={() => setSortModalVisible(false)}
                title="Sort Students By"
                options={[
                    { label: 'Name (A-Z)', value: 'name' },
                    { label: 'Year (1-4)', value: 'year' }
                ]}
                selectedOption={sortBy}
                onSelect={(val) => handleSort(val as 'name' | 'year')}
            />

            <View className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center flex-1 mr-4">
                        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                            <ArrowLeft size={24} color={isDark ? "white" : "#111827"} />
                        </TouchableOpacity>
                        <Text className="text-2xl font-bold text-gray-900 dark:text-white ml-2 flex-1" numberOfLines={1}>{getPageTitle()}</Text>
                    </View>
                    <View className="flex-row gap-2">
                        <TouchableOpacity
                            onPress={() => setDeleteModalVisible(true)}
                            className="bg-red-50 dark:bg-red-900/20 px-4 py-2.5 rounded-full"
                        >
                            <Text className="text-red-600 dark:text-red-400 font-bold text-sm">Remove</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push('/(admin)/students/add')}
                            className="bg-blue-600 px-4 py-2.5 rounded-full"
                        >
                            <Text className="text-white font-bold text-sm">Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                {/* Filter Toggle */}
                <View className="flex-row mt-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                    {['All', 'Present', 'Absent'].map((status) => (
                        <Pressable
                            key={status}
                            onPress={() => setFilterStatus(status as 'All' | 'Present' | 'Absent')}
                            style={{
                                flex: 1,
                                paddingVertical: 8,
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: filterStatus === status ? '#2563EB' : 'transparent', // blue-600
                                shadowColor: filterStatus === status ? '#000' : 'transparent',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                                elevation: filterStatus === status ? 2 : 0,
                            }}
                        >
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: filterStatus === status ? 'white' : (isDark ? '#9CA3AF' : '#6B7280') // gray-400 : gray-500
                            }}>
                                {status}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Year Toggle */}
                <View className="flex-row mt-4 gap-3">
                    {['All', '1', '2', '3', '4'].map((year) => (
                        <Pressable
                            key={year}
                            onPress={() => setFilterYear(year as 'All' | '1' | '2' | '3' | '4')}
                            style={{
                                flex: 1,
                                paddingVertical: 8,
                                borderRadius: 12,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: filterYear === year ? '#2563EB' : (isDark ? '#374151' : '#E5E7EB'),
                                backgroundColor: filterYear === year ? '#2563EB' : 'transparent',
                            }}
                        >
                            <Text style={{
                                fontSize: 12, // Reduced font size to fit
                                fontWeight: '600',
                                color: filterYear === year ? 'white' : (isDark ? '#9CA3AF' : '#4B5563'),
                                textAlign: 'center'
                            }}
                                numberOfLines={1}
                            >
                                {year === 'All' ? 'All' : `${year === '1' ? '1st' : year === '2' ? '2nd' : year === '3' ? '3rd' : '4th'} Yr`}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            <View className="px-5 py-3 flex-row justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <Text className="text-blue-600 dark:text-blue-400 font-bold">{filteredStudents.length} Students</Text>

                <TouchableOpacity
                    onPress={() => setSortModalVisible(true)}
                    className="flex-row items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                    <Text className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                        Sort by {sortBy === 'year' ? 'Year' : 'Name'}
                    </Text>
                    <Filter size={14} color={isDark ? "#D1D5DB" : "#374151"} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredStudents}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-3"
                        onPress={() => router.push(`/(admin)/students/${item.id}`)}
                    >
                        <View className="flex-row items-center">
                            {/* Serial Number */}
                            <View className="w-8 items-center justify-center mr-2">
                                <Text className="text-gray-400 font-bold text-sm">{index + 1}</Text>
                            </View>

                            <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-3">
                                <Text className="text-blue-600 dark:text-blue-400 font-bold text-base">{item.name.split(' ')[0]?.charAt(0)}{item.name.split(' ')[1]?.charAt(0)}</Text>
                            </View>

                            <View className="flex-1">
                                <Text className="text-base font-bold text-gray-900 dark:text-white mb-0.5">{item.name}</Text>
                                <View className="flex-row items-center gap-2">
                                    <Text className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                        {getOrdinal(item.year)} Year
                                    </Text>
                                    {/* ID Removed here as requested */}
                                </View>
                            </View>

                            {/* Simple Status Indicator */}
                            <View className={`px-2 py-1 rounded text-xs ${item.status === 'Present' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                <Text className={`text-xs font-bold ${item.status === 'Present' ? 'text-green-700 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                    {item.status}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <DeleteUserModal
                visible={deleteModalVisible}
                onClose={() => setDeleteModalVisible(false)}
                type="student"
                onSuccess={() => {
                    loadStudents(); // Refresh list
                }}
            />
        </SafeAreaView>
    );
}
