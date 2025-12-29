import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoreVertical, Edit2, Check, X } from 'lucide-react-native';
import { useFacultyTheme } from '../../../components/context/FacultyContext';

export default function StudentDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { isDark } = useFacultyTheme();

    // Mock Data for the student
    const student = {
        name: 'Alex Morgan',
        degree: 'B.Tech Computer Science',
        roll: 'CS21B1045',
        year: '2nd Year / Sem 3',
        contact: '+1 555-0123',
        email: 'alex.m@college.edu',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80',
        stats: {
            overall: 85,
            present: 28,
            absent: 5
        },
        history: [
            { id: 1, date: '24', month: 'OCT', title: 'Lecture 18: Graphs', time: '10:00 AM - 11:30 AM', status: 'present' },
            { id: 2, date: '22', month: 'OCT', title: 'Lecture 17: Trees', time: '10:00 AM - 11:30 AM', status: 'present' },
            { id: 3, date: '20', month: 'OCT', title: 'Lab Session 4', time: '02:00 PM - 04:00 PM', status: 'absent' },
            { id: 4, date: '18', month: 'OCT', title: 'Lecture 16: Hashing', time: '10:00 AM - 11:30 AM', status: 'present' },
        ]
    };

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <View className={`px-5 py-4 flex-row justify-between items-center mb-2 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <View className="flex-row items-center flex-1">
                    <TouchableOpacity onPress={() => router.push('/(faculty)/students')} className="mr-3 p-1">
                        <ArrowLeft size={24} color={isDark ? "white" : "#1F2937"} />
                    </TouchableOpacity>
                    <View>
                        <Text className={`text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Student Details</Text>
                        <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>CS101: Intro to Algorithms</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <MoreVertical size={24} color={isDark ? "white" : "#1F2937"} />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* Profile Information Card */}
                <View className={`mx-5 mb-8 rounded-3xl shadow-sm border overflow-hidden relative ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    {/* Blue Background Top */}
                    <View className="h-24 bg-blue-500 w-full absolute top-0 left-0" />

                    <View className="pt-12 px-5 pb-5">
                        {/* Avatar */}
                        <View className="mb-3 relative">
                            <View className={`w-24 h-24 rounded-full border-4 shadow-sm overflow-hidden bg-gray-200 ${isDark ? 'border-gray-800' : 'border-white'}`}>
                                <Image source={{ uri: student.image }} className="w-full h-full" />
                            </View>
                        </View>

                        <View className="flex-row justify-between items-start mb-4">
                            <View>
                                <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{student.name}</Text>
                                <Text className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{student.degree}</Text>
                            </View>
                            <View className={`px-3 py-1 rounded-full border ${isDark ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-100'}`}>
                                <Text className="text-green-600 font-bold text-xs uppercase">Active</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between mb-4">
                            <View className="flex-1 mr-4">
                                <Text className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Roll Number</Text>
                                <Text className={`font-bold text-sm tracking-wide ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{student.roll}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Year / Semester</Text>
                                <Text className={`font-bold text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{student.year}</Text>
                            </View>
                        </View>

                        <View className="flex-row justify-between">
                            <View className="flex-1 mr-4">
                                <Text className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Contact</Text>
                                <Text className={`font-bold text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{student.contact}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Email</Text>
                                <Text className={`font-bold text-sm text-ellipsis ${isDark ? 'text-gray-200' : 'text-gray-900'}`} numberOfLines={1}>{student.email}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Attendance Overview */}
                <View className="px-5 mb-8">
                    <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Attendance Overview</Text>
                    <View className="flex-row justify-between gap-3">
                        {/* Overall */}
                        <View className={`flex-1 p-4 rounded-2xl shadow-sm border items-center justify-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <View className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                                <Text className="text-blue-600 font-bold text-sm">85%</Text>
                            </View>
                            <Text className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Overall</Text>
                            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>85%</Text>
                        </View>

                        {/* Present */}
                        <View className={`flex-1 p-4 rounded-2xl shadow-sm border items-center justify-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <View className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${isDark ? 'bg-green-900/30' : 'bg-green-50'}`}>
                                <View className="bg-green-500 rounded-full p-1">
                                    <Check size={12} color="white" strokeWidth={4} />
                                </View>
                            </View>
                            <Text className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Present</Text>
                            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{student.stats.present}</Text>
                        </View>

                        {/* Absent */}
                        <View className={`flex-1 p-4 rounded-2xl shadow-sm border items-center justify-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <View className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${isDark ? 'bg-red-900/30' : 'bg-red-50'}`}>
                                <View className="bg-red-500 rounded-full p-1">
                                    <X size={12} color="white" strokeWidth={4} />
                                </View>
                            </View>
                            <Text className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Absent</Text>
                            <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{student.stats.absent}</Text>
                        </View>
                    </View>
                </View>

                {/* Recent History */}
                <View className="px-5 mb-24">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent History</Text>
                        <TouchableOpacity>
                            <Text className="text-blue-600 font-bold text-sm">View All</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="space-y-3">
                        {student.history.map((record) => (
                            <TouchableOpacity key={record.id} className={`p-4 rounded-2xl border shadow-sm flex-row items-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                                {/* Date Badge */}
                                <View className={`rounded-xl p-2 items-center justify-center mr-4 w-14 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                    <Text className={`text-[10px] font-bold uppercase ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>{record.month}</Text>
                                    <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{record.date}</Text>
                                </View>

                                <View className="flex-1 mr-2">
                                    <Text className={`font-bold text-base mb-0.5 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{record.title}</Text>
                                    <Text className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{record.time}</Text>
                                </View>

                                {/* Status Chip */}
                                {record.status === 'present' ? (
                                    <View className={`px-3 py-1.5 rounded-full border flex-row items-center ${isDark ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-100'}`}>
                                        <View className="bg-green-500 rounded-full p-0.5 mr-1.5">
                                            <Check size={8} color="white" strokeWidth={4} />
                                        </View>
                                        <Text className="text-green-700 font-bold text-xs">Present</Text>
                                    </View>
                                ) : (
                                    <View className={`px-3 py-1.5 rounded-full border flex-row items-center ${isDark ? 'bg-red-900/30 border-red-800' : 'bg-red-50 border-red-100'}`}>
                                        <View className="bg-red-500 rounded-full p-0.5 mr-1.5">
                                            <X size={8} color="white" strokeWidth={4} />
                                        </View>
                                        <Text className="text-red-700 font-bold text-xs">Absent</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </ScrollView>

            {/* Sticky Footer Button */}
            <View className={`absolute bottom-0 left-0 right-0 p-5 border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                <TouchableOpacity className={`flex-row justify-center items-center py-4 rounded-xl border-2 active:bg-gray-50 ${isDark ? 'border-gray-600 bg-gray-800 active:bg-gray-700' : 'border-slate-800 active:bg-gray-50'}`}>
                    <Edit2 size={20} color={isDark ? "white" : "#1E293B"} className="mr-2" />
                    <Text className={`font-bold text-base ml-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>Edit Attendance Record</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
