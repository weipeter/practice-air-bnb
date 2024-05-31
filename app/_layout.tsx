
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import React from 'react';

import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import ModalHeaderText from '@/components/ModalHeaderText';
import Colors from '@/constants/Colors';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  }
}

export default function RootLayout() {
  const [loaded] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache!}>
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login')
    }
  }, [isLoaded])
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/login" options={{
        headerTitleStyle: {
          fontFamily: 'mon-sb',
        },
        presentation: 'modal',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close-outline" size={28}></Ionicons>
          </TouchableOpacity>
        )
      }} />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: '', headerTransparent: true, }} />
      <Stack.Screen name="(modals)/booking" options={{
        presentation: 'transparentModal',
        headerTransparent: true,
        headerTitle: () => <ModalHeaderText />,
        animation: 'fade',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}
            style={{
              backgroundColor: '#fff',
              borderColor: Colors.grey,
              borderRadius: 20,
              borderWidth: 1,
              padding: 4,
            }}>
            <Ionicons name="close-outline" size={22}></Ionicons>
          </TouchableOpacity>
        )
      }} />
    </Stack>
  );
}