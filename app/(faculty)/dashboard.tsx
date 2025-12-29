import { View, Text, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Clock, Users, Building, CheckCircle, ChevronRight, MoreHorizontal } from 'lucide-react-native';
import Card from '../../components/common/Card';
import { useFacultyTheme } from '../../components/context/FacultyContext';

export default function FacultyDashboard() {
    const router = useRouter();
    const { isDark } = useFacultyTheme();

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <ScrollView className="px-5 pt-4" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center">
                        <View className="w-12 h-12 rounded-full mr-3 relative border-2 border-white shadow-sm overflow-hidden">
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80' }}
                                className="w-full h-full"
                            />
                            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </View>
                        <View>
                            <Text className={`text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Dr. Smith</Text>
                            <Text className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Faculty of Computer Science</Text>
                            <Text className="text-gray-400 text-xs mt-1">Monday, Oct 24</Text>
                        </View>
                    </View>
                    <TouchableOpacity className={`p-2.5 rounded-full shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <Bell size={22} color={isDark ? "white" : "#4B5563"} />
                    </TouchableOpacity>
                </View>

                <Text className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Up Next</Text>

                {/* Up Next Card */}
                <View className={`rounded-2xl overflow-hidden mb-8 shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop' }} className="p-5" imageStyle={{ opacity: 0.9 }}>
                        <View className="absolute inset-0 bg-black/40" />
                        <View className="flex-row items-center mb-6 relative">
                            <View className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg flex-row items-center border border-white/30">
                                <Building size={14} color="white" />
                                <Text className="text-white text-xs font-bold ml-2">Room 304</Text>
                            </View>
                        </View>
                        <Text className="text-white text-2xl font-bold mb-1 relative">CS101: Intro to Algorithms</Text>
                    </ImageBackground>

                    <View className="p-5">
                        <View className="flex-row justify-between items-center mb-6">
                            <View className="flex-row items-center">
                                <View className="bg-blue-50 p-1.5 rounded-full mr-2">
                                    <Clock size={16} color="#2563EB" />
                                </View>
                                <Text className={`font-bold text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>10:00 AM - 11:30 AM</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="bg-green-50 p-1.5 rounded-full mr-2">
                                    <Users size={16} color="#16A34A" />
                                </View>
                                <Text className={`font-bold text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>45 Students</Text>
                            </View>
                        </View>

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => router.push({ pathname: '/(faculty)/attendance/[id]', params: { id: 'CS101', returnTo: '/(faculty)/dashboard' } })}
                                className="flex-1 bg-blue-600 py-3.5 rounded-xl flex-row justify-center items-center shadow-blue-200 shadow-lg"
                            >
                                <View className="bg-white/20 p-1 rounded-full mr-2">
                                    <CheckCircle size={16} color="white" />
                                </View>
                                <Text className="text-white font-bold text-base">Mark Attendance</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className={`px-4 rounded-xl items-center justify-center border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'}`}>
                                <MoreHorizontal size={24} color={isDark ? "#9CA3AF" : "#6B7280"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Today's Schedule</Text>

                <View className="mb-8">
                    {/* Item 1 */}
                    <View className="flex-row mb-0 h-24">
                        <View className="items-center mr-4 w-10 pt-1">
                            <Text className={`font-bold text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>08:30</Text>
                            <View className={`flex-1 w-[2px] mt-2 border-l-2 border-dashed h-full ${isDark ? 'border-gray-700' : 'border-gray-300 bg-gray-200'}`} />
                        </View>
                        <Card className={`flex-1 border mb-4 h-20 opacity-70 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
                            <View className="flex-row justify-between items-center h-full">
                                <View>
                                    <Text className="font-bold text-gray-500 line-through text-base">CS204: Data Struct.</Text>
                                    <Text className="text-gray-400 text-xs font-medium">Lab 2 • Finished</Text>
                                </View>
                                <View className="bg-green-100 p-1 rounded-full">
                                    <CheckCircle size={18} color="#16A34A" />
                                </View>
                            </View>
                        </Card>
                    </View>

                    {/* Item 2 */}
                    <View className="flex-row mb-0">
                        <View className="items-center mr-4 w-10 pt-1">
                            <Text className={`font-bold text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>12:00</Text>
                            <View className={`flex-1 w-[2px] mt-2 min-h-[100px] ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
                        </View>
                        <View className="flex-1 mb-6">
                            <Card className={`border-l-4 border-l-yellow-400 shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                                <View className="flex-row justify-between mb-1">
                                    <Text className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>CS305: Web Dev</Text>
                                    <View className="bg-yellow-50 px-2 py-1 rounded border border-yellow-100"><Text className="text-yellow-700 text-[10px] font-extrabold uppercase tracking-wide">Upcoming</Text></View>
                                </View>
                                <Text className={`text-xs font-medium mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Lecture Hall B</Text>
                                <TouchableOpacity className={`py-2.5 rounded-lg items-center border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                                    <Text className={`font-bold text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>View Details</Text>
                                </TouchableOpacity>
                            </Card>
                        </View>
                    </View>

                    {/* Item 3 */}
                    <View className="flex-row">
                        <View className="items-center mr-4 w-10 pt-1">
                            <Text className={`font-bold text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>02:00</Text>
                        </View>
                        <Card className={`flex-1 h-20 justify-center shadow-sm ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                            <View className="flex-row items-center">
                                <View className={`w-10 h-10 rounded-xl items-center justify-center mr-3 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                    <Users size={20} color={isDark ? "#D1D5DB" : "#6B7280"} />
                                </View>
                                <View>
                                    <Text className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>Faculty Meeting</Text>
                                    <Text className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Conf. Room A</Text>
                                </View>
                            </View>
                        </Card>
                    </View>
                </View>

                <Text className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>My Courses</Text>

                <View className={`rounded-2xl shadow-sm mb-6 border overflow-hidden divide-y ${isDark ? 'bg-gray-800 border-gray-700 divide-gray-700' : 'bg-white border-gray-50 divide-gray-100'}`}>
                    <TouchableOpacity className="flex-row justify-between items-center p-4 active:bg-gray-50/10">
                        <View className="flex-row items-center">
                            <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center mr-4">
                                <Text className="font-bold text-blue-600 text-xs">CS</Text>
                            </View>
                            <View>
                                <Text className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>CS101</Text>
                                <Text className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Intro to Algorithms</Text>
                            </View>
                        </View>
                        <ChevronRight size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity className="flex-row justify-between items-center p-4 active:bg-gray-50/10">
                        <View className="flex-row items-center">
                            <View className="w-10 h-10 bg-purple-100 rounded-xl items-center justify-center mr-4">
                                <Text className="font-bold text-purple-600 text-xs">WD</Text>
                            </View>
                            <View>
                                <Text className={`font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>CS305</Text>
                                <Text className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Web Development</Text>
                            </View>
                        </View>
                        <ChevronRight size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    <TouchableOpacity className={`p-4 items-center justify-center ${isDark ? 'bg-gray-700/50' : 'bg-gray-50/50'}`}>
                        <Text className="text-blue-600 font-bold text-sm">View All Courses</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
