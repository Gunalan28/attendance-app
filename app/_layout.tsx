import { Stack } from 'expo-router';
import "../global.css";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { useEffect } from 'react';
import { AuthProvider } from '../components/context/AuthContext';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

// Disable Reanimated Strict Mode to suppress "Reading/Writing ... during render" warnings
// which are often false positives in safe useEffect/useAnimatedStyle usage.
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

LogBox.ignoreLogs([
  'SafeAreaView has been deprecated',
  /SafeAreaView has been deprecated/,
  /SafeAreaView/,
]);

export default function RootLayout() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(admin)" />
          <Stack.Screen name="(faculty)" />
          <Stack.Screen name="(student)" />
        </Stack>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
