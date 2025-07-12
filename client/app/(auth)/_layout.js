import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AuthLayout() {
  const { loading, token, user } = useAuth();

  if (loading) {
    return null; // or show a loading spinner
  }

  // If already signed in, redirect to main app
  if (token) {
    return <Redirect href="/(tabs)" />;
  }

  // Otherwise show the auth stack (login/register)
  return <Stack screenOptions={{ headerShown: false }} />;
}
