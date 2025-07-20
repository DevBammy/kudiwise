import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const { user, token } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      router.replace('/login');
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('authUser');
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  return (
    <ScrollView className="flex-1 bg-bg px-4 py-6 my-12">
      {/* Profile Header */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name
            )}?background=random`,
          }}
          className="w-24 h-24 rounded-full"
        />
        <Text className="text-xl font-semibold mt-3">{user.name}</Text>
        <Text className="text-gray-500">{user.email}</Text>
      </View>

      {/* Settings List */}
      <View className="space-y-4">
        <SettingItem
          icon="create"
          label="New Transaction"
          onPress={() => router.push('/create')}
        />
        <SettingItem icon="person" label="Edit Profile" onPress={() => {}} />
        <SettingItem
          icon="lock-closed"
          label="Change Password"
          onPress={() => {}}
        />
        <SettingItem icon="moon" label="Theme" onPress={() => {}} />
        <SettingItem icon="language" label="Language" onPress={() => {}} />
        <SettingItem
          icon="notifications"
          label="Notification Settings"
          onPress={handleLogout}
        />
      </View>

      {/* Logout */}
      <TouchableOpacity
        onPress={handleLogout}
        className="mt-8 flex-row items-center justify-center bg-red-500 py-3 rounded-xl"
      >
        <MaterialIcons name="logout" size={20} color="white" />
        <Text className="text-white text-base ml-2">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const SettingItem = ({ icon, label, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center justify-between bg-gray-100 px-4 py-3 rounded-xl"
  >
    <View className="flex-row items-center space-x-3">
      <Ionicons name={icon} size={20} color="#4B5563" />
      <Text className="text-base text-gray-700">{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

export default Profile;
