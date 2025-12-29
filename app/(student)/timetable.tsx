import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Clock, MapPin } from 'lucide-react-native';
import { useStudentTheme } from '../../components/context/StudentContext';

const dates = [
    { day: 'MON', date: '12', active: true },
    { day: 'TUE', date: '13', active: false },
    { day: 'WED', date: '14', active: false },
    { day: 'THU', date: '15', active: false },
    { day: 'FRI', date: '16', active: false },
    { day: 'SAT', date: '17', active: false },
];

const schedule = [
    {
        time: '09:00',
        title: 'Linear Algebra',
        duration: '09:00 - 10:30 AM',
        location: 'Room 301',
        instructor: 'Dr. Sarah Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
        type: 'LEC',
        typeColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    },
    {
        time: '11:00',
        title: 'Computer Science 101',
        duration: '11:00 - 12:30 PM',
        location: 'Lab 3B',
        instructor: 'Prof. John Parker',
        initials: 'JP',
        type: 'LAB',
        typeColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    },
    {
        time: '13:00',
        type: 'BREAK',
    },
    {
        time: '14:00',
        title: 'Data Structures',
        duration: '14:00 - 15:30 PM',
        location: 'Room 405',
        instructor: 'Dr. M. Kaling',
        initials: 'MK',
        type: 'TUT',
        typeColor: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    },
    {
        time: '16:00',
        empty: true
    }
];

export default function StudentTimeTable() {
    const { isDark } = useStudentTheme();

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <View className="px-5 pt-4 pb-2 flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">Time Table</Text>

                <View className="flex-row items-center space-x-3">
                    <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-1.5">
                        <TouchableOpacity className="p-1">
                            <ChevronLeft size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
                        </TouchableOpacity>
                        <Text className="font-bold text-sm text-gray-900 dark:text-white mx-2">Week 4</Text>
                        <TouchableOpacity className="p-1">
                            <ChevronRight size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
                        <SlidersHorizontal size={20} color={isDark ? "#E5E7EB" : "#374151"} />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="pb-6">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-5 pt-4" contentContainerStyle={{ paddingRight: 20 }}>
                    {dates.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            className={`mr-3 w-16 h-20 rounded-2xl items-center justify-center border ${item.active ? 'bg-blue-600 border-blue-600 shadow-blue-200 shadow-lg' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
                        >
                            <Text className={`text-xs font-bold mb-1 ${item.active ? 'text-blue-100' : 'text-gray-400 dark:text-gray-500'}`}>{item.day}</Text>
                            <Text className={`text-xl font-bold ${item.active ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{item.date}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
                <View className="flex-row relative pb-10">
                    {/* Vertical Line */}
                    <View className="absolute left-[54px] top-4 bottom-0 w-[1px] bg-gray-200 dark:bg-gray-700" />

                    <View className="flex-1">
                        {schedule.map((item, index) => (
                            <View key={index} className="flex-row mb-6">
                                {/* Time Column */}
                                <View className="w-14 pt-1 mr-4 items-end">
                                    <Text className="text-gray-400 dark:text-gray-500 font-bold text-xs">{item.time}</Text>
                                </View>

                                {/* Event Card */}
                                <View className="flex-1">
                                    {item.type === 'BREAK' ? (
                                        <View className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl py-4 items-center justify-center bg-gray-50/50 dark:bg-gray-800/50">
                                            <Text className="text-gray-400 dark:text-gray-500 font-bold text-xs tracking-widest uppercase">Lunch Break</Text>
                                        </View>
                                    ) : item.empty ? (
                                        <View className="h-10" />
                                    ) : (
                                        <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                                            <View className="flex-row justify-between items-start mb-3">
                                                <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1 mr-2">{item.title}</Text>
                                                <View className={`px-2 py-0.5 rounded ${item.typeColor?.split(' ')[0] || 'bg-gray-100 dark:bg-gray-700'}`}>
                                                    <Text className={`text-[10px] font-bold ${item.typeColor?.split(' ')[1] || 'text-gray-700 dark:text-gray-300'}`}>{item.type}</Text>
                                                </View>
                                            </View>

                                            <View className="flex-row items-center mb-4 space-x-4">
                                                <View className="flex-row items-center mr-4">
                                                    <Clock size={14} color="#9CA3AF" />
                                                    <Text className="text-gray-500 dark:text-gray-400 text-xs font-medium ml-1.5">{item.duration}</Text>
                                                </View>
                                                <View className="flex-row items-center">
                                                    <MapPin size={14} color="#9CA3AF" />
                                                    <Text className="text-gray-500 dark:text-gray-400 text-xs font-medium ml-1.5">{item.location}</Text>
                                                </View>
                                            </View>

                                            <View className="flex-row items-center">
                                                {item.avatar ? (
                                                    <Image
                                                        source={{ uri: item.avatar }}
                                                        className="w-6 h-6 rounded-full mr-2"
                                                    />
                                                ) : (
                                                    <View className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 items-center justify-center mr-2">
                                                        <Text className="text-[10px] font-bold text-gray-600 dark:text-gray-300">{item.initials}</Text>
                                                    </View>
                                                )}
                                                <Text className="text-gray-600 dark:text-gray-400 text-xs font-medium">{item.instructor}</Text>
                                            </View>
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
