import { View, Text, Modal, TouchableOpacity, FlatList, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import { X, Search, Trash2, Filter } from 'lucide-react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import Input from '../common/Input';
import { api } from '../../services/api';
import { useColorScheme } from 'nativewind';
import AnimatedAlert, { AnimatedAlertProps } from '../common/AnimatedAlert';
import AnimatedAlert2 from '../common/AnimatedAlert2';
import { EducationLoader } from '../common/EducationLoader';

const { height } = Dimensions.get('window');

interface DeleteUserModalProps {
    visible: boolean;
    onClose: () => void;
    type: 'student' | 'faculty';
    onSuccess: () => void; // Callback to refresh parent list
}

export default function DeleteUserModal({ visible, onClose, type, onSuccess }: DeleteUserModalProps) {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';
    const isStudent = type === 'student';

    // Theme Colors
    const themeColor = isStudent ? 'bg-blue-600' : 'bg-purple-600';
    const themeText = isStudent ? 'text-blue-600' : 'text-purple-600';
    const themeBgLight = isStudent ? 'bg-blue-100' : 'bg-purple-100';
    const themeBgDark = isStudent ? 'dark:bg-blue-900/30' : 'dark:bg-purple-900/30';

    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState<'All' | 'Present' | 'Absent'>('All');
    const [filterYear, setFilterYear] = useState<'All' | '1' | '2' | '3' | '4'>('All');

    // Alert State
    const [alertConfig, setAlertConfig] = useState<AnimatedAlertProps>({
        visible: false,
        title: '',
        message: '',
        type: 'warning',
        onClose: () => setAlertConfig(prev => ({ ...prev, visible: false }))
    });
    // State for confirmation alert
    const [confirmVisible, setConfirmVisible] = useState(false);

    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const isDeleting = useRef(false);

    const loadData = async () => {
        setLoading(true);
        try {
            const data = isStudent ? await api.getAdminStudents() : await api.getAdminFaculty();
            setItems(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (visible) {
            loadData();
            // Reset filters
            setSearchQuery('');
            setFilterStatus('All');
            setFilterYear('All');
        }
    }, [visible]);


    // Actual Delete Logic (To be triggered by Alert confirmation)
    const confirmDelete = async () => {
        if (!itemToDelete || isDeleting.current) return;

        setConfirmVisible(false); // Close confirm alert
        isDeleting.current = true;

        // Optimistic Update: Immediately remove from list
        setItems(prev => prev.filter(i => i.id !== itemToDelete.id));

        try {
            if (isStudent) {
                await api.deleteStudent(itemToDelete.id);
            } else {
                await api.deleteFaculty(itemToDelete.id);
            }

            // Show Success
            setAlertConfig({
                visible: true,
                title: 'Deleted',
                message: `${itemToDelete.name} has been deleted.`,
                type: 'success',
                onClose: () => {
                    setAlertConfig(prev => ({ ...prev, visible: false }));
                    // loadData(); // No need to reload, we updated optimistically
                    onSuccess();
                }
            });
        } catch (error: any) {
            // Revert optimistic update on error?
            loadData(); // Reload to restore state
            setAlertConfig({
                visible: true,
                title: 'Error',
                message: error.message || 'Failed to delete.',
                type: 'error',
                onClose: () => setAlertConfig(prev => ({ ...prev, visible: false }))
            });
        } finally {
            isDeleting.current = false;
        }
    };

    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (isStudent ? item.id.includes(searchQuery) : item.dept.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = filterStatus === 'All' ? true : item.status === filterStatus;

        const matchesYear = !isStudent || filterYear === 'All' ? true : item.year === Number(filterYear);

        return matchesSearch && matchesStatus && matchesYear;
    });

    const handleDeletePress = (item: any) => {
        setItemToDelete(item);
        setConfirmVisible(true);
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
            <View className="flex-1 bg-white dark:bg-gray-900">
                {/* Header */}
                <View className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex-row items-center justify-between">
                    <View>
                        <Text className="text-xl font-bold text-gray-900 dark:text-white">
                            Delete {isStudent ? 'Student' : 'Faculty'}
                        </Text>
                        <Text className="text-sm text-gray-500">Select user to remove</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                        <X size={20} color={isDark ? "white" : "black"} />
                    </TouchableOpacity>
                </View>

                {/* Filters (Search Only as per request) */}
                <View className="px-5 py-2 space-y-3">
                    <Input
                        placeholder={`Search ${isStudent ? 'students' : 'faculty'}...`}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    {/* Year Toggle for Students */}
                    {isStudent && (
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 12,
                            padding: 4,
                            borderRadius: 12,
                            backgroundColor: isDark ? '#1F2937' : '#F3F4F6'
                        }}>
                            {['All', '1', '2', '3', '4'].map((year) => (
                                <TouchableOpacity
                                    key={year}
                                    onPress={() => setFilterYear(year as any)}
                                    style={{
                                        flex: 1,
                                        paddingVertical: 6,
                                        borderRadius: 8,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: filterYear === year ? '#2563EB' : 'transparent',
                                        shadowColor: filterYear === year ? '#000' : 'transparent',
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 12,
                                        fontWeight: 'bold',
                                        color: filterYear === year ? 'white' : (isDark ? '#9CA3AF' : '#6B7280')
                                    }}>
                                        {year === 'All' ? 'All' : getOrdinal(Number(year))}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>

                {/* List */}
                {loading ? (
                    <View className="flex-1 justify-center items-center">
                        <EducationLoader visible={true} />
                    </View>
                ) : (
                    <FlatList
                        data={filteredItems}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ padding: 16 }}
                        renderItem={({ item, index }) => (
                            <View className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-3 flex-row items-center justify-between">
                                <View className="flex-row items-center flex-1">
                                    <View className={`w-10 h-10 ${themeBgLight} ${themeBgDark} rounded-full items-center justify-center mr-3`}>
                                        <Text className={`${themeText} dark:${isStudent ? 'text-blue-400' : 'text-purple-400'} font-bold text-base`}>
                                            {item.name.substr(0, 2).toUpperCase()}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text className="text-base font-bold text-gray-900 dark:text-white">{item.name}</Text>
                                        <Text className="text-xs text-gray-500">
                                            {isStudent ? `${getOrdinal(item.year)} Year` : `${item.dept}`}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => handleDeletePress(item)}
                                    className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg"
                                >
                                    <Trash2 size={20} color="#DC2626" />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
            </View>

            <AnimatedAlert2
                visible={confirmVisible}
                title="Delete User?"
                message={(
                    <Text>
                        Are you sure you want to delete <Text className="font-bold">{itemToDelete?.name}</Text>? This action cannot be undone.
                    </Text>
                )}
                onClose={() => setConfirmVisible(false)}
                onConfirm={confirmDelete}
                confirmText="Delete"
                cancelText="Cancel"
            />

            <AnimatedAlert
                visible={alertConfig.visible}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
                onClose={alertConfig.onClose}
                buttonText={alertConfig.buttonText}
                showCancel={alertConfig.showCancel}
                onCancel={alertConfig.onCancel}
            />
        </Modal>
    );
}
