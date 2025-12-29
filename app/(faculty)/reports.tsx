import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, ChevronDown, Users, GraduationCap, AlertTriangle, MoreHorizontal, Download } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useFacultyTheme } from '../../components/context/FacultyContext';

export default function ReportsAnalytics() {
    const router = useRouter();
    const { isDark } = useFacultyTheme();

    const chartData = [
        { label: 'W1', value: 60 },
        { label: 'W2', value: 45 },
        { label: 'W3', value: 85 },
        { label: 'W4', value: 90 },
    ];

    const breakdownData = [
        { initial: 'CS', name: 'Computer Science - A', session: 'Morning Session', percentage: 94, status: 'Present', color: 'bg-gray-200', text: 'text-gray-700' },
        { initial: 'ME', name: 'Mechanical Eng - B', session: 'Afternoon Session', percentage: 78, status: 'Present', color: 'bg-gray-200', text: 'text-gray-700' },
        { initial: 'CV', name: 'Civil Eng - A', session: 'Lab Session', percentage: 62, status: 'Present', color: 'bg-gray-200', text: 'text-gray-700' },
    ];

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <View className={`px-5 py-4 flex-row items-center border-b ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color={isDark ? "white" : "black"} />
                </TouchableOpacity>
                <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Reports & Analytics</Text>
            </View>

            <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>

                {/* Filters */}
                <View className="flex-row justify-between mb-6">
                    <TouchableOpacity className="flex-row items-center bg-blue-500 px-4 py-2.5 rounded-xl">
                        <Text className="text-white font-bold mr-2 text-xs">Oct 2023</Text>
                        <Calendar size={14} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity className={`flex-row items-center border px-4 py-2.5 rounded-xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <Text className={`font-bold mr-2 text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Department</Text>
                        <ChevronDown size={14} color={isDark ? "#D1D5DB" : "#374151"} />
                    </TouchableOpacity>

                    <TouchableOpacity className={`flex-row items-center border px-4 py-2.5 rounded-xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <Text className={`font-bold mr-2 text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Year</Text>
                        <ChevronDown size={14} color={isDark ? "#D1D5DB" : "#374151"} />
                    </TouchableOpacity>
                </View>

                {/* Stats Cards */}
                <View className="flex-row gap-4 mb-6">
                    {/* Card 1 */}
                    <View className={`flex-1 p-4 rounded-2xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <View className="flex-row justify-between items-start mb-2">
                            <View className={`p-2 rounded-lg ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`}>
                                <Users size={20} color="#16A34A" />
                            </View>
                            <View className={`px-2 py-1 rounded-full ${isDark ? 'bg-green-900/30' : 'bg-green-50'}`}>
                                <Text className="text-green-700 text-[10px] font-bold">+2.4%</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Avg Attendance</Text>
                        <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>84%</Text>
                    </View>

                    {/* Card 2 */}
                    <View className={`flex-1 p-4 rounded-2xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                        <View className="flex-row justify-between items-start mb-2">
                            <View className={`p-2 rounded-lg ${isDark ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                                <GraduationCap size={20} color="#2563EB" />
                            </View>
                            <View className={`px-2 py-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <Text className={`text-[10px] font-bold ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>0%</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-1">Total Classes</Text>
                        <Text className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>120</Text>
                    </View>
                </View>

                {/* Alert Card */}
                <TouchableOpacity className={`p-4 rounded-2xl border flex-row items-center mb-6 ${isDark ? 'bg-red-900/20 border-red-900/30' : 'bg-red-50 border-red-100'}`}>
                    <View className={`p-2 rounded-full mr-3 ${isDark ? 'bg-red-900/30' : 'bg-red-100'}`}>
                        <AlertTriangle size={20} color="#DC2626" />
                    </View>
                    <View className="flex-1">
                        <Text className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Low Attendance Alert</Text>
                        <Text className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>12 students below 75% threshold</Text>
                    </View>
                    <ChevronDown size={20} color="#9CA3AF" style={{ transform: [{ rotate: '-90deg' }] }} />
                </TouchableOpacity>

                {/* Trends Chart */}
                <View className={`p-5 rounded-2xl shadow-sm border mb-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <View className="flex-row justify-between items-start mb-6">
                        <View>
                            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Attendance Trends</Text>
                            <Text className="text-gray-500 text-xs">Last 30 Days</Text>
                        </View>
                        <TouchableOpacity>
                            <MoreHorizontal size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>

                    {/* Bar Chart Implementation */}
                    <View className="flex-row justify-between items-end h-40 px-4">
                        {chartData.map((item, index) => (
                            <View key={index} className="items-center w-12 group">
                                {index === 0 && (
                                    <View className={`absolute -top-8 px-2 py-1 rounded mb-1 w-full items-center opacity-50 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                        {/* Tooltip placeholder style */}
                                    </View>
                                )}
                                <View
                                    className={`w-full rounded-t-lg bg-blue-500`} // All blue in design
                                    style={{ height: `${item.value}%` }}
                                />
                                <Text className="text-gray-500 text-xs font-bold mt-2">{item.label}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Detailed Breakdown */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Detailed Breakdown</Text>
                    <TouchableOpacity>
                        <Text className="text-blue-500 font-bold text-sm">View All</Text>
                    </TouchableOpacity>
                </View>

                <View className="mb-6">
                    {breakdownData.map((item, index) => (
                        <TouchableOpacity key={index} className={`p-4 rounded-2xl shadow-sm border mb-3 flex-row items-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                            <View className={`w-12 h-12 rounded-full items-center justify-center mr-3 ${isDark ? 'bg-gray-700' : item.color}`}>
                                <Text className={`font-bold text-sm ${isDark ? 'text-white' : item.text}`}>{item.initial}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className={`font-bold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</Text>
                                <Text className="text-gray-500 text-xs">{item.session}</Text>
                            </View>
                            <View className="items-end">
                                <Text className={`font-bold text-sm ${item.percentage < 75 ? 'text-red-500' : item.percentage < 80 ? 'text-yellow-600' : 'text-green-600'}`}>
                                    {item.percentage}%
                                </Text>
                                <Text className="text-gray-400 text-[10px] uppercase font-bold">{item.status}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity className="bg-blue-500 py-4 rounded-xl flex-row justify-center items-center mb-8 shadow-blue-200 shadow-lg">
                    <Download size={20} color="white" className="mr-2" />
                    <Text className="text-white font-bold text-base ml-2">Download Report</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}
