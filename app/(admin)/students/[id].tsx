import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, Phone, Edit } from 'lucide-react-native';
import Card from '../../../components/common/Card';
import { useColorScheme } from 'nativewind';

export default function StudentDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <View className="bg-blue-600 dark:bg-blue-700 pb-10 pt-4 px-5 rounded-b-3xl">
                <View className="flex-row justify-between items-center mb-6">
                    <TouchableOpacity onPress={() => router.back()}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-blue-500 dark:bg-blue-600 p-2 rounded-full">
                        <Edit size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="items-center">
                    <View className="w-24 h-24 bg-blue-200 dark:bg-blue-300 rounded-full border-4 border-white dark:border-gray-800 mb-3" />
                    <Text className="text-white text-2xl font-bold">John Doe</Text>
                    <Text className="text-blue-100 dark:text-blue-200">ID: 2023001 • Computer Science</Text>
                </View>
            </View>

            <ScrollView className="px-5 -mt-6">
                <Card className="mb-4 bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                    <View className="flex-row justify-between items-center mb-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                        <View>
                            <Text className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase">Overall Attendance</Text>
                            <Text className="text-3xl font-bold text-gray-900 dark:text-white mt-1">95%</Text>
                        </View>
                        <View className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                            <Text className="text-green-700 dark:text-green-400 font-bold text-xs">Good</Text>
                        </View>
                    </View>
                    <View className="flex-row justify-around">
                        <View className="items-center">
                            <Text className="text-lg font-bold text-gray-900 dark:text-white">120</Text>
                            <Text className="text-xs text-gray-400 dark:text-gray-500">Total</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-lg font-bold text-green-600 dark:text-green-400">114</Text>
                            <Text className="text-xs text-gray-400 dark:text-gray-500">Present</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-lg font-bold text-red-500 dark:text-red-400">6</Text>
                            <Text className="text-xs text-gray-400 dark:text-gray-500">Absent</Text>
                        </View>
                    </View>
                </Card>

                <View className="space-y-4 mb-20">
                    <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                        <View className="flex-row items-center mb-3">
                            <Mail size={16} color={isDark ? "#9CA3AF" : "gray"} className="mr-2" />
                            <Text className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold ml-2">Email</Text>
                        </View>
                        <Text className="text-gray-900 dark:text-white font-medium">john.doe@college.edu</Text>
                    </Card>
                    <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700">
                        <View className="flex-row items-center mb-3">
                            <Phone size={16} color={isDark ? "#9CA3AF" : "gray"} className="mr-2" />
                            <Text className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold ml-2">Phone</Text>
                        </View>
                        <Text className="text-gray-900 dark:text-white font-medium">+1 987 654 3210</Text>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
