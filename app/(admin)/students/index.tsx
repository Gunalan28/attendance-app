import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, MoreVertical } from 'lucide-react-native';
import Input from '../../../components/common/Input';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';

const students = [
    { id: '1', name: 'John Doe', roll: '2023001', dept: 'Computer Science', attendance: 95, status: 'Present' },
    { id: '2', name: 'Alice Smith', roll: '2023045', dept: 'Mathematics', attendance: 88, status: 'Present' },
    { id: '3', name: 'Michael Brown', roll: '2023012', dept: 'Physics', attendance: 65, status: 'Absent', lowAttendance: true },
    { id: '4', name: 'Emily Johnson', roll: '2023089', dept: 'Computer Science', attendance: 100, status: 'Present' },
    { id: '5', name: 'David Williams', roll: '2023056', dept: 'Engineering', attendance: 91, status: 'Absent' },
];

export default function StudentList() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">Student List</Text>
                    <TouchableOpacity onPress={() => console.log('Filter')} className="p-2">
                        <MoreVertical size={24} color={isDark ? "#D1D5DB" : "gray"} />
                    </TouchableOpacity>
                </View>

                <Input placeholder="Search students..." value="" onChangeText={() => { }} />

                {/* Filter Pills */}
                <View className="mt-4">
                    <Text className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Filter by Department</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1 px-1">
                        {['All Departments', 'Computer Science', 'Engineering', 'Mathematics'].map((d, i) => (
                            <TouchableOpacity key={d} className={`px-4 py-2 rounded-full mr-2 ${i === 0 ? 'bg-blue-600' : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                                <Text className={`font-medium ${i === 0 ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>{d}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View className="px-5 py-2 flex-row justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <Text className="text-blue-600 dark:text-blue-400 font-bold">Sort by Name</Text>
                <Filter size={16} color={isDark ? "#60A5FA" : "#2563EB"} />
            </View>

            <FlatList
                data={students}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 mb-4"
                        onPress={() => router.push('/(admin)/students/1')}
                    >
                        <View className="flex-row items-center mb-3">
                            <View className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-3">
                                <Text className="text-blue-600 dark:text-blue-400 font-bold text-lg">{item.name.charAt(0)}{item.name.split(' ')[1]?.charAt(0)}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</Text>
                                <Text className="text-gray-500 dark:text-gray-400 text-sm">ID: {item.roll} • {item.dept}</Text>
                            </View>
                            {item.lowAttendance && <View className="w-3 h-3 bg-orange-400 rounded-full absolute top-0 right-0" />}
                        </View>

                        <View className="flex-row items-center">
                            <Text className="text-gray-500 dark:text-gray-400 font-medium w-24">Attendance:</Text>
                            <View className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mr-3">
                                <View
                                    className={`h-full rounded-full ${item.attendance < 75 ? 'bg-orange-400' : 'bg-green-500 dark:bg-green-400'}`}
                                    style={{ width: `${item.attendance}%` }}
                                />
                            </View>
                            <Text className={`font-bold ${item.attendance < 75 ? 'text-orange-500 dark:text-orange-400' : 'text-green-600 dark:text-green-400'}`}>
                                {item.attendance}%
                            </Text>
                        </View>

                        {item.lowAttendance && (
                            <View className="mt-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30 p-2 rounded-lg">
                                <Text className="text-orange-700 dark:text-orange-300 text-xs font-bold">Low Attendance Warning</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}
