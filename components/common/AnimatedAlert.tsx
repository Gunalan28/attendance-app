import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS, withSequence, withRepeat } from 'react-native-reanimated';
import { X, AlertCircle, CheckCircle, XCircle, DownloadCloud } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';

const { width } = Dimensions.get('window');

export interface AnimatedAlertProps {
    visible: boolean;
    title: string;
    message: string | React.ReactNode;
    onClose: () => void;
    type?: 'warning' | 'success' | 'error' | 'download';
    buttonText?: string;
    showCancel?: boolean;
    onCancel?: () => void;
}

export default function AnimatedAlert({
    visible, title, message, onClose, type = 'warning',
    buttonText, showCancel, onCancel
}: AnimatedAlertProps) {
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
            scale.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.back(1.5)) });
            opacity.value = withTiming(1, { duration: 300 });

            if (type === 'error' || type === 'warning') {
                // ... same shaking logic if desired, or skip for nicer entry
            }
        } else {
            scale.value = withTiming(0.8, { duration: 250 });
            opacity.value = withTiming(0, { duration: 250 }, (finished) => {
                if (finished) {
                    runOnJS(setShowModal)(false);
                    shake.value = 0; // Reset shake
                }
            });
        }
    }, [visible, type]);

    if (!visible && !showModal) return null;

    // Config based on type
    const config = {
        warning: {
            icon: <AlertCircle size={32} color="#F97316" />,
            bg: 'bg-orange-100 dark:bg-orange-900/30',
            button: 'bg-orange-500 active:bg-orange-600',
            buttonText: 'Understood'
        },
        success: {
            icon: <CheckCircle size={32} color="#16A34A" />,
            bg: 'bg-green-100 dark:bg-green-900/30',
            button: 'bg-green-600 active:bg-green-700',
            buttonText: 'Great!'
        },
        error: {
            icon: <XCircle size={32} color="#DC2626" />,
            bg: 'bg-red-100 dark:bg-red-900/30',
            button: 'bg-red-600 active:bg-red-700',
            buttonText: 'Close'
        },
        download: {
            icon: <DownloadCloud size={32} color="#2563EB" />,
            bg: 'bg-blue-100 dark:bg-blue-900/30',
            button: 'bg-blue-600 active:bg-blue-700',
            buttonText: 'Download'
        }
    };

    const activeConfig = config[type];
    const mainButtonText = buttonText || activeConfig.buttonText;

    return (
        <Modal transparent visible={showModal} animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/40">
                <Animated.View style={[{ width: width * 0.85 }, animatedStyle]} className="bg-white dark:bg-gray-800 rounded-3xl px-6 pt-6 pb-8 shadow-2xl items-center">
                    <View className={`w-16 h-16 rounded-full items-center justify-center mb-4 ${activeConfig.bg}`}>
                        {activeConfig.icon}
                    </View>

                    <Text className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">{title}</Text>
                    <Text className="text-gray-500 dark:text-gray-400 text-center mb-6 leading-5">{message}</Text>

                    <View className={`w-full ${showCancel ? 'flex-row gap-3' : ''}`}>
                        {showCancel && (
                            <TouchableOpacity
                                onPress={onCancel || onClose}
                                className="flex-1 py-3.5 rounded-2xl items-center bg-gray-200 dark:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600"
                            >
                                <Text className="text-gray-700 dark:text-gray-300 font-bold text-base">Cancel</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            onPress={onClose}
                            className={`${showCancel ? 'flex-1' : 'w-full'} py-3.5 rounded-2xl items-center transition-colors ${activeConfig.button}`}
                        >
                            <Text className="text-white font-bold text-base">{mainButtonText}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}
