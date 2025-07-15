import { View, Text } from '../../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuth } from '../../context/AuthContext';
import { API_URL } from '../../constants/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { token, user, login, logout, loading } = useAuth();

  const handleRegister = async () => {
    console.log('started');
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      login(data.token, data.user);
      router.replace('/login');
      Alert.alert('Registration Successful, Please login');
    } else {
      console.log(data.message);
      Alert.alert('Registration failed', data.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <View className="w-full h-full bg-bg">
        <View className="w-[300] h-[350]">
          <Image
            source={require('../../assets/images/login.png')}
            className="w-full h-full"
          />
        </View>

        <View className="w-fuil px-5 my-4">
          <Text type="title" className="text-center mb-2">
            Welcome Back!
          </Text>

          {error ? (
            <View className="flex-row p-4 border-l-2 rounded-md border-l-red-700 mb-6 items-center w-full bg-slate-300">
              <Ionicons name="alert-circle" size={20} color="red" />
              <Text className="ml-2 flex-1">{error}</Text>
              <TouchableOpacity onPress={() => setError('')}>
                <Ionicons
                  name="close"
                  size={20}
                  color="#242529"
                  onPress={() => setError('')}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          <Text>Full Name</Text>
          <TextInput
            className={`w-full border-2 rounded-lg bg-white mb-6 p-4 font-reg border-slate-300 ${error ? 'border-red-500' : ''}`}
            autoCapitalize="none"
            value={name}
            placeholder="Enter Full Name"
            onChangeText={(name) => setName(name)}
          />

          <Text>Email Address</Text>
          <TextInput
            className={`w-full border-2 rounded-lg bg-white mb-6 p-4 font-reg border-slate-300 ${error ? 'border-red-500' : ''}`}
            autoCapitalize="none"
            value={email}
            placeholder="Enter Email Address"
            onChangeText={(email) => setEmail(email)}
          />

          <Text>Password</Text>
          <TextInput
            className={`w-full border-2 rounded-lg bg-white mb-6 p-4 font-reg border-slate-300 ${error ? 'border-red-500' : ''}`}
            value={password}
            placeholder="Enter password"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <TouchableOpacity
            onPress={handleRegister}
            className="w-full rounded-lg bg-text p-4"
          >
            <Text className="text-white text-center font-big ">Continue</Text>
          </TouchableOpacity>

          <View className="w-full flex-row items-center mt-[80] justify-center">
            <Text>Already have an have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text type="subtitle" className="ml-2">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;
