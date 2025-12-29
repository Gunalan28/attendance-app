import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    className?: string;
    loading?: boolean;
}

export default function Button({ title, onPress, variant = 'primary', className, loading }: ButtonProps) {
    const baseStyle = "h-12 rounded-xl flex-row justify-center items-center shadow-sm";
    const variants = {
        primary: "bg-blue-600 dark:bg-blue-600",
        secondary: "bg-gray-100 dark:bg-gray-700",
        outline: "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
        danger: "bg-red-500",
    };
    const textVariants = {
        primary: "text-white font-bold text-base",
        secondary: "text-gray-900 dark:text-white font-bold text-base",
        outline: "text-gray-700 dark:text-gray-300 font-bold text-base",
        danger: "text-white font-bold text-base",
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            disabled={loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? 'white' : 'black'} />
            ) : (
                <Text className={textVariants[variant]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}
