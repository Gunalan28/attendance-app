import { View, Text } from 'react-native';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export default function Card({ children, className, title }: CardProps) {
    return (
        <View className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 ${className}`}>
            {title && <Text className="text-lg font-bold text-gray-800 dark:text-white mb-2">{title}</Text>}
            {children}
        </View>
    );
}
