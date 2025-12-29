import { View, Text, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, useRouter, Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, Users, Search, CheckCircle, XCircle } from 'lucide-react-native';
import { useState, useMemo } from 'react';
import Button from '../../../components/common/Button';
import { useFacultyTheme } from '../../../components/context/FacultyContext';

// Mock Data matching the image
const mockStudents = [
    { id: '1', name: 'Alex Johnson', roll: 'ID: 2023001', status: 'present', yesterdayAbsent: false, image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80' },
    { id: '2', name: 'Sarah Williams', roll: 'ID: 2023002', status: 'present', yesterdayAbsent: false, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { id: '3', name: 'Michael Chen', roll: 'ID: 2023003', status: 'absent', yesterdayAbsent: true, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { id: '4', name: 'Emily Davis', roll: 'ID: 2023004', status: 'present', yesterdayAbsent: false, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
    { id: '5', name: 'David Wilson', roll: 'ID: 2023005', status: 'present', yesterdayAbsent: true, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
    { id: '6', name: 'Jessica Garcia', roll: 'ID: 2023006', status: 'absent', yesterdayAbsent: false, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
    { id: '7', name: 'Robert Brown', roll: 'ID: 2023007', status: 'present', yesterdayAbsent: false, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80' },
];

export default function MarkAttendance() {
    const { id, returnTo } = useLocalSearchParams();
    const router = useRouter();
    const { isDark } = useFacultyTheme();
    const [students, setStudents] = useState(mockStudents);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleStatus = (studentId: string) => {
        setStudents(prev => prev.map(s =>
            s.id === studentId ? { ...s, status: s.status === 'present' ? 'absent' : 'present' } : s
        ));
    };

    const markAll = (status: 'present' | 'absent') => {
        setStudents(prev => prev.map(s => ({ ...s, status })));
    };

    const resetAttendance = () => {
        setStudents(mockStudents); // Reset to initial state
    };



    const handleBack = () => {
        if (returnTo) {
            router.push(returnTo as any);
        } else {
            router.back();
        }
    };

    const counts = useMemo(() => {
        const p = students.filter(s => s.status === 'present').length;
        return { present: p, absent: students.length - p };
    }, [students]);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.roll.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <View className={`px-5 py-4 border-b flex-row items-center justify-between ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                <TouchableOpacity onPress={handleBack}>
                    <ArrowLeft size={24} color={isDark ? "white" : "#1F2937"} />
                </TouchableOpacity>
                <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Mark Attendance</Text>
                <TouchableOpacity onPress={resetAttendance}>
                    <Text className="text-blue-600 font-bold text-base">Reset</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
                {/* Course Card */}
                <View className={`rounded-2xl p-4 shadow-sm border mb-6 flex-row justify-between items-start ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <View className="flex-1 pr-4">
                        <View className="flex-row items-center mb-2">
                            <View className="bg-blue-50 px-2 py-1 rounded-md mr-2">
                                <Text className="text-blue-600 font-bold text-xs uppercase">Lecture 8</Text>
                            </View>
                            <Text className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Oct 24, 2023</Text>
                        </View>
                        <Text className={`text-xl font-bold mb-3 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Data Structures & Algo</Text>
                        <View className="flex-row items-center space-x-4">
                            <View className="flex-row items-center mr-4">
                                <Clock size={14} color="#6B7280" />
                                <Text className="text-gray-500 text-xs font-medium ml-1.5">09:00 AM</Text>
                            </View>
                            <View className="flex-row items-center">
                                <Users size={14} color="#6B7280" />
                                <Text className="text-gray-500 text-xs font-medium ml-1.5">40 Students</Text>
                            </View>
                        </View>
                    </View>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=100&auto=format&fit=crop' }}
                        className="w-20 h-20 rounded-xl bg-gray-900"
                    />
                </View>

                {/* Search Bar */}
                <View className={`flex-row items-center border rounded-xl px-4 h-12 mb-6 shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <Search size={20} color="#9CA3AF" />
                    <View className="flex-1 ml-3">
                        <Text className="text-gray-400">Search by name or roll number...</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View className="flex-row gap-4 mb-8">
                    <TouchableOpacity
                        onPress={() => markAll('present')}
                        className={`flex-1 border rounded-xl py-3 flex-row justify-center items-center shadow-sm ${isDark ? 'bg-gray-800 border-gray-700 active:bg-gray-700' : 'bg-white border-gray-200 active:bg-gray-50'}`}
                    >
                        <View className="bg-gray-900 rounded-full p-0.5 mr-2">
                            <CheckCircle size={14} color="white" fill="white" />
                        </View>
                        <Text className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-800'}`}>All Present</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => markAll('absent')}
                        className={`flex-1 border rounded-xl py-3 flex-row justify-center items-center shadow-sm ${isDark ? 'bg-gray-800 border-gray-700 active:bg-gray-700' : 'bg-white border-gray-200 active:bg-gray-50'}`}
                    >
                        <View className="bg-red-500 rounded-full p-0.5 mr-2">
                            <XCircle size={14} color="white" fill="#EF4444" />
                        </View>
                        <Text className="text-red-600 font-bold text-sm">All Absent</Text>
                    </TouchableOpacity>
                </View>

                <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Student List</Text>

                {/* Student List */}
                <View className="pb-10">
                    {filteredStudents.map((item) => (
                        <View
                            key={item.id}
                            className={`flex-row items-center justify-between p-4 rounded-2xl mb-3 border shadow-sm ${item.status === 'present' ? (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100') : (isDark ? 'bg-red-900/20 border-red-900/30' : 'bg-red-50/50 border-red-100')}`}
                        >
                            <View className="flex-row items-center flex-1">
                                <View className="relative">
                                    <Image
                                        source={{ uri: item.image }}
                                        className={`w-12 h-12 rounded-full border-2 ${item.status === 'present' ? (isDark ? 'border-gray-700' : 'border-white') : (isDark ? 'border-red-900/50 grayscale' : 'border-red-200 grayscale')}`}
                                    />
                                    {item.status === 'absent' && (
                                        <View className="absolute bottom-0 right-0 bg-red-500 rounded-full w-4 h-4 items-center justify-center border border-white">
                                            <XCircle size={10} color="white" />
                                        </View>
                                    )}
                                </View>
                                <View className="ml-3 flex-1">
                                    <View className="flex-row items-center flex-wrap">
                                        <Text className={`font-bold text-base mr-2 ${item.status === 'present' ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-gray-300' : 'text-gray-800')}`}>{item.name}</Text>
                                        {item.yesterdayAbsent && (
                                            <View className="bg-yellow-100 px-1.5 py-0.5 rounded border border-yellow-200">
                                                <Text className="text-[10px] font-bold text-yellow-700">Yesterday Absent</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text className="text-gray-500 text-xs font-medium">{item.roll}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => toggleStatus(item.id)}
                                activeOpacity={0.8}
                                className={`w-14 h-8 rounded-full flex-row items-center px-1 duration-200 ${item.status === 'present' ? 'bg-blue-600 justify-end' : 'bg-red-400 justify-start'}`}
                            >
                                <View className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                                    <Text className={`text-[10px] font-bold ${item.status === 'present' ? 'text-blue-600' : 'text-red-500'}`}>
                                        {item.status === 'present' ? 'P' : 'A'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Footer */}
            <View className={`px-5 py-4 border-t shadow-xl pb-8 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                <View className="flex-row justify-center items-center mb-4 space-x-6">
                    <View className="flex-row items-center">
                        <View className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2" />
                        <Text className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{counts.present} Present</Text>
                    </View>
                    <View className={`w-[1px] h-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                    <View className="flex-row items-center">
                        <View className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2" />
                        <Text className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{counts.absent} Absent</Text>
                    </View>
                </View>
                <Button title="Submit Attendance" onPress={handleBack} className="rounded-xl shadow-blue-200 shadow-lg" />
            </View>
        </SafeAreaView>
    );
}
