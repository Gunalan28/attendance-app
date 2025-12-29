import { TextInput, View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    className?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    forceLightMode?: boolean;
    placeholderTextColor?: string;
    isDark?: boolean;
}

export default function Input({ label, placeholder, value, onChangeText, secureTextEntry, className, leftIcon, rightIcon, forceLightMode, placeholderTextColor, isDark: externalIsDark }: InputProps) {
    const { colorScheme } = useColorScheme();
    const isDark = externalIsDark ?? (!forceLightMode && colorScheme === 'dark');

    return (
        <View className={`space-y-2 ${className}`}>
            {label && <Text className={`font-bold text-xs uppercase ml-1 tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{label}</Text>}
            <View className={`flex-row items-center w-full border rounded-2xl px-4 h-14 focus:border-blue-500 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                {leftIcon && <View className="mr-3">{leftIcon}</View>}
                <TextInput
                    className={`flex-1 text-base h-full ${isDark ? 'text-white' : 'text-gray-900'}`}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor || (isDark ? "#6B7280" : "#9CA3AF")}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                />
                {rightIcon && <View className="ml-3">{rightIcon}</View>}
            </View>
        </View>
    );
}
