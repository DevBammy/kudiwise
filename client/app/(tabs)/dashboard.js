import { Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { useTransactions } from '../../hooks/useTransactions';
import { API_URL } from '../../constants/api';
import { useAuth } from '../../context/AuthContext';
import { View, Text } from '../../components/Themed';
import { formatCurrency } from '../../components/FormatNumber';
import Loading from '../../components/ui/Loading';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#f4f4f4',
  backgroundGradientTo: '#f4f4f4',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: () => '#000',
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#2196f3',
  },
};

const Dashboard = () => {
  const { token, user } = useAuth();
  const id = user.id;

  // Hook with loadData
  const { summary, loadData, loading: summaryLoading } = useTransactions(id);

  const [groupBy, setGroupBy] = useState('day');
  const [chartData, setChartData] = useState(null);
  const [chartLoading, setChartLoading] = useState(false);

  const [lineView, setLineView] = useState('income');

  // Load summary on mount
  useEffect(() => {
    loadData(); // fetch summary + transactions (optional)
  }, []);

  // Load chart data when groupBy changes
  useEffect(() => {
    const fetchGroupedSummary = async () => {
      try {
        setChartLoading(true);
        const res = await fetch(
          `${API_URL}/summary?groupBy=${groupBy}&userId=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch grouped summary:', error);
      } finally {
        setChartLoading(false);
      }
    };

    fetchGroupedSummary();
  }, [groupBy]);

  return (
    <ScrollView className="bg-bg px-4 pt-12 pb-16">
      <Text type="title" className="text-xl mb-4">
        Dashboard Overview
      </Text>

      {/* Summary Cards */}
      {summaryLoading && (
        <View className="flex-row justify-between mb-6">
          <SummaryCard
            label="Balance"
            value={summary?.balance}
            color="bg-blue"
          />
          <SummaryCard
            label="Income"
            value={summary?.income}
            color="bg-green-500"
          />
          <SummaryCard
            label="Expenses"
            value={summary?.expenses}
            color="bg-red-500"
          />
        </View>
      )}

      {/* Grouping Filter */}
      <Text type="subtitle2" className="mb-2">
        Filter By:
      </Text>

      <View className="flex-row items-center gap-4 mb-4 space-x-3">
        {['day', 'week', 'month'].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setGroupBy(item)}
            className={`px-4 py-2 rounded-md ${
              groupBy === item ? 'bg-blue' : 'bg-gray-200'
            }`}
          >
            <Text
              type="subtitle2"
              className={groupBy === item ? 'text-white' : 'text-black'}
            >
              {item.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bar Chart */}
      {chartLoading || !chartData ? (
        <Loading />
      ) : (
        <>
          <View className="flex-row space-x-3 mb-3">
            {['income', 'expense'].map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => setLineView(type)}
                className={`px-4 py-2 rounded-md ${
                  lineView === type ? 'bg-blue' : 'bg-gray-200'
                }`}
              >
                <Text
                  className={lineView === type ? 'text-white' : 'text-black'}
                >
                  {type.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <LineChart
            data={{
              labels: chartData.map((d) => d.period),
              datasets: [
                {
                  data: chartData.map((d) => d[lineView]),
                  color: () => (lineView === 'income' ? '#4CAF50' : '#F44336'),
                  strokeWidth: 2,
                },
              ],
              legend: [lineView === 'income' ? 'Income' : 'Expenses'],
            }}
            width={screenWidth - 32}
            height={screenHeight - 250}
            chartConfig={chartConfig}
            bezier
          />
        </>
      )}
    </ScrollView>
  );
};

const SummaryCard = ({ label, value, color }) => (
  <View className={`flex-1 rounded-lg p-4 mr-2 ${color}`}>
    <Text type="subtitle2" className="text-white text-sm">
      {label}
    </Text>
    <Text className="text-white text-lg">
      {value == null ? formatCurrency(0) : formatCurrency(value)}
    </Text>
  </View>
);

export default Dashboard;
