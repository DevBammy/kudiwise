import { useRouter } from 'expo-router';
import { Text, View } from '../../components/Themed';
import { FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BalanceCard from '../../components/ui/BalanceCard';
import { useTransactions } from '../../hooks/useTransactions';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const Index = () => {
  const { token } = useAuth();
  const router = useRouter();
  const {
    transactions,
    summary,
    loading,
    loadData,
    updateTransaction,
    deleteTransaction,
    fetchTransactions,
  } = useTransactions();

  useEffect(() => {
    if (token) {
      console.log('🔐 Token available in screen:', token);
      loadData();
    }
  }, [token]);

  useEffect(() => {
    console.log('📥 Final transactions:', transactions);
  }, [transactions]);

  if (!token || loading) {
    return null; // optionally show a loader here
  }

  return (
    <>
      <View className="flex w-full h-full bg-bg px-4">
        <View className="pt-12 flex-row items-center justify-between">
          <View>
            <Text type="title">Hi, Emmanuel</Text>
            <Text type="subtitle">Welcome Back!</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => router.push('/create')}
              className="bg-blue w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
            >
              <Ionicons name="add" size={30} />
            </TouchableOpacity>
          </View>
        </View>

        <BalanceCard />

        <View className="my-4">
          <Text type="subtitle2">Recent Transactions</Text>
        </View>
      </View>

      {/* <FlatList className="flex-1 my-4 pb-4" /> */}
    </>
  );
};

export default Index;
