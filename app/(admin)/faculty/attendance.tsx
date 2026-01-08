import { View, Text, FlatList, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import { api } from '../../../services/api';
import { ChevronLeft, UserCheck, Calendar, Check, X } from 'lucide-react-native';
import { EducationLoader } from '../../../components/common/EducationLoader';
import { useColorScheme } from 'nativewind';

interface Faculty {
    id: string;
    name: string;
    dept: string;
    status: 'Present' | 'Absent';
}

import AnimatedAlert from '../../../components/common/AnimatedAlert';

export default function FacultyAttendance() {
    const router = useRouter();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [alertConfig, setAlertConfig] = useState<{ visible: boolean; title: string; message: string; type?: 'warning' | 'success' | 'error' }>({
        visible: false,
        title: '',
        message: '',
        type: 'warning'
    });

    useFocusEffect(
        useCallback(() => {
            loadFaculty();
            return () => {
                // Optional cleanup if needed
                setFaculty([]); // Resetting faculty to empty can prevent flash of old content
                setLoading(true);
            };
        }, [])
    );

    const loadFaculty = async () => {
        try {
            const data = await api.getAdminFaculty();
            // Transform data: ensure 'status' is set for today, defaulting to 'Present' or 'Absent' based on logic if needed
            // For now, if status is 'N/A', default to 'Present' for easier marking
            const mappedData = data.map((f: any) => ({
                id: f.id,
                name: f.name,
                dept: f.dept,
                status: f.status === 'N/A' ? 'Present' : f.status
            }));
            setFaculty(mappedData);
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to load faculty list');
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = (id: string) => {
        setFaculty(prev => prev.map(f => {
            if (f.id === id) {
                return { ...f, status: f.status === 'Present' ? 'Absent' : 'Present' };
            }
            return f;
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const records = faculty.map(f => ({
                faculty_id: f.id,
                status: f.status
            }));

            await api.markFacultyAttendance({ date, records });
            setAlertConfig({
                visible: true,
                title: 'Success',
                message: 'Attendance saved successfully',
                type: 'success'
            });
        } catch (error) {
            console.error(error);
            setAlertConfig({
                visible: true,
                title: 'Error',
                message: 'Failed to save attendance',
                type: 'error'
            });
        } finally {
            setSaving(false);
        }
    };

    const getStats = () => {
        const total = faculty.length;
        const present = faculty.filter(f => f.status === 'Present').length;
        const absent = total - present;
        return { total, present, absent };
    };

    const stats = getStats();

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
                <EducationLoader visible={loading} message="Loading Faculty..." />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            {/* Header */}
            <View className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Pressable onPress={() => router.back()} className="mr-4">
                        <ChevronLeft size={24} color={isDark ? "white" : "#374151"} />
                    </Pressable>
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white">Mark Attendance</Text>
                        <Text className="text-xs text-gray-500 dark:text-gray-400">{new Date(date).toDateString()}</Text>
                    </View>
                </View>
                <Pressable
                    onPress={handleSave}
                    disabled={saving || alertConfig.visible}
                    className={`px-4 py-2 rounded-full ${saving || alertConfig.visible ? 'bg-gray-400' : 'bg-blue-600'}`}
                >
                    {saving ? <ActivityIndicator color="white" size="small" /> : <Text className="text-white font-semibold">Submit</Text>}
                </Pressable>
            </View>

            {/* Stats Bar */}
            <View className="flex-row px-5 py-3 bg-gray-50 dark:bg-gray-800">
                <View className="flex-1 items-center border-r border-gray-200 dark:border-gray-700">
                    <Text className="text-xs text-gray-500 font-medium uppercase">Total</Text>
                    <Text className="text-lg font-bold text-gray-900 dark:text-white">{stats.total}</Text>
                </View>
                <View className="flex-1 items-center border-r border-gray-200 dark:border-gray-700">
                    <Text className="text-xs text-green-600 font-medium uppercase">Present</Text>
                    <Text className="text-lg font-bold text-green-600">{stats.present}</Text>
                </View>
                <View className="flex-1 items-center">
                    <Text className="text-xs text-red-600 font-medium uppercase">Absent</Text>
                    <Text className="text-lg font-bold text-red-600">{stats.absent}</Text>
                </View>
            </View>

            <ScrollView className="flex-1 p-5">
                <View className="space-y-3 pb-10">
                    {faculty.map((item) => (
                        <Pressable
                            key={item.id}
                            onPress={() => toggleStatus(item.id)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 16,
                                borderRadius: 12,
                                borderLeftWidth: 4,
                                backgroundColor: item.status === 'Present' ? (isDark ? 'rgba(20, 83, 45, 0.1)' : '#F0FDF4') : (isDark ? 'rgba(127, 29, 29, 0.1)' : '#FEF2F2'),
                                borderColor: item.status === 'Present' ? '#22C55E' : '#EF4444',
                                borderLeftColor: item.status === 'Present' ? '#22C55E' : '#EF4444',
                                // Shadow approximation
                                shadowColor: item.status === 'Present' ? '#000' : 'transparent',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.05,
                                shadowRadius: 2,
                                elevation: item.status === 'Present' ? 1 : 0
                            }}
                        >
                            <View className="flex-1">
                                <Text className="text-base font-bold text-gray-900 dark:text-gray-100">{item.name}</Text>
                                <Text className="text-xs text-gray-500 dark:text-gray-400">{item.dept}</Text>
                            </View>

                            <View className={`w-8 h-8 rounded-full items-center justify-center ${item.status === 'Present' ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                {item.status === 'Present' ? (
                                    <Check size={16} color="#16A34A" />
                                ) : (
                                    <X size={16} color="#DC2626" />
                                )}
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            <AnimatedAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={() => {
                    setAlertConfig({ ...alertConfig, visible: false });
                    if (alertConfig.type === 'success') {
                        router.back();
                    }
                }}
            />
        </SafeAreaView>
    );
}
