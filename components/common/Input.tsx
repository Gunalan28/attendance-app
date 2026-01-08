import { TextInput, View, Text, TextInputProps } from 'react-native';
import { useColorScheme } from 'nativewind';

interface InputProps extends TextInputProps {
    label?: string;
    className?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    forceLightMode?: boolean;
    isDark?: boolean;
}

export default function Input({
    label,
    className,
    leftIcon,
    rightIcon,
    forceLightMode,
    isDark: externalIsDark,
    placeholderTextColor,
    ...props
}: InputProps) {
    const { colorScheme } = useColorScheme();
    const isDark = externalIsDark ?? (!forceLightMode && colorScheme === 'dark');

    return (
        <View className={`space-y-2 ${className}`}>
            {label && <Text className={`font-bold text-xs uppercase ml-1 tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{label}</Text>}
            <View className={`flex-row items-center w-full border rounded-2xl px-4 h-14 focus:border-blue-500 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                {leftIcon && <View className="mr-3">{leftIcon}</View>}
                <TextInput
                    className={`flex-1 text-base h-full ${isDark ? 'text-white' : 'text-gray-900'}`}
                    placeholderTextColor={placeholderTextColor || (isDark ? "#6B7280" : "#9CA3AF")}
                    {...props}
                />
                {rightIcon && <View className="ml-3">{rightIcon}</View>}
            </View>
        </View>
    );
}
