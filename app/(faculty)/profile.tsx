import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Lock, ExternalLink, Bug, LogOut, ChevronRight, Palette, Bell, Edit2 } from 'lucide-react-native';
import { useState } from 'react';
import { useFacultyTheme } from '../../components/context/FacultyContext';

export default function FacultyProfile() {
    const router = useRouter();
    const { isDark, toggleTheme } = useFacultyTheme();
    const [pushNotifications, setPushNotifications] = useState(true);

    const SettingsItem = ({ icon: Icon, title, value, hasSwitch, switchValue, onSwitchChange, hasExternal, color = isDark ? "bg-gray-700" : "bg-blue-50", iconColor = "#2563EB" }: any) => (
        <TouchableOpacity
            className={`flex-row items-center justify-between py-4 active:bg-gray-50/10 ${isDark ? 'bg-gray-800' : 'bg-white'}`}
            onPress={() => hasSwitch && onSwitchChange ? onSwitchChange(!switchValue) : (!hasSwitch && console.log('Pressed'))}
            disabled={hasSwitch && !onSwitchChange} // Allow press if it's not a switch or if it is a switch that handles its own change logic (but here we handle it via TouchableOpacity for the row if needed, but standard UI pattern usually switch is separate. Let's make entire row toggle for appearance if it was just a value, but here Appearance is just display. Wait, Appearance is the toggle for dark mode now.)
        >
            <View className="flex-row items-center">
                <View className={`p-2.5 rounded-xl mr-4 ${color}`}>
                    <Icon size={20} color={iconColor} />
                </View>
                <Text className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</Text>
            </View>
            <View className="flex-row items-center">
                {value && <Text className="text-blue-500 font-medium text-sm mr-2">{value}</Text>}
                {hasSwitch ? (
                    <Switch
                        value={switchValue}
                        onValueChange={onSwitchChange}
                        trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
                        thumbColor={switchValue ? "#ffffff" : "#f4f3f4"}
                    />
                ) : hasExternal ? (
                    <ExternalLink size={20} color="#9CA3AF" />
                ) : (
                    <ChevronRight size={20} color="#9CA3AF" />
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className={`flex-1 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Header */}
            <View className={`px-5 py-4 flex-row items-center relative mb-2 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <TouchableOpacity onPress={() => router.back()} className="absolute left-5 z-10 p-1">
                    <ArrowLeft size={24} color={isDark ? "white" : "black"} />
                </TouchableOpacity>
                <View className="flex-1 items-center">
                    <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Faculty Profile</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>

                {/* Profile Card */}
                <View className={`p-5 rounded-3xl shadow-sm mb-6 flex-row items-center border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                    <View className="relative mr-4">
                        <View className="w-20 h-20 rounded-full bg-red-100 border-4 border-white shadow-sm overflow-hidden">
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80' }}
                                className="w-full h-full"
                            />
                        </View>
                        <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full border-2 border-white">
                            <Edit2 size={12} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text className={`text-xl font-bold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Dr. Alex Morgan</Text>
                        <Text className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Faculty ID: FAC-8812</Text>
                        <Text className="text-blue-500 text-xs font-bold uppercase tracking-wide">Computer Science Dept</Text>
                    </View>
                </View>

                {/* Account Section */}
                <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3 ml-1">Account</Text>
                <View className={`rounded-2xl p-2 mb-6 shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700 divide-gray-700' : 'bg-white border-gray-100 divide-gray-50'} divide-y`}>
                    <SettingsItem icon={User} title="Profile Settings" />
                    <SettingsItem icon={Lock} title="Security & Password" />
                </View>

                {/* App Preferences */}
                <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3 ml-1">App Preferences</Text>
                <View className={`rounded-2xl p-2 mb-6 shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700 divide-gray-700' : 'bg-white border-gray-100 divide-gray-50'} divide-y`}>
                    <SettingsItem
                        icon={Palette}
                        title="Dark Mode"
                        hasSwitch
                        switchValue={isDark}
                        onSwitchChange={toggleTheme}
                    />
                    <SettingsItem
                        icon={Bell}
                        title="Push Notifications"
                        hasSwitch
                        switchValue={pushNotifications}
                        onSwitchChange={setPushNotifications}
                    />
                    <View className="px-14 pb-2">
                        <Text className="text-gray-400 text-xs text-left -mt-2 mb-1">Receive attendance alerts</Text>
                    </View>
                </View>

                {/* Support */}
                <Text className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-3 ml-1">Support</Text>
                <View className={`rounded-2xl p-2 mb-6 shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700 divide-gray-700' : 'bg-white border-gray-100 divide-gray-50'} divide-y`}>
                    <SettingsItem icon={ExternalLink} title="Faculty Help Center" hasExternal />
                    <SettingsItem icon={Bug} title="Report a Bug" />
                </View>

                {/* Logout */}
                <TouchableOpacity
                    onPress={() => router.replace('/(auth)/login')}
                    className={`py-4 rounded-xl flex-row justify-center items-center mb-4 border ${isDark ? 'bg-red-900/20 border-red-900/50' : 'bg-red-50 border-red-100'}`}
                >
                    <LogOut size={20} color="#DC2626" className="mr-2" />
                    <Text className="text-red-600 font-bold text-base ml-2">Logout</Text>
                </TouchableOpacity>

                <Text className="text-center text-gray-400 text-xs font-medium mb-8">College Attend v1.2.4 (Build 2024)</Text>

            </ScrollView>
        </SafeAreaView>
    );
}
