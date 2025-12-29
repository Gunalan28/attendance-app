import React, { useEffect } from 'react';
import { View, Text, Modal } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
    Easing,
    cancelAnimation
} from 'react-native-reanimated';

interface EducationLoaderProps {
    visible: boolean;
    message?: string;
}

export const EducationLoader: React.FC<EducationLoaderProps> = ({ visible, message = "Loading..." }) => {
    const rotation = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            rotation.value = 0;
            rotation.value = withRepeat(
                withTiming(360, {
                    duration: 2500,
                    easing: Easing.linear,
                }),
                -1,
                false
            );
        } else {
            cancelAnimation(rotation);
            rotation.value = 0;
        }
    }, [visible]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
        };
    });

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 bg-black/70 justify-center items-center backdrop-blur-sm">
                {/* Transparent Container (No Background Rectangle) */}
                <View className="items-center justify-center">

                    {/* Simple Circular Dot Loader */}
                    <Animated.View style={[animatedStyle]} className="w-16 h-16 justify-center items-center mb-6">
                        <View className="flex-row absolute w-full h-full justify-center">
                            {/* Dots with vivid colors for contrast against dark overlay */}
                            <View className="w-3 h-3 bg-blue-500 rounded-full absolute top-0 shadow-sm shadow-blue-500" />
                            <View className="w-3 h-3 bg-blue-500/80 rounded-full absolute right-0 top-1/2 -mt-1.5" />
                            <View className="w-3 h-3 bg-blue-500/60 rounded-full absolute bottom-0" />
                            <View className="w-3 h-3 bg-blue-500/40 rounded-full absolute left-0 top-1/2 -mt-1.5" />

                            <View className="w-2.5 h-2.5 bg-blue-500/90 rounded-full absolute top-[15%] right-[15%]" />
                            <View className="w-2.5 h-2.5 bg-blue-500/70 rounded-full absolute bottom-[15%] right-[15%]" />
                            <View className="w-2.5 h-2.5 bg-blue-500/50 rounded-full absolute bottom-[15%] left-[15%]" />
                            <View className="w-2.5 h-2.5 bg-blue-500/30 rounded-full absolute top-[15%] left-[15%]" />
                        </View>
                    </Animated.View>

                    {/* Text directly on overlay */}
                    <Text className="text-xl font-bold text-white mb-2 tracking-wide text-center">Please Wait</Text>
                    <Text className="text-blue-200 text-sm font-medium uppercase tracking-widest text-center">{message}</Text>
                </View>
            </View>
        </Modal>
    );
};
