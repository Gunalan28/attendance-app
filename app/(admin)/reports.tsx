import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, Filter, Download, AlertTriangle, TrendingUp, TrendingDown, Clock, CheckCircle2, XCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Card from '../../components/common/Card';
import { useColorScheme } from 'nativewind';

const { width } = Dimensions.get('window');

// Mock Data for "Detailed Breakdown"
const detailedStats = [
    { id: 1, name: 'Computer Science - A', attendance: '92%', status: 'excellent' },
    { id: 2, name: 'Mechanical Eng - B', attendance: '78%', status: 'average' },
    { id: 3, name: 'Civil Eng - A', attendance: '65%', status: 'low' },
];

export default function Reports() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'excellent': return 'text-green-600 dark:text-green-400';
            case 'average': return 'text-yellow-600 dark:text-yellow-400';
            case 'low': return 'text-red-500 dark:text-red-400';
            default: return 'text-gray-900 dark:text-white';
        }
    };

    const getStatusBg = (status: string) => {
        switch (status) {
            case 'excellent': return 'bg-green-100 dark:bg-green-900/30';
            case 'average': return 'bg-yellow-100 dark:bg-yellow-900/30';
            case 'low': return 'bg-red-100 dark:bg-red-900/30';
            default: return 'bg-gray-100 dark:bg-gray-800';
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-4">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <ArrowLeft size={24} color={isDark ? "white" : "#111827"} />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">Reports & Analytics</Text>
                <View className="w-8" />
            </View>

            <ScrollView className="px-5 pt-2 mb-20" showsVerticalScrollIndicator={false}>

                {/* Filters */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 flex-row">
                    <TouchableOpacity className="flex-row items-center bg-white dark:bg-gray-800 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 mr-3">
                        <Calendar size={16} color={isDark ? "#9CA3AF" : "#6B7280"} className="mr-2" />
                        <Text className="text-gray-700 dark:text-gray-300 font-medium text-sm">Oct 2023</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center bg-white dark:bg-gray-800 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 mr-3">
                        <Filter size={16} color={isDark ? "#9CA3AF" : "#6B7280"} className="mr-2" />
                        <Text className="text-gray-700 dark:text-gray-300 font-medium text-sm">Department</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center bg-white dark:bg-gray-800 px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 mr-3">
                        <Text className="text-gray-700 dark:text-gray-300 font-medium text-sm">Year 1</Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Date-Specific Stats */}
                <View className="flex-row gap-4 mb-6">
                    <View className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Avg Attendance</Text>
                        <View className="flex-row items-baseline mb-1">
                            <Text className="text-3xl font-extrabold text-gray-900 dark:text-white">84%</Text>
                            <Text className="text-green-500 dark:text-green-400 text-xs font-bold ml-2 flex-row items-center">
                                +2.4%
                            </Text>
                        </View>
                        <Text className="text-gray-400 dark:text-gray-500 text-[10px]">vs. last month</Text>
                    </View>
                    <View className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Classes</Text>
                        <View className="flex-row items-baseline mb-1">
                            <Text className="text-3xl font-extrabold text-gray-900 dark:text-white">120</Text>
                        </View>
                        <Text className="text-gray-400 dark:text-gray-500 text-[10px]">Across all depts</Text>
                    </View>
                </View>

                {/* Alert Section */}
                <View className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl flex-row items-start mb-8 border border-red-100 dark:border-red-800">
                    <AlertTriangle size={20} color="#EF4444" className="mt-0.5 mr-3" />
                    <View className="flex-1">
                        <Text className="text-red-700 dark:text-red-400 font-bold text-sm mb-1">Low Attendance Alert</Text>
                        <Text className="text-red-600 dark:text-red-400/80 text-xs leading-5">
                            <Text className="font-bold">12 students</Text> have fallen below the 75% threshold this week.
                        </Text>
                    </View>
                </View>

                {/* Chart Mockup */}
                <Text className="text-gray-900 dark:text-white font-bold text-lg mb-4">Attendance Trends</Text>
                <Card className="bg-white dark:bg-gray-800 p-5 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm mb-8">
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase">Last 30 Days</Text>
                        {/* Simple Legend */}
                        <View className="flex-row gap-3">
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 rounded-full bg-blue-500 mr-1.5" />
                                <Text className="text-[10px] text-gray-400 dark:text-gray-500">Present</Text>
                            </View>
                            <View className="flex-row items-center">
                                <View className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 mr-1.5" />
                                <Text className="text-[10px] text-gray-400 dark:text-gray-500">Absent</Text>
                            </View>
                        </View>
                    </View>

                    {/* Bars Container */}
                    <View className="flex-row justify-between items-end h-32 px-2">
                        {/* Mock Bars */}
                        {[60, 85, 45, 90].map((h, i) => (
                            <View key={i} className="items-center gap-2">
                                <View className="w-8 bg-gray-100 dark:bg-gray-700 rounded-t-lg relative h-full justify-end overflow-hidden">
                                    <View style={{ height: `${h}%` }} className="w-full bg-blue-500 rounded-t-lg" />
                                </View>
                                <Text className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">W{i + 1}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* Detailed List */}
                <Text className="text-gray-900 dark:text-white font-bold text-lg mb-4">Detailed Breakdown</Text>
                <View className="gap-3">
                    {detailedStats.map((item) => (
                        <View key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex-row items-center justify-between">
                            <View className="flex-row items-center gap-3">
                                <View className={`w-10 h-10 rounded-full items-center justify-center ${getStatusBg(item.status)}`}>
                                    {item.status === 'excellent' ? <CheckCircle2 size={18} color="#16A34A" /> :
                                        item.status === 'low' ? <XCircle size={18} color="#EF4444" /> :
                                            <Clock size={18} color="#CA8A04" />}
                                </View>
                                <View>
                                    <Text className="text-gray-900 dark:text-white font-bold text-sm">{item.name}</Text>
                                    <Text className="text-gray-400 dark:text-gray-500 text-[10px] uppercase font-bold mt-0.5">Overall Performance</Text>
                                </View>
                            </View>
                            <Text className={`font-extrabold text-lg ${getStatusColor(item.status)}`}>{item.attendance}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>

            {/* Floating Action Button */}
            <View className="absolute bottom-6 left-0 right-0 items-center px-10">
                <TouchableOpacity className="w-full bg-gray-900 dark:bg-blue-600 py-4 rounded-2xl shadow-xl flex-row items-center justify-center">
                    <Download size={20} color="white" className="mr-2" />
                    <Text className="text-white font-bold text-base">Download Report</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}
