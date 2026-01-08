import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useMemo, useEffect } from 'react';
import { Mail, Lock, Shield, Eye, EyeOff, Briefcase, ArrowRight, GraduationCap, School } from 'lucide-react-native';
import { EducationLoader } from '../../components/common/EducationLoader';
import { useAuth } from '../../components/context/AuthContext';
import { api } from '../../services/api';

import Input from '../../components/common/Input';
import images from '../../constants/images';

export default function Login() {
    const router = useRouter();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login: setGlobalUser } = useAuth();

    // Auto-fill credentials when role changes (UX improvement)
    useEffect(() => {
        switch (role) {
            case 'student':
                setIdentifier('student@college.edu');
                setPassword('123456');
                break;
            case 'faculty':
                setIdentifier('sarah.wilson@college.edu');
                setPassword('123456');
                break;
            case 'admin':
                setIdentifier('admin@college.edu');
                setPassword('123456');
                break;
        }
    }, [role]);

    const handleLogin = async () => {
        if (!identifier.trim() || !password.trim()) {
            Alert.alert('Credentials Required', 'Please enter your email and password to sign in.');
            return;
        }
        setLoading(true);

        try {
            // BYPASS AUTHENTICATION AS REQUESTED
            // Automatically log in as a demo user for the selected role
            let demoId;
            switch (role) {
                case 'student': demoId = 3; break; // Alex Johnson
                case 'faculty': demoId = 2; break; // Sarah Wilson
                case 'admin': demoId = 1; break;   // Admin
            }

            // Fetch user details simply to populate the context with correct name/image
            // We skip password verification entirely.
            const userDetails = await api.getUser(demoId);

            if (userDetails) {
                setGlobalUser({ ...userDetails, role }); // Ensure role matches selected tab

                setTimeout(() => {
                    setLoading(false);
                    if (role === 'admin') router.replace('/(admin)/dashboard');
                    else if (role === 'faculty') router.replace('/(faculty)/dashboard');
                    else router.replace('/(student)/dashboard');
                }, 1000); // Shorter delay for snappier feel
            } else {
                throw new Error('Demo user not found');
            }
        } catch (error: any) {
            console.error(error);
            setLoading(false);
            alert(error.message || 'Login Error. Ensure Backend is running.');
        }
    };

    const roleConfig = useMemo(() => {
        switch (role) {
            case 'student':
                return {
                    label: 'Email Address',
                    placeholder: 'e.g., student@example.com',
                    icon: <Mail size={20} color="#6B7280" />
                };
            case 'faculty':
                return {
                    label: 'Email Address',
                    placeholder: 'e.g., faculty@example.com',
                    icon: <Mail size={20} color="#6B7280" />
                };
            case 'admin':
                return {
                    label: 'Email Address',
                    placeholder: 'e.g., admin@example.com',
                    icon: <Mail size={20} color="#6B7280" />
                };
        }
    }, [role]);

    return (
        <View className="flex-1 bg-white">
            <EducationLoader visible={loading} message={`Accessing ${role.charAt(0).toUpperCase() + role.slice(1)} Portal...`} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
                {/* Header Image Section */}
                <View className="h-[35vh] w-full relative">
                    <Image
                        source={{ uri: images.university }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-black/40" />

                    <View className="absolute bottom-12 left-6 right-6">
                        <View className="flex-row items-center space-x-2 bg-white/20 self-start px-3 py-1.5 rounded-lg mb-4 backdrop-blur-sm">
                            <School size={16} color="#ffffff" />
                            <Text className="text-white font-bold text-xs tracking-wider">UNIVERSITY PORTAL</Text>
                        </View>
                        <Text className="text-white text-4xl font-extrabold shadow-sm">College Name</Text>
                    </View>
                </View>

                {/* Form Section */}
                <View className="flex-1 bg-white px-6 pt-8 -mt-6 rounded-t-3xl shadow-lg">
                    {/* Role Tabs */}
                    <View className="flex-row bg-gray-100 p-1.5 rounded-xl mb-8">
                        {(['student', 'faculty', 'admin'] as const).map((r) => (
                            <TouchableOpacity
                                key={r}
                                onPress={() => setRole(r)}
                                style={{
                                    flex: 1,
                                    paddingVertical: 10,
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: role === r ? 'white' : 'transparent',
                                    shadowColor: role === r ? '#000' : undefined,
                                    shadowOffset: role === r ? { width: 0, height: 1 } : undefined,
                                    shadowOpacity: role === r ? 0.05 : undefined,
                                    shadowRadius: role === r ? 2 : undefined,
                                    elevation: role === r ? 1 : 0
                                }}
                            >
                                <Text className={`capitalize font-bold text-sm ${role === r ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {r}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="space-y-6">
                        <Input
                            label={roleConfig.label}
                            placeholder={roleConfig.placeholder}
                            value={identifier}
                            onChangeText={setIdentifier}
                            leftIcon={roleConfig.icon}
                            forceLightMode
                        // Cosmetic only
                        />

                        <View>
                            <View className="flex-row justify-between items-center mb-1">
                                <Text className="text-gray-700 font-bold text-xs uppercase ml-1 tracking-wider">Password</Text>
                            </View>
                            <Input
                                placeholder="Any password works"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                leftIcon={<Lock size={20} color="#6B7280" />}
                                rightIcon={
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <EyeOff size={20} color="#9CA3AF" />
                                        ) : (
                                            <Eye size={20} color="#9CA3AF" />
                                        )}
                                    </TouchableOpacity>
                                }
                                forceLightMode
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleLogin}
                            disabled={loading}
                            className="bg-blue-600 w-full py-4 rounded-xl items-center flex-row justify-center space-x-2 active:bg-blue-700 shadow-blue-200 shadow-lg mt-2"
                        >
                            <Text className="text-white font-bold text-lg">Sign In</Text>
                            <ArrowRight size={20} color="white" />
                        </TouchableOpacity>

                        <View className="flex-row justify-center items-center mt-6 mb-8">
                            <Text className="text-gray-500">New to the portal? </Text>
                            <TouchableOpacity>
                                <Text className="text-blue-600 font-bold">Get Help</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="items-center mt-auto mb-6">
                        <Text className="text-gray-400 text-xs text-center">© 2026 College Attendance System</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
