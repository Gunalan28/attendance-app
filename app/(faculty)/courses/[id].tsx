import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Calendar, Clock } from 'lucide-react-native';
import Card from '../../../components/common/Card';

const history = [
    { id: '1', date: '24 Oct', topic: 'Graph Theory', present: 40, absent: 5, status: 'Completed' },
    { id: '2', date: '22 Oct', topic: 'Trees & Heaps', present: 42, absent: 3, status: 'Completed' },
    { id: '3', date: '20 Oct', topic: 'Hashing', present: 38, absent: 7, status: 'Completed' },
];

export default function CourseDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-blue-600 px-5 pt-4 pb-8 rounded-b-3xl mb-4">
                <TouchableOpacity onPress={() => router.back()} className="mb-4">
                    <ArrowLeft size={24} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-3xl font-bold mb-1">{id}</Text>
                <Text className="text-blue-100 text-lg">Intro to Algorithms</Text>

                <View className="flex-row mt-6 gap-4">
                    <View className="flex-row items-center bg-blue-500 px-3 py-1 rounded-full">
                        <Users size={16} color="white" />
                        <Text className="text-white ml-2 font-bold">45 Students</Text>
                    </View>
                    <View className="flex-row items-center bg-blue-500 px-3 py-1 rounded-full">
                        <Clock size={16} color="white" />
                        <Text className="text-white ml-2 font-bold">Mon, Wed 10AM</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="px-5">
                <Text className="text-lg font-bold text-gray-900 mb-4">Recent Classes</Text>

                {history.map((item) => (
                    <Card key={item.id} className="mb-4">
                        <View className="flex-row justify-between items-center mb-2">
                            <View className="flex-row items-center">
                                <View className="bg-gray-100 px-3 py-2 rounded-lg items-center mr-3">
                                    <Text className="text-xs text-gray-500 uppercase font-bold">{item.date.split(' ')[1]}</Text>
                                    <Text className="text-lg font-bold text-gray-900">{item.date.split(' ')[0]}</Text>
                                </View>
                                <View>
                                    <Text className="font-bold text-gray-900 text-lg">{item.topic}</Text>
                                    <Text className="text-gray-500 text-xs">Lecture • {item.status}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => router.push(`/(faculty)/attendance/${id}`)} className="bg-gray-50 p-2 rounded-full border border-gray-100">
                                <Calendar size={20} color="#2563EB" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row mt-2 bg-gray-50 rounded-lg p-3">
                            <View className="flex-1 items-center border-r border-gray-200">
                                <Text className="text-xs text-gray-400 font-bold uppercase">Present</Text>
                                <Text className="text-green-600 font-bold text-lg">{item.present}</Text>
                            </View>
                            <View className="flex-1 items-center">
                                <Text className="text-xs text-gray-400 font-bold uppercase">Absent</Text>
                                <Text className="text-red-500 font-bold text-lg">{item.absent}</Text>
                            </View>
                        </View>
                    </Card>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
