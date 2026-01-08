import { View, Text, ScrollView, TouchableOpacity, Image, Switch, Modal, Alert, Linking, TextInput, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Lock, Moon, Bell, HelpCircle, Bug, LogOut, ChevronRight, ExternalLink, Edit2, X, Mail } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import { useAuth } from '../../components/context/AuthContext';
import { api } from '../../services/api';
import Input from '../../components/common/Input';

import { EducationLoader } from '../../components/common/EducationLoader';
import AnimatedAlert, { AnimatedAlertProps } from '../../components/common/AnimatedAlert';
// import * as Notifications from 'expo-notifications'; // Removed to prevent Expo Go crash

export default function Settings() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [pushNotifications, setPushNotifications] = useState(false);
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [alertConfig, setAlertConfig] = useState<Partial<AnimatedAlertProps>>({ visible: false });

    // Modals
    const [editProfileVisible, setEditProfileVisible] = useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);

    // Form States
    const [loading, setLoading] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: '', email: '' });
    const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });

    useEffect(() => {
        if (user) {
            setProfileForm({ name: user.name, email: user.email });
        }
        checkNotificationPermissions();
    }, [user]);

    const checkNotificationPermissions = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
            setPushNotifications(result);
        }
        // For iOS or older Android, we assume true or handle differently, but removing expo-notifications prevents the crash.
    };

    const togglePushNotifications = async (value: boolean) => {
        if (value) {
            if (Platform.OS === 'android' && Platform.Version >= 33) {
                const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                if (result === PermissionsAndroid.RESULTS.GRANTED) {
                    setPushNotifications(true);
                } else {
                    setPushNotifications(false);
                    Alert.alert('Permission Denied', 'Please enable notifications in your device settings to receive updates.');
                }
            } else {
                setPushNotifications(true); // Auto-enable for older Android/iOS for now
            }
        } else {
            setPushNotifications(false);
        }
    };

    const handleUpdateProfile = async () => {
        if (!user) return;
        if (!profileForm.name || !profileForm.email) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            await api.updateProfile(user.id, profileForm);
            Alert.alert('Success', 'Profile updated successfully');
            setEditProfileVisible(false);
            // Ideally update context user here, but for now simple alert
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (!user) return;
        if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (passwordForm.new !== passwordForm.confirm) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }
        setLoading(true);
        try {
            await api.changePassword(user.id, passwordForm.current, passwordForm.new);
            Alert.alert('Success', 'Password changed successfully');
            setChangePasswordVisible(false);
            setPasswordForm({ current: '', new: '', confirm: '' });
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const handleReportBug = () => {
        Linking.openURL('mailto:gunalan3332005@gmail.com?subject=Bug Report - College Attendance App');
    };

    const handleLogout = () => {
        setAlertConfig({
            visible: true,
            title: 'Logout',
            message: 'Are you sure you want to logout?',
            type: 'warning',
            buttonText: 'Logout',
            showCancel: true,
            onClose: () => {
                setAlertConfig({ visible: false });
                setIsLoggingOut(true);
                // Simulate delay for loader
                setTimeout(() => {
                    logout();
                }, 1000);
            },
            onCancel: () => setAlertConfig({ visible: false })
        });
    };

    const SettingsItem = ({ icon: Icon, title, value, type = 'arrow', onPress, iconColor = '#3B82F6', iconBg = 'bg-blue-50' }: any) => (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
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
                {type === 'arrow' && <ChevronRight size={20} color={isDark ? "#9CA3AF" : "#9CA3AF"} />}
                {type === 'external' && <ExternalLink size={20} color={isDark ? "#9CA3AF" : "#9CA3AF"} />}
                {type === 'switch' && (
                    <Switch
                        trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                        thumbColor={'white'}
                        ios_backgroundColor="#E5E7EB"
                        onValueChange={togglePushNotifications}
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

    return (
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
            <EducationLoader visible={isLoggingOut} message="Logging out..." />
            {/* Header */}
            <View className="flex-row items-center relative px-5 py-4 bg-transparent">
                <TouchableOpacity onPress={() => router.back()} className="absolute left-5 z-10 p-2 -ml-2">
                    <ArrowLeft size={24} color={isDark ? 'white' : '#111827'} />
                </TouchableOpacity>
                <View className="flex-1 items-center">
                    <Text className="text-xl font-bold text-gray-900 dark:text-white">Settings</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>

                {/* Profile Card - Revamp */}
                <View className="items-center mb-6 mt-2">
                    <View className="relative mb-3">
                        <View className="w-24 h-24 bg-red-100 rounded-full items-center justify-center border-4 border-white dark:border-gray-800 shadow-sm overflow-hidden">
                            <Image
                                source={{ uri: user?.profile_image || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3387&q=80' }}
                                className="w-full h-full"
                            />
                        </View>
                        <TouchableOpacity onPress={() => setEditProfileVisible(true)} className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full border-4 border-white dark:border-gray-900 shadow-sm">
                            <Edit2 size={12} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="text-xl font-bold text-gray-900 dark:text-white mb-1">{user?.name || 'Admin User'}</Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-sm font-medium">{user?.email || 'admin@college.edu'}</Text>
                    <View className="mt-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                        <Text className="text-blue-600 dark:text-blue-400 font-bold text-[10px] tracking-wide uppercase">System Administrator</Text>
                    </View>
                </View>

                {/* Account Section */}
                <SectionHeader title="ACCOUNT" />
                <View className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm">
                    <SettingsItem
                        icon={User}
                        title="Edit Profile"
                        onPress={() => setEditProfileVisible(true)}
                    />
                    <SettingsItem
                        icon={Lock}
                        title="Change Password"
                        onPress={() => setChangePasswordVisible(true)}
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
                        iconColor="#8B5CF6"
                        iconBg="bg-purple-50"
                    />
                    <SettingsItem
                        icon={Bell}
                        title="Push Notifications"
                        type="switch"
                        onPress={() => setPushNotifications(!pushNotifications)}
                        iconColor="#F59E0B"
                        iconBg="bg-amber-50"
                    />
                </View>

                {/* Support */}
                <SectionHeader title="SUPPORT" />
                <View className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm mb-8">
                    <SettingsItem
                        icon={Bug}
                        title="Report a Bug"
                        onPress={handleReportBug}
                        iconColor="#EF4444"
                        iconBg="bg-red-50"
                    />
                </View>

                {/* Logout */}
                <TouchableOpacity
                    className="bg-red-50 dark:bg-red-900/20 p-4 rounded-3xl flex-row justify-center items-center mb-10 border border-red-100 dark:border-red-900/50"
                    onPress={handleLogout}
                >
                    <LogOut size={20} color="#DC2626" className="mr-2" />
                    <Text className="text-red-600 dark:text-red-400 font-bold text-base ml-2">Logout</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* Edit Profile Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={editProfileVisible}
                onRequestClose={() => setEditProfileVisible(false)}
            >
                <View className="flex-1 justify-end">
                    <TouchableOpacity className="flex-1 bg-black/50" onPress={() => setEditProfileVisible(false)} />
                    <View className="bg-white dark:bg-gray-800 rounded-t-3xl p-6 shadow-2xl">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</Text>
                            <TouchableOpacity onPress={() => setEditProfileVisible(false)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <X size={20} color={isDark ? "white" : "#374151"} />
                            </TouchableOpacity>
                        </View>

                        <View className="space-y-4 mb-6">
                            <View>
                                <Text className="text-gray-700 dark:text-gray-300 mb-1 font-medium ml-1">Full Name</Text>
                                <Input value={profileForm.name} onChangeText={(t: string) => setProfileForm({ ...profileForm, name: t })} placeholder="Name" />
                            </View>
                            <View>
                                <Text className="text-gray-700 dark:text-gray-300 mb-1 font-medium ml-1">Email Address</Text>
                                <Input value={profileForm.email} onChangeText={(t: string) => setProfileForm({ ...profileForm, email: t })} placeholder="Email" />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleUpdateProfile}
                            disabled={loading}
                            className={`w-full py-4 rounded-xl items-center mb-4 ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
                        >
                            {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-base">Save Changes</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Change Password Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={changePasswordVisible}
                onRequestClose={() => setChangePasswordVisible(false)}
            >
                <View className="flex-1 justify-end">
                    <TouchableOpacity className="flex-1 bg-black/50" onPress={() => setChangePasswordVisible(false)} />
                    <View className="bg-white dark:bg-gray-800 rounded-t-3xl p-6 shadow-2xl">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-xl font-bold text-gray-900 dark:text-white">Change Password</Text>
                            <TouchableOpacity onPress={() => setChangePasswordVisible(false)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <X size={20} color={isDark ? "white" : "#374151"} />
                            </TouchableOpacity>
                        </View>

                        <View className="space-y-4 mb-6">
                            <View>
                                <Text className="text-gray-700 dark:text-gray-300 mb-1 font-medium ml-1">Current Password</Text>
                                <Input value={passwordForm.current} onChangeText={(t: string) => setPasswordForm({ ...passwordForm, current: t })} placeholder="Enter current password" secureTextEntry />
                            </View>
                            <View>
                                <Text className="text-gray-700 dark:text-gray-300 mb-1 font-medium ml-1">New Password</Text>
                                <Input value={passwordForm.new} onChangeText={(t: string) => setPasswordForm({ ...passwordForm, new: t })} placeholder="Enter new password" secureTextEntry />
                            </View>
                            <View>
                                <Text className="text-gray-700 dark:text-gray-300 mb-1 font-medium ml-1">Confirm New Password</Text>
                                <Input value={passwordForm.confirm} onChangeText={(t: string) => setPasswordForm({ ...passwordForm, confirm: t })} placeholder="Re-enter new password" secureTextEntry />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleChangePassword}
                            disabled={loading}
                            className={`w-full py-4 rounded-xl items-center mb-4 ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
                        >
                            {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-base">Update Password</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {alertConfig.visible && (
                <AnimatedAlert
                    visible={alertConfig.visible}
                    title={alertConfig.title || ''}
                    message={alertConfig.message || ''}
                    type={alertConfig.type}
                    buttonText={alertConfig.buttonText}
                    showCancel={alertConfig.showCancel}
                    onClose={alertConfig.onClose || (() => setAlertConfig({ visible: false }))}
                    onCancel={alertConfig.onCancel}
                />
            )}

        </SafeAreaView>
    );
}
