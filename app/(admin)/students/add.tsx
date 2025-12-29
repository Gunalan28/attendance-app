import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, UserPlus } from 'lucide-react-native';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import { useState } from 'react';

export default function AddStudent() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        roll: '',
        phone: '',
        dept: '',
        year: ''
    });

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-5 py-4 border-b border-gray-100 flex-row items-center">
                <TouchableOpacity onPress={() => router.back()} className="mr-4">
                    <ArrowLeft size={24} color="#1F2937" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900">Add New Student</Text>
            </View>

            <ScrollView className="flex-1 px-5 pt-6">
                <View className="items-center mb-8">
                    <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center border-2 border-dashed border-blue-200 mb-2">
                        <UserPlus size={40} color="#3B82F6" />
                    </View>
                    <Text className="text-blue-600 font-medium">Upload Photo</Text>
                </View>

                <View className="space-y-4 mb-8">
                    <Input label="Full Name" placeholder="e.g. John Doe" value={formData.name} onChangeText={t => handleChange('name', t)} />
                    <Input label="Roll Number" placeholder="e.g. CS2023001" value={formData.roll} onChangeText={t => handleChange('roll', t)} />
                    <Input label="Email Address" placeholder="john@college.edu" value={formData.email} onChangeText={t => handleChange('email', t)} />
                    <Input label="Phone Number" placeholder="+1 234 567 8900" value={formData.phone} onChangeText={t => handleChange('phone', t)} />

                    <View className="flex-row gap-4">
                        <View className="flex-1">
                            <Input label="Department" placeholder="CSE" value={formData.dept} onChangeText={t => handleChange('dept', t)} />
                        </View>
                        <View className="flex-1">
                            <Input label="Year/Sem" placeholder="3rd Sem" value={formData.year} onChangeText={t => handleChange('year', t)} />
                        </View>
                    </View>
                </View>

                <Button title="Save Student Profile" onPress={() => router.back()} className="mb-4" />
            </ScrollView>
        </SafeAreaView>
    );
}
