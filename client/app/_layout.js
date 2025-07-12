import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import '../global.css';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  const [loaded, fontError] = useFonts({
    big: require('../assets/fonts/Urbanist-Bold.ttf'),
    mid: require('../assets/fonts/Urbanist-Medium.ttf'),
    reg: require('../assets/fonts/Urbanist-Regular.ttf'),
    thin: require('../assets/fonts/Urbanist-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded || fontError) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [loaded, fontError]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Slot />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
