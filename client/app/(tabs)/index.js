import { useRouter } from 'expo-router';
import { Text, View } from '../../components/Themed';
import {
  Alert,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BalanceCard from '../../components/ui/BalanceCard';
import { useTransactions } from '../../hooks/useTransactions';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Loading, { Error } from '../../components/ui/Loading';
import Transactions from '../../components/ui/Transactions';

const Index = () => {
  const { token, user } = useAuth();
  const userId = user?.id;

  const router = useRouter();
  const {
    transactions,
    summary,
    loading,
    loadData,
    updateTransaction,
    deleteTransaction,
    fetchTransactions,
  } = useTransactions(userId);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  if (!token) return <Error />;
  if (loading) return <Loading />;

  const handleDeleteTransaction = (id) => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData().finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <>
      <View className="flex w-full h-max bg-bg px-4">
        <View className="pt-12 flex-row items-center justify-between">
          <View>
            <Text type="title">Hi, {user?.name?.split(' ')[0]}</Text>
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

        <BalanceCard summary={summary[0]} />

        <View className="my-4">
          <Text type="subtitle2">Recent Transactions</Text>
        </View>
      </View>

      {!token ? (
        <Error message="Please login to continue" />
      ) : loading ? (
        <Loading />
      ) : transactions.length === 0 ? (
        <View className="flex items-center justify-center">
          <Error message="No transactions found!" />
          <TouchableOpacity
            className="bg-blue p-4 rounded-md"
            onPress={() => router.push('/create')}
          >
            <Text type="subtitle2" className="text-text">
              Create a new transaction
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          className="flex-1 my-4 pb-4"
          data={transactions}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<Error />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Transactions item={item} onDelete={handleDeleteTransaction} />
          )}
        />
      )}
    </>
  );
};

export default Index;
