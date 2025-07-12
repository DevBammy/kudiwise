import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { API_URL } from '../constants/api';

import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { API_URL } from '../constants/api';
import { useAuth } from '../context/AuthContext';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  const addTransaction = async (transactionData) => {
    try {
      const response = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) throw new Error('Failed to add transaction');
      await loadData();
    } catch (error) {
      console.error('Error adding transaction:', error);
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
      try {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_URL}/transactions?${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    },
    [token]
  );

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch summary');
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    }
  }, [token]);

  const updateTransaction = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Failed to update transaction');
      await loadData();
    } catch (error) {
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
      console.error('Error deleting transaction:', error);
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
  };
};
