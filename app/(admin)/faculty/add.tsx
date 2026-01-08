import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../../components/common/Input';
import { useRouter, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import { api } from '../../../services/api';
import { ChevronLeft } from 'lucide-react-native';
import AnimatedAlert, { AnimatedAlertProps } from '../../../components/common/AnimatedAlert';

export default function AddFaculty() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [alertConfig, setAlertConfig] = useState<AnimatedAlertProps>({
        visible: false,
        title: '',
        message: '',
        type: 'warning',
        onClose: () => setAlertConfig(prev => ({ ...prev, visible: false }))
    });
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        department: 'Information Technology'
    });

    useFocusEffect(
        useCallback(() => {
            setForm({
                name: '',
                email: '',
                password: '',
                department: 'Information Technology'
            });
            setAlertConfig(prev => ({ ...prev, visible: false }));
            setLoading(false);
        }, [])
    );

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.password || !form.department) {
            setAlertConfig({
                visible: true,
                title: 'Missing Fields',
                message: 'Please fill all required fields',
                type: 'warning',
                onClose: () => setAlertConfig(prev => ({ ...prev, visible: false }))
            });
            return;
        }

        setLoading(true);
        try {
            await api.addFaculty(form);
            setAlertConfig({
                visible: true,
                title: 'Success!',
                message: 'Faculty added successfully',
                type: 'success',
                onClose: () => {
                    setAlertConfig(prev => ({ ...prev, visible: false }));
                    router.navigate('/(admin)/faculty');
                }
            });
        } catch (error: any) {
            setAlertConfig({
                visible: true,
                title: 'Error',
                message: error.message || 'Failed to add faculty',
                type: 'error',
                onClose: () => setAlertConfig(prev => ({ ...prev, visible: false }))
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <View className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex-row items-center">
                <TouchableOpacity onPress={() => router.navigate('/(admin)/faculty')} className="mr-4">
                    <ChevronLeft size={24} color="#374151" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-gray-900 dark:text-white">Add New Faculty</Text>
            </View>

            <ScrollView className="flex-1 p-5">
                <View className="space-y-6">
                    <View>
                        <Text className="text-gray-700 dark:text-gray-300 font-medium">Full Name</Text>
                        <Input
                            className='mb-6'
                            placeholder="Dr. Jane Doe"
                            value={form.name}
                            onChangeText={(text) => setForm({ ...form, name: text })}
                        />
                    </View>

                    <View>
                        <Text className="text-gray-700 dark:text-gray-300 font-medium">Email Address</Text>
                        <Input
                            className='mb-6'
                            placeholder="jane@college.edu"
                            value={form.email}
                            onChangeText={(text) => setForm({ ...form, email: text })}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View>
                        <Text className="text-gray-700 dark:text-gray-300 font-medium">Password</Text>
                        <Input
                            className='mb-6'
                            placeholder="******"
                            value={form.password}
                            onChangeText={(text) => setForm({ ...form, password: text })}
                            secureTextEntry
                        />
                    </View>

                    <View>
                        <Text className="text-gray-700 dark:text-gray-300 font-medium">Department</Text>
                        <Input
                            className='mb-6'
                            placeholder="Information Technology"
                            value={form.department}
                            onChangeText={(text) => setForm({ ...form, department: text })}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading || alertConfig.visible}
                        className={`mt-6 p-4 rounded-xl items-center ${loading || alertConfig.visible ? 'bg-gray-400' : 'bg-purple-600'}`}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white font-bold text-lg">Add Faculty</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <AnimatedAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={alertConfig.onClose}
            />
        </SafeAreaView>
    );
}
