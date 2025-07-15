import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { View, Text } from '../components/Themed';
import { useAuth } from '../context/AuthContext';
import { useTransactions } from '../hooks/useTransactions';
import dashboard from '../assets/images/dashboard1.png';

const categories = [
  { id: 'food', name: 'Food & Drinks', icon: 'fast-food' },
  { id: 'shopping', name: 'Shopping', icon: 'cart' },
  { id: 'transportation', name: 'Transportation', icon: 'car' },
  { id: 'entertainment', name: 'Entertainment', icon: 'film' },
  { id: 'bills', name: 'Bills', icon: 'receipt' },
  { id: 'income', name: 'Income', icon: 'cash' },
  { id: 'other', name: 'Other', icon: 'ellipsis-horizontal' },
];

const Create = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { addTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !amount || !type || !selectedCategory) {
      return Alert.alert('Missing fields', 'Please fill all fields');
    }

    const transactionData = {
      title,
      amount: Number(amount),
      type,
      category: selectedCategory,
      date: new Date(),
    };

    try {
      setLoading(true);
      await addTransaction(transactionData);
      Alert.alert('Success', 'Transaction added');
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Submit error:', error);
      Alert.alert('Error', 'Could not add transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-bg px-4 pt-10">
      <View className="flex-row items-center justify-between p-2 border-b-slate-400 border-b">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-3 bg-blue rounded-full elevation-md"
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text type="title" className="flex-1 ml-6">
          New Transaction
        </Text>
      </View>

      <Text type="subtitle" className="my-2">
        Save more, spend wiser, and hit your financial goals faster with
        insights tailored to you.
      </Text>

      <View className="bg-white w-full h-max p-2 my-4 rounded-md elevation-md">
        <View className="flex-row justify-between my-4 gap-4">
          {['income', 'expense'].map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setType(t)}
              className={`p-4 rounded-md flex-1 ${
                type === t ? 'bg-blue' : 'bg-gray-200'
              }`}
            >
              <Text
                type="subtitle2"
                className={
                  type === t
                    ? 'text-text text-center'
                    : 'text-black text-center'
                }
              >
                {t.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="w-full flex-row items-center border-b pb-4 mb-4">
          <Ionicons name="create-outline" size={24} />

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            className="bg-white flex-1 p-3 my-3 rounded-lg font-mid"
          />
        </View>
        <View className="w-full border-b pb-4 mb-4">
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            className="bg-white p-3 mb-3 rounded-lg font-mid"
          />
        </View>

        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="pricetag-outline" size={16} />
          <Text type="subtitle2" className="mb-2">
            Select Category
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setSelectedCategory(cat.id)}
              className={`p-2 px-3 flex-row items-center rounded-md ${
                selectedCategory === cat.id ? 'bg-blue' : 'bg-yellow'
              }`}
            >
              <Ionicons
                name={cat.icon}
                size={16}
                color={selectedCategory === cat.id ? '#fff' : '#555'}
              />
              <Text
                className={`ml-2 ${
                  selectedCategory === cat.id ? 'text-white' : 'text-black'
                }`}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className="bg-blue mt-8 p-4 rounded-lg items-center"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text type="subtitle2" className="text-white">
              Add Transaction
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Create;
