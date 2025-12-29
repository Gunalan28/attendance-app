import { Stack } from 'expo-router';
import "../global.css";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import { useEffect } from 'react';

LogBox.ignoreLogs([
  'SafeAreaView has been deprecated',
  /SafeAreaView has been deprecated/,
  /SafeAreaView/,
]);

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="(faculty)" />
        <Stack.Screen name="(student)" />
      </Stack>
    </GestureHandlerRootView>
  );
}
