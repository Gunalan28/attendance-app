import { View, Text, FlatList, TouchableOpacity, RefreshControl, Pressable } from 'react-native';
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
interface Faculty {
    id: string;
    name: string;
    dept: string;
    role: string;
    status: string;
    attendance: number;
}

export default function FacultyList() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [sortBy, setSortBy] = useState<'name' | 'dept'>('name');
    const [isSorting, setIsSorting] = useState(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [filterStatus, setFilterStatus] = useState<'All' | 'Present' | 'Absent'>('All');

    const loadFaculty = async () => {
        try {
            const data = await api.getAdminFaculty();
            setFaculty(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadFaculty();
        }, [])
    );

    useEffect(() => {
        if (params.status) {
            setFilterStatus(params.status as 'Present' | 'Absent');
        } else {
            setFilterStatus('All');
        }

        if (params.refresh) {
            setSearchQuery('');
            setFilterStatus('All');
        }
    }, [params.status, params.refresh]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadFaculty().finally(() => setRefreshing(false));
    }, []);

    const handleSort = (type: 'name' | 'dept') => {
        setSortModalVisible(false);
        if (sortBy === type) return;

        setIsSorting(true);
        // Simulate loading delay
        setTimeout(() => {
            setSortBy(type);
            setIsSorting(false);
        }, 500);
    };

    const filteredFaculty = faculty.filter(f => {
        const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.dept.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filterStatus === 'All'
            ? true
            : f.status === filterStatus;

        return matchesSearch && matchesStatus;
    }).sort((a, b) => {
        if (sortBy === 'dept') return a.dept.localeCompare(b.dept);
        return a.name.localeCompare(b.name);
    });

    // Dynamic Title
    const getPageTitle = () => {
        if (params.status) return `${params.status} Faculty`;
        return 'Faculty List';
    };

    if (loading) {
        return (
            <View className="flex-1 bg-white dark:bg-gray-900">
                <EducationLoader visible={loading} message="Loading Faculty..." />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <EducationLoader visible={isSorting || refreshing} message={isSorting ? `Sorting by ${sortBy === 'name' ? 'Name' : 'Department'}...` : "Refreshing..."} />

            <SortModal
                visible={sortModalVisible}
                onClose={() => setSortModalVisible(false)}
                title="Sort Faculty By"
                options={[
                    { label: 'Name (A-Z)', value: 'name' },
                    { label: 'Department (A-Z)', value: 'dept' }
                ]}
                selectedOption={sortBy}
                onSelect={(val) => handleSort(val as 'name' | 'dept')}
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
                            onPress={() => router.push('/(admin)/faculty/add')}
                            className="bg-purple-600 px-4 py-2.5 rounded-full"
                        >
                            <Text className="text-white font-bold text-sm">Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Input
                    placeholder="Search faculty..."
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
                                backgroundColor: filterStatus === status ? '#9333EA' : 'transparent', // purple-600
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
                                color: filterStatus === status ? 'white' : (isDark ? '#9CA3AF' : '#6B7280')
                            }}>
                                {status}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            <View className="px-5 py-3 flex-row justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <Text className="text-purple-600 dark:text-purple-400 font-bold">{filteredFaculty.length} Faculty Members</Text>

                <TouchableOpacity
                    onPress={() => setSortModalVisible(true)}
                    className="flex-row items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                    <Text className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                        Sort by {sortBy === 'name' ? 'Name' : 'Department'}
                    </Text>
                    <Filter size={14} color={isDark ? "#D1D5DB" : "#374151"} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredFaculty}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 16 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#9333EA']} tintColor={'#9333EA'} />
                }
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-3"
                        onPress={() => console.log('View Faculty')}
                    >
                        <View className="flex-row items-center">
                            {/* Serial Number */}
                            <View className="w-8 items-center justify-center mr-2">
                                <Text className="text-gray-400 font-bold text-sm">{index + 1}</Text>
                            </View>

                            <View className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full items-center justify-center mr-3">
                                <Text className="text-purple-600 dark:text-purple-400 font-bold text-base">{item.name.split(' ')[1]?.charAt(0)}{item.name.split(' ')[2]?.charAt(0)}</Text>
                            </View>

                            <View className="flex-1">
                                <Text className="text-base font-bold text-gray-900 dark:text-white mb-0.5">{item.name}</Text>
                                <Text className="text-gray-500 dark:text-gray-400 text-xs">{item.role} • {item.dept}</Text>
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
                type="faculty"
                onSuccess={() => {
                    loadFaculty();
                }}
            />
        </SafeAreaView>
    );
}
