import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Lock, Moon, Bell, HelpCircle, Bug, LogOut, ChevronRight, ExternalLink, Edit2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'nativewind';
/**/

export default function Settings() {
    const router = useRouter();
    const [pushNotifications, setPushNotifications] = useState(true);
    const { colorScheme, toggleColorScheme } = useColorScheme();

    const SettingsItem = ({ icon: Icon, title, value, type = 'arrow', onPress, iconColor = '#3B82F6', iconBg = 'bg-blue-50' }: any) => (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-50 dark:border-gray-700 last:border-0"
        >
            <View className="flex-row items-center gap-3">
                <View className={`w-10 h-10 ${iconBg} rounded-xl items-center justify-center`}>
                    <Icon size={20} color={iconColor} />
                </View>
                <Text className="text-gray-900 dark:text-white font-bold text-base">{title}</Text>
            </View>

            <View className="flex-row items-center gap-2">
                {value && <Text className="text-blue-500 font-medium text-sm">{value}</Text>}

                {type === 'arrow' && <ChevronRight size={20} color="#9CA3AF" />}

                {type === 'external' && <ExternalLink size={20} color="#9CA3AF" />}

                {type === 'switch' && (
                    <Switch
                        trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                        thumbColor={'white'}
                        ios_backgroundColor="#E5E7EB"
                        onValueChange={setPushNotifications}
                        value={pushNotifications}
                    />
                )}
                {type === 'theme-switch' && (
                    <Switch
                        trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                        thumbColor={'white'}
                        ios_backgroundColor="#E5E7EB"
                        onValueChange={toggleColorScheme}
                        value={colorScheme === 'dark'}
                    />
                )}
            </View>
        </TouchableOpacity>
    );

    const SectionHeader = ({ title }: { title: string }) => (
        <Text className="px-1 text-gray-500 dark:text-gray-400 font-bold text-xs tracking-widest uppercase mb-3 mt-6">{title}</Text>
    );

    const handleLogout = () => {
        // In a real app, clear auth tokens here
        toggleColorScheme(); // Toggle back/reset or explicitly set light if possible, but toggle is safest if we know we are in dark
        if (colorScheme === 'dark') {
            toggleColorScheme();
        }
        router.replace('/');
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <View className="flex-row items-center relative px-5 py-4 bg-transparent">
                <TouchableOpacity onPress={() => router.back()} className="absolute left-5 z-10">
                    <ArrowLeft size={24} color={colorScheme === 'dark' ? 'white' : '#111827'} />
                </TouchableOpacity>
                <View className="flex-1 items-center">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">Admin Settings</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>

                {/* Profile Card */}
                <View className="bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm mb-2 mt-2 flex-row items-center gap-4">
                    <View className="relative">
                        <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center border-2 border-white dark:border-gray-700 shadow-sm overflow-hidden">
                            {/* Placeholder for Avatar - In real app use Image */}
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80' }}
                                className="w-full h-full"
                            />
                        </View>
                        <TouchableOpacity className="absolute bottom-0 right-[-4] bg-blue-500 p-1.5 rounded-full border-2 border-white dark:border-gray-700">
                            <Edit2 size={10} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-1">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">Alex Morgan</Text>
                        <Text className="text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">Admin ID: 20248812</Text>
                        <Text className="text-blue-500 font-bold text-[10px] tracking-wide uppercase">System Administrator</Text>
                    </View>
                </View>

                {/* Account Section */}
                <SectionHeader title="ACCOUNT" />
                <View className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm">
                    <SettingsItem
                        icon={User}
                        title="Profile Settings"
                        onPress={() => { }}
                    />
                    <SettingsItem
                        icon={Lock}
                        title="Security & Password"
                        onPress={() => { }}
                        iconColor="#2563EB"
                        iconBg="bg-blue-100"
                    />
                </View>

                {/* App Preferences */}
                <SectionHeader title="APP PREFERENCES" />
                <View className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm">
                    <SettingsItem
                        icon={Moon}
                        title="Dark Mode"
                        type="theme-switch"
                        onPress={() => toggleColorScheme()}
                    />
                    <View className="flex-row items-center justify-between p-4 bg-white dark:bg-gray-800">
                        <View className="flex-row items-center gap-3 flex-1">
                            <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center">
                                <Bell size={20} color="#3B82F6" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-900 dark:text-white font-bold text-base">Push Notifications</Text>
                                <Text className="text-gray-400 text-xs mt-0.5">Receive attendance alerts</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                            thumbColor={'white'}
                            ios_backgroundColor="#E5E7EB"
                            onValueChange={setPushNotifications}
                            value={pushNotifications}
                        />
                    </View>
                </View>

                {/* Support */}
                <SectionHeader title="SUPPORT" />
                <View className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm mb-8">
                    <SettingsItem
                        icon={HelpCircle}
                        title="Help Center"
                        type="external"
                        onPress={() => { }}
                        iconColor="#10B981"
                        iconBg="bg-green-50"
                    />
                    <SettingsItem
                        icon={Bug}
                        title="Report a Bug"
                        onPress={() => { }}
                        iconColor="#EF4444"
                        iconBg="bg-red-50"
                    />
                </View>

                {/* Logout */}
                <TouchableOpacity
                    className="bg-red-50 dark:bg-red-900/20 p-4 rounded-3xl flex-row justify-center items-center mb-6"
                    onPress={handleLogout}
                >
                    <LogOut size={20} color="#DC2626" className="mr-2" />
                    <Text className="text-red-600 dark:text-red-400 font-bold text-base ml-2">Logout</Text>
                </TouchableOpacity>

                <Text className="text-center text-gray-400 text-xs font-medium mb-10">
                    College Attend v1.2.4 (Build 2024)
                </Text>

            </ScrollView>
        </SafeAreaView>
    );
}
