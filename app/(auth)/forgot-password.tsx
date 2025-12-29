import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useState } from 'react';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-white px-6">
            <TouchableOpacity onPress={() => router.back()} className="mt-4 mb-6">
                <ArrowLeft size={24} color="#1F2937" />
            </TouchableOpacity>

            <Text className="text-3xl font-bold text-gray-900 mb-2">Reset Password</Text>
            <Text className="text-gray-500 mb-8">Enter your email address and we'll send you a link to reset your password.</Text>

            <Input
                label="Email Address"
                placeholder="name@college.edu"
                value={email}
                onChangeText={setEmail}
                className="mb-6"
            />

            <Button title="Send Reset Link" onPress={() => router.back()} />
        </SafeAreaView>
    );
}
