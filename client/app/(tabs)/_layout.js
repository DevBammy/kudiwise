import { Redirect, Tabs } from 'expo-router';
import { Image, Platform } from 'react-native';

import { HapticTab } from '../../components/HapticTab';
import { useAuth } from '../../context/AuthContext';
import homeImg from '../../assets/images/home.png';
import homeoutline from '../../assets/images/home-outline.png';
import dashboardIcon from '../../assets/images/dashboardIcon.png';
import dashboard from '../../assets/images/online-dashboard.png';
import account from '../../assets/images/account.png';
import profile from '../../assets/images/profile.png';

export default function TabLayout() {
  const { loading, token } = useAuth();

  if (loading) {
    return null;
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? homeImg : homeoutline}
              style={{
                width: 24,
                height: 24,
                marginBottom: -10,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? dashboardIcon : dashboard}
              style={{
                width: 24,
                height: 24,
                marginBottom: -10,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? account : profile}
              style={{
                width: 24,
                height: 24,
                marginBottom: -10,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
