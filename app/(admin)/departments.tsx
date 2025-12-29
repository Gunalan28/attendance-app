import { View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MoreVertical, Plus, GraduationCap, TrendingUp } from 'lucide-react-native';
import Card from '../../components/common/Card';
import { useState } from 'react';
import { useColorScheme } from 'nativewind';

const departments = [
    {
        id: 1,
        name: 'Computer Science',
        code: 'CSE',
        head: 'Prof. Alan Turing',
        attendance: 89,
        present: 120,
        absent: 15,
        color: 'bg-blue-50 dark:bg-blue-900/30',
        textColor: 'text-blue-600 dark:text-blue-400',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rateColor: 'bg-blue-500'
    },
    {
        id: 2,
        name: 'Electronics & Comm.',
        code: 'ECE',
        head: 'Prof. Grace Hopper',
        attendance: 96,
        present: 98,
        absent: 4,
        color: 'bg-purple-50 dark:bg-purple-900/30',
        textColor: 'text-purple-600 dark:text-purple-400',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rateColor: 'bg-purple-500'
    },
    {
        id: 3,
        name: 'Mechanical Eng.',
        code: 'MECH',
        head: 'Prof. Nikola Tesla',
        attendance: 87,
        present: 85,
        absent: 12,
        color: 'bg-orange-50 dark:bg-orange-900/30',
        textColor: 'text-orange-600 dark:text-orange-400',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rateColor: 'bg-orange-500'
    },
    {
        id: 4,
        name: 'Information Technology',
        code: 'IT',
        head: 'Prof. Tim Berners-Lee',
        attendance: 94,
        present: 115,
        absent: 6,
        color: 'bg-cyan-50 dark:bg-cyan-900/30',
        textColor: 'text-cyan-600 dark:text-cyan-400',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rateColor: 'bg-cyan-500'
    },
    {
        id: 5,
        name: 'Electrical & Electronics',
        code: 'EEE',
        head: 'Prof. Michael Faraday',
        attendance: 88,
        present: 92,
        absent: 13,
        color: 'bg-yellow-50 dark:bg-yellow-900/30',
        textColor: 'text-yellow-600 dark:text-yellow-400',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        rateColor: 'bg-yellow-500'
    },
    {
        id: 6,
        name: 'Civil Engineering',
        code: 'CIVIL',
        head: 'Faculty not assigned',
        attendance: 0,
        present: 0,
        absent: 0,
        color: 'bg-green-50 dark:bg-green-900/30',
        textColor: 'text-green-600 dark:text-green-400',
        noData: true
    },
];

export default function Departments() {
    const [search, setSearch] = useState('');
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <SafeAreaView className="flex-1 bg-gray-50/50 dark:bg-gray-900">
            <ScrollView className="px-5 pt-2" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row justify-between items-start mb-6">
                    <View>
                        <Text className="text-3xl font-extrabold text-gray-900 dark:text-white">Departments</Text>
                        <Text className="text-gray-400 text-sm mt-1">Today, 24 Oct</Text>
                    </View>
                    <TouchableOpacity className="bg-blue-500 rounded-full w-10 h-10 items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none">
                        <Plus size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View className="bg-white dark:bg-gray-800 rounded-2xl p-3 flex-row items-center mb-8 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <Search size={20} color={isDark ? "#9CA3AF" : "#9CA3AF"} className="mr-3 ml-1" />
                    <TextInput
                        className="flex-1 text-base text-gray-900 dark:text-white font-medium"
                        placeholder="Search department..."
                        placeholderTextColor="#9CA3AF"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Stats Row */}
                <View className="flex-row gap-4 mb-8">
                    <Card className="flex-1 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-[20px]">
                        <Text className="text-gray-400 dark:text-gray-500 font-bold text-[10px] tracking-widest uppercase mb-2">AVG ATTENDANCE</Text>
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Text className="text-3xl font-extrabold text-gray-900 dark:text-white">92%</Text>
                                <TrendingUp size={16} color="#16A34A" style={{ marginLeft: 6 }} />
                            </View>
                            <GraduationCap size={32} color="#93C5FD" className="opacity-50" />
                        </View>
                    </Card>
                    <Card className="flex-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-[20px] shadow-sm">
                        <Text className="text-gray-400 dark:text-gray-500 font-bold text-[10px] tracking-widest uppercase mb-2">TOTAL ABSENT</Text>
                        <View className="flex-row items-baseline">
                            <Text className="text-3xl font-extrabold text-gray-900 dark:text-white">45</Text>
                            <Text className="text-gray-400 dark:text-gray-500 text-xs font-bold ml-1.5">students</Text>
                        </View>
                    </Card>
                </View>

                {/* Department Cards */}
                <View className="gap-5 pb-24">
                    {departments.map((dept) => (
                        <Card key={dept.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm rounded-[24px] p-5">
                            <View className="flex-row justify-between items-start mb-6">
                                <View className="flex-row items-center flex-1">
                                    <View className={`w-12 h-12 rounded-xl items-center justify-center ${dept.color} mr-4`}>
                                        <Text className={`font-bold text-xs ${dept.textColor}`}>{dept.code}</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-bold text-lg text-gray-900 dark:text-white mb-1">{dept.name}</Text>
                                        <View className="flex-row items-center">
                                            {dept.noData ? (
                                                <View className="w-5 h-5 bg-gray-100 dark:bg-gray-700 rounded-full items-center justify-center mr-2">
                                                    <Text className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">?</Text>
                                                </View>
                                            ) : (
                                                <Image
                                                    source={{ uri: dept.avatar }}
                                                    className="w-5 h-5 rounded-full mr-2"
                                                />
                                            )}
                                            <Text className={`text-xs ${dept.noData ? 'text-gray-400 dark:text-gray-500 italic' : 'text-gray-500 dark:text-gray-400 font-medium'}`}>
                                                {dept.head}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <MoreVertical size={20} color={isDark ? "#4B5563" : "#D1D5DB"} />
                                </TouchableOpacity>
                            </View>

                            {!dept.noData ? (
                                <View className="flex-row justify-between bg-gray-50/50 dark:bg-gray-700/30 rounded-2xl p-4 border border-gray-50 dark:border-gray-700">
                                    <View>
                                        <Text className="text-gray-400 dark:text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1">PRESENT</Text>
                                        <Text className="text-green-600 dark:text-green-400 font-bold text-xl">{dept.present}</Text>
                                    </View>
                                    <View className="w-[1px] bg-gray-200/60 dark:bg-gray-600/60 my-1" />
                                    <View>
                                        <Text className="text-gray-400 dark:text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1">ABSENT</Text>
                                        <Text className="text-red-500 dark:text-red-400 font-bold text-xl">{dept.absent}</Text>
                                    </View>
                                    <View className={`w-1 rounded-full mx-1 ${dept.rateColor}`} />
                                    <View>
                                        <Text className="text-gray-400 dark:text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-1">RATE</Text>
                                        <Text className="text-gray-900 dark:text-white font-bold text-xl">{dept.attendance}%</Text>
                                    </View>
                                </View>
                            ) : (
                                <View className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-6 items-center border border-dashed border-gray-200 dark:border-gray-600">
                                    <View className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full items-center justify-center mb-2">
                                        <Text className="text-white text-xs font-bold">i</Text>
                                    </View>
                                    <Text className="text-gray-400 dark:text-gray-500 text-sm font-medium">No attendance data available</Text>
                                </View>
                            )}
                        </Card>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
