import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { API_URL } from '../constants/api';
import { useAuth } from '../context/AuthContext';

export const useTransactions = (id) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const addTransaction = async (transactionData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) throw new Error('Failed to add transaction');
      setLoading(false);
      await loadData();

      Alert.alert('Success', 'Transaction added successfully');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to add transaction');
    }
  };

  //   const fetchTransactions = useCallback(async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/transactions`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (!response.ok) throw new Error('Failed to fetch transactions');
  //       const data = await response.json();
  //       setTransactions(data);
  //     } catch (error) {
  //       console.error('Failed to fetch transactions:', error);
  //     }
  //   }, [token]);

  const fetchTransactions = useCallback(
    async (filters = {}) => {
      console.log('💡 Token used:', token); // Add this
      try {
        setLoading(true);
        const query = new URLSearchParams({
          ...filters,
          userId: id,
        }).toString();
        const response = await fetch(`${API_URL}/transactions?${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        setLoading(false);
        setTransactions(data);
      } catch (error) {
        setLoading(false);
        console.error('Failed to fetch transactions:', error);
      }
    },
    [token, id]
  );

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/summary?userId=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch summary');
      const data = await response.json();
      setSummary(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Failed to fetch summary:', error);
    }
  }, [token, id]);

  const updateTransaction = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update transaction');
      setLoading(false);
      await loadData();
      Alert.alert('Success', 'Transaction updated successfully');
    } catch (error) {
      setLoading(false);
      console.error('Error updating transaction:', error);
      Alert.alert('Error', 'Failed to update transaction');
    }
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchSummary]);

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete transaction');
      await loadData();
      Alert.alert('Success', 'Transaction deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete transaction');
    }
  };

  return {
    addTransaction,
    transactions,
    summary,
    loading,
    loadData,
    updateTransaction,
    deleteTransaction,
    fetchTransactions,
  };
};
