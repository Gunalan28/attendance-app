import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../../components/common/Card';

const courses = [
    { id: 'CS101', name: 'Intro to Algorithms', students: 45, nextClass: 'Today, 10:00 AM' },
    { id: 'CS305', name: 'Web Development', students: 38, nextClass: 'Tomorrow, 09:00 AM' },
    { id: 'CS204', name: 'Data Structures', students: 42, nextClass: 'Wed, 02:00 PM' },
];

export default function Courses() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="px-5 py-4 bg-white border-b border-gray-100 mb-4">
                <Text className="text-2xl font-bold text-gray-900">My Courses</Text>
            </View>

            <FlatList
                data={courses}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/(faculty)/courses/${item.id}`)}>
                        <Card className="mb-4">
                            <View className="flex-row justify-between items-start mb-2">
                                <View className="bg-blue-100 px-3 py-1 rounded-lg">
                                    <Text className="text-blue-700 font-bold">{item.id}</Text>
                                </View>
                                <Text className="text-gray-400 text-xs">Next: {item.nextClass}</Text>
                            </View>
                            <Text className="text-xl font-bold text-gray-900 mb-1">{item.name}</Text>
                            <Text className="text-gray-500">{item.students} Students Enrolled</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}
