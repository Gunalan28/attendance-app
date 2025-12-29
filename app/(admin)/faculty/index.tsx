import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Mail, Phone, Plus } from 'lucide-react-native';
import Input from '../../../components/common/Input';

const faculty = [
    { id: '1', name: 'Dr. Sarah Wilson', dept: 'Computer Science', role: 'Professor', active: true },
    { id: '2', name: 'Dr. James Carter', dept: 'Physics', role: 'Assoc. Professor', active: false },
    { id: '3', name: 'Prof. Emily Chen', dept: 'Mathematics', role: 'Lecturer', active: true },
    { id: '4', name: 'Dr. Michael Ross', dept: 'Chemistry', role: 'Professor', active: true },
];

export default function FacultyList() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-5 py-4 border-b border-gray-100">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-2xl font-bold text-gray-900">Staffs</Text>
                    <TouchableOpacity className="bg-blue-600 p-2 rounded-full">
                        <Plus size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Input placeholder="Search staff..." value="" onChangeText={() => { }} />
            </View>

            <FlatList
                data={faculty}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <View className="flex-row items-center bg-white mb-4 p-3 rounded-2xl shadow-sm border border-gray-50">
                        <View className="w-14 h-14 bg-gray-200 rounded-full mr-4" />
                        <View className="flex-1">
                            <View className="flex-row justify-between">
                                <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                                {item.active && <View className="w-2 h-2 bg-green-500 rounded-full mt-2" />}
                            </View>
                            <Text className="text-gray-500 text-sm">{item.role} • {item.dept}</Text>

                            <View className="flex-row mt-2 gap-3">
                                <TouchableOpacity className="bg-gray-50 p-2 rounded-lg"><Mail size={16} color="gray" /></TouchableOpacity>
                                <TouchableOpacity className="bg-gray-50 p-2 rounded-lg"><Phone size={16} color="gray" /></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
