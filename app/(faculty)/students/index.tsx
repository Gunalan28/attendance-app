import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoreVertical, Search, ChevronRight, SlidersHorizontal } from 'lucide-react-native';
import { useState } from 'react';
import Input from '../../../components/common/Input';
import { useFacultyTheme } from '../../../components/context/FacultyContext';

// Mock Data
const mockStudents = [
    { id: '1', name: 'John Doe', roll: 'ID: 2023001', dept: 'Computer Science', attendance: 95, lastSeen: 'Today', status: 'online', initials: 'JD', color: 'bg-blue-100', textColor: 'text-blue-600' },
    { id: '2', name: 'Alice Smith', roll: 'ID: 2023045', dept: 'Mathematics', attendance: 88, lastSeen: 'Yesterday', status: 'online', initials: 'AS', color: 'bg-pink-100', textColor: 'text-pink-600' },
    { id: '3', name: 'Michael Brown', roll: 'ID: 2023012', dept: 'Physics', attendance: 65, lastSeen: 'Low Attendance', status: 'offline', initials: 'MB', warning: true, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: '4', name: 'Emily Johnson', roll: 'ID: 2023089', dept: 'Computer Science', attendance: 100, lastSeen: 'Today', status: 'online', initials: 'EJ', color: 'bg-cyan-100', textColor: 'text-cyan-600' },
    { id: '5', name: 'David Williams', roll: 'ID: 2023056', dept: 'Engineering', attendance: 91, lastSeen: '2 days ago', status: 'offline', initials: 'DW', color: 'bg-purple-100', textColor: 'text-purple-600' },
];

const departments = ['All Departments', 'Computer Science', 'Engineering', 'Mathematics', 'Physics'];

export default function StudentList() {
    const router = useRouter();
    const { isDark } = useFacultyTheme();
    const [selectedDept, setSelectedDept] = useState('All Departments');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredStudents = mockStudents.filter(s => {
        const matchesDept = selectedDept === 'All Departments' || s.dept === selectedDept;
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.roll.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesDept && matchesSearch;
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
                {/* Department Filters */}
                <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className={`text-xs font-bold tracking-wider uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Filter by Department</Text>
                        <TouchableOpacity>
                            <Text className="text-blue-600 text-xs font-bold">View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                        {departments.map((dept, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedDept(dept)}
                                className={`px-4 py-2.5 rounded-xl mr-3 border ${selectedDept === dept ? 'bg-blue-600 border-blue-600' : (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}`}
                            >
                                <Text className={`font-bold text-xs ${selectedDept === dept ? 'text-white' : (isDark ? 'text-gray-300' : 'text-gray-700')}`}>
                                    {dept}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

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
                    <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Student List</Text>
                    <TouchableOpacity className="flex-row items-center">
                        <SlidersHorizontal size={14} color="#3B82F6" />
                        <Text className="text-blue-600 font-bold text-xs ml-1">Sort by Name</Text>
                    </TouchableOpacity>
                </View>

                {/* Student Cards */}
                <FlatList
                    data={filteredStudents}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View className={`rounded-2xl p-4 mb-4 shadow-sm border ${item.warning ? 'border-yellow-200' : (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}`}>
                            <TouchableOpacity onPress={() => router.push(`/students/${item.id}`)} activeOpacity={0.7}>
                                {/* Top Section: Avatar & Info */}
                                <View className="flex-row items-center mb-4">
                                    <View className="mr-4 relative">
                                        {item.image ? (
                                            <Image source={{ uri: item.image }} className="w-12 h-12 rounded-full" />
                                        ) : (
                                            <View className={`w-12 h-12 rounded-full items-center justify-center ${item.color}`}>
                                                <Text className={`font-bold text-lg ${item.textColor}`}>{item.initials}</Text>
                                            </View>
                                        )}
                                        {item.status === 'online' && (
                                            <View className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'}`} />
                                        )}
                                        {item.status === 'offline' && (
                                            <View className={`absolute bottom-0 right-0 w-3.5 h-3.5 bg-gray-400 rounded-full border-2 ${isDark ? 'border-gray-800' : 'border-white'}`} />
                                        )}
                                    </View>
                                    <View className="flex-1">
                                        <View className="flex-row justify-between items-center">
                                            <View>
                                                <Text className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</Text>
                                                <Text className="text-gray-500 text-xs mt-0.5">{item.roll} • {item.dept}</Text>
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
