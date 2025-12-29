import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, ChevronLeft, ChevronRight, Clock, MapPin, CheckCircle, Utensils, FlaskConical, Code, UserCheck, Users, Building } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFacultyTheme } from '../../components/context/FacultyContext';

export default function FacultyTimeTable() {
    const router = useRouter();
    const { isDark } = useFacultyTheme();

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
            <View className={`px-5 py-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center">
                        <View className={`w-10 h-10 rounded-full mr-3 relative border overflow-hidden ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }}
                                className="w-full h-full"
                            />
                            <View className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-white" />
                        </View>
                        <View>
                            <Text className={`text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Dr. Smith</Text>
                            <Text className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Faculty of Computer Science</Text>
                        </View>
                    </View>
                    <TouchableOpacity className={`p-2 rounded-full border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                        <Bell size={20} color={isDark ? "white" : "#4B5563"} />
                    </TouchableOpacity>
                </View>

                {/* Title & Date Picker */}
                <View className="flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center">
                        <View className="mr-3 bg-blue-50 p-2 rounded-lg">
                            <Clock size={20} color="#2563EB" />
                        </View>
                        <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Time Table</Text>
                    </View>

                    <View className={`flex-row items-center rounded-lg px-2 py-1.5 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <TouchableOpacity hitSlop={10}>
                            <ChevronLeft size={18} color="#6B7280" />
                        </TouchableOpacity>
                        <Text className={`mx-3 text-sm font-bold ${isDark ? 'text-white' : 'text-gray-700'}`}>Oct 24 - 28</Text>
                        <TouchableOpacity hitSlop={10}>
                            <ChevronRight size={18} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Days Row */}
                <View className="flex-row justify-between mb-2">
                    {['Mon\n24', 'Tue\n25', 'Wed\n26', 'Thu\n27', 'Fri\n28'].map((day, index) => {
                        const active = index === 1; // Tue 25 is active
                        return (
                            <TouchableOpacity
                                key={index}
                                className={`items-center justify-center w-14 h-16 rounded-2xl ${active ? 'bg-blue-50' : (isDark ? 'bg-gray-800' : '')}`}
                            >
                                <Text className={`text-xs font-bold mb-1 ${active ? 'text-blue-600' : (isDark ? 'text-white' : 'text-gray-900')}`}>{day.split('\n')[0]}</Text>
                                <View className={`w-8 h-8 rounded-full items-center justify-center ${active ? 'bg-blue-600 shadow-blue-200 shadow-md' : ''}`}>
                                    <Text className={`text-sm font-bold ${active ? 'text-white' : (isDark ? 'text-gray-400' : 'text-gray-500')}`}>{day.split('\n')[1]}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View className={`h-0.5 w-full relative mt-2 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <View className="absolute left-[20%] w-[15%] ml-2 h-0.5 bg-blue-600 rounded-full" />
                </View>
            </View>

            <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
                {/* 08:00 Item - Lecture */}
                <View className="flex-row mb-0">
                    <View className="items-center mr-4 w-12 pt-1">
                        <Text className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>08:00</Text>
                        <Text className="text-gray-400 text-[10px] mb-2">AM</Text>
                        <View className={`flex-1 w-[2px] h-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />
                    </View>
                    <View className="flex-1 mb-6 pb-4">
                        <View className={`rounded-2xl border-l-4 border-l-green-500 shadow-sm border p-5 relative ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <View className={`absolute top-4 right-4 p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <FlaskConical size={18} color="#6B7280" />
                            </View>

                            <View className="flex-row mb-3">
                                <View className="bg-green-100 px-2.5 py-1 rounded mr-2">
                                    <Text className="text-green-700 text-[10px] font-bold uppercase tracking-wider">Lecture</Text>
                                </View>
                            </View>

                            <Text className={`text-xl font-bold mb-4 pr-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>CS204: Data Structures</Text>

                            <View className="flex-row items-center mb-6">
                                <View className="flex-row items-center mr-6">
                                    <Clock size={16} color="#9CA3AF" />
                                    <Text className="text-gray-500 text-xs ml-1.5 font-medium">08:00 - 09:00</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <MapPin size={16} color="#9CA3AF" />
                                    <Text className="text-gray-500 text-xs ml-1.5 font-medium">Lab 2</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => router.push({ pathname: '/(faculty)/attendance/[id]', params: { id: '1', returnTo: '/(faculty)/timetable' } })}
                                className="bg-blue-600 py-3 rounded-xl flex-row justify-center items-center shadow-blue-200 shadow-md active:bg-blue-700"
                            >
                                <View className="mr-2">
                                    <UserCheck size={18} color="white" />
                                </View>
                                <Text className="text-white font-bold text-sm">Take Attendance</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* 10:00 Item - Lecture */}
                <View className="flex-row mb-0">
                    <View className="items-center mr-4 w-12 pt-1">
                        <Text className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>10:00</Text>
                        <Text className="text-gray-400 text-[10px] mb-2">AM</Text>
                        <View className={`flex-1 w-[2px] h-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />
                    </View>
                    <View className="flex-1 mb-6 pb-4">
                        <View className={`rounded-2xl border-l-4 border-l-blue-500 shadow-sm border p-5 relative ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <View className={`absolute top-4 right-4 p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <Code size={18} color="#6B7280" />
                            </View>

                            <View className="flex-row mb-3">
                                <View className="bg-blue-100 px-2.5 py-1 rounded mr-2">
                                    <Text className="text-blue-700 text-[10px] font-bold uppercase tracking-wider">Lecture</Text>
                                </View>
                            </View>

                            <Text className={`text-xl font-bold mb-4 pr-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>CS101: Intro to Algorithms</Text>

                            <View className="flex-row items-center mb-6">
                                <View className="flex-row items-center mr-6">
                                    <Clock size={16} color="#9CA3AF" />
                                    <Text className="text-gray-500 text-xs ml-1.5 font-medium">10:00 - 11:00</Text>
                                </View>
                                <View className="flex-row items-center">
                                    <Building size={16} color="#9CA3AF" />
                                    <Text className="text-gray-500 text-xs ml-1.5 font-medium">Room 304</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => router.push({ pathname: '/(faculty)/attendance/[id]', params: { id: '2', returnTo: '/(faculty)/timetable' } })}
                                className="bg-blue-600 py-3 rounded-xl flex-row justify-center items-center shadow-blue-200 shadow-md active:bg-blue-700"
                            >
                                <View className="mr-2">
                                    <UserCheck size={18} color="white" />
                                </View>
                                <Text className="text-white font-bold text-sm">Take Attendance</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* 12:00 Item - Lunch Break */}
                <View className="flex-row mb-0">
                    <View className="items-center mr-4 w-12 pt-1">
                        <Text className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>12:00</Text>
                        <Text className="text-gray-400 text-[10px] mb-2">PM</Text>
                        <View className={`flex-1 w-[2px] h-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />
                    </View>
                    <View className="flex-1 mb-6 pb-2">
                        <View className={`rounded-2xl border p-5 flex-row items-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                            <View className={`p-3 rounded-full mr-4 shadow-sm ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                                <Utensils size={20} color="#F59E0B" />
                            </View>
                            <View>
                                <Text className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-700'}`}>Lunch Break</Text>
                                <Text className="text-gray-500 text-xs font-medium">12:00 - 13:00</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 14:00 Item - Faculty Meeting */}
                <View className="flex-row mb-10">
                    <View className="items-center mr-4 w-12 pt-1">
                        <Text className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>14:00</Text>
                        <Text className="text-gray-400 text-[10px] mb-2">PM</Text>
                    </View>
                    <View className="flex-1">
                        <View className={`rounded-2xl shadow-sm border p-5 flex-row items-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <View className={`p-3 rounded-xl mr-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <Users size={20} color="#6B7280" />
                            </View>
                            <View>
                                <Text className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Faculty Meeting</Text>
                                <Text className="text-gray-500 text-xs font-medium">Conf. Room A</Text>
                            </View>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
