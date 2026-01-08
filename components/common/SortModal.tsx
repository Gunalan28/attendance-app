import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { useColorScheme } from 'nativewind';
import { X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface SortOption {
    label: string;
    value: string;
}

interface SortModalProps {
    visible: boolean;
    onClose: () => void;
    title: string;
    options: SortOption[];
    selectedOption: string;
    onSelect: (value: string) => void;
}

export default function SortModal({ visible, onClose, title, options, selectedOption, onSelect }: SortModalProps) {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center bg-black/40">
                <View
                    style={{ width: width * 0.85 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl"
                >
                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-xl font-bold text-gray-900 dark:text-white">{title}</Text>
                        <TouchableOpacity onPress={onClose} className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                            <X size={20} color={isDark ? "#D1D5DB" : "#4B5563"} />
                        </TouchableOpacity>
                    </View>

                    <View className="space-y-3">
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                onPress={() => onSelect(option.value)}
                                className={`flex-row items-center justify-between p-4 rounded-xl border ${selectedOption === option.value ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500' : 'bg-gray-50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-700'}`}
                            >
                                <Text className={`font-bold text-base ${selectedOption === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {option.label}
                                </Text>

                                {/* Radio Button */}
                                <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedOption === option.value ? 'border-blue-500' : 'border-gray-400 dark:border-gray-500'}`}>
                                    {selectedOption === option.value && (
                                        <View className="w-3 h-3 rounded-full bg-blue-500" />
                                    )}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
}
