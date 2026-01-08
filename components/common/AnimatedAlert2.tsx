import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS, withSequence, withRepeat } from 'react-native-reanimated';
import { AlertCircle, Trash2 } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';

const { width } = Dimensions.get('window');

export interface AnimatedAlert2Props {
    visible: boolean;
    title: string;
    message: string | React.ReactNode;
    onClose: () => void;
    onConfirm: () => void;
    cancelText?: string;
    confirmText?: string;
}

export default function AnimatedAlert2({
    visible, title, message, onClose, onConfirm,
    cancelText = "Cancel", confirmText = "Delete"
}: AnimatedAlert2Props) {
    const [showModal, setShowModal] = useState(false);
    const scale = useSharedValue(0.5);
    const opacity = useSharedValue(0);
    const shake = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value },
                { translateX: shake.value }
            ],
            opacity: opacity.value,
        };
    });

    useEffect(() => {
        if (visible) {
            setShowModal(true);
            scale.value = withTiming(1, { duration: 15, easing: Easing.out(Easing.quad) });
            opacity.value = withTiming(1, { duration: 15 });

            // Shake effect for confirmation attention
            shake.value = withSequence(
                withTiming(-10, { duration: 50 }),
                withRepeat(withTiming(10, { duration: 50 }), 3, true),
                withTiming(0, { duration: 50 })
            );
        } else {
            scale.value = withTiming(0.8, { duration: 15 });
            opacity.value = withTiming(0, { duration: 15 }, (finished) => {
                if (finished) {
                    runOnJS(setShowModal)(false);
                    shake.value = 0;
                }
            });
        }
    }, [visible]);

    if (!visible && !showModal) return null;

    return (
        <Modal transparent visible={showModal} animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/40">
                <Animated.View style={[{ width: width * 0.85 }, animatedStyle]} className="bg-white dark:bg-gray-800 rounded-3xl px-6 pt-8 pb-12 shadow-2xl items-center">
                    <View className="w-16 h-16 rounded-full items-center justify-center mb-5 bg-red-100 dark:bg-red-900/30">
                        <Trash2 size={32} color="#DC2626" />
                    </View>

                    <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">{title}</Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-center mb-8 leading-5">{message}</Text>

                    <View className="w-full flex-row gap-3">
                        <TouchableOpacity
                            onPress={onClose}
                            className="flex-1 py-3.5 rounded-2xl items-center bg-gray-200 dark:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 mb-2"
                        >
                            <Text className="text-gray-700 dark:text-gray-300 font-bold text-base">{cancelText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onConfirm}
                            className="flex-1 py-3.5 rounded-2xl items-center transition-colors bg-red-600 active:bg-red-700 mb-2"
                        >
                            <Text className="text-white font-bold text-base">{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}
